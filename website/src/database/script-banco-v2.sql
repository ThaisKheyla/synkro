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

CREATE TABLE cargo (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE empresa (
  id INT NOT NULL AUTO_INCREMENT,
  nomeEmpresarial VARCHAR(100),
  ispb VARCHAR(8),
  email VARCHAR(100),
  nomeRepresentante VARCHAR(100),
  statusOperacao TINYINT NOT NULL,
  statusAcesso TINYINT DEFAULT 1,
  PRIMARY KEY (id),
  CONSTRAINT fk_empresa_statusAcesso FOREIGN KEY (statusAcesso) REFERENCES status_acesso(id),
  CONSTRAINT fk_empresa_statusOperacao FOREIGN KEY (statusOperacao) REFERENCES status_operacao(id)
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
  CONSTRAINT fk_funcionario_cargo FOREIGN KEY (fkCargo) REFERENCES cargo(id),
  CONSTRAINT fk_funcionarios_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
  CONSTRAINT fk_funcionario_perfilAtivo FOREIGN KEY (fkPerfilAtivo) REFERENCES perfil_ativo(id)
);

-- =====================================================
-- MAINFRAMES
-- =====================================================
CREATE TABLE setor (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45),
  localizacao VARCHAR(45),
  fkEmpresa INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_setor_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
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
  macAdress VARCHAR(100),
  fkSetor INT NOT NULL,
  fkSistemaOperacional INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_mainframe_setor FOREIGN KEY (fkSetor) REFERENCES setor(id),
  CONSTRAINT fk_mainframe_sistema_operacional FOREIGN KEY (fkSistemaOperacional) REFERENCES sistema_operacional(id)
);

-- =====================================================
-- MÉTRICAS E COMPONENTES
-- =====================================================
CREATE TABLE tipo(
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE componente (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE metrica (
  id INT NOT NULL,
  fkTipo INT NOT NULL,
  fkComponente INT NOT NULL,
  fkMainframe INT NOT NULL,
  min DECIMAL(6,2),
  max DECIMAL(6,2),
  PRIMARY KEY (id, fkTipo, fkComponente, fkMainframe),
  CONSTRAINT fk_metrica_tipo FOREIGN KEY (fkTipo) REFERENCES tipo(id),
  CONSTRAINT fk_metrica_componente FOREIGN KEY (fkComponente) REFERENCES componente(id),
  CONSTRAINT fk_metrica_mainframe FOREIGN KEY (fkMainframe) REFERENCES mainframe(id)
);

-- =====================================================
-- ALERTAS, GRAVIDADE E STATUS
-- =====================================================

CREATE TABLE gravidade (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE status (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE alerta (
   id INT NOT NULL AUTO_INCREMENT,
   dt_hora DATETIME,
   valor_coletado DECIMAL(5,2),
   fkGravidade INT NOT NULL,
   fkMetrica INT NOT NULL,
   fkStatus INT NOT NULL DEFAULT 1,
   PRIMARY KEY (id),
   CONSTRAINT fk_alerta_gravidade FOREIGN KEY (fkGravidade) REFERENCES gravidade(id),
   CONSTRAINT fk_alerta_metrica FOREIGN KEY (fkMetrica) REFERENCES metrica(id),
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
INSERT INTO empresa (nomeEmpresarial, ispb, email, nomeRepresentante, statusOperacao, statusAcesso) VALUES
('Banco Alpha S.A.', '12345678', 'contato@alpha.com', 'Marcos Silva', 1, 3),
('Tech Solutions LTDA', '87654321', 'suporte@techsolutions.com', 'Maria Oliveira', 1, 3),
('Global Finance Corp', '13572468', 'finance@global.com', 'Carlos Souza', 2, 3);

-- Funcionários
INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa) VALUES
('Marcos Silva', 'marcos.silva@empresa1.com', '111.111.111-11', '1980-01-01', SHA2('senha123',256), 1, 1, 1),
('Fernando Pereira', 'fernando.pereira@empresa1.com', '111.111.111-12', '1990-03-15', SHA2('senha123',256), 1, 2, 1),
('Maria Oliveira', 'maria.oliveira@empresa2.com', '222.222.222-21', '1985-05-10', SHA2('senha123',256), 1, 1, 2),
('Carlos Santos', 'carlos.santos@empresa2.com', '222.222.222-22', '1992-08-20', SHA2('senha123',256), 1, 2, 2),
('Ricardo Almeida', 'ricardo.almeida@empresa3.com', '333.333.333-31', '1978-02-25', SHA2('senha123',256), 1, 1, 3),
('Fernanda Lima', 'fernanda.lima@empresa3.com', '333.333.333-32', '1991-07-12', SHA2('senha123',256), 1, 2, 3);

-- Setores
INSERT INTO setor (nome, localizacao, fkEmpresa) VALUES 
('TI', 'Andar 1', 1),
('Financeiro', 'Andar 2', 1),
('Operações', 'Andar 3', 1),
('TI', 'Térreo', 2),
('Financeiro', 'Andar 2', 3),
('TI', 'Andar 1', 2);

-- Sistemas operacionais
INSERT INTO sistema_operacional (nome) VALUES 
('Linux'),
('Windows');

-- Mainframes
INSERT INTO mainframe (fabricante, modelo, macAdress, fkSetor, fkSistemaOperacional) VALUES
('IBM', 'Z15', '269058769682378', 1, 1),
('IBM', 'Z16', '269058910482378', 2, 2),
('IBM', 'Z14', '269058765243378', 3, 1),
('IBM', 'Z15', '269058769680975', 4, 2),
('IBM', 'Z14', '745683251336432', 5, 2),
('IBM', 'Z13', '978436525625487', 1, 1);

-- Tipo
INSERT INTO tipo (descricao) VALUES 
('Uso'),
('Temperatura');

-- Componentes
INSERT INTO componente (nome) VALUES
('Processador'),
('Memória RAM'),
('Disco Rígido');

-- Métricas
INSERT INTO metrica (id, fkTipo, fkComponente, fkMainframe, min, max) VALUES
(1, 1, 1, 1, 5.0, 90.0),
(2, 1, 2, 1, 5.0, 90.0),
(3, 1, 3, 2, 0.0, 75.0);

-- Gravidades
INSERT INTO gravidade (descricao) VALUES 
('Emergência'),
('Muito Urgente'),
('Urgente'),
('Normal');

-- Status
INSERT INTO status (descricao) VALUES 
('Aberto'),
('Em andamento'),
('Resolvido');

-- Alertas (com fkComponente e fkMetrica)
INSERT INTO alerta (dt_hora, valor_coletado, fkGravidade, fkMetrica, fkStatus) VALUES
(NOW(), 75.5, 4, 1, 2),
(NOW(), 85.0, 3, 2, 1),
(NOW(), 20.0, 4, 1, 3),
(NOW(), 98.0, 1, 1, 1),
(NOW(), 92.0, 2, 2, 2),
(NOW(), 95.0, 1, 1, 1);

-- =====================================================
-- TRIGGER PARA CRIAR GERENTE AUTOMATICAMENTE
-- =====================================================
DELIMITER $$ 
CREATE TRIGGER criarPerfilAoLiberarAcessoEmpresa AFTER UPDATE ON empresa
FOR EACH ROW
BEGIN
  DECLARE idCargoGerente INT;
  
  SELECT id INTO idCargoGerente FROM cargo WHERE nome = 'Gerente' LIMIT 1;
  
  IF NEW.statusAcesso = 3 AND OLD.statusAcesso <> 3 AND
     ((SELECT COUNT(*) FROM funcionario WHERE fkCargo = idCargoGerente AND fkEmpresa = NEW.id) < 1) THEN
     
     INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa)
     VALUES (
       NEW.nomeRepresentante,
       CONCAT(REPLACE(LOWER(NEW.nomeRepresentante), ' ', '_'), '@gmail.com'),
       '000.000.000-00',
       CURDATE(),
       SHA2('senha123', 256),
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
-- TRIGGER DE GRAVIDADE
-- =====================================================
/*
DELIMITER $$

CREATE TRIGGER trg_definir_gravidade_auto
BEFORE INSERT ON alerta
FOR EACH ROW
BEGIN
    DECLARE vMin DECIMAL(5,2);
    DECLARE vMax DECIMAL(5,2);

    -- Busca min e max da métrica vinculada ao componente do alerta
    SELECT mt.min, mt.max INTO vMin, vMax
    FROM componente c
    JOIN metrica mt ON c.fkMetrica = mt.id
    WHERE c.id = NEW.fkComponente;

    -- Define a gravidade com base no valor coletado
    IF NEW.valor_coletado < vMin THEN
        SET NEW.fkGravidade = 3; -- Alta
    ELSEIF NEW.valor_coletado >= vMin AND NEW.valor_coletado < (vMax * 0.8) THEN
        SET NEW.fkGravidade = 1; -- Baixa
    ELSEIF NEW.valor_coletado >= (vMax * 0.8) AND NEW.valor_coletado <= vMax THEN
        SET NEW.fkGravidade = 2; -- Média
    ELSE
        SET NEW.fkGravidade = 3; -- Alta
    END IF;
END$$

DELIMITER ;*/

-- =====================================================
-- SELECTS
-- =====================================================
SELECT e.id, e.nomeEmpresarial, sa.descricao AS statusAcesso, so.descricao AS statusOperacao
FROM empresa e
JOIN status_acesso sa ON e.statusAcesso = sa.id
JOIN status_operacao so ON e.statusOperacao = so.id;


SELECT f.nome, f.email, c.nome AS cargo, p.descricao AS perfilAtivo, e.nomeEmpresarial
FROM funcionario f
JOIN cargo c ON f.fkCargo = c.id
JOIN perfil_ativo p ON f.fkPerfilAtivo = p.id
JOIN empresa e ON f.fkEmpresa = e.id
ORDER BY e.id, c.id;

SELECT 
    m.id AS idMainframe,
    m.fabricante,
    m.modelo,
    a.valor_coletado,
    g.descricao AS gravidade,
    s.descricao AS status,
    e.nomeEmpresarial AS empresa,
    a.dt_hora
FROM alerta a
JOIN metrica me ON a.fkMetrica= me.id
JOIN mainframe m ON me.fkMainframe = m.id
JOIN gravidade g ON a.fkGravidade = g.id
JOIN status s ON a.fkStatus = s.id
JOIN setor se ON m.fkSetor = se.id
JOIN empresa e ON se.fkEmpresa = e.id
ORDER BY m.id, a.dt_hora DESC;

SELECT * FROM empresa;
SELECT * FROM funcionario;

SELECT m.min, m.max, m.fkTipo, t.descricao
from metrica as m
join tipo t on m.fkTipo = t.id
where m.fkMainframe = 1;

SELECT 
      m.id,
      m.fabricante,
      m.modelo,
      s.nome AS sistema,
      se.nome AS setor
    FROM mainframe m
    JOIN sistema_operacional s ON m.fkSistemaOperacional = s.id
    JOIN setor se ON m.fkSetor = se.id
    WHERE se.fkEmpresa = 1
    ORDER BY m.id;

SELECT * FROM metrica;
SELECT * FROM mainframe;