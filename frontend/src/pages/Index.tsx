
import React from 'react';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import BackgroundEffects from '../components/BackgroundEffects';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundEffects />
      <HeroSection />
      <InfoSection />
    </div>
  );
};

export default Index;
