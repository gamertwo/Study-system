'use client'

import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 Task Manager. All rights reserved.</p>
        <div>
          <a href="#" className="mr-4 hover:text-gray-500">About</a>
          <a href="#" className="mr-4 hover:text-gray-500">Contact</a>
          <a href="#" className="hover:text-gray-500">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
