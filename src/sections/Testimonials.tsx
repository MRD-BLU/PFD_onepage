import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    id: 1,
    quote: 'Najlepszy partner logistyczny',
    text: 'Współpracujemy z LogiTrans od 5 lat. Terminowość i profesjonalizm to ich znaki rozpoznawcze. Zawsze możemy na nich polegać.',
    author: 'Anna Kowalska',
    role: 'Dyrektor Operacyjna',
    company: 'TechCorp',
    avatar: './avatar-1.jpg',
  },
  {
    id: 2,
    quote: 'Rewolucja w naszych dostawach',
    text: 'Dzięki ich rozwiązaniom zmniejszyliśmy koszty transportu o 30%. Polecam każdemu, kto szuka niezawodnego partnera.',
    author: 'Marek Nowak',
    role: 'Właściciel',
    company: 'FastShop',
    avatar: './avatar-2.jpg',
  },
  {
    id: 3,
    quote: 'Pełne zaufanie',
    text: 'Nasze delikatne ładunki zawsze docierają bezpiecznie. To partner, na którym można polegać w każdej sytuacji.',
    author: 'Karolina Wiśniewska',
    role: 'Kierownik Logistyki',
    company: 'ArtGlass',
    avatar: './avatar-3.jpg',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-light to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-light to-transparent" />
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
            OPINIE
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
            Co mówią o nas klienci
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {/* Cards Container */}
          <div className="relative h-[400px] sm:h-[350px]">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentIndex + 1) % testimonials.length;

                if (!isActive && !isPrev && !isNext) return null;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, rotateY: isNext ? 45 : -45 }}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      rotateY: isActive ? 0 : isPrev ? -30 : isNext ? 30 : 0,
                      scale: isActive ? 1 : 0.85,
                      z: isActive ? 100 : -50,
                      x: isActive ? 0 : isPrev ? '-30%' : isNext ? '30%' : 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                    exit={{ opacity: 0, rotateY: isPrev ? -45 : 45 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      !isActive ? 'pointer-events-none' : ''
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      filter: isActive ? 'none' : 'blur(2px)',
                    }}
                  >
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-card p-8 sm:p-12">
                      {/* Quote Icon */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="mb-6"
                      >
                        <Quote className="w-12 h-12 text-brand-blue/20" />
                      </motion.div>

                      {/* Quote Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-4">
                        "{testimonial.quote}"
                      </h3>

                      {/* Quote Text */}
                      <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                        {testimonial.text}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative"
                        >
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-brand-light"
                          />
                          <div className="absolute inset-0 rounded-full ring-2 ring-brand-blue/20" />
                        </motion.div>
                        <div>
                          <div className="font-semibold text-brand-dark">{testimonial.author}</div>
                          <div className="text-sm text-brand-gray">
                            {testimonial.role}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="p-3 rounded-full bg-brand-light hover:bg-brand-blue hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-brand-blue'
                      : 'bg-brand-light hover:bg-brand-blue/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="p-3 rounded-full bg-brand-light hover:bg-brand-blue hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
