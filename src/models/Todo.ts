import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for a Todo document
export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Todo schema
const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Todo model
export default mongoose.model<ITodo>('Todo', TodoSchema);