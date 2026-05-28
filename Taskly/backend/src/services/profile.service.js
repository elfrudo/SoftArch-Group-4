const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

class ProfileService {
  async getProfile(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User tidak ditemukan');
    return { id: user.id, name: user.name, email: user.email, created_at: user.created_at };
  }

  async updateProfile(id, data) {
    if (!data.name) throw new Error('Nama wajib diisi');
    await userRepository.update(id, data);
    return await this.getProfile(id);
  }

  async updatePassword(id, oldPassword, newPassword) {
    const user = await userRepository.findById(id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error('Password lama salah');
    const hashed = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(id, hashed);
  }
}

module.exports = new ProfileService();