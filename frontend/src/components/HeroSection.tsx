import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import TranslationResultSection from './TranslationResultSection';

const HeroSection = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing
  const [translationData, setTranslationData] = useState({
    sanskrit: '',
    english: ''
  });
  const fullTitle = 'DivyaLipi AI';
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const timer1 = setTimeout(() => setTitleVisible(true), 500);
    const timer2 = setTimeout(() => setSubtitleVisible(true), 4000);
    const timer3 = setTimeout(() => setShowUpload(true), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (titleVisible) {
      let index = 0;
      const typeWriter = () => {
        if (index < fullTitle.length) {
          setTypingText(fullTitle.slice(0, index + 1));
          index++;
          setTimeout(typeWriter, 150);
        }
      };
      typeWriter();
    }
  }, [titleVisible]);

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File uploaded:', file.name);
        setIsLoading(true);
        setIsProcessing(true); // Hide the upload button
        setShowTranslation(true);

        const formData = new FormData();
        formData.append('file', file);

        // Updated fetch call using environment variable
        fetch(`${BACKEND_URL}/process`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        })
            .then(async (res) => {
              if (!res.ok) {
                throw new Error('Failed to process image');
              }
              const data = await res.json();
              setTranslationData({
                sanskrit: data.sanskrit || '',
                english: data.english || ''
              });
            })
            .catch((err) => {
              console.error('Error processing image:', err);
              setTranslationData({
                sanskrit: 'Error processing image',
                english: ''
              });
            })
            .finally(() => {
              setIsLoading(false);
              setIsProcessing(false); // Show the upload button again
            });
      }
    };
    input.click();
  };

  return (
    <>
      <section className="min-h-screen relative flex items-center justify-center temple-texture bg-black overflow-hidden">
        {/* Floating Sanskrit Background - better distributed */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { text: 'ॐ', left: 5, top: 15 },
            { text: 'श्री', left: 25, top: 8 },
            { text: 'गुरु', left: 45, top: 20 },
            { text: 'विद्या', left: 65, top: 12 },
            { text: 'ज्ञान', left: 85, top: 18 },
            { text: 'धर्म', left: 15, top: 75 },
            { text: 'ॐ', left: 35, top: 80 },
            { text: 'शान्ति', left: 55, top: 70 },
            { text: 'सत्यम्', left: 75, top: 85 },
            { text: 'शिवम्', left: 10, top: 45 },
            { text: 'सुन्दरम्', left: 90, top: 50 }
          ].map((item, index) => (
            <div
              key={index}
              className="absolute text-white opacity-10 text-6xl font-devanagari animate-rotate-slow"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${index * 2}s`,
                animationDuration: `${15 + index * 5}s`,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Mystical Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-mystical-gold rounded-full opacity-30 animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-4 max-w-6xl mx-auto">
          {/* Main Title with Typing Effect */}
          <div className="mb-8">
            <h1 
              className={`text-6xl md:text-8xl lg:text-9xl font-normal font-cinzel text-mystical-gold transition-all duration-1000 ${
                titleVisible 
                  ? 'opacity-100 animate-glow-pulse' 
                  : 'opacity-0'
              }`}
              style={{
                textShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
              }}
            >
              {typingText}
              {titleVisible && typingText.length < fullTitle.length && (
                <span className="animate-blink text-mystical-gold">|</span>
              )}
            </h1>
            {titleVisible && (
              <div className="text-mystical-orange text-2xl md:text-3xl font-devanagari mt-4 opacity-70 font-normal">
                दिव्यलिपि एआई
              </div>
            )}
          </div>

          {/* Subtitle */}
          {subtitleVisible && (
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-cormorant font-normal text-mystical-yellow mb-12 animate-fade-in-up opacity-90">
              Unlocking True Wisdom
            </h2>
          )}

          {/* Interactive Manuscripts */}
          <div className="flex justify-center items-center gap-8 md:gap-16 mb-12">
            <div className="manuscript-shadow animate-manuscript-float">
              <div 
                className="w-32 h-40 md:w-48 md:h-60 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3"
                style={{
                  backgroundImage: `linear-gradient(45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                                   linear-gradient(-45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                                   linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%), 
                                   linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%)`,
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="p-4 h-full flex flex-col justify-center items-center">
                  <div className="text-xs md:text-sm font-devanagari font-normal text-amber-800 leading-relaxed">
                    श्रीगणेशाय नमः<br/>
                    सरस्वत्यै नमो नमः<br/>
                    विद्या दान परमम्<br/>
                    तप इत्युक्तम्
                  </div>
                </div>
              </div>
            </div>

            <div className="manuscript-shadow animate-manuscript-float" style={{ animationDelay: '1s' }}>
              <div 
                className="w-32 h-40 md:w-48 md:h-60 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-(-3)"
                style={{
                  backgroundImage: `linear-gradient(45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                                   linear-gradient(-45deg, rgba(139, 69, 19, 0.1) 25%, transparent 25%), 
                                   linear-gradient(45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%), 
                                   linear-gradient(-45deg, transparent 75%, rgba(139, 69, 19, 0.1) 75%)`,
                  backgroundSize: '15px 15px',
                }}
              >
                <div className="p-4 h-full flex flex-col justify-center items-center">
                  <div className="text-xs md:text-sm font-devanagari font-normal text-amber-900 leading-relaxed">
                    यत्र विद्या तत्र धर्मः<br/>
                    यत्र धर्मस्तत्र विजयः<br/>
                    ॐ शान्ति शान्ति<br/>
                    शान्तिः
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          {showUpload && !isProcessing && (
            <div className="animate-fade-in-up">
              <button
                onClick={handleUploadClick}
                className="group relative px-12 py-4 bg-gradient-to-r from-mystical-maroon via-mystical-gold to-mystical-maroon text-white font-cinzel font-normal text-lg md:text-xl rounded-full shadow-2xl ripple-effect overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-mystical-gold/25"
                style={{
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.1)',
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Upload className="w-6 h-6" />
                  Upload Manuscript
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-mystical-gold to-mystical-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Translation Result Section */}
      <TranslationResultSection
        isVisible={showTranslation}
        sanskritText={translationData.sanskrit}
        englishTranslation={translationData.english}
        isLoading={isLoading}
      />
    </>
  );
};

export default HeroSection;
