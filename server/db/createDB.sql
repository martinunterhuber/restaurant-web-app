SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE DATABASE webtech21project WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE webtech21project OWNER TO postgres;

\connect webtech21project

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.tables(
    id INTEGER PRIMARY KEY,
    capacity INTEGER NOT NULL,
    description character varying(100) NOT NULL
);

ALTER TABLE public.tables OWNER TO postgres;

INSERT INTO public.tables(id, capacity, description) 
VALUES (1, 5,'Description for table 1'),
	(2, 4, 'Description for table 2'),
	(3, 5, 'Description for table 3'); 

CREATE TYPE public.roles AS ENUM('Backoffice', 'Waiter', 'Kitchen');

CREATE TABLE public.users(
    id INTEGER PRIMARY KEY,
    role public.roles[] NOT NULL,
    name character varying(50) NOT NULL UNIQUE,
    password character varying(50) NOT NULL
    
);

ALTER TABLE public.users OWNER TO postgres;

INSERT INTO public.users(id, role, name, password)
VALUES (1, '{"Kitchen"}', 'Giovanni', '123'),
	(2, '{"Waiter"}', 'Stefano', '1234'),
	(3, '{"Backoffice"}', 'Franco', '1235');

CREATE TABLE public.categories(
    id INTEGER PRIMARY KEY,
    name character varying(50) NOT NULL,
    type character varying(25) NOT NULL CHECK(type in('food','beverage','special'))
);

ALTER TABLE public.categories OWNER TO postgres;

INSERT INTO public.categories(id, name, type)
VALUES (1,'Pizza', 'food'),
	(2,'Pasta', 'food'),
	(3, 'Weekly Specials', 'special');

CREATE TYPE public.allergens AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'O', 'P', 'R');

CREATE TABLE public.menuItem(
    id INTEGER 	PRIMARY KEY,
    title character varying(50) NOT NULL,
    description character varying(1000) NOT NULL,
    price DECIMAL NOT NULL,
    allergens public.allergens[] NOT NULL,
    status character varying(50) NOT NULL
);

ALTER TABLE public.menuItem OWNER TO postgres;

INSERT INTO public.menuItem(id, title, description, price, allergens, status)
VALUES 
(1, 'Pizza Margherita', 'Everyone knows and loves it – pizza margherita is a universally praised pizza for a reason. Originating in Naples, the margherita pizza has an interesting history supposedly rooted in a visit by Queen Margherita to Naples. The iconic pizza margherita is also known for representing the colours of the Italian flag: red tomato sauce, white mozzarella, and green basil. The combination of these ingredients creates a delicious pizza which has withstood the test of time', 6.80, '{"A","B","C"}', 'available'),
(2, 'Marinara', 'Like the margherita pizza, pizza marinara also originated in Naples. This simple pizza is topped with plain marinara sauce, oregano and garlic. Essentially, it is very similar to the margherita pizza but lacks the cheese and basil. Apparently, back in the 1700s and 1800s, pizza marinara was popular with poor sailors and made on their ships as the ingredients used to make it were easily preserved.', 7.80, '{"A","B","C","D","E","F"}', 'available'),
(3, 'PIZZA PUGLIESE', 'Originating in the Italian region of Apulia, pizza pugliese is generally topped with tomato, onion and mozzarella. However, there are many different variations of the pizza pugliese with some versions using oregano, capers and olives. Some recipes call for different cheeses to be used, such as mozzarella, provolone and pecorino and some even suggest that the tomato sauce be omitted completely. <br>Basically, you can mix and match the aforementioned ingredients to suit your own tastes and create your own perfect pizza pugliese.', 7.80, '{"A","B","C","D","E","F"}', 'available'),
(4, 'PIZZA CAPRICCIOSA', 'The pizza capricciosa is one of the most iconic Italian pizzas and can be found in pretty much every pizzeria in Italy. Named for looking ‘capricious’, the abundantly rich pizza capricciosa is generally made up of ham, artichokes, mushrooms and black olives. As with many Italian pizzas, different regions and territories have taken the basic recipe and modified it to make it their own. For example, in Sicily, some prepare the pizza capricciosa with boiled eggs and, to the north, many prepare it with bits of sausage cut into rings.', 8.80, '{"A","B","C","D","E"}', 'available'),
(5, 'PIZZA PROSCIUTTO CRUDO E RUCOLA', 'Though it can obviously be enjoyed at any time of the year the prosciutto crudo e rucola pizza is a summertime favourite thanks to its fresh flavours. Made with prosciutto, rocket and your choice of cheese (some of our favourites include parmesan, mozzarella and fior di latte), pizza prosciutto crudo e rucola is a dinner party favourite for being easy to make and universally loved.', 10.80, '{"A","B","C","D","E","F","G","H"}', 'available'),
(6, 'Spaghetti Carbonara', 'Spaghetti with pancetta, pecorino, parmesan and eggs.', 9.80, '{"A","B","C","D","E","F","G"}', 'available'),
(7, 'Lasagne al Forno Classico', 'Classical lasagne with ground meet sauce', 7.80, '{"A","B","C","D","E","F"}', 'available'),
(8, 'Vesuvio al Ragù di Salsiccia', 'Vesuvio is a short pasta named for the famous volcano of the same name in Campania. The twists and turns of this short pasta make it perfect for catching the chunky bits of tomato and sausage in this Neapolitan-style ragù.', 10.80, '{"A","B","C","D","E","F"}', 'available'),
(9, 'Bucatini all Amatriciana', 'Named for the town of Amatrice, located about an hour northeast of Roma, this simple dish combines sweet and tangy tomato sauce with rich guanciale (cured pork jowl) and sharp Pecorino Romano DOP cheese, with a spicy kick from peperoncini, or dried chili flakes. The best part? The hollow bucatini make each bite extra saucy.', 10.80, '{"A","B","C","D","E"}', 'available'),
(10, 'Spaghetti alle Vongole', 'Briny clams, white wine, garlic, and peperoncino create a light yet intensely flavorful sauce in this classic Neapolitan spaghetti dish. Look for the freshest clams possible (check with our fishmongers at your local Eataly for a recommendation), and high-quality, bronze-extruded pasta – the coarse texture will help the sauce cling to each strand.', 10.80, '{"A","B","C","D","E","F","G","H"}', 'available');

CREATE TABLE public.menuInCategorie(
   menu_id INTEGER REFERENCES public.menuItem(id) ON UPDATE CASCADE ON DELETE CASCADE,
   categorie_id INTEGER REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT pkey PRIMARY KEY(menu_id, categorie_id) 
);

ALTER TABLE public.menuInCategorie OWNER TO postgres;

INSERT INTO public.menuInCategorie(menu_id, categorie_id)
VALUES (1,1),(1,2),
	(2,1),
	(3,1),
	(4,1),
	(5,1),
	(6,1), (6,3),
	(7,2),
	(8,2),
	(9,2),
	(10,2), (10,3);

