'use client'

import { useState, useEffect } from 'react';
import { fetchCategories, addCategory, deleteCategory } from '../../utils/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = await addCategory({ name: newCategory });
      setCategories(updatedCategories);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = async (category) => {
    const updatedCategories = await deleteCategory(category);
    setCategories(updatedCategories);
  };

  return (
    <div className="bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="newCategory" className="label">
            New Category
          </label>
          <div className="flex">
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="input flex-grow"
            />
            <button onClick={handleAddCategory} className="btn btn-primary ml-4">
              Add
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="bg-gray-700 p-4 rounded flex justify-between items-center"
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
