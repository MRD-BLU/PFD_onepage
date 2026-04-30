import { motion } from 'framer-motion';

import { useScrollAnimation } from '../hooks/useScrollAnimation';

const footerLinks = {
  services: [
    { label: 'Transport Krajowy', href: '#services' },
    { label: 'Transport Międzynarodowy', href: '#services' },
    { label: 'Magazynowanie', href: '#services' },
    { label: 'Doradztwo', href: '#services' },
  ],
  company: [
    { label: 'O nas', href: '#about' },
    { label: 'Kariera', href: '#contact' },
    { label: 'Aktualności', href: '#testimonials' },
    { label: 'Kontakt', href: '#contact' },
  ],
};


export default function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={ref} className="relative bg-brand-dark pt-16 pb-8 overflow-hidden">
      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-0.5 origin-left"
        style={{
          background: 'linear-gradient(90deg, #0071e3, #8b5cf6, #10b981)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 5s linear infinite',
        }}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0,113,227,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 mb-4"
            >
              <img src="./PFD_blue.png" alt="Logo" className="h-8 w-auto" />
            </a>
            <p className="text-white/60 text-sm leading-relaxed">
              Innowacyjne rozwiązania logistyczne dla biznesu. 
              Twoim zaufanym partnerem w transporcie od 2020 roku.
            </p>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-white font-semibold mb-4">Usługi</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="group text-white/60 hover:text-brand-blue text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-brand-blue group-hover:w-3 transition-all" />
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-white font-semibold mb-4">Firma</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="group text-white/60 hover:text-brand-blue text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-brand-blue group-hover:w-3 transition-all" />
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 PFD Partner. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6">
              <button className="text-white/40 hover:text-white text-sm transition-colors">
                Polityka prywatności
              </button>
              <button className="text-white/40 hover:text-white text-sm transition-colors">
                Regulamin
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
