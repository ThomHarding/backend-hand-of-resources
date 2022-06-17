const pool = require('../utils/pool');

module.exports = class Superhero { 
  id;
  name;
  real_name;
  foe_name;
  hometown;

  constructor(row) {
    this.id = row.superhero_id;
    this.name = row.name;
    this.real_name = row.real_name;
    this.foe_name = row.foe_name;
    this.hometown = row.hometown;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT superhero_id, name FROM superheroes;');
    return rows.map((row) => new Superhero(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT superheroes.* 
    FROM superheroes
    WHERE superheroes.superhero_id = $1
    GROUP BY superheroes.superhero_id;`, [id]);
    return rows.map((row) => new Superhero(row));
  }

  static async insert({ name, real_name, foe_name, hometown }) {
    const { rows } = await pool.query(
      'INSERT INTO superheroes (name, real_name, foe_name, hometown) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, real_name, foe_name, hometown]
    );
    return new Superhero(rows[0]);
  }

  static async updateById(id, attrs) {
    const superhero = await Superhero.getById(id);
    if (!superhero) return null;
    const { name, real_name, foe_name, hometown } = { ...superhero, ...attrs };
    const { rows } = await pool.query(
      `UPDATE superheroes 
      SET name=$2, real_name=$3, foe_name=$4, hometown=$5
      WHERE superhero_id=$1 RETURNING *`,
      [id, name, real_name, foe_name, hometown]
    );
    return new Superhero(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM superheroes WHERE superhero_id = $1 RETURNING *',
      [id]
    );
    return new Superhero(rows[0]);
  }
};
