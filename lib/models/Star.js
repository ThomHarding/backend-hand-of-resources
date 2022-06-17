const pool = require('../utils/pool');

module.exports = class Star { 
  id;
  name;
  type;
  distance;
  
  constructor(row) {
    this.id = row.star_id;
    this.name = row.name;
    this.type = row.type;
    this.distance = row.distance;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT star_id, name FROM stars;');
    return rows.map((row) => new Star(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT stars.* 
    FROM stars
    WHERE stars.star_id = $1
    GROUP BY stars.star_id;`, [id]);
    return rows.map((row) => new Star(row));
  }

  static async insert({ name, type, distance }) {
    const { rows } = await pool.query(
      'INSERT INTO stars (name, type, distance) VALUES ($1, $2, $3) RETURNING *',
      [name, type, distance]
    );
    return new Star(rows[0]);
  }

  static async updateById(id, attrs) {
    const star = await Star.getById(id);
    if (!star) return null;
    const { name, type, distance } = { ...star, ...attrs };
    const { rows } = await pool.query(
      `UPDATE stars 
      SET name=$2, type=$3, distance=$4
      WHERE star_id=$1 RETURNING *`,
      [id, name, type, distance]
    );
    return new Star(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM stars WHERE star_id = $1 RETURNING *',
      [id]
    );
    return new Star(rows[0]);
  }
};
