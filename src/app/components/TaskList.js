'use client'

import { useState, useEffect } from 'react';
import { toggleTask, deleteTask, fetchTasks } from '../utils/api';

export const TaskList = ({ tasks, setTasks, filters }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setCompletedTasks(storedCompletedTasks);
  }, []);

  const handleToggleTask = async (task) => {
    if (!task._id) {
      console.error('Task ID is missing:', task);
      return;
    }
  
    const updatedTask = await toggleTask(task._id);
    
    // After updating the task in the database, fetch fresh data
    const updatedTasks = await fetchTasks(filters);
    setTasks(updatedTasks);
  
    let newCompletedTasks;
    if (updatedTask.completed) {
      newCompletedTasks = [...completedTasks, task._id];
    } else {
      newCompletedTasks = completedTasks.filter((id) => id !== task._id);
    }
    
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  };
  

  const handleDeleteTask = async (task) => {
    await deleteTask(task.id);
    const updatedTasks = await fetchTasks(filters);
    setTasks(updatedTasks);
    const newCompletedTasks = completedTasks.filter((id) => id !== task.id);
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`bg-gray-700 p-4 rounded-lg shadow transition-all duration-300 ${
              completedTasks.includes(task.id) ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
              <input
  type="checkbox"
  checked={task.completed}
  onChange={() => handleToggleTask(task)}
  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
/>

                <div>
                  <h3 className={`text-lg font-semibold ${completedTasks.includes(task.id) ? 'line-through text-gray-400' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm ${completedTasks.includes(task.id) ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-xs">
                  <span className="text-blue-400">Category: {task.category?.name || 'Uncategorized'}</span>
                  <span className={`${getPriorityColor(task.priority)}`}>Priority: {task.priority}</span>
                    <span className="text-purple-400">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteTask(task)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
