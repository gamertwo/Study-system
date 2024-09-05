import { useState } from 'react';
import { updateSubject } from '../utils/db';

export default function FlashcardInterface({ subject, subjects, setSubjects }) {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentTopic = subject.topics[currentTopicIndex];

  const handleDifficultySelection = async (difficulty) => {
    const updatedTopics = subject.topics.map((t, index) => {
      if (index === currentTopicIndex) {
        return {
          ...t,
          difficulty,
          nextReview: calculateNextReview(difficulty),
        };
      }
      return t;
    });

    const updatedSubject = await updateSubject(subject._id, { topics: updatedTopics });
    
    setSubjects(subjects.map(s => s._id === updatedSubject._id ? updatedSubject : s));
    setShowAnswer(false);
    setCurrentTopicIndex((prevIndex) => (prevIndex + 1) % subject.topics.length);
  };

  const calculateNextReview = (difficulty) => {
    const now = new Date();
    switch (difficulty) {
      case 'easy': return new Date(now.setDate(now.getDate() + 7));
      case 'medium': return new Date(now.setDate(now.getDate() + 3));
      case 'hard': return new Date(now.setDate(now.getDate() + 1));
      default: return now;
    }
  };

  return (
    <div className="mt-8 p-4 border rounded bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">{subject.name}</h2>
      <div className="mb-4">
        <p className="text-lg">{currentTopic.content}</p>
        {showAnswer && (
          <p className="mt-2 text-gray-400">Answer placeholder</p>
        )}
      </div>
      <div className="space-x-2">
        <button onClick={() => setShowAnswer(!showAnswer)} className="bg-blue-500 text-white px-4 py-2 rounded">
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <button onClick={() => handleDifficultySelection('easy')} className="bg-green-500 text-white px-4 py-2 rounded">
          Easy
        </button>
        <button onClick={() => handleDifficultySelection('medium')} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Medium
        </button>
        <button onClick={() => handleDifficultySelection('hard')} className="bg-red-500 text-white px-4 py-2 rounded">
          Hard
        </button>
      </div>
    </div>
  );
}
