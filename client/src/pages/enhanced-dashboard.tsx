import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  LinearProgress,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Favorite,
  TrendingUp,
  SelfImprovement,
  Psychology,
  CalendarToday,
  ArrowForward
} from '@mui/icons-material';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { MoodSelector } from '@/components/ui/mood-selector';
import { MotivationalBanner } from '@/components/ui/motivational-banner';
import { FixedMotivationalBanner } from '@/components/ui/fixed-motivational-banner';
import { DesabafoCard } from '@/components/ui/desabafo-card';

import { LottieAnimation, breathingAnimation } from '@/components/ui/lottie-animation';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { getTodayDate, getGreeting, getMoodEmoji } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

export default function EnhancedDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const today = getTodayDate();

  const { data: moodEntries = [] } = useQuery({
    queryKey: ['/api/mood', user?.id],
    enabled: !!user?.id,
  });

  const { data: todayHabits = [] } = useQuery({
    queryKey: ['/api/habits', user?.id, today],
    enabled: !!user?.id,
  });

  const habitsArray = Array.isArray(todayHabits) ? todayHabits : [];
  const completedHabitsCount = habitsArray.filter((habit: any) => habit.completed).length;
  const totalHabits = habitsArray.length;
  const habitPercentage = totalHabits > 0 ? Math.round((completedHabitsCount / totalHabits) * 100) : 0;

  const moodArray = Array.isArray(moodEntries) ? moodEntries : [];
  const recentMoodEntries = moodArray.slice(0, 3);
  const consecutiveDays = Math.min(moodArray.length, 7);

  const handleQuickMood = async (mood: number) => {
    if (!user?.id) return;
    
    try {
      await apiRequest('POST', '/api/mood', {
        userId: user.id,
        mood,
        date: today,
        note: 'Registro rápido'
      });
      navigate('/mood');
    } catch (error) {
      console.error('Error recording mood:', error);
    }
  };

  const statsCards = [
    {
      title: 'Dias Consecutivos',
      subtitle: 'Registrando humor',
      value: consecutiveDays,
      icon: CalendarToday,
      color: theme.palette.primary.main,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      delay: 0.1
    },
    {
      title: 'Sessões',
      subtitle: 'Mindfulness este mês',
      value: '12',
      icon: SelfImprovement,
      color: theme.palette.secondary.main,
      gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      delay: 0.2
    },
    {
      title: 'Hábitos',
      subtitle: 'Cumpridos hoje',
      value: `${completedHabitsCount}/${totalHabits}`,
      icon: TrendingUp,
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      delay: 0.3
    },
    {
      title: 'Progresso',
      subtitle: 'Bem-estar geral',
      value: `${habitPercentage}%`,
      icon: Psychology,
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      delay: 0.4
    }
  ];

  const quickActions = [
    {
      title: 'Respiração Guiada',
      subtitle: '5 minutos de calma',
      icon: SelfImprovement,
      action: () => navigate('/mindfulness'),
      color: theme.palette.secondary.main,
      delay: 0.5
    },
    {
      title: 'Desabafar',
      subtitle: 'Espaço seguro para expressar',
      icon: Psychology,
      action: () => navigate('/chat'),
      color: '#8B5CF6',
      delay: 0.6
    },
    {
      title: 'Recursos',
      subtitle: 'Artigos e ajuda profissional',
      icon: Favorite,
      action: () => navigate('/resources'),
      color: theme.palette.primary.main,
      delay: 0.7
    }
  ];

  return (
    <>
      {/* Fixed Motivational Banner */}
      <FixedMotivationalBanner />
      
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.main}10 0%, 
            ${theme.palette.secondary.main}10 50%, 
            ${theme.palette.background.default} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
      {/* Background Decorations */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        sx={{
          position: 'absolute',
          top: { xs: -50, sm: -100 },
          right: { xs: -50, sm: -100 },
          width: { xs: 200, sm: 300, md: 400 },
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          filter: 'blur(40px)',
          display: { xs: 'none', sm: 'block' }
        }}
      />

      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          position: 'relative', 
          zIndex: 1,
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box 
            sx={{ 
              mb: 6, 
              textAlign: 'center',
              px: { xs: 2, sm: 0 }
            }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"}
              component="h1" 
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                lineHeight: 1.2,
                textAlign: 'center'
              }}
            >
              {getGreeting()}, {user?.name || 'Usuário'}!
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                lineHeight: 1.5
              }}
            >
              Seu bem-estar emocional é nossa prioridade.
            </Typography>
          </Box>
        </motion.div>

        {/* Desabafo Card */}
        <Box sx={{ mb: { xs: 5, sm: 7, md: 9 } }}>
          <DesabafoCard />
        </Box>

        {/* Motivational Banner */}
        <Box sx={{ mb: { xs: 5, sm: 7, md: 9 } }}>
          <MotivationalBanner />
        </Box>

        {/* Mood Question Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 4, sm: 6, md: 8 },
              px: { xs: 2, sm: 0 }
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                color: 'text.primary',
                lineHeight: 1.3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Como você está se sentindo hoje?
            </Typography>
          </Box>
        </motion.div>

        {/* Quick Mood Check */}
        <Box sx={{ mb: { xs: 5, sm: 7, md: 9 } }}>
          <AnimatedCard delay={0.2}>
            <Box 
              sx={{
                textAlign: 'center',
                px: { xs: 2, sm: 3 },
                py: { xs: 3, sm: 4 },
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                  mb: { xs: 2, sm: 3 },
                  maxWidth: '100%'
                }}
              >
                <LottieAnimation
                  animationData={breathingAnimation}
                  width={isMobile ? 40 : 50}
                  height={isMobile ? 40 : 50}
                />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  fontWeight={600}
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}
                >
                  Registro Rápido de Humor
                </Typography>
              </Box>
              
              <Box 
                sx={{
                  mb: { xs: 3, sm: 4 },
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                <MoodSelector onMoodSelect={handleQuickMood} />
              </Box>
              
              <AnimatedButton
                variant="outlined"
                onClick={() => navigate('/mood')}
                sx={{ 
                  borderRadius: 3,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.5 },
                  maxWidth: '100%'
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    flexWrap: 'nowrap'
                  }}
                >
                  Ver histórico completo
                  <ArrowForward sx={{ ml: 1, fontSize: { xs: 16, sm: 18 } }} />
                </Box>
              </AnimatedButton>
            </Box>
          </AnimatedCard>
        </Box>

        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: { xs: 3, sm: 5 },
            my: { xs: 5, sm: 7, md: 9 },
            px: { xs: 1, sm: 0 },
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {statsCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: card.delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    minHeight: { xs: 120, sm: 140 },
                    background: card.gradient,
                    color: 'white',
                    borderRadius: { xs: 3, sm: 4 },
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '100%',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                    }
                  }}
                >
                  <Box position="relative" zIndex={1} height="100%">
                    <Box 
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: { xs: 1, sm: 2 },
                        flexWrap: 'nowrap'
                      }}
                    >
                      <Box
                        component={motion.div}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        sx={{
                          width: { xs: 36, sm: 48 },
                          height: { xs: 36, sm: 48 },
                          borderRadius: { xs: 2, sm: 3 },
                          background: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconComponent sx={{ fontSize: { xs: 18, sm: 24 } }} />
                      </Box>
                      <Typography 
                        variant={isMobile ? "h4" : "h3"} 
                        fontWeight={700}
                        sx={{
                          fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.125rem' },
                          textAlign: 'right',
                          lineHeight: 1,
                          wordBreak: 'keep-all',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {card.value}
                      </Typography>
                    </Box>
                    <Typography 
                      variant={isMobile ? "body1" : "h6"} 
                      fontWeight={600} 
                      sx={{
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                        lineHeight: 1.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.9,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {card.subtitle}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            );
          })}
        </Box>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
            gap: { xs: 2, sm: 3, lg: 4 },
            px: { xs: 1, sm: 0 },
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {/* Daily Motivation */}
          <Box>
            <AnimatedCard delay={0.5}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, #8B5CF6)`,
                  color: 'white',
                  borderRadius: { xs: 2, sm: 3 },
                  p: { xs: 2.5, sm: 3, md: 4 },
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: '100%'
                }}
              >
                <Box position="relative" zIndex={1}>
                  <Box 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: { xs: 2, sm: 3 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' },
                      gap: { xs: 1, sm: 0 }
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        borderRadius: { xs: 2, sm: 3 },
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: { xs: 0, sm: 2 },
                        flexShrink: 0
                      }}
                    >
                      <Favorite sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </Box>
                    <Typography 
                      variant={isMobile ? "h6" : "h5"} 
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                        lineHeight: 1.2
                      }}
                    >
                      Mensagem do Dia
                    </Typography>
                  </Box>
                  <Typography 
                    variant={isMobile ? "body1" : "h6"} 
                    sx={{
                      mb: { xs: 2, sm: 3 },
                      lineHeight: 1.6,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    "Cada pequeno passo em direção ao cuidado pessoal é uma vitória. Você está no caminho certo!"
                  </Typography>
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Chip
                      label="Lembre-se: você merece cuidado e carinho"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        maxWidth: '100%',
                        height: 'auto',
                        '& .MuiChip-label': {
                          padding: { xs: '4px 8px', sm: '6px 12px' },
                          whiteSpace: 'normal',
                          lineHeight: 1.3
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </AnimatedCard>
          </Box>

          {/* Quick Actions */}
          <Box>
            <AnimatedCard delay={0.6}>
              <Box sx={{ p: { xs: 1, sm: 0 } }}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  fontWeight={600} 
                  sx={{
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                    textAlign: 'center'
                  }}
                >
                  Ações Rápidas
                </Typography>
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1.5, sm: 2 },
                    maxWidth: '100%'
                  }}
                >
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: action.delay, duration: 0.5 }}
                        whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Paper
                          onClick={action.action}
                          sx={{
                            p: { xs: 2, sm: 2.5, md: 3 },
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${action.color}20`,
                            borderRadius: { xs: 2, sm: 3 },
                            transition: 'all 0.3s ease',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            '&:hover': {
                              background: `${action.color}10`,
                              borderColor: `${action.color}40`,
                              transform: 'translateY(-2px)',
                            },
                            '&:active': {
                              transform: 'translateY(0px)',
                            }
                          }}
                        >
                          <Box 
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'nowrap',
                              width: '100%'
                            }}
                          >
                            <Box
                              sx={{
                                width: { xs: 36, sm: 40 },
                                height: { xs: 36, sm: 40 },
                                borderRadius: { xs: 1.5, sm: 2 },
                                background: `${action.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: { xs: 1.5, sm: 2 },
                                flexShrink: 0
                              }}
                            >
                              <IconComponent 
                                sx={{ 
                                  color: action.color, 
                                  fontSize: { xs: 18, sm: 20 } 
                                }} 
                              />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="body1" 
                                fontWeight={600} 
                                color="text.primary"
                                sx={{
                                  fontSize: { xs: '0.9rem', sm: '1rem' },
                                  lineHeight: 1.2,
                                  mb: 0.5,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {action.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{
                                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                  lineHeight: 1.3,
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}
                              >
                                {action.subtitle}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </motion.div>
                    );
                  })}
                </Box>
              </Box>
            </AnimatedCard>
          </Box>
        </Box>

        {/* Recent Activities */}
        <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
          <AnimatedCard delay={0.8}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight={600} 
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                textAlign: 'center'
              }}
            >
              Atividades Recentes
            </Typography>
            {recentMoodEntries.length > 0 ? (
              <Box display="flex" flexDirection="column" gap={2}>
                {recentMoodEntries.map((entry: any, index: number) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Typography sx={{ fontSize: 24, mr: 2 }}>
                          {getMoodEmoji(entry.mood)}
                        </Typography>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            Humor registrado: {getMoodEmoji(entry.mood)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(entry.date).toLocaleDateString('pt-BR')}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            ) : (
              <Box textAlign="center" py={8}>
                <Typography variant="h4" sx={{ mb: 2, opacity: 0.3 }}>
                  😊
                </Typography>
                <Typography color="text.secondary">
                  Registre seu primeiro humor para começar!
                </Typography>
              </Box>
            )}
          </AnimatedCard>
        </Box>
      </Container>
    </Box>
    </>
  );
}