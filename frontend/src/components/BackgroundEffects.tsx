
import React, { useEffect, useState } from 'react';

const BackgroundEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 1 : -1);
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Horizontal flowing particle bands */}
      {Array.from({ length: 6 }).map((_, bandIndex) => (
        <div
          key={`particle-band-${bandIndex}`}
          className="absolute w-full h-24"
          style={{
            top: `${15 + bandIndex * 15}%`,
          }}
        >
          {Array.from({ length: 8 }).map((_, dotIndex) => (
            <div
              key={`band-${bandIndex}-dot-${dotIndex}`}
              className="absolute w-1 h-1 rounded-full opacity-25"
              style={{
                backgroundColor: '#d4a34f',
                left: `${dotIndex * 12.5}%`,
                top: `${Math.random() * 80}%`,
                transform: `translateX(${
                  bandIndex % 2 === 0 
                    ? (scrollY * 0.1 + dotIndex * 20) % window.innerWidth
                    : -(scrollY * 0.1 + dotIndex * 20) % window.innerWidth
                }px)`,
                transition: 'transform 0.3s ease-out',
                filter: 'blur(0.5px)',
                animation: `float ${4 + dotIndex * 0.3}s ease-in-out infinite`,
                animationDelay: `${dotIndex * 0.2}s`,
                boxShadow: '0 0 4px rgba(212, 163, 79, 0.3)',
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating vertical particles - reduced and more subtle */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={`vertical-particle-${index}`}
          className="absolute w-1 h-1 rounded-full opacity-20"
          style={{
            backgroundColor: '#cc8844',
            left: `${10 + index * 8}%`,
            top: `${20 + (index % 3) * 30}%`,
            transform: `translateY(${scrollY * (index % 2 ? 0.05 : -0.05)}px)`,
            transition: 'transform 0.2s ease-out',
            animationDelay: `${index * 0.8}s`,
            filter: 'blur(0.3px)',
            animation: `float ${4 + index * 0.4}s ease-in-out infinite`,
            boxShadow: '0 0 3px rgba(204, 136, 68, 0.2)',
          }}
        />
      ))}

      {/* Mystical scroll-responsive glowing dots - reduced quantity */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={`mystical-particle-${index}`}
          className="absolute w-1.5 h-1.5 rounded-full opacity-20 transition-transform duration-500"
          style={{
            backgroundColor: '#d4a34f',
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            transform: `translateY(${scrollY * scrollDirection * (0.01 + index * 0.0005)}px) scale(${0.3 + Math.sin(scrollY * 0.005 + index) * 0.2})`,
            filter: 'blur(0.4px)',
            animation: `float ${4 + index * 0.3}s ease-in-out infinite`,
            animationDelay: `${index * 0.15}s`,
            boxShadow: '0 0 6px rgba(212, 163, 79, 0.25)',
          }}
        />
      ))}

      {/* Enhanced mystical glow effects - more subtle */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-3 blur-3xl"
        style={{
          backgroundColor: '#d4a34f',
          transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.05}deg)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-3 blur-3xl"
        style={{
          backgroundColor: '#cc8844',
          transform: `translateY(${scrollY * -0.02}px) rotate(${scrollY * -0.05}deg)`,
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
