const authService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      await authService.register(name, email, password);
      res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();