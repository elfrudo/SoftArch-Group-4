const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

class AuthService {
  async register(name, email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error('Email sudah terdaftar');

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      verification_token: null,
    });

    return id;
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Email atau password salah');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Email atau password salah');

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}

module.exports = new AuthService();