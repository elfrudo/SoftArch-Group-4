import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useTheme } from '../context/ThemeContext';

function RegisterPage() {
  const { isDark } = useTheme();
  const theme = (dark, light) => isDark ? dark : light;
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.register(form);
      navigate('/login', { state: { message: 'Registrasi berhasil! Silakan login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme('bg-[#0d0f14]', 'bg-gray-100')}`}>
      <div className={`w-full max-w-sm border rounded-2xl p-8 ${theme('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
          <span className={`font-semibold text-lg ${theme('text-white', 'text-gray-800')}`}>Taskly</span>
        </div>

        <h1 className={`text-xl font-semibold mb-1 ${theme('text-white', 'text-gray-800')}`}>Daftar Akun</h1>
        <p className={`text-sm mb-6 ${theme('text-white/40', 'text-gray-400')}`}>Buat akun baru kamu di Taskly.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className={`text-xs mb-1.5 block ${theme('text-white/50', 'text-gray-500')}`}>Nama</label>
            <input
              type="text"
              name="name"
              placeholder="Nama kamu"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/20', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`}
            />
          </div>
          <div>
            <label className={`text-xs mb-1.5 block ${theme('text-white/50', 'text-gray-500')}`}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="emailkamu@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/20', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`}
            />
          </div>
          <div>
            <label className={`text-xs mb-1.5 block ${theme('text-white/50', 'text-gray-500')}`}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/20', 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400')}`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all mt-2 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className={`text-sm text-center mt-6 ${theme('text-white/40', 'text-gray-400')}`}>
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;