import type { Difficulty } from '@/mocks/words';

export interface DifficultyCounts {
  easy: number;
  medium: number;
  hard: number;
}

interface MixedDifficultyPickerProps {
  value: DifficultyCounts;
  onChange: (counts: DifficultyCounts) => void;
  availableCounts: DifficultyCounts;
}

const DIFFICULTY_META: { key: keyof DifficultyCounts; label: string; color: string }[] = [
  { key: 'easy', label: '쉬움', color: 'bg-party-green' },
  { key: 'medium', label: '보통', color: 'bg-party-yellow' },
  { key: 'hard', label: '어려움', color: 'bg-party-red' },
];

const DEFAULT: DifficultyCounts = { easy: 3, medium: 3, hard: 4 };

export default function MixedDifficultyPicker({ value, onChange, availableCounts }: MixedDifficultyPickerProps) {
  const total = value.easy + value.medium + value.hard;
  const maxTotal = availableCounts.easy + availableCounts.medium + availableCounts.hard;

  const updateCount = (key: keyof DifficultyCounts, delta: number) => {
    const newVal = Math.max(0, Math.min(value[key] + delta, availableCounts[key]));
    onChange({ ...value, [key]: newVal });
  };

  const handleReset = () => {
    const capped: DifficultyCounts = {
      easy: Math.min(DEFAULT.easy, availableCounts.easy),
      medium: Math.min(DEFAULT.medium, availableCounts.medium),
      hard: Math.min(DEFAULT.hard, availableCounts.hard),
    };
    onChange(capped);
  };

  const handleUnlimited = () => {
    onChange({ ...availableCounts });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Per-difficulty rows */}
      <div className="w-full flex flex-col gap-2.5">
        {DIFFICULTY_META.map(({ key, label, color }) => (
          <div key={key} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-[80px]">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${color}`}></span>
              <span className="font-jua text-lg text-ink-dark whitespace-nowrap">{label}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateCount(key, -1)}
                disabled={value[key] <= 0}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                <i className="ri-subtract-line text-ink-dark"></i>
              </button>
              <div className="w-14 h-10 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark">
                <input
                  type="number"
                  value={value[key]}
                  onChange={(e) => {
                    const raw = parseInt(e.target.value, 10);
                    if (isNaN(raw)) return;
                    const clamped = Math.max(0, Math.min(raw, availableCounts[key]));
                    onChange({ ...value, [key]: clamped });
                  }}
                  min={0}
                  max={availableCounts[key]}
                  className="w-full h-full text-center font-jua text-lg bg-transparent text-ink-dark outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <button
                onClick={() => updateCount(key, 1)}
                disabled={value[key] >= availableCounts[key]}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                <i className="ri-add-line text-ink-dark"></i>
              </button>
            </div>

            <span className="font-gothic text-xs text-ink-light whitespace-nowrap w-20 text-right">
              / {availableCounts[key]}개
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center gap-3">
        <span className="font-jua text-lg text-ink-dark">총</span>
        <span className="font-jua text-2xl text-ink-dark bg-warm-bg px-4 py-1.5 rounded-game border-2 border-ink-dark">
          {total}개
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="font-jua text-sm px-4 py-2 rounded-game border-2 border-ink-dark bg-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
        >
          <i className="ri-refresh-line"></i>초기화
        </button>
        <button
          onClick={handleUnlimited}
          disabled={total >= maxTotal}
          className="font-jua text-sm px-4 py-2 rounded-game border-2 border-ink-dark bg-party-yellow shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer whitespace-nowrap flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          <i className="ri-infinity-line"></i>무제한
        </button>
      </div>
    </div>
  );
}