interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  presets?: number[];
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function NumberInput({ label, value, onChange, presets, min = 1, max = 999, disabled = false }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    if (isNaN(raw)) return;
    onChange(Math.max(min, Math.min(max, raw)));
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const addPreset = (amount: number) => {
    onChange(Math.min(value + amount, max));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => addPreset(p)}
              disabled={value + p > max}
              className="font-jua text-base md:text-lg px-4 py-2.5 rounded-game border-2 border-ink-dark bg-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              +{p}개
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-1.5">
        <span className="font-jua text-sm text-ink-medium">{label}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            disabled={disabled || value <= min}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            <i className="ri-subtract-line text-ink-dark text-lg"></i>
          </button>
          <div className="w-20 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark">
            <input
              type="number"
              value={value}
              onChange={handleChange}
              min={min}
              max={max}
              disabled={disabled}
              className="w-full h-full text-center font-jua text-xl bg-transparent text-ink-dark outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <button
            onClick={increment}
            disabled={disabled || value >= max}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            <i className="ri-add-line text-ink-dark text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}