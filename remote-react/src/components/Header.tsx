import React from 'react';
import { store } from 'host_app/store';
import gsap from 'gsap';

export const Header = () => {
  const [count, setCount] = React.useState(store.get().count);

  React.useEffect(() => {
    setCount(store.get().count);
    return store.subscribe((state: { count: number }) => {
      setCount(state.count);
    });
  }, []);

  const countRef = React.useRef<HTMLSpanElement>(null);
  const prevCount = React.useRef(count);

  React.useEffect(() => {
      if (!countRef.current) return;
      
      const target = { val: prevCount.current };
      gsap.to(target, {
          val: count,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: () => {
              if (countRef.current) {
                  countRef.current.innerText = target.val.toFixed(0);
              }
          }
      });

      gsap.fromTo(countRef.current,
          { scale: 2.0, color: '#ffffff' },
          { scale: 1, color: '#60a5fa', duration: 0.5, ease: 'elastic.out(1, 0.3)' }
      );
      
      prevCount.current = count;
  }, [count]);

  return (
    <header className="bg-gray-800 text-white p-2 px-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold flex items-center gap-2">
        <span>🚀</span>
        <span>모듈 페더레이션 대시보드</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">
          전역 카운트: <span ref={countRef} className="font-mono font-bold text-blue-400 inline-block">{count}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors text-sm font-medium">
          로그인
        </button>
      </div>
    </header>
  );
};

export default Header;
