import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const ParticleBackground = ({ count = 20, color = 'var(--accent-primary)' }: { count?: number, color?: string }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.3, 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: [null, Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [null, Math.random() * 100 + '%', Math.random() * 100 + '%'],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: color,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

export const TiltCard = ({ children, className, style, onClick }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function resetMouse() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        perspective: 1000,
        ...style
      }}
    >
      <motion.div
        className={className}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
