import { createTheme } from '@mui/material/styles';

// Tema único - Nova paleta azul suave para todo o aplicativo
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E5984', // Azul mais escuro e vibrante
      light: '#4A7BA7', // Tom intermediário
      dark: '#1A3A5C', // Tom bem escuro
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5A8AA8', // Azul médio
      light: '#7BA3C0', // Tom mais claro
      dark: '#3D6B85', // Tom mais escuro
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#d32f2f', // Vermelho para situações de crise
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#f57c00', // Laranja para avisos
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#64B5F6',
      light: '#E3F2FD',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#81C784',
      light: '#C8E6C9',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#E8F4F8', // Fundo mais neutro
      paper: '#FFFFFF', // Branco puro para cards
    },
    text: {
      primary: '#1A3A5C', // Texto principal bem escuro
      secondary: '#2E5984', // Texto secundário com cor primária
    },
    action: {
      hover: '#E1F0F7', // Hover mais sutil
      selected: '#B8D4E3', // Seleção mais visível
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#1A3A5C', // Cor bem escura para títulos principais
    },
    h2: {
      fontWeight: 600,
      color: '#1A3A5C', // Cor bem escura para subtítulos
    },
    h3: {
      fontWeight: 600,
      color: '#2E5984', // Cor primária para títulos menores
    },
    body1: {
      color: '#1A3A5C', // Cor bem escura para texto principal
      fontWeight: 400,
    },
    body2: {
      color: '#2E5984', // Cor primária para texto secundário
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Branco puro para máximo contraste
          border: '2px solid #B8D4E3', // Borda mais visível
          boxShadow: '0 4px 12px rgba(46, 89, 132, 0.15)', // Sombra mais pronunciada com cor primária
          borderRadius: 16, // Bordas mais arredondadas
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#2E5984', // Nova cor primária
          color: '#FFFFFF', // Branco para contraste
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#1A3A5C', // Tom mais escuro no hover
            boxShadow: '0 4px 8px rgba(26, 58, 92, 0.3)',
          },
        },
        outlined: {
          borderColor: '#2E5984', // Nova cor primária
          color: '#2E5984', // Nova cor primária
          borderWidth: '2px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#E1F0F7', // Hover mais sutil
            borderColor: '#1A3A5C', // Tom mais escuro
            borderWidth: '2px',
          },
        },
        text: {
          color: '#2E5984', // Nova cor primária
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#E1F0F7', // Hover mais sutil
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Branco puro
          border: '1px solid #B8D4E3', // Borda mais visível
          boxShadow: '0 2px 8px rgba(46, 89, 132, 0.1)', // Sombra com cor primária
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#2E5984', // Nova cor primária
          '&:hover': {
            backgroundColor: '#E1F0F7', // Hover mais sutil
            color: '#1A3A5C', // Cor mais escura no hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#B8D4E3', // Borda mais visível
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#2E5984', // Nova cor primária
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2E5984', // Nova cor primária
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#2E5984', // Label com cor primária
            fontWeight: 500,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E5984', // Nova cor primária
          color: '#FFFFFF', // Branco para contraste
          boxShadow: '0 2px 8px rgba(46, 89, 132, 0.2)',
        },
      },
    },
   },
});

// Exportar apenas o tema único
export const theme = lightTheme;