import { motion } from 'framer-motion';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { getMoodEmoji, getMoodLabel } from '@/lib/utils';

interface MoodSelectorProps {
  selectedMood?: number;
  onMoodSelect: (mood: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function MoodSelector({ selectedMood, onMoodSelect, size = 'md' }: MoodSelectorProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width:400px)');
  const moods = [1, 2, 3, 4, 5];
  
  const getEmojiSize = () => {
    if (isExtraSmall) return { fontSize: '1.5rem' }; // 24px for very small screens
    if (isMobile) return { fontSize: '2rem' }; // 32px for mobile
    
    switch (size) {
      case 'sm':
        return { fontSize: '1.75rem' }; // 28px
      case 'lg':
        return { fontSize: '3rem' }; // 48px
      default:
        return { fontSize: '2.5rem' }; // 40px
    }
  };

  const getButtonSize = () => {
    if (isExtraSmall) return { width: 48, height: 48, minWidth: 48 };
    if (isMobile) return { width: 56, height: 56, minWidth: 56 };
    
    switch (size) {
      case 'sm':
        return { width: 52, height: 52, minWidth: 52 };
      case 'lg':
        return { width: 72, height: 72, minWidth: 72 };
      default:
        return { width: 64, height: 64, minWidth: 64 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: 1, sm: 2 }
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2, md: 3 },
            maxWidth: '100%'
          }}
        >
          {moods.map((mood, index) => (
            <motion.div
              key={mood}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: { xs: '20%', sm: 'auto' },
                  minWidth: { xs: 60, sm: 80 }
                }}
              >
                <IconButton
                  onClick={() => onMoodSelect(mood)}
                  sx={{
                    ...getButtonSize(),
                    borderRadius: 3,
                    border: selectedMood === mood 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : '2px solid transparent',
                    backgroundColor: selectedMood === mood 
                      ? `${theme.palette.primary.main}15` 
                      : 'transparent',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: selectedMood === mood 
                        ? `${theme.palette.primary.main}25` 
                        : `${theme.palette.primary.main}10`,
                      borderColor: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                    },
                    '&:active': {
                      transform: 'translateY(0px)',
                    }
                  }}
                >
                  <Typography
                    sx={{
                      ...getEmojiSize(),
                      lineHeight: 1,
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getMoodEmoji(mood)}
                  </Typography>
                </IconButton>
                
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontWeight: 500,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {getMoodLabel(mood)}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
