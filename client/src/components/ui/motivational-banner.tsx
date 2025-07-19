import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';

const motivationalQuotes = [
  "Acredite no seu potencial todos os dias.",
  "Você é mais forte do que imagina.",
  "Cada passo te aproxima do seu sucesso.",
  "A jornada é difícil, mas a vitória vale a pena.",
  "Persistência supera talento.",
  "Sua determinação é sua maior força.",
  "O progresso, não a perfeição, é o que importa.",
  "Você tem o poder de transformar sua vida.",
  "Cada desafio é uma oportunidade de crescer.",
  "Seu bem-estar é prioridade, sempre."
];

export function MotivationalBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        (prevIndex + 1) % motivationalQuotes.length
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95
    }
  };

  return (
    <Box
      sx={{
        mb: { xs: 3, sm: 4, md: 5 },
        mx: { xs: 1, sm: 0 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          background: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.3)'}`,
          borderRadius: { xs: 2, sm: 3, md: 4 },
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: 80, sm: 100, md: 120 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            zIndex: -1
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6
              }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  lineHeight: { xs: 1.4, sm: 1.5 },
                  color: 'text.primary',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                  px: { xs: 1, sm: 2 }
                }}
              >
                {motivationalQuotes[currentQuoteIndex]}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: -20,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
            filter: 'blur(15px)',
            opacity: 0.6
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
            filter: 'blur(20px)',
            opacity: 0.4
          }}
        />
      </Paper>
    </Box>
  );
}