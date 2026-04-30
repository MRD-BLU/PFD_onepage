import { motion } from 'framer-motion';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';

const stats = [
  { value: 10, suffix: '+', label: 'Lat doświadczenia' },
  { value: 100, suffix: '+', label: 'Dostaw rocznie', format: true },
  { value: 10, suffix: '+', label: 'Krajów obsługiwanych' },
  { value: 100, suffix: '%', label: 'Terminowości', decimals: 1 },
];

function StatItem({ 
  value, 
  suffix, 
  label, 
  format = false, 
  decimals = 0,
  isVisible,
  index 
}: { 
  value: number; 
  suffix: string; 
  label: string; 
  format?: boolean;
  decimals?: number;
  isVisible: boolean;
  index: number;
}) {
  const count = useCountUp(value, 2500, 0, isVisible);
  
  const displayValue = format 
    ? count.toLocaleString('pl-PL') 
    : decimals > 0 
      ? count.toFixed(decimals) 
      : count;

  return (
    <motion.div
      initial={{ y: 100, rotateX: -30, opacity: 0 }}
      animate={isVisible ? { y: 0, rotateX: 0, opacity: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative text-center p-8"
    >
      {/* Divider */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20 hidden lg:block origin-top"
        />
      )}

      {/* Number */}
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">
        {displayValue}
        <span className="text-brand-blue">{suffix}</span>
      </div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
        className="text-white/70 text-sm sm:text-base"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-20 lg:py-32 bg-gradient-stats overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
            STATYSTYKI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Nasze wyniki mówią same za siebie
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ perspective: '800px' }}
        >
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
