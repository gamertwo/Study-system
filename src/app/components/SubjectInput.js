import { useState } from 'react';

export default function SubjectInput({ onAddSubject }) {
  const [subjectName, setSubjectName] = useState('');
  const [topicCount, setTopicCount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubject = {
      name: subjectName,
      topics: Array(topicCount).fill().map((_, i) => ({
        content: `Topic ${i + 1}`,
        nextReview: new Date(),
        difficulty: 'medium',
      })),
    };
    onAddSubject(newSubject);
    setSubjectName('');
    setTopicCount(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        placeholder="Subject Name"
        className="mr-2 p-2 border rounded bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        value={topicCount}
        onChange={(e) => setTopicCount(parseInt(e.target.value))}
        min="1"
        className="mr-2 p-2 border rounded w-20 bg-gray-800 text-white"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Subject
      </button>
    </form>
  );
}
