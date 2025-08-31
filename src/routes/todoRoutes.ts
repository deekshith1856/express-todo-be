import express from 'express';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

// Route: /api/todos
router.route('/')
  .get(getAllTodos)    // GET all todos
  .post(createTodo);   // POST create new todo

// Route: /api/todos/:id
router.route('/:id')
  .get(getTodoById)    // GET todo by ID
  .put(updateTodo)     // PUT update todo
  .delete(deleteTodo); // DELETE todo

export default router;