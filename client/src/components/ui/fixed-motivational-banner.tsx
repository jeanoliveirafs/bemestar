import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

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

export function FixedMotivationalBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    // Trocar a frase a cada 5 minutos (300000ms)
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        (prevIndex + 1) % motivationalQuotes.length
      );
    }, 300000); // 5 minutos

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
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 1, sm: 1.5 },
        backdropFilter: 'blur(10px)',
        background: theme.palette.mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderBottom: `1px solid ${theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'}`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.5)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 50, sm: 60, md: 70 },
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
            style={{ width: '100%' }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
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

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            left: -10,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
            filter: 'blur(10px)',
            opacity: 0.6
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -10,
            right: -10,
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}30, ${theme.palette.primary.main}30)`,
            filter: 'blur(15px)',
            opacity: 0.4
          }}
        />
      </Box>
    </Box>
  );
}