import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/feature/Header';
import GameCard from '@/components/feature/GameCard';
import { games } from '@/mocks/games';

const FAVORITES_KEY = 'wordgame_favorites';
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

function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
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

type Tab = 'favorites' | 'history';

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('favorites');
  const [favorites, setFavorites] = useState<string[]>(getFavorites);
  const [history, setHistory] = useState<HistoryItem[]>(getHistory);

  const favoriteGames = useMemo(
    () => games.filter((g) => favorites.includes(g.id)),
    [favorites],
  );

  const handleFavoriteToggle = useCallback((gameId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId];
      saveFavorites(next);
      return next;
    });
  }, []);

  const handleDeleteHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveHistory(next);
      return next;
    });
  }, []);

  const handleClearAllHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  // Sort history by date (newest first)
  const sortedHistory = useMemo(
    () => [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [history],
  );

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />

      <main className="max-w-[960px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Page title */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid mb-4">
            <i className="ri-user-smile-line text-ink-dark text-3xl"></i>
          </div>
          <h1 className="font-jua text-3xl md:text-4xl text-ink-dark mb-1">마이페이지</h1>
          <p className="font-gothic text-sm text-ink-medium">즐겨찾기와 게임 기록을 한눈에</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center bg-white rounded-full border-2 border-ink-dark p-1 shadow-solid-sm">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`font-jua text-sm md:text-base px-6 py-2.5 rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activeTab === 'favorites'
                  ? 'bg-ink-dark text-white'
                  : 'text-ink-medium hover:text-ink-dark'
              }`}
            >
              <i className="ri-star-line mr-1.5"></i>즐겨찾기
              <span className="ml-1.5 font-gothic text-xs opacity-70">({favoriteGames.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`font-jua text-sm md:text-base px-6 py-2.5 rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-ink-dark text-white'
                  : 'text-ink-medium hover:text-ink-dark'
              }`}
            >
              <i className="ri-history-line mr-1.5"></i>기록
              <span className="ml-1.5 font-gothic text-xs opacity-70">({history.length})</span>
            </button>
          </div>
        </div>

        {/* ── Favorites Tab ── */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoriteGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={true}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm mb-4">
                  <i className="ri-star-line text-ink-light text-3xl"></i>
                </div>
                <h3 className="font-jua text-xl text-ink-dark mb-2">즐겨찾기한 게임이 없어요</h3>
                <p className="font-gothic text-sm text-ink-medium mb-5">홈에서 마음에 드는 게임에 별표를 눌러보세요!</p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-game bg-party-yellow text-base inline-flex items-center gap-2"
                >
                  <i className="ri-home-line"></i>게임 찾으러 가기
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── History Tab ── */}
        {activeTab === 'history' && (
          <div>
            {sortedHistory.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-gothic text-sm text-ink-medium">
                    총 {history.length}개의 기록
                  </span>
                  <button
                    onClick={handleClearAllHistory}
                    className="font-gothic text-xs text-party-red hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <i className="ri-delete-bin-line"></i>전체 삭제
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {sortedHistory.map((item) => {
                    const game = games.find((g) => g.id === item.gameId);
                    const bgColor = game ? colorMap[game.color] || 'bg-party-yellow' : 'bg-party-yellow';
                    const rate = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
                    const durationMin = Math.floor(item.duration / 60);
                    const durationSec = item.duration % 60;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-game border-2 border-ink-dark shadow-solid p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        {/* Game icon + info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-game border-2 border-ink-dark ${bgColor}`}>
                            <i className={`${game?.iconClass ?? 'ri-gamepad-line'} text-ink-dark text-lg`}></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-jua text-base text-ink-dark truncate">{item.gameName}</h3>
                            <p className="font-gothic text-xs text-ink-light mt-0.5">
                              {new Date(item.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Score summary */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-jua text-sm text-party-green flex items-center gap-0.5">
                              <i className="ri-check-line text-xs"></i>{item.correct}
                            </span>
                            <span className="font-jua text-sm text-party-red flex items-center gap-0.5">
                              <i className="ri-close-line text-xs"></i>{item.wrong}
                            </span>
                            <span className="font-jua text-sm text-party-sky flex items-center gap-0.5">
                              <i className="ri-skip-forward-line text-xs"></i>{item.pass}
                            </span>
                          </div>

                          <div className="w-px h-6 bg-warm-border hidden sm:block"></div>

                          <span className="font-gothic text-xs text-ink-medium whitespace-nowrap hidden sm:block">
                            {rate}%
                          </span>

                          <span className="font-gothic text-xs text-ink-light whitespace-nowrap hidden sm:block">
                            {durationMin > 0 ? `${durationMin}분 ` : ''}{durationSec}초
                          </span>

                          {/* Replay button */}
                          <button
                            onClick={() => navigate(`/game-setup/${item.gameId}`)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border-2 border-ink-dark bg-party-green text-white hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all duration-100 cursor-pointer"
                            title="다시 하기"
                          >
                            <i className="ri-refresh-line text-sm"></i>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteHistory(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border-2 border-ink-dark bg-white hover:bg-party-red hover:text-white transition-colors duration-100 cursor-pointer"
                            title="삭제"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid-sm mb-4">
                  <i className="ri-history-line text-ink-light text-3xl"></i>
                </div>
                <h3 className="font-jua text-xl text-ink-dark mb-2">게임 기록이 없어요</h3>
                <p className="font-gothic text-sm text-ink-medium mb-5">게임을 플레이하면 여기에 기록이 쌓여요!</p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-game bg-party-green text-white text-base inline-flex items-center gap-2"
                >
                  <i className="ri-play-line"></i>게임 하러 가기
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}