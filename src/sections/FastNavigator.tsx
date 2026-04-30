import { motion } from 'framer-motion';
import { Handshake, Globe, Settings, Building2, UserSearch, Newspaper } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const navItems = [
  { icon: Handshake, label: "Let's Do Business", href: '#contact' },
  { icon: Globe, label: 'Track & Trace', href: '#services' },
  { icon: Settings, label: 'Services', href: '#services' },
  { icon: Building2, label: 'Get To Know Us', href: '#about' },
  { icon: UserSearch, label: 'Find Your Job', href: '#contact' },
  { icon: Newspaper, label: "What's New?", href: '#testimonials' },
];

export default function FastNavigator() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={isVisible ? { rotateX: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => scrollToSection(item.href)}
                className="group relative flex flex-col items-center justify-center p-6 lg:p-8 border-b border-r border-brand-light hover:bg-brand-light/50 transition-all duration-300"
                style={{ perspective: '500px' }}
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.08,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                  className="relative z-10 mb-4 p-4 rounded-xl bg-brand-light group-hover:bg-white group-hover:shadow-card transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-brand-dark group-hover:text-brand-blue transition-colors" />
                </motion.div>

                {/* Label */}
                <span className="relative z-10 text-xs sm:text-sm font-medium text-brand-dark text-center group-hover:text-brand-blue transition-colors">
                  {item.label}
                </span>

                {/* Underline Effect */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-blue group-hover:w-1/2 transition-all duration-300" />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
