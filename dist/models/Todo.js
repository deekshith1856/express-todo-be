import mongoose, { Document, Schema } from 'mongoose';
// Create the Todo schema
const TodoSchema = new Schema({
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
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});
// Create and export the Todo model
export default mongoose.model('Todo', TodoSchema);
//# sourceMappingURL=Todo.js.map