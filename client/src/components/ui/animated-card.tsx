import { motion } from 'framer-motion';
import { Card as MuiCard, CardContent, CardProps } from '@mui/material';
import { ReactNode } from 'react';

interface AnimatedCardProps extends CardProps {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({ children, delay = 0, hover = true, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : undefined}
    >
      <MuiCard 
        {...props}
        sx={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12), 0 2px 16px rgba(59, 130, 246, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2), 0 8px 32px rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          },
          ...props.sx
        }}
      >
        <CardContent sx={{ padding: { xs: 3, sm: 4 }, position: 'relative', zIndex: 1 }}>
          {children}
        </CardContent>
      </MuiCard>
    </motion.div>
  );
}