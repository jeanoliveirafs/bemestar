import { motion } from 'framer-motion';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  glow?: boolean;
}

export function AnimatedButton({ children, glow = false, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <MuiButton
        {...props}
        sx={{
          background: glow 
            ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
            : undefined,
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
          boxShadow: glow 
            ? '0 8px 32px rgba(59, 130, 246, 0.3)'
            : undefined,
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: glow 
              ? '0 12px 40px rgba(59, 130, 246, 0.4)'
              : '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
          ...props.sx
        }}
      >
        {children}
      </MuiButton>
    </motion.div>
  );
}