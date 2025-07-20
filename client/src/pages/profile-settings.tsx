import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Settings,
  Person,
  Email,
  Lock,
  CameraAlt,
  Language,
  Notifications,
  Accessibility,
  Save,
  Edit,
  CheckCircle
} from '@mui/icons-material';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { LottieAnimation, heartbeatAnimation } from '@/components/ui/lottie-animation';
import { useUserProfile } from '@/hooks/use-user-profile';
import { useAuth } from '@/hooks/use-auth';

export default function ProfileSettings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useUserProfile();
  
  // Estado dos formulários
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
    language: 'pt-BR',
    notifications: true,
    accessibilityMode: false,
    profileImage: null as File | null
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    phone: false,
    bio: false
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Preencher dados do formulário quando o perfil for carregado
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        language: profile.preferences?.language || 'pt-BR',
        notifications: profile.preferences?.notifications ?? true,
        accessibilityMode: profile.preferences?.accessibilityMode ?? false,
        profileImage: null
      });
    } else if (user && !loading) {
      // Fallback para dados do usuário autenticado
      setFormData(prev => ({
        ...prev,
        username: user.name || user.email?.split('@')[0] || '',
        email: user.email || ''
      }));
    }
  }, [profile, user, loading]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar mensagens de sucesso/erro ao editar
    if (saveSuccess) setSaveSuccess(false);
    if (saveError) setSaveError(null);
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

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const updates = {
        name: formData.username,
        email: formData.email,
        phone: formData.phone || null,
        bio: formData.bio || null,
        preferences: {
          language: formData.language,
          notifications: formData.notifications,
          accessibilityMode: formData.accessibilityMode
        }
      };

      const result = await updateProfile(updates);
      
      if (result.success) {
        setSaveSuccess(true);
        // Desabilitar modo de edição após salvar
        setEditMode({
          username: false,
          email: false,
          phone: false,
          bio: false
        });
        
        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(result.error || 'Erro ao salvar configurações');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Erro inesperado ao salvar');
    } finally {
      setSaving(false);
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

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <Alert 
            severity="success" 
            icon={<CheckCircle />}
            sx={{ mb: 4 }}
          >
            Configurações salvas com sucesso!
          </Alert>
        )}

        {/* Save Error Message */}
        {saveError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {saveError}
          </Alert>
        )}

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
                      {formData.username.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
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

                {/* Phone Field */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!editMode.phone}
                    placeholder="(11) 99999-9999"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-phone" style={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setEditMode(prev => ({ ...prev, phone: !prev.phone }))}
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

                {/* Bio Field */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Biografia"
                    multiline
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!editMode.bio}
                    placeholder="Conte um pouco sobre você..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <i className="fas fa-user-edit" style={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <IconButton
                            onClick={() => setEditMode(prev => ({ ...prev, bio: !prev.bio }))}
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
                    disabled={saving || loading}
                    startIcon={saving ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Save />}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: 'white',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                      '&:disabled': {
                        background: 'rgba(0, 0, 0, 0.12)',
                        color: 'rgba(0, 0, 0, 0.26)'
                      }
                    }}
                    glow={!saving}
                  >
                    {saving ? 'Salvando...' : 'Salvar Configurações'}
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