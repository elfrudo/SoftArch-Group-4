const pool = require('../config/db');

class TaskRepository {
  async findAll(user_id) {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );
    return rows;
  }

  async findById(id, user_id) {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    return rows[0];
  }

  async create(data) {
    const { title, note, deadline, is_urgent, user_id } = data;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, note, deadline, is_urgent, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, note, deadline, is_urgent, user_id]
    );
    return result.insertId;
  }

  async update(id, data, user_id) {
    const { title, note, deadline, is_urgent, is_done } = data;
    await pool.query(
      'UPDATE tasks SET title=?, note=?, deadline=?, is_urgent=?, is_done=? WHERE id=? AND user_id=?',
      [title, note, deadline, is_urgent, is_done, id, user_id]
    );
  }

  async delete(id, user_id) {
    await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
  }
}

module.exports = new TaskRepository();