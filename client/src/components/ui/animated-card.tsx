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
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          ...props.sx
        }}
      >
        <CardContent sx={{ padding: 3 }}>
          {children}
        </CardContent>
      </MuiCard>
    </motion.div>
  );
}