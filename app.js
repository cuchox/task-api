const express = require('express');
const app = express();
const PORT = 3000;

let tasks = [
  { id: 1, title: 'Tarea 1', completed: false },
  { id: 2, title: 'Tarea 2', completed: true }
];

app.use(express.json());

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('⛔ Tarea no encontrada');
  res.json(task);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('🛑 El título es requerido');
  }

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('⛔ Tarea no encontrada');

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('⛔ Tarea no encontrada');

  tasks.splice(taskIndex, 1);
  res.send('🚮 Tarea eliminada');
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ API escuchando en http://localhost:${PORT}`);
  });
}