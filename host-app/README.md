# Host Application

Micro-Frontends 아키텍처의 **메인 컨테이너** 역할을 하는 React 애플리케이션입니다.

<br/>

<div align="center">
  <video src="../playground.mov" controls="controls" width="100%"></video>
</div>

<br/>

## 🎯 역할 및 책임 (Roles & Responsibilities)

1.  **레이아웃 구성**: 사이드바, 푸터 등 공통 UI 레이아웃을 제공합니다.
2.  **Remote 통합**: `Remote React`, `Remote Vue` 컴포넌트를 로드하고 렌더링합니다.
3.  **Iframe 관리**: 격리된 `Remote Iframe` 앱을 포함하고 통신을 담당합니다.
4.  **전역 상태 관리**: 자체 구현한 **Pub/Sub 패턴의 스토어**를 사용하여 공유 상태(_count_)를 관리하고 전파합니다.
5.  **라우팅**: 전체 애플리케이션의 클라이언트 사이드 라우팅을 처리합니다.

## 📦 주요 기능 (Key Features)

- **Federation Wrapper**: Remote 컴포넌트 로딩 실패 시 에러 경계(Error Boundary) 및 로딩 상태를 처리하는 래퍼 컴포넌트입니다.
- **온보딩 투어**: `driver.js`를 사용하여 아키텍처를 설명하는 인터랙티브 가이드를 제공합니다.
- **상태 동기화**: `window.postMessage`를 통해 Iframe과 양방향 통신을 구현했습니다.

## 🔄 자동 타입 동기화 (Automated Type Sync)

이 프로젝트는 `type-sync.js` 스크립트를 통해 **실행 중인 Remote 앱**으로부터 최신 타입 정의(`.d.ts`)를 자동으로 가져옵니다.

### ❓ 왜 구현했나요? (Why Implemented)

`@module-federation/dts-plugin`이 훌륭하지만, 개발 모드에서 실시간으로 변경되는 타입 정보를 Host에 즉시 반영하는 데에는 한계가 있거나 설정이 복잡할 수 있습니다. 특히 로컬 개발 환경에서 여러 Remote를 동시에 띄워두고 작업할 때, **단순하고 확실한 타입 동기화 수단**이 필요했습니다.

### ✅ 왜 사용해야 하나요? (Why Use)

1.  **개발자 경험(DX) 향상**: Remote에서 컴포넌트의 Props를 수정하고 저장하면, Host에서 즉시 타입 에러를 확인할 수 있습니다.
2.  **수동 복사 불필요**: 더 이상 `d.ts` 파일을 복사-붙여넣기 하거나 수동으로 다운로드할 필요가 없습니다.
3.  **유연성**: 스크립트 기반이므로 다양한 Remote URL이나 구조에 맞춰 쉽게 커스터마이징이 가능합니다.

```bash
# 타입 동기화 실행
npm run type-sync
```

## 🛠 기술 스택

- **프레임워크**: React 19
- **빌드 도구**: Vite, `@module-federation/vite`
- **상태 관리**: Custom Store (Pub/Sub)
- **스타일링**: Tailwind CSS

## 🚀 개발 환경 실행

```bash
npm run dev
# http://localhost:5000 에서 실행됨
```
