'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSubjects, saveSubjects } from '../../utils/localStorage';

export default function SubjectPage({ params }) {
  const [subject, setSubject] = useState(null);
  const { subjectId } = params;

  useEffect(() => {
    const subjects = getSubjects();
    const currentSubject = subjects.find(s => s.id.toString() === subjectId);
    setSubject(currentSubject);
  }, [subjectId]);

  if (!subject) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{subject.name}</h1>
      <ul className="space-y-2">
        {subject.topics.map((topic) => (
          <li key={topic.id} className="p-2 border rounded">
            {topic.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
