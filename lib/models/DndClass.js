const pool = require('../utils/pool');

module.exports = class DndClass { 
  id;
  name;
  primary_stat;
  original_edition;
  caster;

  constructor(row) {
    this.id = row.dndclass_id;
    this.name = row.name;
    this.primary_stat = row.primary_stat;
    this.original_edition = row.original_edition;
    this.caster = row.caster;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT dndClass_id, name, primary_stat FROM dndClasses;');
    return rows.map((row) => new DndClass(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(`SELECT dndClasses.* 
    FROM dndClasses
    WHERE dndClasses.dndClass_id = $1
    GROUP BY dndClasses.dndClass_id;`, [id]);
    return rows.map((row) => new DndClass(row));
  }

  static async insert({ name, primary_stat, original_edition, caster }) {
    const { rows } = await pool.query(
      'INSERT INTO dndClasses (name, primary_stat, original_edition, caster) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, primary_stat, original_edition, caster]
    );
    return new DndClass(rows[0]);
  }

  static async updateById(id, attrs) {
    const dndClass = await DndClass.getById(id);
    if (!dndClass) return null;
    const { name, primary_stat, original_edition, caster } = { ...dndClass, ...attrs };
    const { rows } = await pool.query(
      `UPDATE dndClasses 
      SET name=$2, primary_stat=$3, original_edition=$4, caster=$5
      WHERE dndClass_id=$1 RETURNING *`,
      [id, name, primary_stat, original_edition, caster]
    );
    return new DndClass(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM dndClasses WHERE dndClass_id = $1 RETURNING *',
      [id]
    );
    return new DndClass(rows[0]);
  }
};
