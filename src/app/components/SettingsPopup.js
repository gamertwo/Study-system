import React, { useState } from 'react';

const SettingsPopup = ({ onClose, defaultTasks, onAddDefaultTask, onRemoveDefaultTask, categories }) => {
  const [newDefaultTask, setNewDefaultTask] = useState({
    title: '',
    category: '',
    priority: 'medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDefaultTask(newDefaultTask);
    setNewDefaultTask({ title: '', category: '', priority: 'medium' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <h3 className="text-xl font-semibold mb-2">Default Tasks</h3>
        <p className="text-sm text-gray-400 mb-4">Default tasks are automatically added to your task list every day. Use this feature to set up recurring tasks or daily habits.</p>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newDefaultTask.title}
            onChange={(e) => setNewDefaultTask({ ...newDefaultTask, title: e.target.value })}
            placeholder="Task Title"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 mb-2"
            required
          />
          <select
            value={newDefaultTask.category}
            onChange={(e) => setNewDefaultTask({ ...newDefaultTask, category: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 mb-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={newDefaultTask.priority}
            onChange={(e) => setNewDefaultTask({ ...newDefaultTask, priority: e.target.value })}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 mb-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Default Task
          </button>
        </form>
        <ul className="mb-4">
          {defaultTasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task.title}</span>
              <button
                onClick={() => onRemoveDefaultTask(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsPopup