import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/providers/JWTProvider';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRouting } from '@/routing';
import { PathnameProvider } from '@/providers';
import { Toaster } from '@/components/ui/sonner';

const { BASE_URL } = import.meta.env;

const App = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);

  return (
    <AuthProvider>  {/* ✅ Wrap the entire app inside AuthProvider */}
      <BrowserRouter
        basename={BASE_URL}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}
      >
        <PathnameProvider>
          <AppRouting />
        </PathnameProvider>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export { App };
