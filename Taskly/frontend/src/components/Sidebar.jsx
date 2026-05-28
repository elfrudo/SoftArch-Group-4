import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';

const translations = {
  id: {
    menu: 'Menu',
    allTasks: 'Semua Tugas',
    urgent: 'Mendesak',
    today: 'Hari Ini',
    done: 'Selesai',
    account: 'Akun',
    profile: 'Profile',
    settings: 'Pengaturan',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    activeAccount: 'Akun aktif',
    logout: 'Keluar',
  },
  en: {
    menu: 'Menu',
    allTasks: 'All Tasks',
    urgent: 'Urgent',
    today: 'Today',
    done: 'Done',
    account: 'Account',
    profile: 'Profile',
    settings: 'Settings',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    activeAccount: 'Active account',
    logout: 'Logout',
  },
};

function Sidebar({ activeMenu, onMenuChange, counts }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const t = (dark, light) => isDark ? dark : light;
  const lang = translations[settings.language] || translations.id;

  const menuItems = [
    { id: 'all', label: lang.allTasks, icon: '⊞' },
    { id: 'urgent', label: lang.urgent, icon: '🔥' },
    { id: 'today', label: lang.today, icon: '📅' },
    { id: 'done', label: lang.done, icon: '✓' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className={`w-52 h-screen sticky top-0 flex flex-col border-r ${t('bg-[#111318] border-white/10', 'bg-white border-gray-200')}`}>
      <div className={`flex items-center gap-2 px-5 py-4 border-b ${t('border-white/10', 'border-gray-200')}`}>
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">T</div>
        <span className={`font-semibold text-base ${t('text-white', 'text-gray-800')}`}>Taskly</span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className={`text-xs px-2 mb-2 uppercase tracking-widest ${t('text-white/30', 'text-gray-400')}`}>{lang.menu}</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
              activeMenu === item.id
                ? 'bg-blue-600 text-white font-medium'
                : t('text-white/50 hover:bg-white/5 hover:text-white/80', 'text-gray-500 hover:bg-gray-100 hover:text-gray-800')
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {counts?.[item.id] > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeMenu === item.id
                  ? 'bg-white/20 text-white'
                  : item.id === 'urgent'
                  ? 'bg-red-500/20 text-red-400'
                  : t('bg-white/10 text-white/50', 'bg-gray-100 text-gray-500')
              }`}>
                {counts[item.id]}
              </span>
            )}
          </button>
        ))}

        <div className={`mt-4 pt-4 border-t flex flex-col gap-1 ${t('border-white/10', 'border-gray-200')}`}>
          <p className={`text-xs px-2 mb-2 uppercase tracking-widest ${t('text-white/30', 'text-gray-400')}`}>{lang.account}</p>
          <button
            onClick={() => navigate('/profile')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${t('text-white/50 hover:bg-white/5 hover:text-white/80', 'text-gray-500 hover:bg-gray-100 hover:text-gray-800')}`}
          >
            <span>👤</span>
            <span>{lang.profile}</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${t('text-white/50 hover:bg-white/5 hover:text-white/80', 'text-gray-500 hover:bg-gray-100 hover:text-gray-800')}`}
          >
            <span>⚙</span>
            <span>{lang.settings}</span>
          </button>
        </div>
      </nav>

      <div className="px-4 pb-3 pt-2">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all mb-3 ${t('bg-white/5 hover:bg-white/10', 'bg-gray-100 hover:bg-gray-200')}`}
        >
          <span className={`text-xs ${t('text-white/50', 'text-gray-500')}`}>
            {isDark ? `☀️ ${lang.lightMode}` : `🌙 ${lang.darkMode}`}
          </span>
          <div className={`w-8 h-4 rounded-full transition-all relative ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDark ? 'left-4' : 'left-0.5'}`}></div>
          </div>
        </button>
      </div>

      <div className={`px-4 py-4 border-t ${t('border-white/10', 'border-gray-200')}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium truncate ${t('text-white', 'text-gray-800')}`}>
              {user?.name}
            </p>
            <p className={`text-xs ${t('text-white/40', 'text-gray-400')}`}>{lang.activeAccount}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`mt-3 flex items-center gap-2 text-xs transition-all ${t('text-white/40 hover:text-white/70', 'text-gray-400 hover:text-gray-600')}`}
        >
          <span>→</span> {lang.logout}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;