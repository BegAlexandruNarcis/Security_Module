CREATE SCHEMA NOKIA


CREATE TABLE [NOKIA].[CUSTOMER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Users_ID] [int] NOT NULL,
	[Nume] [varchar] (50) NOT NULL,
	[Prenume] [varchar] (50) NOT NULL,
	[Telefon] [varchar] (11) NOT NULL,
	[Oras] [varchar] (30),
	[Tara] [varchar] (30)
	
)

CREATE TABLE [NOKIA].[ROLES](
	[ID] [int] Identity(1,1) NOT NULL,
	[RoleName] [varchar] (75) NOT NULL
)

CREATE TABLE [NOKIA].[PRODUCTS](
	[ID] [int] Identity(1,1) NOT NULL,
	[Supplier_ID] [int] NOT NULL,
	[Category_ID] [int] NOT NULL,
	[Title] [varchar] (50) NOT NULL,
	[PriceSold] [decimal] (10) NOT NULL,
	[PriceBought] [decimal] (10) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Picture] [int] NOT NULL
)

CREATE TABLE [NOKIA].[SUPPLIER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar] (80) NOT NULL,
	[ContactName] [varchar] (80) NOT NULL,
	[Adresa] [varchar] (80) NOT NULL,
	[Oras] [varchar] (80) NOT NULL,
	[Judet] [varchar] (80) NOT NULL,
	[CodPostal] [int] Not NULL,
	[Tara] [varchar] (30) NOT NULL,
	[NumarTelefon] [varchar] (11) NOT NULL,
	[Fax] [varchar] (30) NOT NULL,
	[Notite] [varchar] (255) NOT NULL,
)

CREATE TABLE [NOKIA].[CARTITEMS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Products_ID] [int] NOT NULL,
	[Users_ID] [int] NOT NULL,
	[Total] [decimal] (10) NOT NULL
)


CREATE TABLE [NOKIA].[ORDER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerName] [varchar] (30) NOT NULL,
	[Email] [varchar] (40) NOT NULL,
	[OrderNumber] [int] NOT NULL,
	[OrderDate] [varchar] (11) NOT NULL,
	[Oras] [varchar] (40) NOT NULL,
	[Judet] [varchar] (30) NOT NULL,
	[Strada] [varchar] (40) NOT NULL,
	[Numar] [varchar] (4) NOT NULL,
	[Bloc] [varchar] (3) NOT NULL,
	[Scara] [varchar] (3) NOT NULL,
	[CodPostal] [int]  NOT NULL,
	[Total] [int] NOT NULL
)

CREATE TABLE [NOKIA].[CURIERAT](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NumeCompanie] [varchar] (50) NOT NULL,
	[Telefon] [varchar] (11) NOT NULL,
	[URL_C] [varchar] (90) NOT NULL
)


CREATE TABLE [NOKIA].[USERS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Roles] [int]NOT NULL,
	[Email] [varchar](70) NOT NULL,
	[Passwd] [varchar](60) NOT NULL
)

CREATE TABLE [PAYMENT](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Type_P] [varchar] (5) NOT NULL,
	[Allowed] [varchar] (4) NOT NULL
)

CREATE TABLE [NOKIA].[ACCOUNTANT](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Item_ID] [int] NOT NULL,
	[ItemName] [varchar] (40) NOT NULL,
	[BuyPrice] [varchar](5) NOT NULL,
	[SellPrice] [varchar](5) NOT NULL,
	[Qty] [varchar](5) NOT NULL,
	[ShippingCost] [int] NOT NULL,
	[PackingFees] [int] NOT NULL,
	[Taxes] [int] NOT NULL
)

GO


INSERT INTO [NOKIA].[ROLES]
		(
		Rolename)
		Values
		(
		'Client')


INSERT INTO [NOKIA].[ROLES]
		(
		Rolename)
		Values
		(
		'Contabil')

INSERT INTO [NOKIA].[ROLES]
		(
		Rolename)
		Values
		(
		'Administrator')

INSERT INTO [NOKIA].[ROLES]
		(
		Rolename)
		Values
		(
		'Operator comenzi')

INSERT INTO [NOKIA].[PRODUCTS]
		(Supplier_ID,
		Category_ID,
		Title,
		PriceSold,
		PriceBought,
		Quantity,
		Picture)
		Values
		(1,
		1,
		'Gem de Prune',
		2.43,
		3.05,
		20,
		1
)

INSERT INTO [NOKIA].[SUPPLIER]
		(CompanyName,
		ContactName,
		Adresa,
		Oras,
		Judet,
		CodPostal,
		Tara,
		NumarTelefon,
		Fax,
		Notite)
		Values
		('Impex Budapesta SRL',
		'Andrei Grigore',
		'Str. Mesteacanului nr.211',
		'Timisoara',
		'Timis',
		325700,
		'Romania',
		'0738271928',
		'212111522',
		'Preia comanda din partea dreapta a magazinului'
		)


INSERT INTO [NOKIA].[CARTITEMS]
		(Products_ID,
		Users_ID,
		Total)
		Values
		(2,
		2,
		24.4
		)


INSERT INTO [NOKIA].[ORDER]
	(Customer_ID,
	Cartitems_ID,
	Curierat_ID,
	OrderNumber,
	OrderDate,
	Taxe,
	Adresa,
	Oras,
	Judet,
	CodPostal,
	Tara,
	Bloc,
	Scara)
	Values(
	1,
	1,
	1,
	23,
	'22/12/2022',
	'9%',
	'Str Lascar Catargiu',
	'Timisoara',
	'Timis',
	300311,
	'Romania',
	'15',
	'A')


INSERT INTO [NOKIA].[CURIERAT]
	(NumeCompanie,
	Telefon,
	URL_C)
	Values
	(
	'Fan Courier',
	'0372819992',
	'bit.ly/..')




select * from [NOKIA].[CARTITEMS]
select * from [NOKIA].[CUSTOMER]
select * from [NOKIA].[PRODUCTS]
select * from [NOKIA].[ROLES]
select * from [NOKIA].[SUPPLIER]
select * from [NOKIA].[USERS]
select * from [NOKIA].[ORDER]
select * from [NOKIA].[CURIERAT]
select * from [NOKIA].[ACCOUNTANT]

TRUNCATE TABLE [NOKIA].[USERS]
TRUNCATE TABLE [NOKIA].[CUSTOMER]

update [nokia].users
set roles=3
where email='gabriel.pop@gmail.com'


DROP TABLE [NOKIA].[CUSTOMER]
DROP TABLE [NOKIA].[PRODUCTS]
DROP TABLE [NOKIA].[ROLES]
DROP TABLE [NOKIA].[SUPPLIER]
DROP TABLE [NOKIA].[USERS]
DROP TABLE [NOKIA].[ORDER]
DROP TABLE [NOKIA].[CURIERAT]
DROP TABLE [NOKIA].[CARTITEMS]



DROP SCHEMA [NOKIA]