type TimeMode = 'timer' | 'stopwatch';

interface TimeModeSelectProps {
  value: TimeMode;
  onChange: (value: TimeMode) => void;
  timerSeconds: number;
  onTimerSecondsChange: (seconds: number) => void;
}

const TIMER_PRESETS = [15, 30, 60, 120, 180, 300];

export default function TimeModeSelect({ value, onChange, timerSeconds, onTimerSecondsChange }: TimeModeSelectProps) {
  const handleIncrement = () => {
    onTimerSecondsChange(Math.min(timerSeconds + 5, 600));
  };

  const handleDecrement = () => {
    onTimerSecondsChange(Math.max(timerSeconds - 5, 5));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (isNaN(raw)) return;
    onTimerSecondsChange(Math.max(5, Math.min(600, raw)));
  };

  const formatTime = (seconds: number) => {
    if (seconds >= 60) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return s > 0 ? `${m}분 ${s}초` : `${m}분`;
    }
    return `${seconds}초`;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="inline-flex bg-white rounded-game border-2 border-ink-dark shadow-solid-sm p-1.5">
        <button
          onClick={() => onChange('timer')}
          className={`font-jua text-base md:text-lg px-5 md:px-6 py-2.5 md:py-3 rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center gap-2
            ${value === 'timer' ? 'bg-ink-dark text-white shadow-none' : 'text-ink-medium hover:text-ink-dark'}`}
        >
          <i className="ri-timer-line text-lg"></i>타이머
        </button>
        <button
          onClick={() => onChange('stopwatch')}
          className={`font-jua text-base md:text-lg px-5 md:px-6 py-2.5 md:py-3 rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center gap-2
            ${value === 'stopwatch' ? 'bg-ink-dark text-white shadow-none' : 'text-ink-medium hover:text-ink-dark'}`}
        >
          <i className="ri-timer-flash-line text-lg"></i>스탑워치
        </button>
      </div>

      {value === 'timer' && (
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex flex-wrap justify-center gap-2">
            {TIMER_PRESETS.map((seconds) => {
              const label = seconds >= 60 ? `${seconds / 60}분` : `${seconds}초`;
              return (
                <button
                  key={seconds}
                  onClick={() => onTimerSecondsChange(seconds)}
                  className={`font-jua text-base px-4 py-2 rounded-game border-2 border-ink-dark transition-all duration-150 cursor-pointer whitespace-nowrap
                    ${timerSeconds === seconds
                      ? 'bg-party-yellow shadow-none translate-x-[2px] translate-y-[2px]'
                      : 'bg-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={timerSeconds <= 5}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              <i className="ri-subtract-line text-ink-dark text-lg"></i>
            </button>
            <div className="w-24 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark">
              <input
                type="number"
                value={timerSeconds}
                onChange={handleInputChange}
                min={5}
                max={600}
                className="w-full h-full text-center font-jua text-xl bg-transparent text-ink-dark outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <button
              onClick={handleIncrement}
              disabled={timerSeconds >= 600}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              <i className="ri-add-line text-ink-dark text-lg"></i>
            </button>
          </div>

          <span className="font-jua text-sm text-ink-medium">{formatTime(timerSeconds)}</span>
        </div>
      )}
    </div>
  );
}