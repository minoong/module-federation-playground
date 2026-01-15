import React from 'react';
import { store } from '../lib/store';

import { runTour } from '../lib/tour';

export const Sidebar = () => {
  const [count, setCount] = React.useState(store.get().count);
  const [isChanged, setIsChanged] = React.useState(false);

  React.useEffect(() => {
    setCount(store.get().count);
    return store.subscribe((state) => {
      setCount(state.count);
      setIsChanged(true);
      setTimeout(() => setIsChanged(false), 300);
    });
  }, []);
  
  return (
    <aside style={{
      width: '220px',
      backgroundColor: '#2c3e50',
      color: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #34495e' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>메뉴</h2>
      </div>
      <nav style={{ flex: 1, padding: '10px 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '10px 16px', cursor: 'pointer', backgroundColor: '#34495e' }}>대시보드</li>
          <li style={{ padding: '10px 16px', cursor: 'pointer' }}>사용자</li>
          <li style={{ padding: '10px 16px', cursor: 'pointer' }}>설정</li>
        </ul>
      </nav>
      <div style={{ padding: '16px', borderTop: '1px solid #34495e', marginTop: 'auto' }}>
        <button 
           onClick={runTour}
           className="relative group w-full mb-4 py-2.5 overflow-hidden rounded-md text-xs font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50"
        >
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-pink-500 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-2">
            <span className="animate-bounce">🚩</span>
            <span>가이드 시작</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>
        </button>
        
        <div className="bg-slate-700/40 rounded-lg p-3 mb-6 border border-slate-600/50 backdrop-blur-sm shadow-sm mx-1">
            <p className="text-xs text-slate-200 text-center leading-relaxed font-medium">
              <span className="text-blue-300 font-bold">@module-federation/vite</span>의<br/>
              아키텍처와 동작 원리를<br/>확인해보세요.
            </p>
        </div>

        <div 
          data-tour="global-state"
          className={`p-3 rounded-lg mb-3 transition-colors duration-300 ${isChanged ? 'bg-blue-500/50 scale-105' : 'bg-slate-700/50'}`}
        >
          <p className="text-gray-400 text-[10px] mb-1">전역 상태</p>
          <p className={`text-xl font-bold transition-colors duration-300 ${isChanged ? 'text-white' : 'text-blue-400'}`}>{count}</p>
          <button 
            onClick={() => store.set({ count: count + 1 })}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded text-xs transition-colors"
          >
            증가 +
          </button>
        </div>
        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>
          v1.0.0
        </div>
      </div>
    </aside>
  );
};
