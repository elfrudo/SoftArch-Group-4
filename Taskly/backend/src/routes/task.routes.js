const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', taskController.getAll.bind(taskController));
router.get('/:id', taskController.getById.bind(taskController));
router.post('/', taskController.create.bind(taskController));
router.put('/:id', taskController.update.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));

module.exports = router;