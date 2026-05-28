const profileService = require('../services/profile.service');

class ProfileController {
  async getProfile(req, res) {
    try {
      const profile = await profileService.getProfile(req.user.id);
      res.json(profile);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const profile = await profileService.updateProfile(req.user.id, req.body);
      res.json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      await profileService.updatePassword(req.user.id, oldPassword, newPassword);
      res.json({ message: 'Password berhasil diubah' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new ProfileController();