import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/feature/Header';
import { games } from '@/mocks/games';
import { getWordsByGame, pickRandomWordsMixed } from '@/mocks/words';
import type { DifficultyCounts } from '@/mocks/words';

interface GameState {
  difficultyCounts: DifficultyCounts;
  timeMode: 'timer' | 'stopwatch';
  timerSeconds: number;
  gameId: string;
}

interface WordResult {
  word: string;
  result: 'correct' | 'wrong' | 'pass' | null;
}

const colorMap: Record<string, string> = {
  'party-pink': 'bg-party-pink',
  'party-sky': 'bg-party-sky',
  'party-yellow': 'bg-party-yellow',
  'party-green': 'bg-party-green',
  'party-red': 'bg-party-red',
  'party-orange': 'bg-party-orange',
  'party-purple': 'bg-party-purple',
};

export default function GamePlay() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const gameState = location.state as GameState | null;
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const game = useMemo(() => games.find((g) => g.id === gameId), [gameId]);

  // ── Redirect if missing state ──
  const didRedirect = useRef(false);
  useEffect(() => {
    if (!gameState && !didRedirect.current && gameId) {
      didRedirect.current = true;
      navigate(`/game-setup/${gameId}`, { replace: true });
    }
  }, [gameState, gameId, navigate]);

  // ── Pick words once ──
  const words = useMemo(() => {
    if (!gameState || !gameId) return [] as string[];
    const allWords = getWordsByGame(gameId);
    return pickRandomWordsMixed(allWords, gameState.difficultyCounts);
  }, [gameState, gameId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<WordResult[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;
  const isFinishedRef = useRef(isFinished);
  isFinishedRef.current = isFinished;
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
  const resultsRef = useRef(results);
  resultsRef.current = results;

  // ── Init results ──
  useEffect(() => {
    if (words.length > 0) {
      setResults(words.map((w) => ({ word: w, result: null })));
      setCurrentIndex(0);
      setElapsed(0);
      setIsRunning(true);
      setIsFinished(false);
    }
  }, [words]);

  // ── Timer ──
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ── Timer check ──
  useEffect(() => {
    if (!isRunning || !gameState || gameState.timeMode !== 'timer') return;
    if (elapsed >= gameState.timerSeconds && words.length > 0) {
      setResults((prev) =>
        prev.map((r) => (r.result === null ? { ...r, result: 'pass' as const } : r)),
      );
      setIsRunning(false);
      setIsFinished(true);
    }
  }, [elapsed, isRunning, gameState, words.length]);

  // ── Move to next word ──
  const moveToNext = useCallback(() => {
    const idx = currentIndexRef.current;
    if (idx < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
      setIsFinished(true);
    }
  }, [words.length]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinishedRef.current || !isRunningRef.current) return;

      const idx = currentIndexRef.current;

      switch (e.key) {
        case 'o':
        case 'O':
        case 'Enter':
          e.preventDefault();
          setResults((prev) => {
            const next = [...prev];
            if (next[idx]) next[idx] = { ...next[idx], result: 'correct' as const };
            return next;
          });
          moveToNext();
          break;

        case 'x':
        case 'X':
        case 'Backspace':
          e.preventDefault();
          setResults((prev) => {
            const next = [...prev];
            if (next[idx]) next[idx] = { ...next[idx], result: 'wrong' as const };
            return next;
          });
          moveToNext();
          break;

        case 'ArrowRight':
          e.preventDefault();
          setResults((prev) => {
            const next = [...prev];
            if (next[idx] && next[idx].result === null) {
              next[idx] = { ...next[idx], result: 'pass' as const };
            }
            return next;
          });
          moveToNext();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (idx > 0) {
            setCurrentIndex((prev) => prev - 1);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveToNext]);

  // ── Navigate to result ──
  useEffect(() => {
    if (!isFinished || results.length === 0) return;

    const correct = results.filter((r) => r.result === 'correct').length;
    const wrong = results.filter((r) => r.result === 'wrong').length;
    const pass = results.filter((r) => r.result === 'pass').length;

    const timer = setTimeout(() => {
      navigate('/result', {
        state: {
          gameId,
          gameName: game?.name,
          gameColor: game?.color,
          gameIcon: game?.iconClass,
          results,
          correct,
          wrong,
          pass,
          total: results.length,
          duration: elapsed,
          timeMode: gameState?.timeMode,
          timerSeconds: gameState?.timerSeconds,
        },
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [isFinished, results, elapsed, gameId, game, gameState, navigate]);

  // ── Button handlers ──
  const handleCorrect = useCallback(() => {
    if (isFinishedRef.current || !isRunningRef.current) return;
    const idx = currentIndexRef.current;
    setResults((prev) => {
      const next = [...prev];
      if (next[idx]) next[idx] = { ...next[idx], result: 'correct' as const };
      return next;
    });
    moveToNext();
  }, [moveToNext]);

  const handleWrong = useCallback(() => {
    if (isFinishedRef.current || !isRunningRef.current) return;
    const idx = currentIndexRef.current;
    setResults((prev) => {
      const next = [...prev];
      if (next[idx]) next[idx] = { ...next[idx], result: 'wrong' as const };
      return next;
    });
    moveToNext();
  }, [moveToNext]);

  // ── Guard: no state ──
  if (!gameState || !game || words.length === 0) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid mb-4">
              <i className="ri-loader-4-line text-ink-medium text-3xl animate-spin"></i>
            </div>
            <p className="font-jua text-xl text-ink-medium">준비 중...</p>
          </div>
        </div>
      </div>
    );
  }

  const bgColor = colorMap[game.color] || 'bg-party-yellow';
  const currentWord = results[currentIndex]?.word ?? '';
  const currentResult = results[currentIndex]?.result ?? null;
  const completedCount = results.filter((r) => r.result !== null).length;

  // Timer display
  const isTimerMode = gameState.timeMode === 'timer';
  const displaySeconds = isTimerMode
    ? Math.max(0, gameState.timerSeconds - elapsed)
    : elapsed;
  const displayMinutes = Math.floor(displaySeconds / 60);
  const displaySecs = displaySeconds % 60;

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center max-w-[960px] mx-auto w-full px-4 md:px-6 py-4 md:py-6">
        {/* ── Top bar: back + game info ── */}
        <div className="w-full flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(`/game-setup/${gameId}`)}
            className="font-jua text-sm text-ink-medium flex items-center gap-1 hover:text-ink-dark transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-arrow-left-line"></i>나가기
          </button>
          <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-game border-2 border-ink-dark ${bgColor}`}>
            <i className={`${game.iconClass} text-ink-dark text-base`}></i>
          </div>
          <span className="font-jua text-base text-ink-dark truncate">{game.name}</span>
        </div>

        {/* ── Timer ── */}
        <div className="mb-4 md:mb-5">
          <div className="flex items-center gap-2">
            <span className="font-gothic text-xs text-ink-light">
              {isTimerMode ? '남은 시간' : '경과 시간'}
            </span>
            <span
              className={`font-gothic font-bold text-2xl md:text-3xl tabular-nums ${
                isTimerMode && displaySeconds <= 10 ? 'text-party-red animate-pulse' : 'text-ink-dark'
              }`}
            >
              {String(displayMinutes).padStart(2, '0')}:{String(displaySecs).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Progress ── */}
        <div className="w-full mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-jua text-sm text-ink-medium">
              {currentIndex + 1} / {words.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-jua text-xs text-party-green flex items-center gap-1">
                <i className="ri-check-line"></i>{results.filter((r) => r.result === 'correct').length}
              </span>
              <span className="font-jua text-xs text-party-red flex items-center gap-1">
                <i className="ri-close-line"></i>{results.filter((r) => r.result === 'wrong').length}
              </span>
              <span className="font-jua text-xs text-party-sky flex items-center gap-1">
                <i className="ri-skip-forward-line"></i>{results.filter((r) => r.result === 'pass').length}
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white border-2 border-ink-dark overflow-hidden">
            <div
              className="h-full bg-party-green transition-all duration-200 rounded-full"
              style={{ width: `${(completedCount / words.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* ── Current Word ── */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div
            className={`bg-white rounded-game border-2 border-ink-dark shadow-solid p-6 md:p-10 w-full max-w-[600px] text-center transition-all duration-150 ${
              currentResult === 'correct'
                ? 'border-party-green shadow-party-green/20'
                : currentResult === 'wrong'
                  ? 'border-party-red shadow-party-red/20'
                  : currentResult === 'pass'
                    ? 'border-party-sky shadow-party-sky/20'
                    : ''
            }`}
          >
            <div className="font-jua text-7xl md:text-8xl lg:text-9xl text-ink-dark break-keep leading-tight select-none">
              {currentWord}
            </div>

            {/* Result badge */}
            {currentResult && (
              <div className="mt-4 flex justify-center">
                <span
                  className={`font-jua text-sm px-4 py-1.5 rounded-full border-2 border-ink-dark text-white ${
                    currentResult === 'correct'
                      ? 'bg-party-green'
                      : currentResult === 'wrong'
                        ? 'bg-party-red'
                        : 'bg-party-sky'
                  }`}
                >
                  {currentResult === 'correct' ? '맞힘!' : currentResult === 'wrong' ? '틀림!' : '패스'}
                </span>
              </div>
            )}
          </div>

          {/* ── Hint: re-mark on previous ── */}
          {currentResult && (
            <p className="font-gothic text-xs text-ink-light mt-3">
              ← 키로 돌아가서 다시 표시할 수 있어요
            </p>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div className="w-full max-w-[600px] flex items-center gap-3 md:gap-4 mt-5 md:mt-6 pb-4">
          {/* Previous */}
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-solid-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            <i className="ri-arrow-left-line text-ink-dark text-xl md:text-2xl"></i>
          </button>

          {/* Wrong */}
          <button
            onClick={handleWrong}
            className="flex-1 font-jua text-lg md:text-xl py-3.5 md:py-4 rounded-game border-2 border-ink-dark bg-party-red text-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-close-line text-xl md:text-2xl"></i>틀림
            <kbd className="hidden md:inline font-gothic text-xs px-1.5 py-0.5 rounded border border-white/30 bg-white/10">
              X
            </kbd>
          </button>

          {/* Correct */}
          <button
            onClick={handleCorrect}
            className="flex-[2] font-jua text-xl md:text-2xl py-3.5 md:py-4 rounded-game border-2 border-ink-dark bg-party-green text-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-check-line text-2xl md:text-3xl"></i>맞힘
            <kbd className="hidden md:inline font-gothic text-xs px-1.5 py-0.5 rounded border border-white/30 bg-white/10">
              O
            </kbd>
          </button>
        </div>

        {/* ── Keyboard hint ── */}
        <div className="flex items-center gap-3 text-ink-light pb-4">
          <span className="font-gothic text-xs flex items-center gap-1">
            <kbd className="font-gothic font-bold text-xs px-1.5 py-0.5 rounded border-2 border-warm-border bg-white text-ink-medium">
              O
            </kbd>
            맞힘
          </span>
          <span className="font-gothic text-xs flex items-center gap-1">
            <kbd className="font-gothic font-bold text-xs px-1.5 py-0.5 rounded border-2 border-warm-border bg-white text-ink-medium">
              X
            </kbd>
            틀림
          </span>
          <span className="font-gothic text-xs flex items-center gap-1">
            <kbd className="font-gothic font-bold text-xs px-1.5 py-0.5 rounded border-2 border-warm-border bg-white text-ink-medium">
              →
            </kbd>
            다음
          </span>
          <span className="font-gothic text-xs flex items-center gap-1">
            <kbd className="font-gothic font-bold text-xs px-1.5 py-0.5 rounded border-2 border-warm-border bg-white text-ink-medium">
              ←
            </kbd>
            이전
          </span>
        </div>
      </main>
    </div>
  );
}