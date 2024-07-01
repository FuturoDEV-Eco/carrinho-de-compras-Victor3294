exercicio 2
create table clients (
	id serial primary key,
	name varchar(150) not null,
	email varchar(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
);

exercicio 3

create table categories (
	id serial primary key,
	name_category varchar(150) not null
);

insert into categories (name) 
	values 
	('Smartphones e Tablets'),
	('Computadores e Acessórios'),
	('Televisores e Sistemas de Entretenimento'),
	('Áudio e Fones de Ouvido'),
	('Fotografia e Filmagem'),
	('Eletrodomésticos'),
	('Dispositivos Vestíveis'),
	('Jogos e Consoles'),
	('Redes e Conectividade'),
	('Automação Residencial');

create table products (
	id serial primary key,
	name varchar(150) not null,
	amount varchar(150) default 0,
	color varchar(50),
	voltage integer,
	check(voltage in (110, 220)),
	description text,
	category_id int not null,
	foreign key (category_id) references categories (id)
);