'use client'

import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, fetchCategories, addTask, toggleTask, deleteTask, addCategory, deleteCategory } from '../utils/api';
import { PieChart } from '../components/PieChart';
import { LineChart } from '../components/LineChart';
import CategoryRadarChart from '../components/RadarChart';
import PriorityBarChart from '../components/BarChart';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import TaskFilters from './TaskFilters';
import Navbar from '../components/Navbar';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    time: '',
    date: '',
    priority: '',
  });
  const [categoryStats, setCategoryStats] = useState([]);
  const [completedTasksLast7Days, setCompletedTasksLast7Days] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);

  const calculateChartData = useCallback(() => {
    const tasksByCategory = tasks.reduce((acc, task) => {
      const categoryName = task.category?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = { total: 0, completed: 0 };
      }
      acc[categoryName].total++;
      if (task.completed) {
        acc[categoryName].completed++;
      }
      return acc;
    }, {});
  
    return Object.entries(tasksByCategory).map(([name, { total, completed }]) => ({
      name,
      value: completed,
      total
    }));
  }, [tasks]);
  

  const calculateCompletedTasksLast7Days = useCallback(() => {
    return [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      return {
        date: formattedDate,
        completedTasks: tasks.filter(task =>
          task.completed &&
          task.completedAt &&
          new Date(task.completedAt).toISOString().split('T')[0] === formattedDate
        ).length
      };
    }).reverse();
  }, [tasks]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await fetchTasks(filters);
      setTasks(fetchedTasks);
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, [filters]);

  useEffect(() => {
    const newCategoryStats = calculateChartData();
    setCategoryStats(newCategoryStats);
    const newCompletedTasksLast7Days = calculateCompletedTasksLast7Days();
    setCompletedTasksLast7Days(newCompletedTasksLast7Days);
  }, [tasks, calculateChartData, calculateCompletedTasksLast7Days]);

  useEffect(() => {
    const addDefaultTasks = async () => {
      const today = new Date().toISOString().split('T')[0];
      for (const defaultTask of defaultTasks) {
        if (defaultTask.lastAdded !== today) {
          await handleAddTask({
            ...defaultTask,
            dueDate: today,
          });
          defaultTask.lastAdded = today;
        }
      }
    };
    addDefaultTasks();
  }, [defaultTasks]);

  const handleAddTask = useCallback(async (task) => {
    const newTask = await addTask(task);
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);
  

  const handleAddCategory = async () => {
    if (newCategoryName.trim() !== '') {
      const newCategory = await addCategory({ name: newCategoryName });
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    setCategories(categories.filter(category => category._id !== categoryId));
  };

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const CategoryList = () => (
    <ul className="mt-4 space-y-2">
      {categories.map((category) => (
        <li key={category._id} className="text-gray-300 flex justify-between items-center">
          <span>{category.name}</span>
          <button onClick={() => handleDeleteCategory(category._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg transition duration-300">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Navbar/>
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-400 tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Task Manager</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500 pb-2 inline-block">Create Task</h2>
          <TaskForm onAddTask={handleAddTask} categories={categories} />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500 pb-2 inline-block">Create Category</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category Name"
              className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleAddCategory} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Add Category
            </button>
          </div>
          <CategoryList />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-4xl font-bold mb-8 text-blue-300 border-b-2 border-blue-500 pb-2 inline-block">Task List</h2>
        <TaskFilters filterOptions={filters} onFilterChange={handleFilterChange} categories={categories} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>

      <div className="mt-12">
        <h2 className="text-4xl font-bold mb-8 text-blue-300 border-b-2 border-blue-500 pb-2 inline-block">Task Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-200 border-b border-blue-400 pb-2">Completed Tasks by Category</h3>
            <PieChart data={categoryStats} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-200 border-b border-blue-400 pb-2">Tasks Completed in Last 7 Days</h3>
            <LineChart data={completedTasksLast7Days} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-200 border-b border-blue-400 pb-2">Category Completion Rates</h3>
            <CategoryRadarChart tasks={tasks} categories={categories} />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-blue-200 border-b border-blue-400 pb-2">Tasks by Priority</h3>
            <PriorityBarChart tasks={tasks} />
          </div>
        </div>
      </div>
    </div></div>
  );
}
