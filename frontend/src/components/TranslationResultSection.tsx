import React from 'react';

interface TranslationResultSectionProps {
  isVisible: boolean;
  sanskritText: string;
  englishTranslation: string;
  isLoading: boolean;
}

const TranslationResultSection: React.FC<TranslationResultSectionProps> = React.memo(({
  isVisible,
  sanskritText,
  englishTranslation,
  isLoading,
}) => {
  if (!isVisible) return null;

  return (
    <section className="py-16 px-4 relative animate-fade-in-up">
      {/* Background watermark quote */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-center font-devanagari text-mystical-orange text-4xl">
          सर्वे भवन्तु सुखिनः
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* OM Symbols in inner corners */}
          <div className="absolute top-2 left-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70">
            ॐ
          </div>
          <div
            className="absolute top-2 right-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70"
            style={{ animationDirection: 'reverse' }}
          >
            ॐ
          </div>
          <div
            className="absolute bottom-2 left-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70"
            style={{ animationDirection: 'reverse' }}
          >
            ॐ
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 text-white font-devanagari text-2xl animate-rotate-slow opacity-70">
            ॐ
          </div>

          {/* Main scroll container */}
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
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.1)',
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-mystical-gold opacity-60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-mystical-gold opacity-60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-mystical-gold opacity-60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-mystical-gold opacity-60" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-cinzel font-normal text-mystical-gold text-center mb-8 animate-glow-pulse">
                Translation Result
              </h3>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="flex justify-center items-center gap-4 mb-4">
                    {['श्री', 'ॐ', 'गुरु'].map((symbol, index) => (
                      <div
                        key={index}
                        className="text-2xl font-devanagari text-mystical-gold animate-rotate-slow"
                        style={{
                          animationDelay: `${index * 0.5}s`,
                          animationDuration: '2s',
                        }}
                      >
                        {symbol}
                      </div>
                    ))}
                  </div>
                  <p className="text-mystical-maroon font-cormorant text-lg">
                    Deciphering ancient wisdom...
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Sanskrit Text */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-cinzel text-mystical-maroon text-center border-b border-mystical-gold/30 pb-2">
                      Sanskrit Text
                    </h4>
                    <div
                      className="p-6 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-lg shadow-inner border border-mystical-gold/20 hover:shadow-lg transition-all duration-300"
                      style={{
                        textShadow: '0 0 10px rgba(230, 184, 0, 0.3)',
                      }}
                    >
                      <p className="font-devanagari text-lg md:text-xl text-amber-900 leading-relaxed text-center">
                        {sanskritText || 'Error Processing  Translation'}
                      </p>
                    </div>
                  </div>

                  {/* English Translation */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-cinzel text-mystical-maroon text-center border-b border-mystical-gold/30 pb-2">
                      English Translation
                    </h4>
                    <div className="p-6 bg-gradient-to-br from-stone-100 to-amber-50 rounded-lg shadow-inner border border-mystical-gold/20 hover:shadow-lg transition-all duration-300">
                      <p className="font-cormorant text-lg md:text-xl text-stone-800 leading-relaxed text-center">
                        {englishTranslation || 'Error Processing Translation'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Spiritual echo quote */}
              {!isLoading && (
                <div className="text-center mt-8 pt-6 border-t border-mystical-gold/20">
                  <div className="text-mystical-gold font-devanagari text-sm opacity-60 animate-glow-pulse">
                    सत्यं शिवं सुन्दरम्
                  </div>
                  <div className="text-mystical-yellow font-cormorant text-xs mt-1 opacity-50">
                    Truth, Goodness, Beauty
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TranslationResultSection;
