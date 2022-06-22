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
};
