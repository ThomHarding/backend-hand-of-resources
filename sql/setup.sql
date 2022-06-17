-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS superheroes;
DROP TABLE IF EXISTS dndclasses;
DROP TABLE IF EXISTS stars;

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
  population INT, -- in millions
  capital VARCHAR,
  currency VARCHAR
);

CREATE TABLE superheroes (
  superhero_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  real_name VARCHAR,
  foe_name VARCHAR,
  hometown VARCHAR
);

CREATE TABLE dndclasses (
  dndClass_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  primary_stat VARCHAR,
  original_edition FLOAT,
  caster BOOLEAN
);

CREATE TABLE stars (
  star_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR,
  distance FLOAT -- in light years
);

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
  ('Howard', 9, 'red', 'brown');

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
  ('Australia', 25, 'Canberra', 'AUD');


INSERT INTO superheroes (
  name,
  real_name,
  foe_name,
  hometown
)
VALUES
  ('Skitter', 'Taylor Hebert', 'None', 'Brockton Bay'),
  ('One For All', 'Toshinori Yagi', 'All For One', 'Tokyo'),
  ('Morbius', 'Dr. Michael Morbius', 'Spider-Man', 'New York City');

INSERT INTO dndclasses (
  name,
  primary_stat,
  original_edition,
  caster
)
VALUES 
  ('Fighter', 'Strength', 1, false),
  ('Wizard', 'Intelligence', 1, true),
  ('Sorcerer', 'Charisma', 2, true),
  ('Artificer', 'Intelligence', 3.5, true),
  ('Cleric', 'Wisdom', 1, true),
  ('Warlock', 'Charisma', 4, true),
  ('Paladin', 'Charisma', 3, true),
  ('Druid', 'Wisdom', 2, true),
  ('Rogue', 'Dexterity', 1, false);
  
INSERT INTO stars (
  name,
  type,
  distance
)
VALUES
  ('Epsilon Indi A', 'Orange Dwarf', 11.8),
  ('DX Cancri', 'Red Dwarf', 11.6),
  ('The Sun', 'Yellow Dwarf', 0),
  ('PSR J0108-1431', 'Neutron Star', 424),
  ('Aldebaran', 'Red Giant', 65.3);
