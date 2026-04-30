import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '+48 601 883 449', href: 'tel:+48123456789' },
  { icon: Mail, label: 'Email', value: 'kontakt@pfdpartner.pl', href: 'mailto:kontakt@pfdpartner.pl' },
  { icon: Clock, label: 'Godziny', value: 'Pon-Pt: 8:00 - 18:00', href: '#' },
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const WEB3FORMS_KEY = 'TUTAJ_WKLEJ_KLUCZ_API'; // https://web3forms.com → wpisz kontakt@pfdpartner.pl

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `[PFD] ${formData.subject} – formularz kontaktowy`,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 bg-brand-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section Label */}
            <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
              KONTAKT
            </span>

            {/* Headline */}
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
              Skontaktuj się z nami
            </h2>

            {/* Description */}
            <p className="text-brand-gray text-lg mb-10 leading-relaxed">
              Masz pytania? Jesteśmy tutaj, aby pomóc. Skontaktuj się z nami telefonicznie, 
              mailowo lub przez formularz.
            </p>

            {/* Contact Items */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-card transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-brand-gray mb-1">{item.label}</div>
                      <div className="font-medium text-brand-dark group-hover:text-brand-blue transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 h-full flex flex-col">
              <div className="grid sm:grid-cols-2 gap-1 flex-1">
                {/* Name */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  <label 
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? '-top-2 text-xs text-brand-blue bg-white px-1'
                        : 'top-3.5 text-brand-gray'
                    }`}
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border border-brand-light rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.48, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  <label 
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? '-top-2 text-xs text-brand-blue bg-white px-1'
                        : 'top-3.5 text-brand-gray'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border border-brand-light rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.56, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  <label 
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'phone' || formData.phone
                        ? '-top-2 text-xs text-brand-blue bg-white px-1'
                        : 'top-3.5 text-brand-gray'
                    }`}
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 border border-brand-light rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.64, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  <label 
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'subject' || formData.subject
                        ? '-top-2 text-xs text-brand-blue bg-white px-1'
                        : 'top-3.5 text-brand-gray'
                    }`}
                  >
                    Temat
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border border-brand-light rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all appearance-none bg-white"
                  >
                    <option value=""></option>
                    <option value="quote">Wycena</option>
                    <option value="cooperation">Współpraca</option>
                    <option value="support">Wsparcie</option>
                    <option value="other">Inne</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.72, ease: [0.4, 0, 0.2, 1] }}
                  className="relative sm:col-span-2 flex flex-col flex-1"
                >
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? '-top-2 text-xs text-brand-blue bg-white px-1'
                        : 'top-3.5 text-brand-gray'
                    }`}
                  >
                    Wiadomość
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full flex-1 min-h-40 px-4 py-3 border border-brand-light rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all resize-none"
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
                className="mt-6"
              >
                {submitError && (
                  <p className="mb-3 text-sm text-red-500 text-center">
                    Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na kontakt@pfdpartner.pl
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? 'bg-brand-green'
                      : 'bg-brand-blue hover:bg-brand-blue/90 hover:shadow-glow'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Wysłano!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Wyślij wiadomość
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
