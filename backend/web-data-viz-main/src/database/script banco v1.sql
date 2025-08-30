create database synkro;
use synkro;
create table empresa (
id			int primary key auto_increment
);

create table funcionarios (
id			int primary key auto_increment,
nome		varchar(45),
email		varchar(45),
senha		varchar(45),
tipoAcesso	varchar(45),
banco_id	int,
foreign key(banco_id) references empresa(id)  
);

insert into funcionarios (nome, email, senha) values
("testenome","testeemail","testesenha");