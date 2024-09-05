import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  dueDate: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high"] },
  completed: { type: Boolean, default: false },
});

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
