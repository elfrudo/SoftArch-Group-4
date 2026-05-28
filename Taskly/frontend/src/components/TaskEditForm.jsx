import { useState } from 'react';
import { taskService } from '../services/task.service';
import { useTheme } from '../context/ThemeContext';
import dayjs from 'dayjs';

function TaskEditForm({ task, onSuccess, onCancel }) {
  const { isDark } = useTheme();
  const theme = (dark, light) => isDark ? dark : light;

  const [form, setForm] = useState({
    title: task.title || '',
    note: task.note || '',
    deadline: task.deadline ? dayjs(task.deadline).format('YYYY-MM-DDTHH:mm') : '',
    is_urgent: task.is_urgent == 1,
    is_done: task.is_done == 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.update(task.id, form);
      onSuccess();
    } catch {
      alert('Gagal mengupdate tugas!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Judul tugas..."
        value={form.title}
        onChange={handleChange}
        required
        className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/30', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`}
      />
      <textarea
        name="note"
        placeholder="Catatan (opsional)..."
        value={form.note}
        onChange={handleChange}
        rows={3}
        className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all resize-none ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/30', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`}
      />
      <input
        type="datetime-local"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white/60', 'bg-gray-50 border-gray-200 text-gray-600')}`}
      />
      <div className="flex flex-col gap-2">
        <label className={`flex items-center gap-3 text-sm cursor-pointer ${theme('text-white/50', 'text-gray-500')}`}>
          <input
            type="checkbox"
            name="is_urgent"
            checked={form.is_urgent}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-600"
          />
          Tandai sebagai mendesak
        </label>
        <label className={`flex items-center gap-3 text-sm cursor-pointer ${theme('text-white/50', 'text-gray-500')}`}>
          <input
            type="checkbox"
            name="is_done"
            checked={form.is_done}
            onChange={handleChange}
            className="w-4 h-4 accent-green-500"
          />
          Tandai sebagai selesai
        </label>
      </div>
      <div className="flex gap-2 mt-1">
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 py-2.5 rounded-xl text-sm border transition-all ${theme('border-white/10 text-white/50 hover:bg-white/5', 'border-gray-200 text-gray-500 hover:bg-gray-100')}`}
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

export default TaskEditForm;