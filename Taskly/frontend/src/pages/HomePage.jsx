import { useState, useEffect } from 'react';
import { taskService } from '../services/task.service';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import dayjs from 'dayjs';

const translations = {
  id: {
    title: 'Tugas Aktif',
    subtitle: 'Kelola prioritas dan deadline kamu hari ini.',
    totalTasks: 'Total Tugas',
    activeTasks: 'Aktif saat ini',
    urgent: 'Mendesak',
    needAttention: 'Perlu perhatian',
    done: 'Selesai',
    totalDone: 'Total terselesaikan',
    nearestDeadline: 'Deadline Terdekat',
    noDeadline: 'tidak ada',
    search: 'Cari tugas...',
    addTask: '+ Tambah Tugas',
    newTask: 'Tugas Baru',
    empty: 'Belum ada tugas. Tambah tugas pertama kamu!',
    filters: ['Semua', 'Terlambat', 'Sangat Mendesak', 'Mendesak', 'Santai'],
  },
  en: {
    title: 'Active Tasks',
    subtitle: 'Manage your priorities and deadlines today.',
    totalTasks: 'Total Tasks',
    activeTasks: 'Active now',
    urgent: 'Urgent',
    needAttention: 'Need attention',
    done: 'Done',
    totalDone: 'Total completed',
    nearestDeadline: 'Nearest Deadline',
    noDeadline: 'none',
    search: 'Search tasks...',
    addTask: '+ Add Task',
    newTask: 'New Task',
    empty: 'No tasks yet. Add your first task!',
    filters: ['All', 'Overdue', 'Very Urgent', 'Urgent', 'Relaxed'],
  },
};

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [activeMenu, setActiveMenu] = useState('all');
  const [activeFilter, setActiveFilter] = useState(null);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { isDark } = useTheme();
  const { settings } = useSettings();

  const t = (dark, light) => isDark ? dark : light;
  const lang = translations[settings.language] || translations.id;

  useEffect(() => {
    setActiveFilter(lang.filters[0]);
  }, [settings.language]);

  const fetchTasks = async () => {
    const data = await taskService.getAll();
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const counts = {
    all: tasks.length,
    urgent: tasks.filter(task => task.is_urgent == 1 && task.is_done == 0).length,
    today: tasks.filter(task => {
      if (!task.deadline) return false;
      return new Date(task.deadline).toDateString() === new Date().toDateString();
    }).length,
    done: tasks.filter(task => task.is_done == 1).length,
  };

  const filtered = tasks.filter(task => {
    if (activeMenu === 'urgent') return task.is_urgent == 1 && task.is_done == 0;
    if (activeMenu === 'today') {
      if (!task.deadline) return false;
      return new Date(task.deadline).toDateString() === new Date().toDateString();
    }
    if (activeMenu === 'done') return task.is_done == 1;
    return true;
  }).filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  ).filter(task => {
    const now = new Date();
    const deadline = task.deadline ? new Date(task.deadline) : null;
    const f = activeFilter;
    if (f === 'Terlambat' || f === 'Overdue') return deadline && deadline < now && task.is_done == 0;
    if (f === 'Sangat Mendesak' || f === 'Very Urgent') return task.is_urgent == 1 && deadline && deadline < new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) && task.is_done == 0;
    if (f === 'Mendesak' || f === 'Urgent') return task.is_urgent == 1 && task.is_done == 0;
    if (f === 'Santai' || f === 'Relaxed') return task.is_urgent == 0 && task.is_done == 0;
    return true;
  });

  const urgentCount = tasks.filter(task => task.is_urgent == 1 && task.is_done == 0).length;
  const doneCount = tasks.filter(task => task.is_done == 1).length;
  const nearestDeadline = tasks
    .filter(task => task.deadline && task.is_done == 0)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  return (
    <div className={`flex min-h-screen ${t('bg-[#0d0f14] text-white', 'bg-gray-100 text-gray-800')}`}>
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} counts={counts} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{lang.title}</h1>
          <p className={`text-sm mt-1 ${t('text-white/40', 'text-gray-400')}`}>{lang.subtitle}</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard label={lang.totalTasks} value={tasks.length} sub={lang.activeTasks} color="blue" />
          <StatsCard label={lang.urgent} value={urgentCount} sub={lang.needAttention} color="red" />
          <StatsCard label={lang.done} value={doneCount} sub={lang.totalDone} color="green" />
          <StatsCard
            label={lang.nearestDeadline}
            value={nearestDeadline ? nearestDeadline.title : '-'}
            sub={nearestDeadline ? dayjs(nearestDeadline.deadline).format(settings.dateFormat) : lang.noDeadline}
            color="yellow"
          />
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className={`flex-1 flex items-center gap-2 border rounded-xl px-4 h-10 ${t('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`}>
            <span className={t('text-white/30', 'text-gray-400')}>🔍</span>
            <input
              type="text"
              placeholder={lang.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`flex-1 bg-transparent text-sm outline-none ${t('text-white placeholder-white/30', 'text-gray-800 placeholder-gray-400')}`}
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 h-10 rounded-xl transition-all"
          >
            {lang.addTask}
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          {lang.filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-4 py-1.5 rounded-full transition-all ${
                activeFilter === f
                  ? 'bg-blue-600 text-white'
                  : t('bg-white/5 text-white/50 hover:bg-white/10', 'bg-gray-200 text-gray-500 hover:bg-gray-300')
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 ${t('text-white/20', 'text-gray-300')}`}>
            <span className="text-5xl mb-3">📭</span>
            <p className="text-sm">{lang.empty}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(task => (
              <TaskCard key={task.id} task={task} onRefresh={fetchTasks} />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className={`border rounded-2xl p-6 w-full max-w-md mx-4 ${t('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-semibold ${t('text-white', 'text-gray-800')}`}>{lang.newTask}</h2>
              <button
                onClick={() => setShowForm(false)}
                className={`text-xl ${t('text-white/40 hover:text-white', 'text-gray-400 hover:text-gray-800')}`}
              >
                ✕
              </button>
            </div>
            <TaskForm onSuccess={() => { setShowForm(false); fetchTasks(); }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;