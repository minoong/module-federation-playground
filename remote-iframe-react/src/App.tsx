import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './App.css';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0); // State for global count from Host
  const numberRef = useRef<HTMLSpanElement>(null);
  const globalNumberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globalContainerRef = useRef<HTMLDivElement>(null);
  const previousCountRef = useRef(0);
  const previousGlobalCountRef = useRef(0);

  // Handle message from Host
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check: In prod, check event.origin. For now allow localhost.
      if (event.data && typeof event.data.type === 'string' && event.data.type === 'SYNC_GLOBAL_COUNT') {
        setGlobalCount(event.data.count);
      }
    };
    window.addEventListener('message', handleMessage);
    
    // Request initial state
    window.parent.postMessage({ type: 'REQUEST_INITIAL_SYNC' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Reveal animation on mount
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
    if (globalContainerRef.current) {
        gsap.fromTo(globalContainerRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }
  }, []);

  // Local Count Animation
  useEffect(() => {
    const target = { val: previousCountRef.current };
    gsap.to(target, {
      val: count,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberRef.current) numberRef.current.innerText = target.val.toFixed(0);
      }
    });
    if (numberRef.current) {
       gsap.fromTo(numberRef.current,
         { scale: 1.5, color: '#60a5fa' },
         { scale: 1, color: '#ffffff', duration: 0.3, ease: 'back.out(1.7)' }
       );
    }
    previousCountRef.current = count;
  }, [count]);

  // Global Count Animation
  useEffect(() => {
    const target = { val: previousGlobalCountRef.current };
    gsap.to(target, {
      val: globalCount,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (globalNumberRef.current) globalNumberRef.current.innerText = target.val.toFixed(0);
      }
    });
    if (globalNumberRef.current) {
       gsap.fromTo(globalNumberRef.current,
         { scale: 1.5, color: '#8b5cf6' }, // Purple for global
         { scale: 1, color: '#ffffff', duration: 0.3, ease: 'back.out(1.7)' }
       );
    }
    previousGlobalCountRef.current = globalCount;
  }, [globalCount]);

  const sendGlobalIncrement = () => {
    window.parent.postMessage({ type: 'INCREMENT_GLOBAL_COUNT' }, '*');
  };

  return (
    <div className="min-h-fit bg-slate-900 text-white flex flex-col">
      <Header />
      <div className="flex-1 flex flex-row items-center justify-center p-4 gap-4 overflow-hidden">
        
        {/* Local Card */}
        <div 
          ref={containerRef}
          className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 w-64 text-center relative overflow-hidden"
        >
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-[50px] opacity-20 pointer-events-none"></div>
           
          <h2 className="text-lg font-bold mb-4 relative z-10 text-gray-200">로컬 상태</h2>
          
          <div className="mb-6 relative z-10">
            <span 
              ref={numberRef} 
              className="text-5xl font-black tabular-nums block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent pb-2"
            >
              0
            </span>
            <p className="text-slate-400 text-xs mt-1">Iframe Only</p>
          </div>

          <div className="flex gap-2 justify-center relative z-10">
            <button onClick={() => setCount(c => c - 1)} className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-lg flex items-center justify-center transition-colors border border-slate-600">-</button>
            <button onClick={() => setCount(c => c + 1)} className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-lg flex items-center justify-center transition-colors shadow-lg shadow-blue-500/30">+</button>
          </div>
        </div>

        {/* Global Card */}
        <div 
          ref={globalContainerRef}
          className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-purple-500/30 w-64 text-center relative overflow-hidden"
        >
           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-[50px] opacity-20 pointer-events-none"></div>

          <h2 className="text-lg font-bold mb-4 relative z-10 text-purple-200">전역 상태 (Sync)</h2>
          
          <div className="mb-6 relative z-10">
            <span 
              ref={globalNumberRef} 
              className="text-5xl font-black tabular-nums block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent pb-2"
            >
              0
            </span>
            <p className="text-slate-400 text-xs mt-1">From Host via postMessage</p>
          </div>

          <div className="flex gap-2 justify-center relative z-10">
            <button 
                onClick={sendGlobalIncrement}
                className="w-full h-10 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-bold flex items-center justify-center transition-colors shadow-lg shadow-purple-500/30"
            >
                전역 카운트 증가 +
            </button>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default App
