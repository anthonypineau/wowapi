DROP TABLE IF EXISTS `Item_class`;
DROP TABLE IF EXISTS `Item_subclass`;
DROP TABLE IF EXISTS `Item`;
DROP TABLE IF EXISTS `Pet`;
DROP TABLE IF EXISTS `Class`;
DROP TABLE IF EXISTS `Race`;
DROP TABLE IF EXISTS `Profession`;
DROP TABLE IF EXISTS `Title`;

create table Item_class
(id int not null auto_increment,
name varchar(45) not null,
constraint pk_Item_class primary key(id))
ENGINE=INNODB;

create table Item_subclass
(id int not null auto_increment,
name varchar(45) not null,
item_class int not null,
constraint pk_Item_subclass primary key(id),
constraint fk_Item_subclass foreign key(item_class) references Item_class(id) 
ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE=INNODB;

create table Item
(id int not null auto_increment, 
name varchar(45) not null,
level int not null,
required_level int not null,
purchase_price int not null,
is_equippable bit(1) not null,
is_stackable bit(1) not null,
media varchar(250),
item_class int not null,
item_subclass int not null,
constraint pk_Item primary key(id),
constraint fk1_Item foreign key(item_class) references Item_class(id) 
ON DELETE CASCADE ON UPDATE CASCADE,
constraint fk2_Item foreign key(item_subclass) references Item_subclass(id) 
ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE=INNODB;

create table Pet
(id int not null auto_increment,
name varchar(45) not null,
description text not null,
is_capturable bit(1) not null,
is_tradable bit(1) not null,
is_battlepet bit(1) not null,
is_alliance_only bit(1) not null,
is_horde_only bit(1) not null,
is_tameable bit(1) not null,
media varchar(250) not null,
constraint pk_Pet primary key(id))
ENGINE=INNODB;

create table Class
(id int not null auto_increment,
name varchar(45) not null,
female_name varchar(45) not null,
male_name varchar(45) not null,
media varchar(250) not null,
constraint pk_Class primary key(id))
ENGINE=INNODB;

create table Race
(id int not null auto_increment,
name varchar(45) not null,

female_name varchar(45) not null,
male_name varchar(45) not null,
media varchar(250) not null,
constraint pk_Race primary key(id))
ENGINE=INNODB;

create table Profession
(id int not null auto_increment,
name varchar(45) not null,
description text not null,
type varchar(45) not null,
media varchar(250) not null,
constraint pk_Profession primary key(id))
ENGINE=INNODB;

create table Title
(id int not null auto_increment,
name varchar(45) not null,
female_name varchar(45) not null,
male_name varchar(45) not null,
constraint pk_Title primary key(id))
ENGINE=INNODB;