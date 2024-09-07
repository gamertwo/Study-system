import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this task.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: false,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please specify a category for this task.'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please specify a due date for this task.'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

export const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

// You can also include the Category model in the same file
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this category.'],
    maxlength: [30, 'Name cannot be more than 30 characters'],
  },
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
