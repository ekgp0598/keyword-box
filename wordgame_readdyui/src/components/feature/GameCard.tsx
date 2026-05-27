import { useNavigate } from 'react-router-dom';
import FavoriteButton from '@/components/feature/FavoriteButton';
import type { Game } from '@/mocks/games';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onFavoriteToggle: (gameId: string) => void;
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

export default function GameCard({ game, isFavorite, onFavoriteToggle }: GameCardProps) {
  const navigate = useNavigate();

  const bgColor = colorMap[game.color] || 'bg-party-yellow';

  return (
    <div
      className="card-game bg-white p-5"
      onClick={() => navigate(`/game-setup/${game.id}`)}
    >
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-game border-2 border-ink-dark ${bgColor}`}>
          <i className={`${game.iconClass} text-ink-dark text-2xl`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-jua text-xl text-ink-dark">{game.name}</h3>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => onFavoriteToggle(game.id)}
            />
          </div>
          <p className="font-gothic text-sm text-ink-medium mt-1.5 leading-relaxed">{game.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="font-gothic text-xs px-2.5 py-0.5 rounded-full border border-warm-border bg-warm-bg text-ink-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}