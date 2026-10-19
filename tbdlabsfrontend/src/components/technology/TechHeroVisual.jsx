import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { STACK_ASSETS } from '../../content/stackAssets.js';

const STACK_POOL = [
  { key: 'react', name: 'React' },
  { key: 'django', name: 'Django' },
  { key: 'dotnet', name: '.NET' },
  { key: 'csharp', name: 'C#' },
  { key: 'java', name: 'Java' },
  { key: 'springboot', name: 'Spring Boot' },
  { key: 'nodejs', name: 'Node.js' },
  { key: 'express', name: 'Express' },
  { key: 'python', name: 'Python' },
  { key: 'postgresql', name: 'PostgreSQL' },
  { key: 'docker', name: 'Docker' },
  { key: 'wordpress', name: 'WordPress' },
];

const POSITIONS = [
  { left: '12%', top: '18%' },
  { left: '74%', top: '20%' },
  { left: '18%', top: '68%' },
  { left: '72%', top: '68%' },
  { left: '8%', top: '44%' },
  { left: '80%', top: '46%' },
];

function getRandomStackSet(count = 6) {
  const shuffled = [...STACK_POOL];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count).map((item, index) => ({
    ...item,
    ...POSITIONS[index],
    asset: STACK_ASSETS[item.key],
  }));
}

export function TechHeroVisual() {
  const [stackSet, setStackSet] = useState(() => getRandomStackSet(6));
  const [stackSetKey, setStackSetKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const interval = setInterval(() => {
      setStackSet(getRandomStackSet(6));
      setStackSetKey((key) => key + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      <motion.div
        animate={shouldReduceMotion ? { opacity: 0.65 } : { opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.06, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '340px',
          height: '340px',
          borderRadius: '36px',
          background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, rgba(0,229,255,0.09) 38%, transparent 72%)',
          filter: 'blur(12px)',
        }}
      />

      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '290px',
          height: '290px',
          border: '2px solid rgba(0,229,255,0.46)',
          borderRadius: '50%',
          boxShadow: '0 0 22px rgba(0,229,255,0.16), inset 0 0 28px rgba(0,229,255,0.1)',
        }}
      />

      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '360px',
          height: '360px',
          border: '2px solid rgba(195,225,242,0.2)',
          borderRadius: '50%',
          transform: 'rotateX(70deg)',
          boxShadow: '0 0 24px rgba(0,229,255,0.1)',
        }}
      />

      <motion.div
        animate={shouldReduceMotion ? {} : {
          rotateY: [0, 18, -10, 0],
          rotateX: [12, -6, 10, 12],
          y: [0, -12, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          transformStyle: 'preserve-3d',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            border: '2px solid rgba(0,229,255,0.72)',
            background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(10,14,20,0.68))',
            boxShadow: '0 0 36px rgba(0,229,255,0.32), inset 0 0 28px rgba(0,229,255,0.1)',
            transform: 'rotateX(18deg) rotateY(28deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '18px',
            border: '2px solid rgba(255,255,255,0.2)',
            background: 'rgba(7,10,15,0.48)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            transform: 'translateZ(34px) rotateX(-10deg) rotateY(-10deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,180,216,0.07))',
            border: '2px solid rgba(0,229,255,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.82rem',
            color: '#00e5ff',
            fontWeight: 700,
            transform: 'translateZ(54px)',
            boxShadow: '0 0 30px rgba(0,229,255,0.4), 0 8px 24px rgba(0,0,0,0.45)',
          }}
        >
          TBD
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stackSetKey}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {stackSet.map((stack, index) => (
            <motion.div
              key={stack.key}
              animate={shouldReduceMotion ? {} : {
                x: [0, index % 2 === 0 ? 20 : -20, 0],
                y: [0, index % 2 === 0 ? -18 : 18, 0],
              }}
              transition={{ duration: 5 + index, ease: 'easeInOut', repeat: Infinity, delay: index * 0.3 }}
              style={{
                position: 'absolute',
                left: stack.left,
                top: stack.top,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(145deg, rgba(20,29,40,0.96), rgba(8,13,20,0.96))',
                border: '2px solid rgba(0,229,255,0.34)',
                boxShadow: '0 0 24px rgba(0,229,255,0.2), 0 10px 28px rgba(0,0,0,0.5), inset 0 0 16px rgba(0,229,255,0.07)',
                padding: '11px',
              }}
            >
              <img
                src={stack.asset.iconUrl}
                alt={stack.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
