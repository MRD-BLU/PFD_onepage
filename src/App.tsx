import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
// import FastNavigator from './sections/FastNavigator';
import About from './sections/About';
import Stats from './sections/Stats';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        {/* <FastNavigator /> */}
        <About />
        <Stats />
        <Services />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
