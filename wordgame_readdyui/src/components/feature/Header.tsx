import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '게임', path: '/' },
    { label: '마이페이지', path: '/mypage' },
  ];

  return (
    <header className="w-full bg-warm-bg border-b-2 border-ink-dark sticky top-0 z-50">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-party-yellow rounded-game border-2 border-ink-dark">
              <i className="ri-gamepad-line text-ink-dark text-xl"></i>
            </div>
            <span className="font-jua text-xl text-ink-dark hidden sm:block">제시어 게임</span>
          </button>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`font-jua text-base px-4 py-2 rounded-game border-2 border-ink-dark transition-all duration-150 cursor-pointer whitespace-nowrap
                  ${location.pathname === item.path
                    ? 'bg-ink-dark text-white shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-white shadow-solid-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}