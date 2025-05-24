
import React, { useState, useEffect, useRef } from 'react';

const InfoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleEasterEggClick = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 4000);
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Background Sanskrit patterns - better distributed */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute font-devanagari text-mystical-orange text-8xl animate-rotate-slow"
            style={{
              left: `${15 + (index % 4) * 20}%`,
              top: `${10 + Math.floor(index / 4) * 25}%`,
              animationDelay: `${index * 2}s`,
              animationDuration: `${20 + index * 3}s`,
            }}
          >
            श्री
          </div>
        ))}
        
        {/* Added "Shree Vidya" on left side */}
        <div className="absolute left-10 top-1/3 font-devanagari text-mystical-orange text-6xl opacity-10 animate-glow-pulse">
          श्री विद्या
        </div>
      </div>

      {/* Hidden Easter Egg Symbol */}
      <div 
        className="absolute top-20 right-20 w-8 h-8 cursor-pointer opacity-20 hover:opacity-60 transition-opacity"
        onClick={handleEasterEggClick}
      >
        <div className="text-white font-devanagari text-2xl animate-glow-pulse">
          ॐ
        </div>
      </div>

      {/* Easter Egg Quote */}
      {showEasterEgg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-fade-in-up">
          <div className="bg-gradient-to-br from-temple-stone to-black p-8 rounded-lg border border-mystical-gold shadow-2xl max-w-md mx-4 mystical-border">
            <div className="text-center">
              <div className="text-mystical-gold font-devanagari text-xl mb-4 font-normal">
                सत्यमेव जयते
              </div>
              <div className="text-mystical-yellow font-cormorant text-lg font-normal">
                "Truth alone triumphs"
              </div>
              <div className="text-mystical-orange text-sm mt-2 opacity-80 font-normal">
                - Mundaka Upanishad
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-6xl font-cinzel font-normal text-mystical-gold text-center mb-16 animate-glow-pulse">
          What is DivyaLipi AI?
        </h2>

        {/* Main Info Box */}
        <div 
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-20'
          }`}
        >
          {/* OM Symbols in inner corners - changed to white */}
          <div className="absolute top-2 left-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70">
            ॐ
          </div>
          <div className="absolute top-2 right-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70" style={{ animationDirection: 'reverse' }}>
            ॐ
          </div>
          <div className="absolute bottom-2 left-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70" style={{ animationDirection: 'reverse' }}>
            ॐ
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70">
            ॐ
          </div>

          {/* Main content box styled like palm-leaf manuscript */}
          <div 
            className="bg-gradient-to-br from-amber-50 to-yellow-100 p-8 md:p-12 rounded-lg shadow-2xl border-4 mystical-border relative overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                linear-gradient(-45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%), 
                linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%)
              `,
              backgroundSize: '30px 30px',
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-mystical-gold opacity-60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-mystical-gold opacity-60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-mystical-gold opacity-60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-mystical-gold opacity-60" />

            <div className="relative z-10">
              <p className="text-xl md:text-2xl lg:text-3xl font-cormorant font-normal text-amber-900 leading-relaxed text-center mb-8">
                "DivyaLipi AI learns from degraded Sanskrit manuscripts and allows users to find the meaning of the scripts which are decoded using LLMs."
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-mystical-gold/30 shadow-lg" style={{ 
                  backgroundColor: 'rgba(59, 47, 47, 0.7)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(255, 140, 0, 0.1)'
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mystical-gold rounded-full flex items-center justify-center">
                    <span className="text-2xl font-devanagari text-white font-normal">श्री</span>
                  </div>
                  <h3 className="font-cinzel text-lg text-mystical-gold mb-2 font-normal">Ancient Wisdom</h3>
                  <p className="text-mystical-yellow font-cormorant font-normal">Preserving sacred knowledge for future generations</p>
                </div>
                
                <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-mystical-gold/30 shadow-lg" style={{ 
                  backgroundColor: 'rgba(59, 47, 47, 0.7)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(255, 140, 0, 0.1)'
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mystical-orange rounded-full flex items-center justify-center">
                    <span className="text-2xl font-devanagari text-white font-normal">ज्ञ</span>
                  </div>
                  <h3 className="font-cinzel text-lg text-mystical-gold mb-2 font-normal">AI Technology</h3>
                  <p className="text-mystical-yellow font-cormorant font-normal">Modern algorithms meet timeless scriptures</p>
                </div>
                
                <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-mystical-gold/30 shadow-lg" style={{ 
                  backgroundColor: 'rgba(59, 47, 47, 0.7)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(255, 140, 0, 0.1)'
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-mystical-maroon rounded-full flex items-center justify-center">
                    <span className="text-2xl font-devanagari text-white font-normal">ॐ</span>
                  </div>
                  <h3 className="font-cinzel text-lg text-mystical-gold mb-2 font-normal">Universal Access</h3>
                  <p className="text-mystical-yellow font-cormorant font-normal">Making Sanskrit accessible to all seekers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional mystical elements */}
        <div className="text-center mt-16">
          <div className="text-mystical-gold font-devanagari text-lg opacity-70 animate-glow-pulse font-normal">
            यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः<br/>
            तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम
          </div>
          <div className="text-mystical-yellow font-cormorant text-sm mt-2 opacity-80 font-normal">
            "Where there is Krishna, the master of yoga, and where there is Arjuna, the bearer of the bow,<br/>
            there is prosperity, victory, happiness, and sound morality."
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
