-- =====================================================
-- Banco de dados Synkro
-- =====================================================
DROP DATABASE IF EXISTS synkro;
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
  macAdress VARCHAR(100) UNIQUE,
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
   valor_coletado DECIMAL(6,2),
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
('Tech Solutions LTDA', '87654321', 'suporte@techsolutions.com', 'Maria Oliveira', 1, 3);

-- Funcionários
INSERT INTO funcionario (nome, email, cpf, dtnascimento, senha, fkPerfilAtivo, fkCargo, fkEmpresa) VALUES
('Marcos Silva', 'marcos.silva@empresa1.com', '111.111.111-11', '1980-01-01', SHA2('senha123',256), 1, 1, 1),
('Fernando Pereira', 'fernando.pereira@empresa1.com', '111.111.111-12', '1990-03-15', SHA2('senha123',256), 1, 2, 1),
('Maria Oliveira', 'maria.oliveira@empresa2.com', '222.222.222-21', '1985-05-10', SHA2('senha123',256), 1, 1, 2),
('Carlos Santos', 'carlos.santos@empresa2.com', '222.222.222-22', '1992-08-20', SHA2('senha123',256), 1, 2, 2);

-- Setores
INSERT INTO setor (nome, localizacao, fkEmpresa) VALUES 
('TI', 'Andar 1', 1),
('Financeiro', 'Andar 2', 1),
('TI', 'Térreo', 2);

-- Sistemas operacionais
INSERT INTO sistema_operacional (nome) VALUES 
('Linux'),
('Windows');

-- Mainframes
INSERT INTO mainframe (fabricante, modelo, macAdress, fkSetor, fkSistemaOperacional) VALUES
('IBM', 'Z15', '166250251803552', 1, 1),
('IBM', 'Z16', '269166201749049', 2, 2),
('IBM', 'Z14', '211334712796409 ', 3, 1);

-- Tipo
INSERT INTO tipo (descricao) VALUES 
('Uso'),
('Temperatura'),
('IO Wait'),
('Throughput'),
('IOPS'),
('Read'),
('Write'),
('Latência');

-- Componentes
INSERT INTO componente (nome) VALUES
('Processador'),
('Memória RAM'),
('Disco Rígido');

-- Métricas
INSERT INTO metrica (id, fkTipo, fkComponente, fkMainframe, min, max) VALUES
(1, 1, 1, 1, 0.0, 95.0), -- Mainframe 1 | Processador
(2, 1, 2, 1, 0.0, 95.0), -- Mainframe 1 | RAM
(3, 1, 3, 1, 0.0, 99.0); -- Mainframe 1 | Disco

INSERT INTO metrica (id, fkTipo, fkComponente, fkMainframe, min, max) VALUES 
(5, 1, 1, 2, 0.0, 10.0), -- Mainframe 2 | Processador
(6, 1, 2, 2, 0.0, 90.0), -- Mainframe 2 | RAM
(4, 1, 3, 2, 0.0, 68.0); -- Mainframe 2 | Disco

INSERT INTO metrica (id, fkTipo, fkComponente, fkMainframe, min, max) VALUES
(7, 1, 1, 3, 0.0, 95.0), -- Mainframe 3 | Processador
(8, 1, 2, 3, 0.0, 95.0), -- Mainframe 3 | RAM
(9, 1, 3, 3, 0.0, 95.0); -- Mainframe 3 | Disco

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
       CONCAT(REPLACE(LOWER(NEW.nomeRepresentante), ' ', '.'), '@gmail.com'),
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
DELIMITER $$
CREATE TRIGGER trg_definir_gravidade_auto
BEFORE INSERT ON alerta
FOR EACH ROW
BEGIN
    DECLARE vMin DECIMAL(5,2);
    DECLARE vMax DECIMAL(5,2);
    DECLARE urgente_max DECIMAL(5,2);
    DECLARE limite_max DECIMAL(5,2);
    DECLARE urgente_min DECIMAL(5,2);
    DECLARE limite_min DECIMAL(5,2);

    SELECT min, max INTO vMin, vMax
    FROM metrica
    WHERE id = NEW.fkMetrica;

    -- Limiares Acima do Máximo (MAX side)
    SET limite_max = (vMax + 100) / 2;
    SET urgente_max = vMax; 

    -- Limiares Abaixo do Mínimo (MIN side)
    SET limite_min = (vMin + 0) / 2;
    SET urgente_min = vMin;

    -- 1. EMERGÊNCIA (fkGravidade = 1) - Extremos 100% ou 0%
    IF NEW.valor_coletado = 100.00 OR NEW.valor_coletado = 0.00 THEN
        SET NEW.fkGravidade = 1;

    -- 2. MUITO URGENTE (fkGravidade = 2) - Entre o limite max/min e o extremo
    ELSEIF (NEW.valor_coletado >= limite_max AND NEW.valor_coletado < 100.00)
        OR (NEW.valor_coletado > 0.00 AND NEW.valor_coletado <= limite_min) THEN
        SET NEW.fkGravidade = 2;

    -- 3. URGENTE (fkGravidade = 3) - Entre o limiar VMAX/VMIN e o limite max/min
    ELSEIF (NEW.valor_coletado > urgente_max AND NEW.valor_coletado < limite_max)
        OR (NEW.valor_coletado > limite_min AND NEW.valor_coletado < urgente_min) THEN
        SET NEW.fkGravidade = 3;

    -- 4. NORMAL (fkGravidade = 4) - Dentro do range VMIN e VMAX
    ELSE
        SET NEW.fkGravidade = 4;
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
            m.id AS idMainframe,
            m.modelo AS nomeMainframe,
            g.descricao AS gravidade,
            COUNT(a.id) AS qtdAlertas
        FROM alerta a
        JOIN metrica me ON a.fkMetrica = me.id
        JOIN mainframe m ON me.fkMainframe = m.id
        JOIN gravidade g ON a.fkGravidade = g.id
        JOIN setor se ON m.fkSetor = se.id
        WHERE se.fkEmpresa = 1
        GROUP BY m.id, m.modelo, g.descricao
        ORDER BY m.id;

SELECT dt_hora, c.nome, valor_coletado, min, max, descricao FROM alerta a
JOIN gravidade g ON a.fkGravidade = g.id
JOIN metrica m ON a.fkMetrica = m.id
JOIN componente c ON m.fkComponente = c.id;

SELECT fkEmpresa, fkMainframe, macAdress, dt_hora, c.nome, valor_coletado, min, max, descricao, s.nome, s.localizacao FROM alerta a
JOIN gravidade g ON a.fkGravidade = g.id
JOIN metrica m ON a.fkMetrica = m.id
JOIN componente c ON m.fkComponente = c.id
JOIN mainframe ma ON m.fkMainframe = ma.id
JOIN setor s ON ma.fkSetor = s.id
JOIN empresa e ON s.fkEmpresa = e.id
WHERE fkEmpresa = 1 AND fkMainframe = 2
ORDER BY descricao;

SELECT
    m.id,
    se.nome AS setor,
    se.localizacao AS localizacao,
    COALESCE(c.nome, 'N/A') AS componente,
    COALESCE(a.valor_coletado, 0.00) AS valor_coletado,
    COALESCE(g.descricao, 'Normal') AS gravidade
FROM mainframe m
JOIN setor se ON m.fkSetor = se.id
LEFT JOIN (
    SELECT
        me_inner.fkMainframe,
        MIN(g_inner.id) AS id_gravidade_maxima,
        MAX(a_inner.id) AS max_alerta_id
    FROM alerta a_inner
    JOIN metrica me_inner ON a_inner.fkMetrica = me_inner.id
    JOIN gravidade g_inner ON a_inner.fkGravidade = g_inner.id
    GROUP BY me_inner.fkMainframe
) AS alerta_critico ON m.id = alerta_critico.fkMainframe
LEFT JOIN alerta a ON a.id = alerta_critico.max_alerta_id
LEFT JOIN metrica me ON a.fkMetrica = me.id
LEFT JOIN componente c ON me.fkComponente = c.id
LEFT JOIN gravidade g ON a.fkGravidade = g.id
WHERE se.fkEmpresa = 1
ORDER BY m.id;
	
    
SELECT fkEmpresa, 
       fkMainframe, 
       macAdress, 
       dt_hora, 
       c.nome, 
       valor_coletado, 
       min, 
       max, 
       descricao, 
       s.nome, 
       s.localizacao 
FROM alerta a
JOIN gravidade g ON a.fkGravidade = g.id
JOIN metrica m ON a.fkMetrica = m.id
JOIN componente c ON m.fkComponente = c.id
JOIN mainframe ma ON m.fkMainframe = ma.id
JOIN setor s ON ma.fkSetor = s.id
JOIN empresa e ON s.fkEmpresa = e.id
WHERE fkEmpresa = 1 AND descricao IN ('Urgente', 'Muito Urgente', 'Emergência')
ORDER BY descricao;


SELECT fkEmpresa, 
       fkMainframe, 
       macAdress, 
       dt_hora, 
       c.nome, 
       valor_coletado, 
       min, 
       max, 
       descricao, 
       s.nome, 
       s.localizacao 
FROM alerta a
JOIN gravidade g ON a.fkGravidade = g.id
JOIN metrica m ON a.fkMetrica = m.id
JOIN componente c ON m.fkComponente = c.id
JOIN mainframe ma ON m.fkMainframe = ma.id
JOIN setor s ON ma.fkSetor = s.id
JOIN empresa e ON s.fkEmpresa = e.id
WHERE descricao IN ('Urgente', 'Muito Urgente', 'Emergência')
ORDER BY descricao;

SELECT
        m.id AS idMainframe,
        g.descricao AS gravidade,
        COUNT(a.id) AS qtdAlertas,
        c.nome AS componente
    FROM alerta a
    JOIN metrica me ON a.fkMetrica = me.id
    JOIN mainframe m ON me.fkMainframe = m.id
    JOIN gravidade g ON a.fkGravidade = g.id
    JOIN setor se ON m.fkSetor = se.id
    JOIN componente c ON me.fkComponente = c.id
    WHERE se.fkEmpresa = 1
	AND g.descricao IN ('Emergência', 'Muito Urgente', 'Urgente')
    GROUP BY m.id, g.descricao, fkComponente
    ORDER BY m.id, FIELD(g.descricao, 'Emergência', 'Muito Urgente', 'Urgente');
SELECT DISTINCT mf.id
    FROM mainframe mf
    JOIN setor s ON mf.fkSetor = s.id
    WHERE fkEmpresa = 1
    ORDER BY mf.id;

SELECT * FROM funcionario;

SELECT * FROM metrica m
JOIN mainframe mf ON m.fkMainframe = mf.id
JOIN setor s ON mf.fkSetor = s.id
WHERE fkEmpresa = 2;

SELECT
        m.id AS idMainframe,
        c.nome AS componente,
        g.descricao AS gravidade,
        COUNT(a.id) AS qtdAlertas
    FROM alerta a
    JOIN metrica me ON a.fkMetrica = me.id
    JOIN mainframe m ON me.fkMainframe = m.id
    JOIN gravidade g ON a.fkGravidade = g.id
    JOIN setor se ON m.fkSetor = se.id
    JOIN componente c ON me.fkComponente = c.id
    WHERE se.fkEmpresa = 1
    AND g.descricao IN ('Emergência', 'Muito Urgente', 'Urgente')
    GROUP BY m.id, g.descricao, c.nome
    ORDER BY m.id, FIELD(g.descricao, 'Emergência', 'Muito Urgente', 'Urgente');