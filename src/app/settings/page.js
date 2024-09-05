'use client'

import { useTheme } from '../context/ThemeContext';
import UserSettings from './UserSettings';

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`container mx-auto p-6 ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className="title text-center">Settings</h1>
      <div className="card">
        <h2 className="subtitle">Appearance</h2>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-yellow-300 text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
      <div className="card mt-6">
        <h2 className="subtitle">User Settings</h2>
        <UserSettings />
      </div>
    </div>
  );
}
