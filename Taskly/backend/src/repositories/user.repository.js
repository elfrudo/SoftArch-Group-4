const pool = require('../config/db');

class UserRepository {
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async findByToken(token) {
    const [rows] = await pool.query('SELECT * FROM users WHERE verification_token = ?', [token]);
    return rows[0];
  }

  async create(data) {
    const { name, email, password, verification_token } = data;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, verification_token) VALUES (?, ?, ?, ?)',
      [name, email, password, verification_token]
    );
    return result.insertId;
  }

  async verify(id) {
    await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?',
      [id]
    );
  }

  async update(id, data) {
  const { name } = data;
  await pool.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id]
  );
}

  async updatePassword(id, password) {
  await pool.query(
    'UPDATE users SET password = ? WHERE id = ?',
    [password, id]
  );
}
}

module.exports = new UserRepository();