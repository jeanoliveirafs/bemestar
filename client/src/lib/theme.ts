import { createTheme } from '@mui/material/styles';

// Tema único - Cores verde menta para todo o aplicativo
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#82B29A', // Verde Menta Suave
      light: '#C5E0D5', // Verde Água Clara
      dark: '#5E7A6E', // Verde Floresta Suave
      contrastText: '#F7FCF8', // Branco Verde
    },
    secondary: {
      main: '#C5E0D5', // Verde Água Clara
      light: '#BCDED6', // Verde Esbranquiçado
      dark: '#82B29A', // Verde Menta Suave
      contrastText: '#5E7A6E', // Verde Floresta Suave
    },
    error: {
      main: '#d32f2f', // Crisis red for emergency situations
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#f57c00', // Warm orange for warnings
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#82B29A', // Using primary mint for info
      light: '#C5E0D5',
      dark: '#5E7A6E',
      contrastText: '#F7FCF8',
    },
    success: {
      main: '#82B29A', // Using primary mint for success
      light: '#C5E0D5',
      dark: '#5E7A6E',
      contrastText: '#F7FCF8',
    },
    background: {
      default: '#F7FCF8', // Branco Verde
      paper: '#FFFFFF', // Pure white for cards
    },
    text: {
      primary: '#5E7A6E', // Verde Floresta Suave
      secondary: '#82B29A', // Verde Menta Suave
    },
    action: {
      hover: '#BCDED6', // Verde Esbranquiçado for hover states
      selected: '#C5E0D5', // Verde Água Clara for selected states
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#5E7A6E', // Verde Floresta Suave
    },
    h2: {
      fontWeight: 600,
      color: '#5E7A6E', // Verde Floresta Suave
    },
    h3: {
      fontWeight: 500,
      color: '#5E7A6E', // Verde Floresta Suave
    },
    body1: {
      color: '#5E7A6E', // Verde Floresta Suave
    },
    body2: {
      color: '#82B29A', // Verde Menta Suave
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #C5E0D5', // Verde Água Clara
          boxShadow: '0 2px 8px rgba(130, 178, 154, 0.1)', // Sombra verde menta suave
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#82B29A', // Verde Menta Suave
          color: '#F7FCF8', // Branco Verde
          '&:hover': {
            backgroundColor: '#5E7A6E', // Verde Floresta Suave
          },
        },
        outlined: {
          borderColor: '#82B29A', // Verde Menta Suave
          color: '#82B29A', // Verde Menta Suave
          '&:hover': {
            backgroundColor: '#BCDED6', // Verde Esbranquiçado
            borderColor: '#5E7A6E', // Verde Floresta Suave
          },
        },
        text: {
          color: '#82B29A', // Verde Menta Suave
          '&:hover': {
            backgroundColor: '#BCDED6', // Verde Esbranquiçado
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #C5E0D5', // Verde Água Clara
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#82B29A', // Verde Menta Suave
          '&:hover': {
            backgroundColor: '#BCDED6', // Verde Esbranquiçado
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#C5E0D5', // Verde Água Clara
            },
            '&:hover fieldset': {
              borderColor: '#82B29A', // Verde Menta Suave
            },
            '&.Mui-focused fieldset': {
              borderColor: '#82B29A', // Verde Menta Suave
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#82B29A', // Verde Menta Suave
          color: '#F7FCF8', // Branco Verde
        },
      },
    },
   },
});

// Exportar apenas o tema único
export const theme = lightTheme;