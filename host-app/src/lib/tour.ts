import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const runTour = () => {
  const driverObj = driver({
    showProgress: true,
    showButtons: ['next', 'previous'],
    steps: [
      { 
        element: 'aside', 
        popover: { 
          title: '호스트 앱 사이드바', 
          description: '이곳은 호스트 애플리케이션의 사이드바입니다. 전역 네비게이션과 공유 상태를 관리합니다.' 
        } 
      },
      { 
        element: '[data-tour="global-state"]', 
        popover: { 
          title: '전역 상태 관리', 
          description: '증가 버튼을 눌러보세요! React, Vue, Iframe 등 모든 앱에서 상태가 실시간으로 동기화됩니다.' 
        } 
      },
      { 
        element: '[data-tour="remote-react"]', 
        popover: { 
          title: 'Remote React 컴포넌트', 
          description: '이 헤더는 별도의 React 애플리케이션에서 동적으로 로드된 컴포넌트입니다.' 
        } 
      },
      { 
        element: '[data-tour="remote-card"]', 
        popover: { 
          title: '공유 컴포넌트', 
          description: 'Remote React에서 가져온 인터랙티브 카드입니다. 마이크로 프론트엔드 간에 정교한 UI 컴포넌트도 쉽게 공유할 수 있습니다.' 
        } 
      },
      { 
        element: '[data-tour="remote-iframe"]', 
        popover: { 
          title: 'Remote Iframe (격리된 환경)', 
          description: '완전히 격리된 React 앱이 Iframe 내에서 실행됩니다. postMessage를 통해 호스트와 안전하게 통신합니다.' 
        } 
      },
      { 
        element: '[data-tour="remote-vue"]', 
        popover: { 
          title: 'Remote Vue 앱', 
          description: 'Vue.js로 작성된 애플리케이션이 React 호스트 앱 내부에 자연스럽게 통합되어 있습니다.' 
        } 
      }
    ]
  });

  driverObj.drive();
};
