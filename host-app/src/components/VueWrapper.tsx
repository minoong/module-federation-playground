import { useEffect, useRef } from 'react';
import { createApp, type Component } from 'vue';

interface VueWrapperProps {
  component: Component;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export const VueWrapper = ({ component, props = {} }: VueWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const app = createApp(component, props);
      app.mount(ref.current);

      return () => {
        app.unmount();
      };
    }
  }, [component, props]);

  return <div ref={ref} />;
};
