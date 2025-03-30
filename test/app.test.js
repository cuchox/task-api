const request = require('supertest');
const app = require('../app');

describe('API de Tareas', () => {
  // Variable para almacenar datos de prueba
  let testTask;

  beforeAll(() => {
    // Datos de prueba iniciales
    testTask = { id: 1, title: '🔂 Tarea de prueba', completed: false };
  });

  describe('GET /tasks', () => {
    it('debería retornar todas las tareas', async () => {
      const response = await request(app).get('/tasks');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /tasks/:id', () => {
    it('debería retornar una tarea específica cuando existe', async () => {
      const response = await request(app).get('/tasks/1');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('completed');
    });

    it('debería retornar 404 cuando la tarea no existe', async () => {
      const response = await request(app).get('/tasks/999');
      
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('⛔ Tarea no encontrada');
    });
  });

  describe('POST /tasks', () => {
    it('debería crear una nueva tarea', async () => {
      const newTask = { title: 'Nueva tarea', completed: false };
      const response = await request(app)
        .post('/tasks')
        .send(newTask);
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newTask.title);
    });

    it('debería retornar 400 si falta el título', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ completed: false });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('debería actualizar una tarea existente', async () => {
      const updatedData = { title: 'T✅ area actualizada', completed: true };
      const response = await request(app)
        .put('/tasks/1')
        .send(updatedData);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.completed).toBe(updatedData.completed);
    });

    it('debería retornar 404 si la tarea no existe', async () => {
      const response = await request(app)
        .put('/tasks/999')
        .send({ title: '⛔ No existo', completed: true });
      
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('debería eliminar una tarea existente', async () => {
      const response = await request(app).delete('/tasks/1');
      
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('🚮 Tarea eliminada');
    });

    it('debería retornar 404 si la tarea no existe', async () => {
      const response = await request(app).delete('/tasks/999');
      
      expect(response.statusCode).toBe(404);
    });
  });
});