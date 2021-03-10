DROP TABLE IF EXISTS `Items`;
DROP TABLE IF EXISTS `Item_subclasses`;
DROP TABLE IF EXISTS `Item_classes`;
DROP TABLE IF EXISTS `Pets`;
DROP TABLE IF EXISTS `Classes`;
DROP TABLE IF EXISTS `Races`;
DROP TABLE IF EXISTS `Professions`;
DROP TABLE IF EXISTS `Titles`;

create table Item_classes
(id int not null auto_increment,
name varchar(45) not null,
constraint pk_Item_classes primary key(id))
ENGINE=INNODB;

create table Item_subclasses
(id int not null auto_increment,
name varchar(45) not null,
item_class int not null,
constraint pk_Item_subclasses primary key(id),
constraint fk_Item_subclasses foreign key(item_class) references Item_classes(id) 
ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE=INNODB;

create table Items
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
constraint pk_Items primary key(id),
constraint fk1_Items foreign key(item_class) references Item_classes(id) 
ON DELETE CASCADE ON UPDATE CASCADE,
constraint fk2_Items foreign key(item_subclass) references Item_subclasses(id) 
ON DELETE CASCADE ON UPDATE CASCADE)
ENGINE=INNODB;

create table Pets
(id int not null auto_increment,
name varchar(45) not null,
description text not null,
is_capturable bit(1) not null,
is_tradable bit(1) not null,
is_battlepet bit(1) not null,
is_alliance_only bit(1) not null,
is_horde_only bit(1) not null,
is_tameable bit(1) not null,
display varchar(250) not null,
icon varchar(250) not null,
constraint pk_Pets primary key(id))
ENGINE=INNODB;

create table Classes
(id int not null auto_increment,
name varchar(45) not null,
female_name varchar(45) not null,
male_name varchar(45) not null,
media varchar(250) not null,
constraint pk_Classes primary key(id))
ENGINE=INNODB;

create table Races
(id int not null auto_increment,
name varchar(45) not null,
female_name varchar(45) not null,
male_name varchar(45) not null,
constraint pk_Races primary key(id))
ENGINE=INNODB;

create table Professions
(id int not null auto_increment,
name varchar(45) not null,
description text not null,
media varchar(250) not null,
constraint pk_Professions primary key(id))
ENGINE=INNODB;

create table Titles
(id int not null auto_increment,
name varchar(45) not null,
female_name varchar(45) not null,
male_name varchar(45) not null,
constraint pk_Titles primary key(id))
ENGINE=INNODB;