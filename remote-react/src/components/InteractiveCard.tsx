import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const InteractiveCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        duration: 0.5,
        rotationX: rotateX,
        rotationY: rotateY,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          duration: 0.5,
          x: x - 150, // Center the glow (300px width / 2)
          y: y - 150,
          opacity: 1,
          ease: 'power2.out',
        });
      }
      
      if (contentRef.current) {
         gsap.to(contentRef.current, {
            duration: 0.5,
            z: 50,
            ease: 'power2.out'
         })
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.7,
        rotationX: 0,
        rotationY: 0,
        ease: 'elastic.out(1, 0.5)',
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          duration: 0.5,
          opacity: 0,
          ease: 'power2.out',
        });
      }
      
      if (contentRef.current) {
         gsap.to(contentRef.current, {
            duration: 0.5,
            z: 0,
            ease: 'power2.out'
         })
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="perspective-1000 p-4 flex justify-center items-center w-full h-full min-h-[300px]">
      <div 
        ref={cardRef}
        className="relative w-64 h-80 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <div 
          ref={glowRef}
          className="absolute w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-0 pointer-events-none mix-blend-screen"
          style={{ top: 0, left: 0 }}
        />

        {/* Content */}
        <div ref={contentRef} className="relative z-10 p-5 flex flex-col h-full bg-transparent" style={{ transformStyle: 'preserve-3d' }}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2 translate-z-10">GSAP 카드 공통 컴포넌트</h2>
            <p className="text-gray-400 text-xs leading-relaxed mb-auto translate-z-5">
                호스트 또는 리모트 애플리케이션에서 import 하여 사용합니다.
            </p>

            <button className="mt-auto w-full py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 translate-z-10">
                더 알아보기
            </button>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-20" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
            }}
        />
      </div>
    </div>
  );
};

export default InteractiveCard;
