const taskService = require('../services/task.service');

class TaskController {
  async getAll(req, res) {
    try {
      const tasks = await taskService.getAllTasks(req.user.id);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.user.id);
      res.json(task);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
      res.json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await taskService.deleteTask(req.params.id, req.user.id);
      res.json({ message: 'Task berhasil dihapus' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();