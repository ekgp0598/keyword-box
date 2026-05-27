export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 flex items-center justify-center bg-white rounded-game border-2 border-ink-dark shadow-solid mb-4">
        <i className="ri-emotion-sad-line text-ink-light text-3xl"></i>
      </div>
      <p className="font-jua text-lg text-ink-medium text-center">{message}</p>
    </div>
  );
}