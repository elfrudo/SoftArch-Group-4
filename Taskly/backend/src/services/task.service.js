const taskRepository = require('../repositories/task.repository');

class TaskService {
  async getAllTasks(user_id) {
    return await taskRepository.findAll(user_id);
  }

  async getTaskById(id, user_id) {
    const task = await taskRepository.findById(id, user_id);
    if (!task) throw new Error('Task tidak ditemukan');
    return task;
  }

  async createTask(data, user_id) {
    if (!data.title) throw new Error('Judul task wajib diisi');
    const id = await taskRepository.create({ ...data, user_id });
    return await taskRepository.findById(id, user_id);
  }

  async updateTask(id, data, user_id) {
    await this.getTaskById(id, user_id);
    await taskRepository.update(id, data, user_id);
    return await taskRepository.findById(id, user_id);
  }

  async deleteTask(id, user_id) {
    await this.getTaskById(id, user_id);
    await taskRepository.delete(id, user_id);
  }
}

module.exports = new TaskService();