import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      language: 'id',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24',
    };
  });

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    localStorage.setItem('settings', JSON.stringify(updated));
    setSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}