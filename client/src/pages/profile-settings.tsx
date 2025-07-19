import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Settings,
  Person,
  Email,
  Lock,
  CameraAlt,
  Language,
  Notifications,
  Brightness4,
  Brightness7,
  Accessibility,
  Save,
  Visibility,
  VisibilityOff,
  Edit
} from '@mui/icons-material';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { LottieAnimation, heartbeatAnimation } from '@/components/ui/lottie-animation';

export default function ProfileSettings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estado dos formulários
  const [formData, setFormData] = useState({
    username: 'João Silva',
    email: 'joao.silva@email.com',
    language: 'pt-BR',
    notifications: true,
    darkMode: theme.palette.mode === 'dark',
    accessibilityMode: false,
    profileImage: null as File | null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState({
    username: false,
    email: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSaveSettings = () => {
    // Placeholder para futura integração com Supabase
    console.log('Configurações a serem salvas:', formData);
    // TODO: Integrar com Supabase para salvar configurações do usuário
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.main}08 0%, 
          ${theme.palette.secondary.main}08 50%, 
          ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorations */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2 }}
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box display="flex" alignItems="center" mb={6}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 3
              }}
            >
              <Settings sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                fontWeight={700}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                Configurações de Perfil
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Personalize sua experiência no Refúgio Digital
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 4
            }}
          >
            {/* Profile Information Card */}
            <motion.div variants={itemVariants}>
              <AnimatedCard delay={0.1}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Person sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h5" fontWeight={600}>
                    Informações Pessoais
                  </Typography>
                </Box>

                {/* Profile Image Section */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                  <Box position="relative" mb={2}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: 48,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      }}
                    >
                      {formData.username.charAt(0)}
                    </Avatar>
                    <IconButton
                      component="label"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        border: `2px solid ${theme.palette.background.default}`,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        }
                      }}
                    >
                      <CameraAlt sx={{ fontSize: 20 }} />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Clique no ícone da câmera para alterar sua foto
                  </Typography>
                </Box>

                {/* Username Field */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Nome de usuário"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!editMode.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setEditMode(prev => ({ ...prev, username: !prev.username }))}
                            edge="end"
                          >
                            <Edit sx={{ fontSize: 20 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>

                {/* Email Field */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editMode.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setEditMode(prev => ({ ...prev, email: !prev.email }))}
                            edge="end"
                          >
                            <Edit sx={{ fontSize: 20 }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>

                {/* Password Section */}
                <Box mb={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Lock />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    Alterar Senha
                  </Button>
                </Box>
              </AnimatedCard>
            </motion.div>

            {/* Settings Card */}
            <motion.div variants={itemVariants}>
              <AnimatedCard delay={0.2}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Settings sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h5" fontWeight={600}>
                    Preferências
                  </Typography>
                </Box>

                {/* Language Selection */}
                <Box mb={4}>
                  <FormControl fullWidth>
                    <InputLabel>Idioma</InputLabel>
                    <Select
                      value={formData.language}
                      label="Idioma"
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <Language sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        </InputAdornment>
                      }
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                      <MenuItem value="en-US">English (US)</MenuItem>
                      <MenuItem value="es-ES">Español</MenuItem>
                      <MenuItem value="fr-FR">Français</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Notifications Toggle */}
                <Box mb={4}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <Notifications sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            Notificações
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Receber lembretes e atualizações
                          </Typography>
                        </Box>
                      </Box>
                      <Switch
                        checked={formData.notifications}
                        onChange={(e) => handleInputChange('notifications', e.target.checked)}
                        color="primary"
                      />
                    </Box>
                  </Paper>
                </Box>

                {/* Seção de tema escuro removida - tema fixo */}

                {/* Accessibility Mode */}
                <Box mb={4}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <Accessibility sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            Modo Acessibilidade
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Texto maior e melhor contraste
                          </Typography>
                        </Box>
                      </Box>
                      <Switch
                        checked={formData.accessibilityMode}
                        onChange={(e) => handleInputChange('accessibilityMode', e.target.checked)}
                        color="primary"
                      />
                    </Box>
                  </Paper>
                </Box>
              </AnimatedCard>
            </motion.div>
          </Box>

          {/* Save Button Section */}
          <motion.div variants={itemVariants}>
            <Box mt={6} display="flex" justifyContent="center">
              <AnimatedCard delay={0.4}>
                <Box textAlign="center" p={2}>
                  <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                    <LottieAnimation
                      animationData={heartbeatAnimation}
                      width={60}
                      height={60}
                    />
                  </Box>
                  <Typography variant="h6" mb={3} color="text.secondary">
                    Suas configurações estão prontas para serem salvas
                  </Typography>
                  <AnimatedButton
                    onClick={handleSaveSettings}
                    size="large"
                    startIcon={<Save />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: 'white',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      }
                    }}
                    glow
                  >
                    Salvar Configurações
                  </AnimatedButton>
                </Box>
              </AnimatedCard>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}