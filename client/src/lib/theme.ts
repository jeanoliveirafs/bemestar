import { createTheme } from '@mui/material/styles';

// Tema único - Nova paleta de cores para bem-estar mental
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4C7EF3', // Azul médio vibrante (foco e ações)
      light: '#7BA3F7', // Tom mais claro
      dark: '#3A5FBF', // Tom mais escuro
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6ED4B2', // Verde água (apoio e progresso)
      light: '#8FDCC5', // Tom mais claro
      dark: '#4FB896', // Tom mais escuro
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF8C94', // Rosa suave (apoio emocional)
      light: '#FFB3BA',
      dark: '#E6707A',
      contrastText: '#fff',
    },
    warning: {
      main: '#F8961E', // Laranja para ícones de humor
      light: '#FFD166', // Amarelo quente para ícones de humor
      dark: '#E6850A',
      contrastText: '#fff',
    },
    info: {
      main: '#4C7EF3', // Usando cor primária
      light: '#7BA3F7',
      dark: '#3A5FBF',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#6ED4B2', // Usando cor secundária
      light: '#8FDCC5',
      dark: '#4FB896',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FBFD', // Quase branco com toque de azul
      paper: '#FFFFFF', // Branco puro para cartões neutros
    },
    text: {
      primary: '#222222', // Alto contraste
      secondary: '#6B7280', // Cinza neutro
    },
    action: {
      hover: '#F0F4FF', // Hover sutil com toque azul
      selected: '#E8F0FE', // Seleção com azul muito claro
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#222222', // Alto contraste para títulos principais
    },
    h2: {
      fontWeight: 600,
      color: '#222222', // Alto contraste para subtítulos
    },
    h3: {
      fontWeight: 600,
      color: '#4C7EF3', // Cor primária para títulos menores
    },
    body1: {
      color: '#222222', // Alto contraste para texto principal
      fontWeight: 400,
    },
    body2: {
      color: '#6B7280', // Cinza neutro para texto secundário
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 16, // Bordas arredondadas conforme especificado
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Branco puro para cartões neutros
          border: 'none', // Sem borda para design mais limpo
          boxShadow: '0 8px 32px rgba(76, 126, 243, 0.15), 0 2px 8px rgba(76, 126, 243, 0.1)', // Sombra azul destacada
          borderRadius: 16, // Bordas arredondadas conforme especificado
          padding: '24px', // Bastante espaçamento interno
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#4C7EF3', // Azul médio vibrante (foco e ações)
          color: '#FFFFFF', // Branco para contraste
          fontWeight: 600,
          borderRadius: 16, // Bordas arredondadas
          padding: '12px 24px', // Espaçamento generoso
          '&:hover': {
            backgroundColor: '#3A5FBF', // Tom mais escuro no hover
            boxShadow: '0 6px 20px rgba(76, 126, 243, 0.3)',
          },
        },
        outlined: {
          borderColor: '#4C7EF3', // Cor primária
          color: '#4C7EF3', // Cor primária
          borderWidth: '2px',
          fontWeight: 600,
          borderRadius: 16, // Bordas arredondadas
          padding: '12px 24px', // Espaçamento generoso
          '&:hover': {
            backgroundColor: '#F0F4FF', // Hover sutil
            borderColor: '#3A5FBF', // Tom mais escuro
            borderWidth: '2px',
          },
        },
        text: {
          color: '#4C7EF3', // Cor primária
          fontWeight: 600,
          borderRadius: 16, // Bordas arredondadas
          padding: '12px 24px', // Espaçamento generoso
          '&:hover': {
            backgroundColor: '#F0F4FF', // Hover sutil
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