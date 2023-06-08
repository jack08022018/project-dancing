USE sakila;

CREATE SEQUENCE rental_seq
  INCREMENT 50
  MINVALUE 1
  MAXVALUE 9223372036854775806
  START 1
  CACHE 1;

drop SEQUENCE rental_seq;
select nextval(rental_seq);

SELECT * FROM rental_new WHERE rental_id IN (1,2);
delete from rental_new;

CREATE TABLE `rental_new` (
	`rental_id` INTEGER(10) NOT NULL PRIMARY KEY,
	`rental_date` DATETIME NOT NULL,
	`inventory_id` MEDIUMINT(7) UNSIGNED NOT NULL,
	`customer_id` SMALLINT(5) UNSIGNED NOT NULL,
	`return_date` DATETIME NULL DEFAULT NULL,
	`staff_id` TINYINT(3) UNSIGNED NOT NULL,
	`last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `class_info` (
	`id` INTEGER(10) NOT NULL PRIMARY KEY,
	`song_title` varchar(50) NOT NULL,
	`start_date` TIMESTAMP,
	`end_date` TIMESTAMP,
	`start_time` varchar(10),
	`end_time` varchar(10),
	`address` varchar(100),
	`status` varchar(10),
	`create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SELECT * FROM salaries WHERE emp_no = 10009 ORDER BY from_Date;
SELECT * FROM film WHERE film_id = 80;
SELECT * FROM inventory WHERE inventory_id = 364;
SELECT * FROM store WHERE store_id = 1;
SELECT * FROM inventory WHERE store_id = 1;
SELECT * FROM rental WHERE rental_id = 1;
SELECT * FROM payment WHERE rental_id = 1;

SELECT * FROM country WHERE country_id = 999;
SELECT * FROM city WHERE city_id = 888;

/*
INSERT INTO country (country_id, country, last_update)
VALUES (999, 'Wakanda', CURDATE());

INSERT INTO city (city_id, city, country_id, last_update)
VALUES (888, 'Wakanda city', 999, CURDATE());

delete from film_actor where film_id in (1013);
delete from actor where actor_id in (211);
delete from film where film_id in (1013);

delete from city where city_id in (888);
delete from country where country_id in (999);
delete from client;
*/

update actor SET last_name = 'TEMPLE' where actor_id = 200;

SELECT a.first_name, a.last_name, b.staff_id, a.version
FROM actor a
	INNER JOIN rental_new b ON 1=1
WHERE a.actor_id = 200 AND b.rental_id IN (1);

SELECT * FROM actor where actor_id = 200;
SELECT * FROM rental_new WHERE rental_id IN (1);

update actor SET last_name = 'TEMPLE' where actor_id = 200;
update actor SET version = 0 where actor_id = 200;

SELECT * FROM actor ORDER BY actor_id desc;
SELECT * FROM film ORDER BY film_id DESC;
SELECT * FROM film_actor ORDER BY film_id DESC;

ALTER TABLE actor
ADD `version` INTEGER(10)

SELECT * FROM actor where actor_id = 200;
SELECT * FROM country where country_id = 109;
SELECT * FROM city where city_id = 600;

SELECT a.city, b.first_name
FROM city a
	INNER JOIN actor b ON 1=1
WHERE a.city_id = 600 AND b.actor_id = 200;

SELECT C.title, A.rental_date
FROM rental A
	INNER JOIN inventory B ON B.inventory_id = A.inventory_id
	INNER JOIN film C ON C.film_id = B.film_id
WHERE C.title LIKE '%ACA%';

SELECT CONCAT(customer.last_name, ', ', customer.first_name) AS customer,
  address.phone, film.title
FROM rental 
	INNER JOIN customer ON rental.customer_id = customer.customer_id
   INNER JOIN address ON customer.address_id = address.address_id
   INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id
   INNER JOIN film ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL
   AND rental_date + INTERVAL film.rental_duration DAY < CURRENT_DATE()
ORDER BY title
-- LIMIT 5;