interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="w-9 h-9 flex items-center justify-center rounded-game border-2 border-ink-dark bg-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 cursor-pointer"
      title={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <i className={`text-lg ${isFavorite ? 'ri-star-fill text-party-yellow' : 'ri-star-line text-ink-light'}`}></i>
    </button>
  );
}