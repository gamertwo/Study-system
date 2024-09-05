'use client'

import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-4">Task Manager</Link>
          <Link href="/tasks" className="text-lg hover:text-gray-500">Tasks</Link>
          <Link href="/settings" className="text-lg hover:text-gray-500 ml-4">Settings</Link>
        </div>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-yellow-300 text-gray-800' : 'bg-gray-800 text-white'}`}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
