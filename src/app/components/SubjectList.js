import Link from 'next/link';

export default function SubjectList({ subjects, setCurrentSubject }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Subjects</h2>
      <ul className="space-y-2">
        {subjects.map((subject) => (
          <li key={subject.id} className="flex justify-between items-center">
            <Link href={`/spaced-repetition/${subject.id}`}>
              <span className="text-blue-500 hover:underline">{subject.name}</span>
            </Link>
            <button
              onClick={() => setCurrentSubject(subject)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Review
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
