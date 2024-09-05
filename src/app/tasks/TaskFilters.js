'use client'

import { useState, useEffect } from 'react';
import { fetchCategories } from '../utils/api';
import { useRouter } from 'next/navigation';

export default function TaskFiltersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: '',
    time: '',
    date: '',
    priority: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []);

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handleApplyFilters = () => {
    router.push(`/tasks?category=${filters.category}&time=${filters.time}&date=${filters.date}&priority=${filters.priority}`);
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={filters.time}
          onChange={(e) => handleFilterChange('time', e.target.value)}
          placeholder="Time"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button 
          onClick={handleApplyFilters} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-md text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
