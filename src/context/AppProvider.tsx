import { ThemeProvider } from '@/context/theme/ThemeProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      {children}
    </ThemeProvider>
  );
}
