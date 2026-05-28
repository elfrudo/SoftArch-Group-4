import dayjs from 'dayjs';
import { taskService } from '../services/task.service';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { useState } from 'react';
import TaskEditForm from './TaskEditForm';

function TaskCard({ task, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { isDark } = useTheme();
  const { settings } = useSettings();

  const t = (dark, light) => isDark ? dark : light;

  const lang = settings.language === 'en'
    ? { urgent: 'Urgent', overdue: 'Overdue', editTask: 'Edit Task', delete: 'Delete this task?' }
    : { urgent: 'Mendesak', overdue: 'Terlambat', editTask: 'Edit Tugas', delete: 'Hapus tugas ini?' };

  const handleDone = async () => {
    setLoading(true);
    await taskService.update(task.id, { ...task, is_done: task.is_done == 1 ? 0 : 1 });
    onRefresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm(lang.delete)) return;
    setLoading(true);
    await taskService.delete(task.id);
    onRefresh();
    setLoading(false);
  };

  const formatDate = (deadline) => {
    const timeFormat = settings.timeFormat === '12' ? 'hh:mm A' : 'HH:mm';
    const dateFormat = settings.dateFormat || 'DD/MM/YYYY';
    return dayjs(deadline).format(`${dateFormat}, ${timeFormat}`);
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.is_done == 0;

  const cardClass = [
    'border rounded-xl px-5 py-4 flex items-start gap-4 group transition-all',
    t('bg-[#1a1d24]', 'bg-white'),
    task.is_urgent == 1
      ? 'border-l-4 border-l-red-500 ' + t('border-white/10', 'border-gray-200')
      : t('border-white/10 hover:border-white/20', 'border-gray-200 hover:border-gray-300'),
    task.is_done == 1 ? 'opacity-50' : '',
  ].join(' ');

  return (
    <>
      <div className={cardClass}>
        <button
          onClick={handleDone}
          disabled={loading}
          className={[
            'mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all',
            task.is_done == 1
              ? 'bg-green-500 border-green-500 text-white'
              : t('border-white/20 hover:border-white/50', 'border-gray-300 hover:border-gray-500'),
          ].join(' ')}
        >
          {task.is_done == 1 && <span className="text-xs">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {task.is_urgent == 1 && (
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">{lang.urgent}</span>
            )}
            {isOverdue && (
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">{lang.overdue}</span>
            )}
          </div>
          <p className={[
            'text-sm font-medium',
            task.is_done == 1
              ? t('line-through text-white/30', 'line-through text-gray-400')
              : t('text-white', 'text-gray-800'),
          ].join(' ')}>
            {task.title}
          </p>
          {task.note && (
            <p className={`text-xs mt-1 truncate ${t('text-white/40', 'text-gray-400')}`}>
              {task.note}
            </p>
          )}
          {task.deadline && (
            <p className={`text-xs mt-1.5 flex items-center gap-1 ${isOverdue ? 'text-orange-400' : t('text-white/30', 'text-gray-400')}`}>
              ⏰ {formatDate(task.deadline)}
            </p>
          )}
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => setShowEdit(true)}
            className={`text-sm ${t('text-white/20 hover:text-blue-400', 'text-gray-300 hover:text-blue-500')}`}
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`text-sm ${t('text-white/20 hover:text-red-400', 'text-gray-300 hover:text-red-400')}`}
          >
            🗑
          </button>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className={`border rounded-2xl p-6 w-full max-w-md mx-4 ${t('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-semibold ${t('text-white', 'text-gray-800')}`}>{lang.editTask}</h2>
              <button
                onClick={() => setShowEdit(false)}
                className={`text-xl ${t('text-white/40 hover:text-white', 'text-gray-400 hover:text-gray-800')}`}
              >
                ✕
              </button>
            </div>
            <TaskEditForm
              task={task}
              onSuccess={() => { setShowEdit(false); onRefresh(); }}
              onCancel={() => setShowEdit(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;