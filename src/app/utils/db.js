import mongoose from 'mongoose';
import dbConnect from './dbConnect';

let Task, Category, Subject;

const initializeModels = () => {
  if (!mongoose.models.Task) {
    const TaskSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String },
      category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      dueDate: { type: Date },
      priority: { type: String, enum: ["low", "medium", "high"] },
      completed: { type: Boolean, default: false },
    });
    Task = mongoose.model("Task", TaskSchema);
  } else {
    Task = mongoose.model('Task');
  }

  if (!mongoose.models.Category) {
    const CategorySchema = new mongoose.Schema({
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
    });
    Category = mongoose.model("Category", CategorySchema);
  } else {
    Category = mongoose.model('Category');
  }

  if (!mongoose.models.Subject) {
    const SubjectSchema = new mongoose.Schema({
      name: { type: String, required: true },
      topics: [{
        content: String,
        nextReview: Date,
        difficulty: String,
      }],
    });
    Subject = mongoose.model("Subject", SubjectSchema);
  } else {
    Subject = mongoose.model('Subject');
  }
};

if (typeof window === 'undefined') {
  initializeModels();
}

export const connectToDB = dbConnect;

export { Task, Category, Subject };

export const fetchTasks = async (filterOptions) => {
  await dbConnect();
  initializeModels();
  const { category, time, date, priority } = filterOptions;
  let query = {};

  if (category) query.category = category;
  if (time) query.dueDate = { $gte: new Date(time) };
  if (date) query.dueDate = { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 86400000) };
  if (priority) query.priority = priority;

  return await Task.find(query).populate("category");
};

export const fetchCategories = async () => {
  await dbConnect();
  initializeModels();
  return await Category.find({});
};

export const createCategory = async (categoryName) => {
  await dbConnect();
  initializeModels();
  const id = new mongoose.Types.ObjectId().toString();
  const newCategory = new Category({ id, name: categoryName });
  await newCategory.save();
  return newCategory;
};

export async function deleteCategory(categoryId) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });
  const updatedCategories = await response.json();
  return updatedCategories;
}



export const fetchSubjects = async () => {
  await dbConnect();
  initializeModels();
  return await Subject.find({});
};

export const createSubject = async (subjectData) => {
  await dbConnect();
  initializeModels();
  const newSubject = new Subject(subjectData);
  await newSubject.save();
  return newSubject;
};

export const updateSubject = async (subjectId, updatedData) => {
  await dbConnect();
  initializeModels();
  return await Subject.findByIdAndUpdate(subjectId, updatedData, { new: true });
};
