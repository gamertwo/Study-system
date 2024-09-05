'use client'

import { useState } from 'react';

export const TaskForm = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, category, dueDate, priority };
    await onAddTask(newTask);
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          rows={3}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-2">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300">
        Add Task
      </button>
    </form>
  );
};
