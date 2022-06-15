const pool = require('../utils/pool');

module.exports = class Dog { 
  id;
  name;
  age;
  eyes;
  fur;

  constructor(row) {
    this.id = row.dog_id;
    this.name = row.name;
    this.age = row.age;
    this.eyes = row.eyes;
    this.fur = row.fur;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT dog_id, name, age FROM dogs;');
    return rows.map((row) => new Dog(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT dogs.* 
    FROM dogs
    WHERE dogs.dog_id = $1
    GROUP BY dogs.dog_id;`, [id]);
    return rows.map((row) => new Dog(row));
  }

  static async insert({ name, age, eyes, fur }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, age, eyes, fur) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, eyes, fur]
    );
    return new Dog(rows[0]);
  }

  static async updateById(id, attrs) {
    const dog = await Dog.getById(id);
    if (!dog) return null;
    const { name, age, eyes, fur } = { ...dog, ...attrs };
    const { rows } = await pool.query(
      `UPDATE dogs 
      SET name=$2, age=$3, eyes=$4, fur=$5
      WHERE dog_id=$1 RETURNING *`,
      [id, name, age, eyes, fur]
    );
    return new Dog(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM dogs WHERE dog_id = $1 RETURNING *',
      [id]
    );
    return new Dog(rows[0]);
  }
};
