import {type Request,type Response } from 'express';
import Todo from '../models/Todo.js';

// Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    
    const todo = new Todo({
      title,
      description,
      completed: completed || false
    });
    
    const savedTodo = await todo.save();
    
    res.status(201).json({
      success: true,
      data: savedTodo
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all todos
export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single todo by ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};