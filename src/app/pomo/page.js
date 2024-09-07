'use client'
import React, { useState, useEffect } from 'react';
import { TaskList } from '../components/TaskList';
import { fetchTasks } from '../utils/api';
import { Settings, PlayCircle, PauseCircle, StopCircle, SkipForward, Moon, Sun } from 'lucide-react';
import Navbar from '../components/Navbar';

const PomodoroPage = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [totalHours, setTotalHours] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && time > 0) {
        setTime(time - 1);
        if (isWork) {
          setTotalHours(prev => prev + 1/3600);
        }
      } else if (isActive && time === 0) {
        setIsWork(!isWork);
        setTime(isWork ? breakTime * 60 : workTime * 60);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, time, isWork, workTime, breakTime]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks({});
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(workTime * 60);
    setIsWork(true);
  };
  const skipTimer = () => {
    setIsWork(!isWork);
    setTime(isWork ? breakTime * 60 : workTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const SettingsPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="mb-4">
          <label className="block mb-2">Work Time (minutes)</label>
          <input type="number" value={workTime} onChange={(e) => setWorkTime(Number(e.target.value))} 
                 className="w-full p-2 rounded bg-gray-700 text-white" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Break Time (minutes)</label>
          <input type="number" value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))} 
                 className="w-full p-2 rounded bg-gray-700 text-white" />
        </div>
        <button onClick={() => setShowSettings(false)} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white-400">Pomodoro Timer</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-8xl font-bold mb-4 text-white-400">{formatTime(time)}</div>
            <p className="text-xl mb-4">{isWork ? 'Work Time' : 'Break Time'}</p>
            <div className="flex justify-center space-x-4">
              <button onClick={toggleTimer} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300 flex items-center">
                {isActive ? <PauseCircle size={24} className="mr-2" /> : <PlayCircle size={24} className="mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button onClick={resetTimer} 
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition duration-300 flex items-center">
                <StopCircle size={24} className="mr-2" />
                Stop
              </button>
              <button onClick={skipTimer} 
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition duration-300 flex items-center">
                <SkipForward size={24} className="mr-2" />
                Skip
              </button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl mb-4">Total Focus Time: {totalHours.toFixed(2)} hours</p>
            <button onClick={() => setShowSettings(true)} 
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition duration-300 flex items-center mx-auto">
              <Settings size={24} className="mr-2" />
              Settings
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Tasks</h2>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
      {showSettings && <SettingsPopup />}
    </div>
  );
};

export default PomodoroPage;