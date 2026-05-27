import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/feature/Header';
import SearchInput from '@/components/feature/SearchInput';
import GameCard from '@/components/feature/GameCard';
import EmptyState from '@/components/feature/EmptyState';
import { games } from '@/mocks/games';

const FAVORITES_KEY = 'wordgame_favorites';

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  const handleFavoriteToggle = (gameId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId];
      saveFavorites(next);
      return next;
    });
  };

  const filteredGames = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return games;

    return games.filter(
      (game) =>
        game.name.toLowerCase().includes(query) ||
        game.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />

      <main className="max-w-[1180px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="font-jua text-3xl md:text-4xl text-ink-dark mb-2">파티 게임 진행 도우미</h1>
          <p className="font-gothic text-sm md:text-base text-ink-medium">준비 없이 바로 시작하는 신나는 파티 게임!</p>
        </div>

        <div className="mb-8">
          <SearchInput onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <EmptyState message="검색 결과가 없어요! 다른 키워드로 검색해 보세요." />
        )}
      </main>
    </div>
  );
}