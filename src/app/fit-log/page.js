"use client";

import { useState, useEffect } from "react";
import { Plus, X, ChevronDown, ChevronUp, Activity, Dumbbell, Grip, Shield } from "lucide-react";

const MAX_STAT = 100;

export default function AdvancedFitnessTracker() {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");
  const [stats, setStats] = useState({
    speed: 0,
    strength: 0,
    grip: 0,
    tolerance: 0,
  });
  const [expandedExercise, setExpandedExercise] = useState(null);

  const addExercise = () => {
    if (newExercise.trim() !== "") {
      setExercises([
        ...exercises,
        {
          id: Date.now(),
          name: newExercise,
          max: 0,
          impact: { speed: 25, strength: 25, grip: 25, tolerance: 25 },
        },
      ]);
      setNewExercise("");
    }
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const updateMax = (id, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, max: value } : exercise
      )
    );
  };

  const updateImpact = (id, stat, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id
          ? { 
              ...exercise, 
              impact: { 
                ...exercise.impact, 
                [stat]: value,
                ...normalizeImpact({ ...exercise.impact, [stat]: value })
              } 
            }
          : exercise
      )
    );
  };

  const normalizeImpact = (impact) => {
    const total = Object.values(impact).reduce((sum, val) => sum + val, 0);
    if (total > 100) {
      const factor = 100 / total;
      return Object.fromEntries(
        Object.entries(impact).map(([key, value]) => [key, Math.round(value * factor)])
      );
    }
    return impact;
  };

  useEffect(() => {
    const calculateStats = () => {
      let newStats = { speed: 0, strength: 0, grip: 0, tolerance: 0 };

      exercises.forEach((exercise) => {
        Object.keys(newStats).forEach((key) => {
          newStats[key] +=
            (exercise.max * exercise.impact[key]) / 100;
        });
      });

      // Normalize stats to be between 0 and MAX_STAT
      Object.keys(newStats).forEach((key) => {
        newStats[key] = Math.min(
          Math.round(newStats[key]),
          MAX_STAT
        );
      });

      setStats(newStats);
    };

    calculateStats();
  }, [exercises]);

  const getStatIcon = (stat) => {
    switch(stat) {
      case 'speed': return <Activity className="w-5 h-5 mr-2" />;
      case 'strength': return <Dumbbell className="w-5 h-5 mr-2" />;
      case 'grip': return <Grip className="w-5 h-5 mr-2" />;
      case 'tolerance': return <Shield className="w-5 h-5 mr-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Advanced Fitness Tracker</h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter exercise name"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            className="mr-4 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow text-white"
          />
          <button 
            onClick={addExercise} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition duration-300"
          >
            <Plus className="mr-2" size={20} />
            Add Exercise
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">{exercise.name}</h2>
                <div className="flex items-center">
                  <button
                    onClick={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                    className="mr-3 hover:bg-gray-700 p-1 rounded transition duration-300"
                  >
                    {expandedExercise === exercise.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <button 
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-400 hover:text-red-600 transition duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="number"
                  value={exercise.max}
                  onChange={(e) => updateMax(exercise.id, parseInt(e.target.value) || 0)}
                  className="w-24 bg-gray-700 border border-gray-600 rounded p-2 text-white"
                />
                <span>Max Reps/Weight</span>
              </div>
              {expandedExercise === exercise.id && (
                <div className="space-y-4 mt-6">
                  {Object.keys(exercise.impact).map((stat) => (
                    <div key={stat}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="capitalize flex items-center">
                          {getStatIcon(stat)}
                          {stat} Impact
                        </span>
                        <span>{exercise.impact[stat]}%</span>
                      </div>
                      <input
                        type="range"
                        value={exercise.impact[stat]}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(e) => updateImpact(exercise.id, stat, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Overall Stats</h2>
          <div className="space-y-6">
            {Object.keys(stats).map((stat) => (
              <div key={stat}>
                <div className="flex justify-between items-center mb-2">
                  <span className="capitalize flex items-center text-lg">
                    {getStatIcon(stat)}
                    {stat}
                  </span>
                  <span>{stats[stat]}/{MAX_STAT}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 rounded-full h-4 transition-all duration-500 ease-out"
                    style={{ width: `${(stats[stat] / MAX_STAT) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}