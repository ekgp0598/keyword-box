import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/feature/Header';
import MixedDifficultyPicker from '@/components/feature/MixedDifficultyPicker';
import TimeModeSelect from '@/components/feature/TimeModeSelect';
import ShortcutGuide from '@/components/feature/ShortcutGuide';
import { games } from '@/mocks/games';
import { getWordsByGame, getDifficultyCounts } from '@/mocks/words';
import type { DifficultyCounts } from '@/mocks/words';

type TimeMode = 'timer' | 'stopwatch';

const colorMap: Record<string, string> = {
  'party-pink': 'bg-party-pink',
  'party-sky': 'bg-party-sky',
  'party-yellow': 'bg-party-yellow',
  'party-green': 'bg-party-green',
  'party-red': 'bg-party-red',
  'party-orange': 'bg-party-orange',
  'party-purple': 'bg-party-purple',
};

const DEFAULT_COUNTS: DifficultyCounts = { easy: 3, medium: 3, hard: 4 };

export default function GameSetup() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);
  const words = useMemo(() => (gameId ? getWordsByGame(gameId) : []), [gameId]);
  const availableCounts = useMemo(() => getDifficultyCounts(words), [words]);

  const [difficultyCounts, setDifficultyCounts] = useState<DifficultyCounts>(() => ({
    easy: Math.min(DEFAULT_COUNTS.easy, availableCounts.easy),
    medium: Math.min(DEFAULT_COUNTS.medium, availableCounts.medium),
    hard: Math.min(DEFAULT_COUNTS.hard, availableCounts.hard),
  }));
  const [timeMode, setTimeMode] = useState<TimeMode>('timer');
  const [timerSeconds, setTimerSeconds] = useState(60);

  if (!game) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <Header />
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-20 text-center">
          <div className="w-24 h-24 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm mb-6">
            <i className="ri-error-warning-line text-ink-light text-4xl"></i>
          </div>
          <h2 className="font-jua text-3xl text-ink-dark">게임을 찾을 수 없어요</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-game bg-party-yellow text-xl mt-6"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    const total = difficultyCounts.easy + difficultyCounts.medium + difficultyCounts.hard;
    if (total === 0) return;

    const state = {
      difficultyCounts,
      timeMode,
      timerSeconds,
      gameId: game.id,
    };
    navigate(`/game-play/${game.id}`, { state });
  };

  const bgColor = colorMap[game.color] || 'bg-party-yellow';
  const totalWords = difficultyCounts.easy + difficultyCounts.medium + difficultyCounts.hard;

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />

      <main className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Top bar: back + game info inline */}
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => navigate('/')}
            className="font-jua text-base text-ink-medium flex items-center gap-1.5 hover:text-ink-dark transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line"></i>뒤로
          </button>
          <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-game border-2 border-ink-dark ${bgColor}`}>
            <i className={`${game.iconClass} text-ink-dark text-xl`}></i>
          </div>
          <div className="min-w-0">
            <h1 className="font-jua text-2xl md:text-3xl text-ink-dark truncate">{game.name}</h1>
            <p className="font-gothic text-sm text-ink-medium truncate hidden sm:block">{game.description}</p>
          </div>
          <div className="hidden md:flex flex-wrap gap-1.5 ml-auto">
            {game.tags.map((tag) => (
              <span key={tag} className="font-jua text-xs px-2.5 py-0.5 rounded-full border-2 border-warm-border bg-warm-bg text-ink-medium whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-4">
          {/* Word Config */}
          <div className="bg-white rounded-game border-2 border-ink-dark shadow-solid p-5 md:p-6">
            <h3 className="font-jua text-xl text-ink-dark mb-4 text-center">제시어 구성</h3>
            <MixedDifficultyPicker
              value={difficultyCounts}
              onChange={setDifficultyCounts}
              availableCounts={availableCounts}
            />
          </div>

          {/* Time Mode */}
          <div className="bg-white rounded-game border-2 border-ink-dark shadow-solid p-5 md:p-6">
            <h3 className="font-jua text-xl text-ink-dark mb-3 text-center">진행 방식</h3>
            <TimeModeSelect
              value={timeMode}
              onChange={setTimeMode}
              timerSeconds={timerSeconds}
              onTimerSecondsChange={setTimerSeconds}
            />
          </div>

          {/* Shortcut Guide */}
          <ShortcutGuide />

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={totalWords === 0}
            className="btn-game w-full bg-party-green text-white text-2xl md:text-3xl py-5 shadow-solid-lg hover:shadow-none flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-solid-lg disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            <i className="ri-play-fill text-3xl"></i>게임 시작!
          </button>
        </div>
      </main>
    </div>
  );
}