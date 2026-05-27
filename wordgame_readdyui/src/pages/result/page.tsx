import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/feature/Header';

const HISTORY_KEY = 'wordgame_history';

interface HistoryItem {
  id: string;
  gameId: string;
  gameName: string;
  date: string;
  duration: number;
  correct: number;
  wrong: number;
  pass: number;
  total: number;
}

function addHistory(item: HistoryItem) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list: HistoryItem[] = raw ? JSON.parse(raw) : [];
    list.push(item);
    // Keep only the last 100 entries
    const trimmed = list.length > 100 ? list.slice(list.length - 100) : list;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently fail
  }
}

interface ResultState {
  gameId: string;
  gameName: string;
  gameColor: string;
  gameIcon: string;
  results: Array<{ word: string; result: 'correct' | 'wrong' | 'pass' | null }>;
  correct: number;
  wrong: number;
  pass: number;
  total: number;
  duration: number;
  timeMode: 'timer' | 'stopwatch';
  timerSeconds: number;
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

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;
  const savedRef = useRef(false);

  // Save history when result is available
  useEffect(() => {
    if (!state || savedRef.current) return;
    savedRef.current = true;

    const historyItem: HistoryItem = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
      gameId: state.gameId,
      gameName: state.gameName,
      date: new Date().toISOString(),
      duration: state.duration,
      correct: state.correct,
      wrong: state.wrong,
      pass: state.pass,
      total: state.total,
    };
    addHistory(historyItem);
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen bg-warm-bg">
        <Header />
        <div className="max-w-[960px] mx-auto px-4 md:px-6 py-20 text-center">
          <div className="w-24 h-24 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm mb-6">
            <i className="ri-emotion-sad-line text-ink-light text-4xl"></i>
          </div>
          <h2 className="font-jua text-3xl text-ink-dark mb-4">결과가 없어요</h2>
          <p className="font-gothic text-ink-medium mb-6">게임을 먼저 진행해주세요!</p>
          <button
            onClick={() => navigate('/')}
            className="btn-game bg-party-yellow text-xl"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    );
  }

  const {
    gameId,
    gameName,
    gameColor,
    gameIcon,
    results,
    correct,
    wrong,
    pass,
    total,
    duration,
  } = state;

  const bgColor = colorMap[gameColor] || 'bg-party-yellow';
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;

  const durationMin = Math.floor(duration / 60);
  const durationSec = duration % 60;

  const handleRestart = () => {
    navigate(`/game-setup/${gameId}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />

      <main className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* ── Header ── */}
        <div className="text-center mb-6 md:mb-8">
          <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-game border-2 border-ink-dark shadow-solid ${bgColor} mb-4`}>
            <i className={`${gameIcon} text-ink-dark text-3xl`}></i>
          </div>
          <h1 className="font-jua text-3xl md:text-4xl text-ink-dark mb-1">{gameName}</h1>
          <p className="font-gothic text-ink-medium">게임 종료!</p>
        </div>

        {/* ── Score Summary ── */}
        <div className="bg-white rounded-game border-2 border-ink-dark shadow-solid p-5 md:p-7 mb-5">
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
            <div className="text-center p-3 md:p-4 rounded-game border-2 border-party-green bg-party-green/5">
              <div className="font-jua text-3xl md:text-4xl text-party-green mb-1">{correct}</div>
              <div className="font-gothic text-xs md:text-sm text-ink-medium">맞힘</div>
            </div>
            <div className="text-center p-3 md:p-4 rounded-game border-2 border-party-red bg-party-red/5">
              <div className="font-jua text-3xl md:text-4xl text-party-red mb-1">{wrong}</div>
              <div className="font-gothic text-xs md:text-sm text-ink-medium">틀림</div>
            </div>
            <div className="text-center p-3 md:p-4 rounded-game border-2 border-party-sky bg-party-sky/5">
              <div className="font-jua text-3xl md:text-4xl text-party-sky mb-1">{pass}</div>
              <div className="font-gothic text-xs md:text-sm text-ink-medium">패스</div>
            </div>
          </div>

          {/* Rate + Duration */}
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <div className="text-center">
              <div className="font-jua text-2xl md:text-3xl text-ink-dark">{rate}%</div>
              <div className="font-gothic text-xs text-ink-medium">정답률</div>
            </div>
            <div className="w-px h-10 bg-warm-border"></div>
            <div className="text-center">
              <div className="font-jua text-2xl md:text-3xl text-ink-dark">
                {durationMin > 0 ? `${durationMin}분 ` : ''}{durationSec}초
              </div>
              <div className="font-gothic text-xs text-ink-medium">소요 시간</div>
            </div>
            <div className="w-px h-10 bg-warm-border"></div>
            <div className="text-center">
              <div className="font-jua text-2xl md:text-3xl text-ink-dark">{total}</div>
              <div className="font-gothic text-xs text-ink-medium">전체</div>
            </div>
          </div>
        </div>

        {/* ── Word List ── */}
        <div className="bg-white rounded-game border-2 border-ink-dark shadow-solid p-5 md:p-6 mb-5">
          <h3 className="font-jua text-lg text-ink-dark mb-3 flex items-center gap-1.5">
            <i className="ri-list-check"></i>제시어별 결과
          </h3>
          <div className="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-warm-bg transition-colors"
              >
                <span className="font-gothic text-xs text-ink-light w-6 text-right flex-shrink-0">
                  {i + 1}
                </span>
                <span className="font-jua text-sm text-ink-dark flex-1 truncate">{r.word}</span>
                <span
                  className={`font-jua text-xs px-2.5 py-1 rounded-full border-2 border-ink-dark text-white flex-shrink-0 ${
                    r.result === 'correct'
                      ? 'bg-party-green'
                      : r.result === 'wrong'
                        ? 'bg-party-red'
                        : 'bg-party-sky'
                  }`}
                >
                  {r.result === 'correct' ? '맞힘' : r.result === 'wrong' ? '틀림' : '패스'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className="btn-game flex-1 bg-party-green text-white text-xl md:text-2xl py-4 shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-refresh-line text-xl md:text-2xl"></i>다시 하기
          </button>
          <button
            onClick={handleHome}
            className="btn-game flex-1 bg-party-yellow text-ink-dark text-xl md:text-2xl py-4 shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="ri-home-line text-xl md:text-2xl"></i>홈으로
          </button>
        </div>
      </main>
    </div>
  );
}