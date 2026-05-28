import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { profileService } from '../services/profile.service';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const translations = {
  id: {
    title: 'Profile Saya',
    subtitle: 'Kelola informasi akun kamu.',
    joinedSince: 'Bergabung sejak',
    editName: 'Edit Nama',
    name: 'Nama',
    email: 'Email',
    saveChanges: 'Simpan Perubahan',
    nameSuccess: 'Nama berhasil diubah!',
    nameError: 'Gagal mengubah nama',
    changePassword: 'Ganti Password',
    oldPassword: 'Password lama',
    newPassword: 'Password baru',
    confirmPassword: 'Konfirmasi password baru',
    passSuccess: 'Password berhasil diubah!',
    passError: 'Gagal mengubah password',
    passNotMatch: 'Konfirmasi password tidak cocok',
    dangerZone: 'Zona Berbahaya',
    dangerDesc: 'Keluar dari akun kamu di perangkat ini.',
    logout: '→ Keluar dari akun',
  },
  en: {
    title: 'My Profile',
    subtitle: 'Manage your account information.',
    joinedSince: 'Joined since',
    editName: 'Edit Name',
    name: 'Name',
    email: 'Email',
    saveChanges: 'Save Changes',
    nameSuccess: 'Name updated successfully!',
    nameError: 'Failed to update name',
    changePassword: 'Change Password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
    passSuccess: 'Password updated successfully!',
    passError: 'Failed to update password',
    passNotMatch: 'Passwords do not match',
    dangerZone: 'Danger Zone',
    dangerDesc: 'Sign out from your account on this device.',
    logout: '→ Sign out',
  },
};

function ProfilePage() {
  const { isDark } = useTheme();
  const { user, login, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const theme = (dark, light) => isDark ? dark : light;
  const lang = translations[settings.language] || translations.id;

  const [profile, setProfile] = useState(null);
  const [nameForm, setNameForm] = useState({ name: '' });
  const [passForm, setPassForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [nameMsg, setNameMsg] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');

  const fetchProfile = async () => {
    const data = await profileService.getProfile();
    setProfile(data);
    setNameForm({ name: data.name });
  };

  useEffect(() => { fetchProfile(); }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setNameError('');
    setNameMsg('');
    try {
      const updated = await profileService.updateProfile(nameForm);
      login({ ...user, name: updated.name }, localStorage.getItem('token'));
      setNameMsg(lang.nameSuccess);
    } catch (err) {
      setNameError(err.response?.data?.message || lang.nameError);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassMsg('');
    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError(lang.passNotMatch);
      return;
    }
    try {
      await profileService.updatePassword({
        oldPassword: passForm.oldPassword,
        newPassword: passForm.newPassword,
      });
      setPassMsg(lang.passSuccess);
      setPassForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPassError(err.response?.data?.message || lang.passError);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const inputClass = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-all ${theme('bg-[#0d0f14] border-white/10 text-white placeholder-white/20', 'bg-gray-50 border-gray-200 text-gray-800')}`;
  const labelClass = `text-xs mb-1.5 block ${theme('text-white/50', 'text-gray-500')}`;
  const cardClass = `border rounded-2xl p-6 ${theme('bg-[#1a1d24] border-white/10', 'bg-white border-gray-200')}`;

  const formatJoinDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(
      settings.language === 'en' ? 'en-US' : 'id-ID',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
  };

  return (
    <div className={`flex min-h-screen ${theme('bg-[#0d0f14] text-white', 'bg-gray-100 text-gray-800')}`}>
      <Sidebar activeMenu="" onMenuChange={() => navigate('/')} counts={{}} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{lang.title}</h1>
            <p className={`text-sm mt-1 ${theme('text-white/40', 'text-gray-400')}`}>{lang.subtitle}</p>
          </div>

          <div className={`${cardClass} mb-4 flex items-center gap-4`}>
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {getInitials(profile?.name)}
            </div>
            <div>
              <p className={`font-semibold text-lg ${theme('text-white', 'text-gray-800')}`}>{profile?.name}</p>
              <p className={`text-sm ${theme('text-white/40', 'text-gray-400')}`}>{profile?.email}</p>
              <p className={`text-xs mt-1 ${theme('text-white/30', 'text-gray-400')}`}>
                {lang.joinedSince} {formatJoinDate(profile?.created_at)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={cardClass}>
              <h2 className={`font-semibold mb-4 ${theme('text-white', 'text-gray-800')}`}>{lang.editName}</h2>
              {nameMsg && <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-2.5 rounded-xl mb-3">{nameMsg}</div>}
              {nameError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl mb-3">{nameError}</div>}
              <form onSubmit={handleUpdateName} className="flex flex-col gap-3">
                <div>
                  <label className={labelClass}>{lang.name}</label>
                  <input
                    type="text"
                    value={nameForm.name}
                    onChange={e => setNameForm({ name: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{lang.email}</label>
                  <input
                    type="text"
                    value={profile?.email || ''}
                    disabled
                    className={`${inputClass} opacity-50 cursor-not-allowed`}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all">
                  {lang.saveChanges}
                </button>
              </form>
            </div>

            <div className={cardClass}>
              <h2 className={`font-semibold mb-4 ${theme('text-white', 'text-gray-800')}`}>{lang.changePassword}</h2>
              {passMsg && <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-2.5 rounded-xl mb-3">{passMsg}</div>}
              {passError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl mb-3">{passError}</div>}
              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-3">
                <div>
                  <label className={labelClass}>{lang.oldPassword}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passForm.oldPassword}
                    onChange={e => setPassForm({ ...passForm, oldPassword: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{lang.newPassword}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passForm.newPassword}
                    onChange={e => setPassForm({ ...passForm, newPassword: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{lang.confirmPassword}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passForm.confirmPassword}
                    onChange={e => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all">
                  {lang.changePassword}
                </button>
              </form>
            </div>
          </div>

          <div className={`${cardClass} mt-4 border-red-500/20`}>
            <h2 className="font-semibold text-red-400 mb-2">{lang.dangerZone}</h2>
            <p className={`text-sm mb-4 ${theme('text-white/40', 'text-gray-400')}`}>{lang.dangerDesc}</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm px-4 py-2 rounded-xl border border-red-500/20 transition-all"
            >
              {lang.logout}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;