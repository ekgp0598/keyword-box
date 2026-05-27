import type { Difficulty } from '@/mocks/words';
import { difficultyLabels } from '@/mocks/words';

interface DifficultySegmentedControlProps {
  value: Difficulty | 'all';
  onChange: (value: Difficulty | 'all') => void;
}

const options: (Difficulty | 'all')[] = ['easy', 'medium', 'hard', 'all'];

export default function DifficultySegmentedControl({ value, onChange }: DifficultySegmentedControlProps) {
  return (
    <div className="inline-flex bg-white rounded-game border-2 border-ink-dark shadow-solid-sm p-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`font-jua text-base md:text-lg px-4 md:px-6 py-2.5 md:py-3 rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap
            ${value === opt
              ? 'bg-ink-dark text-white shadow-none'
              : 'text-ink-medium hover:text-ink-dark'
            }`}
        >
          {difficultyLabels[opt]}
        </button>
      ))}
    </div>
  );
}