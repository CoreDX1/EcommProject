-- Tablas
create table category(
	id_category smallserial not null,
	name varchar(15) not null,
	primary key(id_category)
);

create table subcategory(
	id_sub_category smallserial not null,
	name varchar(20) not null,
	id_category int not null,
	primary key(id_sub_category),
	constraint fk_id_subcategory_category
	foreign key(id_category)
	references category(id_category)
)

CREATE TABLE usuarios(
	id_user smallserial not null,
	username varchar(20) not null,
	password varchar(20) not null,
	email varchar(255) not null,
	create_on timestamp not null,
	last_login timestamp not null,
	rol varchar(20) not null,
	primary key(id_user)
)

-- TypeProduct
create table typeproduct(
	id_type_product smallserial not null,
	name varchar(20) not null,
	id_sub_category int not null,
	primary key(id_type_product),
	constraint fk_id_typeproduct_subcategory
	foreign key(id_sub_category)
	references subcategory(id_sub_category)
)

-- Query 
insert 
	into 
	usuarios(name,email,create_on,last_login,password,rol) 
	values('christian', 'chris@gmail.com', '2022-12-12 16:33:25-07', '2022-12-12 16:33:25:25-07', '1234', 'admin');
	
-- Join Category and SubCategory

select 
	c.id_category as "id",
	c.name as "Nombre", 
	s.name as "subcategory"
	from category c
	inner join subcategory s
	on c.id_category = s.id_category;

select * from usuarios;
select * from subcategory;
select * from category;
select * from typeproduct;

-- Insert TypeProduct
insert
	into
	typeproduct(name,id_sub_category) 
	values('pantalon blaco', 1),('pantalon negro', 1);

-- Comentario

INSERT INTO home (title, price, image)
VALUES ('Buzo Canguro', 1000, 'Products/BuzoCanguro.jpg'),
       ('Buzo Entallado', 1500, 'Products/BuzoEntallado.jpg'),
       ('Buzo Friza', 2000, 'Products/BuzoFriza.jpg'),
       ('Medias', 2500, 'Products/Medias.jpg'),
       ('Medias Cortas', 2500, 'Products/MediasCortos.jpg'),
       ('Pantalones Campo', 2500, 'Products/PantalonCampo.jpg');