import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const translations = {
  id: {
    title: 'Pengaturan',
    subtitle: 'Sesuaikan tampilan dan preferensi kamu.',
    theme: 'Tema',
    themeDesc: 'Pilih tampilan yang nyaman untuk kamu.',
    dark: 'Dark Mode',
    light: 'Light Mode',
    language: 'Bahasa',
    languageDesc: 'Pilih bahasa yang ingin digunakan.',
    dateFormat: 'Format Tanggal',
    dateFormatDesc: 'Pilih format tanggal yang ingin ditampilkan.',
    timeFormat: 'Format Waktu',
    timeFormatDesc: 'Pilih format waktu 12 jam atau 24 jam.',
    saved: 'Pengaturan tersimpan otomatis.',
  },
  en: {
    title: 'Settings',
    subtitle: 'Customize your display and preferences.',
    theme: 'Theme',
    themeDesc: 'Choose a comfortable display for you.',
    dark: 'Dark Mode',
    light: 'Light Mode',
    language: 'Language',
    languageDesc: 'Choose the language you want to use.',
    dateFormat: 'Date Format',
    dateFormatDesc: 'Choose the date format to display.',
    timeFormat: 'Time Format',
    timeFormatDesc: 'Choose 12-hour or 24-hour time format.',
    saved: 'Settings saved automatically.',
  },
};

function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();
  const theme = (dark, light) => isDark ? dark : light;
  const lang = translations[settings.language];

  const cardClass = `border rounded-2xl p-6 mb-4 ${theme('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`;
  const labelClass = `text-xs mb-1 block ${theme('text-white/40', 'text-gray-400')}`;
  const optionClass = (active) => `flex-1 py-2 text-sm rounded-xl border transition-all text-center cursor-pointer ${
    active
      ? 'bg-blue-600 border-blue-600 text-white font-medium'
      : theme('border-white/10 text-white/50 hover:bg-white/5', 'border-gray-200 text-gray-500 hover:bg-gray-50')
  }`;

  return (
    <div className={`flex min-h-screen ${theme('bg-[#0d0f14] text-white', 'bg-gray-100 text-gray-800')}`}>
      <Sidebar activeMenu="" onMenuChange={() => navigate('/')} counts={{}} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{lang.title}</h1>
            <p className={`text-sm mt-1 ${theme('text-white/40', 'text-gray-400')}`}>{lang.subtitle}</p>
          </div>

          <p className={`text-xs mb-4 ${theme('text-white/30', 'text-gray-400')}`}>{lang.saved}</p>

          <div className={cardClass}>
            <h2 className={`font-semibold mb-1 ${theme('text-white', 'text-gray-800')}`}>{lang.theme}</h2>
            <p className={labelClass}>{lang.themeDesc}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { if (!isDark) toggleTheme(); }} className={optionClass(isDark)}>
                🌙 {lang.dark}
              </button>
              <button onClick={() => { if (isDark) toggleTheme(); }} className={optionClass(!isDark)}>
                ☀️ {lang.light}
              </button>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className={`font-semibold mb-1 ${theme('text-white', 'text-gray-800')}`}>{lang.language}</h2>
            <p className={labelClass}>{lang.languageDesc}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateSettings({ language: 'id' })}
                className={optionClass(settings.language === 'id')}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => updateSettings({ language: 'en' })}
                className={optionClass(settings.language === 'en')}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className={`font-semibold mb-1 ${theme('text-white', 'text-gray-800')}`}>{lang.dateFormat}</h2>
            <p className={labelClass}>{lang.dateFormatDesc}</p>
            <div className="flex gap-2 mt-3">
              {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD'].map(f => (
                <button
                  key={f}
                  onClick={() => updateSettings({ dateFormat: f })}
                  className={optionClass(settings.dateFormat === f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <h2 className={`font-semibold mb-1 ${theme('text-white', 'text-gray-800')}`}>{lang.timeFormat}</h2>
            <p className={labelClass}>{lang.timeFormatDesc}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateSettings({ timeFormat: '24' })}
                className={optionClass(settings.timeFormat === '24')}
              >
                24 jam — 14:30
              </button>
              <button
                onClick={() => updateSettings({ timeFormat: '12' })}
                className={optionClass(settings.timeFormat === '12')}
              >
                12 jam — 2:30 PM
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;