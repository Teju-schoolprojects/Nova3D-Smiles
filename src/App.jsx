import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechExplorer from './components/TechExplorer';
import SmileSimulator from './components/SmileSimulator';
import PricingCalculator from './components/PricingCalculator';
import AlignerQuiz from './components/AlignerQuiz';
import Team from './components/Team';
import Scheduler from './components/Scheduler';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import './index.css';
import './App.css';

export default function App() {
  const [preselectedService, setPreselectedService] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = () => {
    setPreselectedService(null);
    scrollToSection('booking');
  };

  const handleQuizSelection = (serviceName) => {
    setPreselectedService(serviceName);
    scrollToSection('booking');
  };

  return (
    <>
      <Navbar 
        onBookClick={handleBookClick} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
        {/* Hero Section */}
        <Hero 
          onBookClick={handleBookClick}
          onQuizClick={() => scrollToSection('quiz')}
        />

        {/* 3D Tech Explorer Section */}
        <TechExplorer onBookClick={handleBookClick} />

        {/* Teeth Alignment Smile Simulator */}
        <SmileSimulator onBookClick={handleBookClick} />

        {/* Pricing & Cost Calculator */}
        <PricingCalculator onBookClick={handleBookClick} />

        {/* Aligner Candidacy Quiz */}
        <AlignerQuiz onBookAppointment={handleQuizSelection} />

        {/* Specialist Team */}
        <Team onBookClick={handleBookClick} />

        {/* Multi-step Appointment Scheduler */}
        <Scheduler preselectedService={preselectedService} />

        {/* Frequently Asked Questions */}
        <FAQs />
      </main>

      {/* Footer & Inquiry Form */}
      <Footer />
    </>
  );
}
