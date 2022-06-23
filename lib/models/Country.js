const pool = require('../utils/pool');

module.exports = class Country { 
  id;
  name;
  population;
  capital;
  currency;

  constructor(row) {
    this.id = row.country_id;
    this.name = row.name;
    this.population = row.population;
    this.capital = row.capital;
    this.currency = row.currency;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT country_id, name, capital FROM countries;');
    return rows.map((row) => new Country(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT countries.* 
    FROM countries
    WHERE countries.country_id = $1
    GROUP BY countries.country_id;`, [id]);
    return rows.map((row) => new Country(row));
  }

  static async insert({ name, population, capital, currency }) {
    const { rows } = await pool.query(
      'INSERT INTO countries (name, population, capital, currency) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, population, capital, currency]
    );
    return new Country(rows[0]);
  }

  static async updateById(id, attrs) {
    const country = await Country.getById(id);
    if (!country) return null;
    const { name, population, capital, currency } = { ...country, ...attrs };
    const { rows } = await pool.query(
      `UPDATE countries 
      SET name=$2, population=$3, capital=$4, currency=$5
      WHERE country_id=$1 RETURNING *`,
      [id, name, population, capital, currency]
    );
    return new Country(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM countries WHERE country_id = $1 RETURNING *',
      [id]
    );
    return new Country(rows[0]);
  }
};
