const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

module.exports = app;