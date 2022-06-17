-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS superheroes;

CREATE TABLE dogs (
  dog_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT,
  eyes VARCHAR,
  fur VARCHAR
);

CREATE TABLE countries (
  country_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  population INT,
  capital VARCHAR,
  currency VARCHAR
);

CREATE TABLE superheroes (
  superhero_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  real_name VARCHAR,
  foe_name VARCHAR,
  hometown VARCHAR
)
INSERT INTO dogs (
  name,
  age,
  eyes,
  fur
)
VALUES 
  ('Soup', 3, 'blue', 'tan'),
  ('Cricket', 16, 'black', 'brown'),
  ('Bear', 8, 'brown', 'black'),
  ('Pasta', 1, 'yellow', 'gold'),
  ('Howard', 9, 'red', 'brown')
  ;

INSERT INTO countries (
  name,
  population,
  capital,
  currency
)
VALUES
  ('Brazil', 216, 'Brasília', 'BRL'),
  ('Canada', 38, 'Ottawa', 'CAD'),
  ('Lithuania', 2, 'Vilnius', 'EUR'),
  ('Australia', 25, 'Canberra', 'AUD')

  

INSERT INTO superheroes (
  name,
  real_name,
  foe_name,
  hometown
)
VALUES
  ('Skitter', 'Taylor Hebert', 'None', 'Brockton Bay')
  ('One For All', 'Toshinori Yagi', 'All For One', 'Tokyo')
  ('Morbius', 'Dr. Michael Morbius', 'Spider-Man', 'New York City')
