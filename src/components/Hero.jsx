import { useState, useEffect } from 'react';
import { heroSlides } from '../data/mockData';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds for a slower, more luxurious pace
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] bg-fontenla-dark mt-[80px] overflow-hidden group">
      
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${index === currentSlide ? 'scale-105' : 'scale-100'}`}
          />
          {/* Subtle gradient overlay to ensure text readability without dulling the whole image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Top gradient to blend seamlessly with the black header */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black via-black/50 to-transparent z-10"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-12 md:mt-24 z-10">
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.25em] mb-4 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-gray-200 md:text-xl font-light mb-10 drop-shadow-md tracking-[0.1em] max-w-2xl mx-auto">
              {slide.subtitle}
            </p>
            <a href="#productos" className="inline-block border-2 border-white bg-transparent text-white px-12 py-4 text-[12px] uppercase tracking-[0.25em] font-bold hover:bg-white hover:text-black transition-all duration-500">
              DESCUBRIR
            </a>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-4 z-20">
        {heroSlides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-8 h-1 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
