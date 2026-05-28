import { useTheme } from '../context/ThemeContext';

function StatsCard({ label, value, sub, color }) {
  const { isDark } = useTheme();
  const colorMap = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
  };

  return (
    <div className={`border rounded-xl p-4 flex flex-col gap-2 ${isDark ? 'bg-[#1a1d24] border-white/10' : 'bg-white border-gray-200'}`}>
      <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-3xl font-semibold ${colorMap[color] || 'text-white'}`}>{value}</p>
      <p className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{sub}</p>
    </div>
  );
}

export default StatsCard;