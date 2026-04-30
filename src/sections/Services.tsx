import { motion } from 'framer-motion';
import { 
  Truck, 
  Globe, 
  Warehouse, 
  Lightbulb, 
  Zap, 
  Package 
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: Truck,
    title: 'Transport Krajowy',
    description: 'Szybka i bezpieczna dostawa na terenie całego kraju. Flota nowoczesnych pojazdów.',
    color: 'from-brand-blue to-brand-purple',
  },
  {
    icon: Globe,
    title: 'Transport Międzynarodowy',
    description: 'Globalna sieć połączeń. Dostarczamy do ponad 50 krajów na całym świecie.',
    color: 'from-brand-purple to-brand-orange',
  },
  {
    icon: Warehouse,
    title: 'Logistyka Magazynowa',
    description: 'Nowoczesne centra dystrybucyjne. Zarządzanie zapasami i fulfillment.',
    color: 'from-brand-orange to-brand-green',
  },
  {
    icon: Lightbulb,
    title: 'Doradztwo Logistyczne',
    description: 'Optymalizacja łańcucha dostaw. Analiza i strategia dla Twojego biznesu.',
    color: 'from-brand-green to-brand-blue',
  },
  {
    icon: Zap,
    title: 'Przesyłki Ekspresowe',
    description: 'Dostawa w 24h. Priorytetowa obsługa i śledzenie w czasie rzeczywistym.',
    color: 'from-brand-blue to-brand-green',
  },
  {
    icon: Package,
    title: 'Transport Specjalistyczny',
    description: 'Ładunki nietypowe i niestandardowe. Profesjonalne zabezpieczenie.',
    color: 'from-brand-purple to-brand-blue',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="services" ref={ref} className="py-20 lg:py-32 bg-brand-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-brand-blue/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
          }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-brand-purple/10 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
            USŁUGI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Kompleksowe rozwiązania logistyczne
          </h2>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">
            Dostosowane do potrzeb Twojego biznesu
          </p>
        </motion.div>

        {/* Services Grid */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={isVisible ? { rotateY: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ 
                  y: -15, 
                  rotateX: 5,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                className="group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.1,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  {service.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center gap-2 text-brand-blue opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-medium">Dowiedz się więcej</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
