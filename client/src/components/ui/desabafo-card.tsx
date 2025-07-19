import { motion } from 'framer-motion';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Chat, Favorite } from '@mui/icons-material';
import { AnimatedButton } from '@/components/ui/animated-button';
import { useLocation } from 'wouter';

export function DesabafoCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [, navigate] = useLocation();

  const handleNavigateToChat = () => {
    navigate('/chat');
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.3 },
    glow: {
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(236, 72, 153, 0.2)' 
            : 'rgba(236, 72, 153, 0.15)'}`,
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(236, 72, 153, 0.1), 0 4px 16px rgba(139, 92, 246, 0.1)'
            : '0 8px 32px rgba(236, 72, 153, 0.08), 0 4px 16px rgba(139, 92, 246, 0.08)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          mx: { xs: 1, sm: 0 },
          mb: { xs: 3, sm: 4 },
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(236, 72, 153, 0.15), 0 6px 20px rgba(139, 92, 246, 0.15)'
              : '0 12px 40px rgba(236, 72, 153, 0.12), 0 6px 20px rgba(139, 92, 246, 0.12)',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(236, 72, 153, 0.3)' 
              : 'rgba(236, 72, 153, 0.25)',
          }
        }}
      >
        {/* Background Glow Effect */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="glow"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: `radial-gradient(circle, ${theme.palette.secondary.main}20 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Icon with Pulse Animation */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, sm: 3 }
            }}
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="pulse"
            >
              <Box
                sx={{
                  width: { xs: 60, sm: 70, md: 80 },
                  height: { xs: 60, sm: 70, md: 80 },
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 20px ${theme.palette.secondary.main}40`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    opacity: 0.3,
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }
                }}
              >
                <Chat 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32, md: 36 },
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }} 
                />
              </Box>
            </motion.div>
          </Box>

          {/* Main Title */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            sx={{
              fontWeight: 700,
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              lineHeight: 1.2,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            💬 Espaço de Desabafo
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: '100%',
              mx: 'auto'
            }}
          >
            ❤️‍🩹 Um lugar seguro para expressar seus sentimentos.
          </Typography>

          {/* Call to Action Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedButton
              onClick={handleNavigateToChat}
              variant="contained"
              size={isMobile ? "medium" : "large"}
              glow
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: 4,
                textTransform: 'none',
                boxShadow: `0 4px 20px ${theme.palette.secondary.main}40`,
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 6px 25px ${theme.palette.secondary.main}60`,
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.6s ease',
                },
                '&:hover::before': {
                  left: '100%',
                }
              }}
            >
              <Favorite sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />
              Quero conversar agora
            </AnimatedButton>
          </motion.div>
        </Box>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 10, sm: 15 },
            left: { xs: 10, sm: 15 },
            width: { xs: 40, sm: 60 },
            height: { xs: 40, sm: 60 },
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            filter: 'blur(20px)',
            opacity: 0.6,
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 10, sm: 15 },
            right: { xs: 10, sm: 15 },
            width: { xs: 50, sm: 80 },
            height: { xs: 50, sm: 80 },
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}15, ${theme.palette.primary.main}15)`,
            filter: 'blur(25px)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}
        />
      </Paper>
    </motion.div>
  );
}