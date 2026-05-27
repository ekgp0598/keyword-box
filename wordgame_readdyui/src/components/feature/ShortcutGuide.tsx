export default function ShortcutGuide() {
  const shortcuts = [
    { key: 'O / Enter', action: '맞힘', color: 'bg-party-green' },
    { key: 'X / Backspace', action: '틀림', color: 'bg-party-red' },
    { key: '→', action: '다음 (미체크 시 PASS)', color: 'bg-party-sky' },
    { key: '←', action: '이전', color: 'bg-party-yellow' },
  ];

  return (
    <div className="bg-white rounded-game border-2 border-ink-dark p-4 md:p-5">
      <h4 className="font-jua text-base text-ink-dark mb-3 flex items-center gap-1.5">
        <i className="ri-keyboard-line"></i>키보드 단축키
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {shortcuts.map((sc) => (
          <div key={sc.key} className="flex items-center gap-2">
            <kbd className="font-gothic font-bold text-sm px-2.5 py-1 rounded border-2 border-ink-dark bg-warm-bg text-ink-dark whitespace-nowrap">
              {sc.key}
            </kbd>
            <span className="font-jua text-sm text-ink-medium">{sc.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}