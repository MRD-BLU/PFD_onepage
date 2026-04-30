import { motion } from 'framer-motion';
import { Award, Globe2, Clock, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { icon: Award, text: '10+ lat doświadczenia' },
  { icon: Globe2, text: '10+ krajów w Europie' },
  { icon: Clock, text: '100% terminowości dostaw' },
  { icon: Headphones, text: '24/7 wsparcie klienta' },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative diagonal line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isVisible ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-purple to-transparent origin-top hidden lg:block"
        style={{ transform: 'translateX(-50%) rotate(15deg)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)', y: 50 }}
            animate={isVisible ? { clipPath: 'inset(0% 0 0 0)', y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <img
                src="/PFD_onepage/PFD_warehouse.png"
                alt="Warehouse workers"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-card p-6"
            >
              <div className="text-4xl font-bold text-brand-blue">10+</div>
              <div className="text-sm text-brand-gray">lat na rynku</div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="mb-4"
            >
              <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
                O NAS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6"
            >
              {'Twoim zaufanym partnerem w logistyce'.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Body Text */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-brand-gray text-lg mb-8 leading-relaxed"
            >
              Od ponad 10 lat dostarczamy innowacyjne rozwiązania transportowe dla firm 
              każdej wielkości. Nasza globalna sieć i zaawansowana technologia zapewniają 
              terminowość i bezpieczeństwo każdej przesyłki.
            </motion.p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ x: -20, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 1 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-brand-light transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-brand-dark font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
