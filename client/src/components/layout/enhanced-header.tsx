import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  DarkMode,
  LightMode,
  Dashboard,
  Mood,
  SelfImprovement,
  Chat,
  LibraryBooks,
  Emergency,
  Settings,
  AccountCircle,
  Logout
} from '@mui/icons-material';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useThemeContext } from '@/contexts/theme-context';
import { LottieAnimation, heartbeatAnimation } from '@/components/ui/lottie-animation';

export function EnhancedHeader() {
  const { user, signOut } = useAuth();
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Dashboard },
    { path: '/mood', label: 'Humor', icon: Mood },
    { path: '/mindfulness', label: 'Mindfulness', icon: SelfImprovement },
    { path: '/chat', label: 'Chat', icon: Chat },
    { path: '/resources', label: 'Recursos', icon: LibraryBooks },
  ];

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };



  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80 }}>
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <LottieAnimation
                  animationData={heartbeatAnimation}
                  width={40}
                  height={40}
                />
              </motion.div>
              <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Refúgio Digital
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={1}>
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        mx: 1,
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        background: isActive 
                          ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                          : 'transparent',
                        color: isActive ? 'white' : 'text.primary',
                        '&:hover': {
                          background: isActive 
                            ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                            : 'rgba(59, 130, 246, 0.1)',
                        }
                      }}
                    >
                      <IconComponent sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" fontWeight={600}>
                        {item.label}
                      </Typography>
                    </IconButton>
                  </motion.div>
                );
              })}
            </Box>
          )}

          {/* Right Section */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* SOS Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={() => navigate('/sos')}
                sx={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: 'white',
                  px: 2,
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                  }
                }}
              >
                <Emergency sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" fontWeight={600}>
                  SOS
                </Typography>
              </IconButton>
            </motion.div>

            {/* Toggle de tema removido - tema fixo */}

            {/* User Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton onClick={handleUserMenuOpen}>
                <Avatar
                  sx={{
                    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                    width: 40,
                    height: 40
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </motion.div>

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
              </motion.div>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <MenuItem>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { navigate('/settings'); handleUserMenuClose(); }}>
          <Settings sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
          Configurações
        </MenuItem>
        <MenuItem onClick={signOut}>
          <Logout sx={{ mr: 2, fontSize: 20, color: 'error.main' }} />
          Sair do Refúgio
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        <List>
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mx: 2,
                    my: 1,
                    borderRadius: 2,
                    background: isActive 
                      ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                      : 'transparent',
                    color: isActive ? 'white' : 'text.primary',
                    '&:hover': {
                      background: isActive 
                        ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                        : 'rgba(59, 130, 246, 0.1)',
                    }
                  }}
                >
                  <ListItemIcon>
                    <IconComponent sx={{ color: isActive ? 'white' : 'text.primary' }} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </motion.div>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}