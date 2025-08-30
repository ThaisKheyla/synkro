create database if not exists synkro;
use synkro;

create table empresa(
	id int not null auto_increment,
    nomeEmpresarial varchar(45),
    ispb varchar(8),
    email varchar(45),
    nomeRepresentante varchar(45),
    statusOperacao varchar(45),
    
    primary key(id)
);

create table funcionario(
	id int not null auto_increment,
    empresa_id int,
    nome varchar(45),
    email varchar(45),
	senha varchar(45),
    tipoAcesso varchar(45),
    
    primary key (id),
    constraint fk_funcionario_empresa foreign key (empresa_id) references empresa(id)
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



