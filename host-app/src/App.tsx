import './App.css'

// Remote Imports
import RemoteHeader from 'remote_react/Header'
import RemoteInteractiveCard from 'remote_react/InteractiveCard'
import RemoteDashboardContent from 'remote_vue/DashboardContent'

import { useEffect } from 'react';
import { VueWrapper } from './components/VueWrapper';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

import { FederationWrapper } from './components/FederationWrapper';
import { store } from './lib/store';
import { runTour } from './lib/tour';

function App() {
  // Auto-start Tour
  useEffect(() => {
    setTimeout(() => {
      runTour();
    }, 700);
  }, []);

  // Sync Store to Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'INCREMENT_GLOBAL_COUNT') {
        const currentCheck = store.get();
        store.set({ count: currentCheck.count + 1 });
      }
      if (event.data?.type === 'REQUEST_INITIAL_SYNC') {
         const state = store.get();
         const iframes = document.querySelectorAll('iframe');
         iframes.forEach(iframe => {
             iframe.contentWindow?.postMessage({ type: 'SYNC_GLOBAL_COUNT', count: state.count }, '*');
         });
      }
    };
    window.addEventListener('message', handleMessage);

    // Subscribe to store changes and broadcast to iframes
    const unsubscribe = store.subscribe((state) => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.contentWindow?.postMessage({ type: 'SYNC_GLOBAL_COUNT', count: state.count }, '*');
      });
    });

    return () => {
      window.removeEventListener('message', handleMessage);
      unsubscribe();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif',
      minWidth: '1280px'
     }}>
      {/* Header from Remote React */}
      <div data-tour="remote-react" className="m-2">
      <FederationWrapper origin="react">
        <RemoteHeader />
      </FederationWrapper>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar from Host */}
        <FederationWrapper origin="host" className="m-2 h-auto" >
            <Sidebar />
        </FederationWrapper>

        {/* content Area */}
        <main style={{ flex: 1, overflow: 'auto', padding: '10px', backgroundColor: '#eef2f6' }}>
          <div style={{ marginBottom: '10px' }}>
             <FederationWrapper origin="iframe" className="h-[400px]">
               <div data-tour="remote-iframe" className="w-full h-full"> 
                  <iframe 
                    src={import.meta.env.PROD 
                      ? '/module-federation-playground/remote-iframe-react/' 
                      : 'http://localhost:5003/'}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Remote Iframe"
                  />
               </div>
             </FederationWrapper>
          </div>

          {/* Main Content from Remote Vue */}
          <div data-tour="remote-vue">
          <FederationWrapper origin="vue">
            <VueWrapper component={RemoteDashboardContent} />
          </FederationWrapper>
          </div>

          <div style={{ marginTop: '10px' }} data-tour="remote-card">
             <FederationWrapper origin="react">
                <RemoteInteractiveCard />
             </FederationWrapper>
          </div>
        </main>
      </div>

      {/* Footer from Host */}
      <FederationWrapper origin="host" className="m-2">
        <Footer />
      </FederationWrapper>
    </div>
  )
}

export default App
