import { useState } from 'react';
import { taskService } from '../services/task.service';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

function TaskForm({ onSuccess }) {
  const { isDark } = useTheme();
  const { settings } = useSettings();
  const t = (dark, light) => isDark ? dark : light;

  const lang = settings.language === 'en' ? {
    title: 'Task title...',
    note: 'Notes (optional)...',
    urgent: 'Mark as urgent',
    save: 'Save Task',
    error: 'Failed to create task!',
  } : {
    title: 'Judul tugas...',
    note: 'Catatan (opsional)...',
    urgent: 'Tandai sebagai mendesak',
    save: 'Simpan Tugas',
    error: 'Gagal membuat tugas!',
  };

  const [form, setForm] = useState({ title: '', note: '', deadline: '', is_urgent: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.create(form);
      onSuccess();
    } catch {
      alert(lang.error);
    }
  };

  const inputClass = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${t('bg-[#0d0f14] border-white/10 text-white placeholder-white/30', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder={lang.title}
        value={form.title}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <textarea
        name="note"
        placeholder={lang.note}
        value={form.note}
        onChange={handleChange}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      <input
        type="datetime-local"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className={`${inputClass} ${t('text-white/60', 'text-gray-600')}`}
      />
      <label className={`flex items-center gap-3 text-sm cursor-pointer ${t('text-white/50', 'text-gray-500')}`}>
        <input
          type="checkbox"
          name="is_urgent"
          checked={form.is_urgent}
          onChange={handleChange}
          className="w-4 h-4 accent-blue-600"
        />
        {lang.urgent}
      </label>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all mt-1"
      >
        {lang.save}
      </button>
    </form>
  );
}

export default TaskForm;