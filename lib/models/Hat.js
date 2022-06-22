const pool = require('../utils/pool');

module.exports = class Hat { 
  id;
  name;
  color;
  width;
  
  constructor(row) {
    this.id = row.hat_id;
    this.name = row.name;
    this.color = row.color;
    this.width = row.width;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT hat_id, name FROM hats;');
    return rows.map((row) => new Hat(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT hats.* 
    FROM hats
    WHERE hats.hat_id = $1
    GROUP BY hats.hat_id;`, [id]);
    return rows.map((row) => new Hat(row));
  }
  static async insert({ name, color, width }) {
    const { rows } = await pool.query(
      'INSERT INTO hats (name, color, width) VALUES ($1, $2, $3) RETURNING *',
      [name, color, width]
    );
    return new Hat(rows[0]);
  }
};
