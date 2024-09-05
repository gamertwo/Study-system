'use client'

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function UserSettings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user settings to the server or local storage
    console.log('Saving user settings:', { username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Settings
      </button>
    </form>
  );
}
