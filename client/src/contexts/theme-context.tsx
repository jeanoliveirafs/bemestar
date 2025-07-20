import { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/lib/theme';

interface ThemeContextType {
  // Mantém interface para compatibilidade, mas sem funcionalidade
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  // Sempre usar tema claro (verde menta) como padrão
  const currentTheme = lightTheme;
  
  // Função vazia para manter compatibilidade
  const toggleTheme = () => {
    // Não faz nada - tema fixo
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode: false, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <div
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #4A7BA7 0%, #7BA3C0 30%, #B8D4E3 70%, #E8F4F8 100%)',
            color: currentTheme.palette.text.primary,
            transition: 'all 0.5s ease-in-out'
          }}
          className="theme-transition"
        >
          {children}
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}