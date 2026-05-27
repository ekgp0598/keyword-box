import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm">
        <div className="w-10 h-10 flex items-center justify-center">
          <i className="ri-search-line text-ink-medium text-lg"></i>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="게임명 또는 태그 검색..."
          className="flex-1 py-2.5 pr-10 bg-transparent font-gothic text-sm text-ink-dark placeholder-ink-light outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-border transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-ink-medium"></i>
          </button>
        )}
      </div>
    </div>
  );
}