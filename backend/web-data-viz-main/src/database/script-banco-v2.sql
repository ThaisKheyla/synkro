drop database synkro;
create database if not exists synkro;

use synkro;

create table empresa(
	id int not null auto_increment,
    nomeEmpresarial varchar(45),
    ispb varchar(8),
    email varchar(45),
    nomeRepresentante varchar(45),
    statusOperacao varchar(45),
    statusAcesso char(1) default 1,
    primary key(id)
);

create table funcionario(
	id int not null auto_increment,
    empresa_id int,
    nome varchar(45),
    email varchar(45),
	senha varchar(255),
    tipoAcesso varchar(45),
    perfilAtivo boolean,
    primary key (id),
    constraint fk_funcionario_empresa foreign key (empresa_id) references empresa(id),
    constraint chk_tipo_acesso check(tipoAcesso in ("Gerente", "Analista"))
);

create table mainframe(
	id int not null auto_increment,
    nome varchar(45),
    empresa_id int,
    status_servidor varchar(45),
    setor varchar(45),
    constraint fk_mainframe_empresa foreign key (empresa_id) references empresa(id),
    primary key (id)
);

create table componente(
	id int not null auto_increment,
    nome varchar(45),
    descricao varchar(45),
    primary key (id)
);

create table metrica(
	id int not null auto_increment,
    nome varchar(45),
    unidade_medida varchar(45),
    primary key (id)
);

create table configuracao_mainframe_componente(
	id int not null auto_increment,
    mainframe_id int,
    componente_id int,
    metrica_id int, 
    alerta_leve varchar(45),
    alerta_grave varchar(45),    
    constraint fk_config_metrica foreign key (metrica_id) references metrica(id),
    constraint fk_config_componente foreign key (componente_id) references componente(id),
    constraint fk_config_mainframe foreign key (mainframe_id) references mainframe(id),
    primary key (id)
);

create table alerta(
	id int not null auto_increment,
    dt_hora datetime,
    descricao varchar(45),
    valor_coletado varchar(45),
    status varchar(45),
    config_id int,
    constraint fk_alerta_config foreign key (config_id) references configuracao_mainframe_componente(id),
    primary key (id)
);

select * from empresa;

-- INSERTS FICTICIOS PARA TESTE DA API:

INSERT INTO empresa (nomeEmpresarial, ispb, email, nomeRepresentante, statusOperacao, statusAcesso)
VALUES 
('Banco Alpha S.A.', '12345678', 'contato@alpha.com', 'João Silva', 'Ativa', 1),
('Tech Solutions LTDA', '87654321', 'suporte@techsolutions.com', 'Maria Oliveira', 'Ativa', 2),
('Global Finance Corp', '13572468', 'finance@global.com', 'Carlos Souza', 'Inativa', 3),
('NetService Telecom', '24681357', 'atendimento@netservice.com', 'Fernanda Lima', 'Ativa', 1),
('EducaMais Instituições', '19283746', 'contato@educamais.org', 'Ricardo Santos', 'Ativa', 2),
('Construtora Ideal', '56473829', 'contato@ideal.com', 'Patrícia Gomes', 'Em análise', 3),
('LogiMax Transportes', '83746592', 'logimax@transp.com', 'Roberto Costa', 'Ativa', 1),
('SoftDev Systems', '91827364', 'contato@softdev.com', 'Beatriz Ramos', 'Ativa', 2),
('AgroVale Produtores', '37482910', 'comercial@agrovale.com', 'André Ferreira', 'Inativa', 3);

SELECT * FROM empresa where statusAcesso in (1,2,3);

-- TRIGGER MYSQL PARA CRIAR PERFIL AUTOMÁTICO
-- Mysql entende ; como final de instrução, e nao pode, já que só vai encerrar no END
DELIMITER $$ 
CREATE TRIGGER criarPerfilAoLiberarAcessoEmpresa BEFORE UPDATE
ON empresa
-- PARA CADA LINHA QUE FOR RODADA, SE EU DER 2 UPDATE ELE RODA 2 VEZES
FOR EACH ROW
BEGIN
-- if que só vai dar o insert se a ação for de aprovação
	IF NEW.statusAcesso = '3' AND OLD.statusAcesso <> '3' AND ((select count(*) from funcionario where tipoAcesso = "Gerente" and empresa_id = OLD.id) < 1) THEN
			INSERT INTO funcionario VALUES (null,NEW.id, 
					NEW.nomeRepresentante, 
					concat(replace(lower(NEW.nomeRepresentante),' ', '_'),"@gmail.com"),
					SHA2(concat(substring(NEW.nomeEmpresarial,1,1),floor(rand() * 999999),"@"), 256), 
					"Gerente", true);
	END IF;
END$$
DELIMITER ;

SHOW TRIGGERS;
drop trigger criarPerfilAoLiberarAcessoEmpresa;
select * from empresa;
select * from funcionario;
