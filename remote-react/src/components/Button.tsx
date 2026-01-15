import { useState, useEffect } from 'react';
import { store } from 'host_app/store';

export const Button = () => {
  const [count, setCount] = useState(store.get().count);

  useEffect(() => {
    const cleanup = store.subscribe((state: { count: number }) => {
      setCount(state.count);
    });
    return cleanup;
  }, []);

  return (
    <button 
      onClick={() => store.set({ count: count + 1 })}
      style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
    >
      Remote React Button (Count: {count})
    </button>
  );
};

export default Button;
