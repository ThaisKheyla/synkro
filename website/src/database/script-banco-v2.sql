-- =====================================================
-- Banco de dados Synkro
-- =====================================================
DROP DATABASE synkro;
CREATE DATABASE synkro;
USE synkro;

-- =====================================================
-- FUNCIONÁRIO E EMPRESA
-- =====================================================
CREATE TABLE status_acesso (
    id TINYINT NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE status_operacao (
    id TINYINT NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE perfil_ativo (
    id TINYINT NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE empresa (
  id INT NOT NULL AUTO_INCREMENT,
  nomeEmpresarial VARCHAR(100),
  ispb VARCHAR(8),
  email VARCHAR(100),
  nomeRepresentante VARCHAR(100),
  statusOperacao TINYINT NOT NULL,
  statusAcesso TINYINT DEFAULT(1),
  PRIMARY KEY (id),
  CONSTRAINT fk_empresa_statusAcesso FOREIGN KEY (statusAcesso) REFERENCES status_acesso(id),
  CONSTRAINT fk_empresa_statusOperacao FOREIGN KEY (statusOperacao) REFERENCES status_operacao(id)
);

CREATE TABLE cargo (
  idCargo INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (idCargo)
);

CREATE TABLE funcionario(
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45),
  email VARCHAR(45),
  cpf CHAR(14),
  dtnascimento DATE,
  senha VARCHAR(255),
  fkPerfilAtivo TINYINT NOT NULL,
  fkCargo INT NOT NULL,
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_funcionario_cargo FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo),
  CONSTRAINT fk_funcionarios_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
  CONSTRAINT fk_funcionario_perfilAtivo FOREIGN KEY (fkPerfilAtivo) REFERENCES perfil_ativo(id)
);

-- =====================================================
-- MAINFRAMES
-- =====================================================
CREATE TABLE setor (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE sistema_operacional (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE mainframe (
  id INT NOT NULL AUTO_INCREMENT,
  fabricante VARCHAR(100),
  modelo VARCHAR(100),
  numeroDeSerie INT,
  fkEmpresa INT NOT NULL,
  fkSetor INT NOT NULL,
  fkSistemaOperacional INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_servidor_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
  CONSTRAINT fk_mainframe_setor FOREIGN KEY (fkSetor) REFERENCES setor(id),
  CONSTRAINT fk_mainframe_sistema_operacional FOREIGN KEY (fkSistemaOperacional) REFERENCES sistema_operacional(id)
);

-- =====================================================
-- MÉTRICAS E COMPONENTES
-- =====================================================
CREATE TABLE metrica (
  id INT NOT NULL AUTO_INCREMENT,
  min DECIMAL(5,2),
  max DECIMAL(5,2),
  descricao VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE componente (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao VARCHAR(255),
  fkMetrica INT NOT NULL,
  PRIMARY KEY (id, fkMetrica),
  CONSTRAINT fk_componente_metrica FOREIGN KEY (fkMetrica) REFERENCES metrica(id)
);

CREATE TABLE componente_mainframe(
  fkComponente INT NOT NULL,
  fkMainframe INT NOT NULL,
  PRIMARY KEY (fkComponente, fkMainframe),
  CONSTRAINT fk_componente_has_mainframe_componente FOREIGN KEY (fkComponente) REFERENCES componente(id),
  CONSTRAINT fk_componente_has_mainframe_mainframe FOREIGN KEY (fkMainframe) REFERENCES mainframe(id)
);

-- =====================================================
-- ALERTAS, GRAVIDADE E STATUS
-- =====================================================
CREATE TABLE gravidade (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE status (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE alerta (
  id INT NOT NULL AUTO_INCREMENT,
  dt_hora DATETIME,
  descricao VARCHAR(255),
  valor_coletado DECIMAL(5,2),
  fkMainframe INT NOT NULL,
  fkGravidade INT NOT NULL,
  fkStatus INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_alerta_mainframe FOREIGN KEY (fkMainframe) REFERENCES mainframe(id),
  CONSTRAINT fk_alerta_gravidade FOREIGN KEY (fkGravidade) REFERENCES gravidade(id),
  CONSTRAINT fk_alerta_status FOREIGN KEY (fkStatus) REFERENCES status(id)
);

-- =====================================================
-- INSERTS DE EXEMPLO
-- =====================================================

-- Acesso
INSERT INTO status_acesso (id, descricao) VALUES
(1, 'Pendente'),
(2, 'Reprovado'),
(3, 'Aprovado');

-- Operação
INSERT INTO status_operacao (id, descricao) VALUES
(1, 'em-operacao'),
(2, 'liquidado-extrajudicialmente'),
(3, 'liquidacao-ordinaria');

-- Perfil ativo
INSERT INTO perfil_ativo (id, descricao) VALUES
(1, 'Ativo'),
(2, 'Inativo');

-- Cargo
INSERT INTO cargo (nome) VALUES
('Gerente'),
('Analista');

-- Empresas
INSERT INTO empresa (nomeEmpresarial, ispb, email, nomeRepresentante, statusOperacao, statusAcesso)
VALUES
('Banco Alpha S.A.', '12345678', 'contato@alpha.com', 'João Silva', 1, 3),
('Tech Solutions LTDA', '87654321', 'suporte@techsolutions.com', 'Maria Oliveira', 1, 3),
('Global Finance Corp', '13572468', 'finance@global.com', 'Carlos Souza', 2, 3);

-- Funcionários (2 por empresa)
INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
VALUES
('João Silva', 'joao.silva@empresa1.com', '111.111.111-11', '1980-01-01', SHA2('senha123',256), 1, 1, 1),
('Ana Pereira', 'ana.pereira@empresa1.com', '111.111.111-12', '1990-03-15', SHA2('senha123',256), 1, 2, 1),
('Maria Oliveira', 'maria.oliveira@empresa2.com', '222.222.222-21', '1985-05-10', SHA2('senha123',256), 1, 1, 2),
('Carlos Santos', 'carlos.santos@empresa2.com', '222.222.222-22', '1992-08-20', SHA2('senha123',256), 1, 2, 2),
('Ricardo Almeida', 'ricardo.almeida@empresa3.com', '333.333.333-31', '1978-02-25', SHA2('senha123',256), 1, 1, 3),
('Fernanda Lima', 'fernanda.lima@empresa3.com', '333.333.333-32', '1991-07-12', SHA2('senha123',256), 1, 2, 3);

-- Setores
INSERT INTO setor (nome) VALUES
('TI'),
('Financeiro'),
('Operações');

-- Sistemas operacionais
INSERT INTO sistema_operacional (nome) VALUES
('Linux'),('Windows');

-- Mainframes
INSERT INTO mainframe (fabricante, modelo, numeroDeSerie, fkEmpresa, fkSetor, fkSistemaOperacional)
VALUES
('IBM', 'Z15', 10001, 1, 1, 1),
('IBM', 'Z14', 10002, 2, 2, 2),
('IBM', 'Z13', 10003, 3, 3, 1);

-- Métricas
INSERT INTO metrica (min, max, descricao) VALUES
(0.0, 100.0, 'CPU Usage'),
(0.0, 100.0, 'Memory Usage'),
(0.0, 100.0, 'Disk Usage');

-- Componentes
INSERT INTO componente (nome, descricao, fkMetrica) VALUES
('Processador', 'Processador principal', 1),
('Memória RAM', 'Memória principal', 2),
('Disco Rígido', 'Armazenamento principal', 3);

-- Componentes por mainframe
INSERT INTO componente_mainframe (fkComponente, fkMainframe) VALUES
(1,1),(2,1),(3,1),
(1,2),(2,2),(3,2),
(1,3),(2,3),(3,3);

-- Gravidades
INSERT INTO gravidade (descricao) VALUES
('Baixa'),('Média'),('Alta');

-- Status de alerta
INSERT INTO status (descricao) VALUES
('Aberto'),('Em andamento'),('Resolvido');

-- Alertas
INSERT INTO alerta (dt_hora, descricao, valor_coletado, fkMainframe, fkGravidade, fkStatus)
VALUES
(NOW(), 'CPU acima do limite', 95.5, 1, 3, 1),
(NOW(), 'Memória quase cheia', 85.0, 1, 2, 2),
(NOW(), 'Disco quase cheio', 90.0, 1, 2, 1),
(NOW(), 'CPU crítica', 98.0, 2, 3, 1),
(NOW(), 'Memória crítica', 92.0, 2, 3, 2),
(NOW(), 'Disco crítico', 95.0, 3, 3, 1);

-- =====================================================
-- TRIGGER PARA CRIAR GERENTE AUTOMATICAMENTE
-- =====================================================
DELIMITER $$ 
CREATE TRIGGER criarPerfilAoLiberarAcessoEmpresa AFTER UPDATE ON empresa
FOR EACH ROW
BEGIN
  DECLARE idCargoGerente INT;
  
  SELECT idCargo INTO idCargoGerente FROM cargo WHERE nome = 'Gerente' LIMIT 1;
  
  IF NEW.statusAcesso = 3 AND OLD.statusAcesso <> 3 AND
     ((SELECT COUNT(*) FROM funcionario WHERE fkCargo = idCargoGerente AND fkEmpresa = NEW.id) < 1) THEN
     
     INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
     VALUES (
       NEW.nomeRepresentante,
       CONCAT(REPLACE(LOWER(NEW.nomeRepresentante), ' ', '_'), '@gmail.com'),
       '000.000.000-00',
       CURDATE(),
       SHA2(CONCAT(SUBSTRING(NEW.nomeEmpresarial,1,1), FLOOR(RAND() * 999999), '@'), 256),
       1,
       idCargoGerente,
       NEW.id
     );

  ELSEIF NEW.statusAcesso = 2 AND OLD.statusAcesso <> 2 THEN
     UPDATE funcionario SET fkPerfilAtivo = 2 WHERE fkEmpresa = NEW.id;
  ELSE
     UPDATE funcionario SET fkPerfilAtivo = 1 WHERE fkEmpresa = NEW.id;
  END IF;
END$$
DELIMITER ;

-- =====================================================
-- SELECTS
-- =====================================================
SELECT e.id, e.nomeEmpresarial, sa.descricao AS statusAcesso, so.descricao AS statusOperacao
FROM empresa e
JOIN status_acesso sa ON e.statusAcesso = sa.id
JOIN status_operacao so ON e.statusOperacao = so.id;


SELECT f.nome, f.email, c.nome AS cargo, p.descricao AS perfilAtivo, e.nomeEmpresarial
FROM funcionario f
JOIN cargo c ON f.fkCargo = c.idCargo
JOIN perfil_ativo p ON f.fkPerfilAtivo = p.id
JOIN empresa e ON f.fkEmpresa = e.id
ORDER BY e.id, c.idCargo;

SELECT 
    m.id AS idMainframe,
    m.fabricante,
    m.modelo,
    a.descricao AS alerta,
    a.valor_coletado,
    g.descricao AS gravidade,
    s.descricao AS status,
    e.nomeEmpresarial AS empresa,
    a.dt_hora
FROM alerta a
JOIN mainframe m ON a.fkMainframe = m.id
JOIN gravidade g ON a.fkGravidade = g.id
JOIN status s ON a.fkStatus = s.id
JOIN empresa e ON m.fkEmpresa = e.id
ORDER BY m.id, a.dt_hora DESC;

SELECT * FROM empresa;
SELECT * FROM funcionario;
DESC empresa;