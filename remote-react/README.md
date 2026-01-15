# Remote React Application

Module Federation을 통해 노출(Expose)되는 React 기반 마이크로 프론트엔드입니다.

## 📦 노출 모듈 (Exposed Modules)

| 모듈                | 경로                | 설명                                             |
| ------------------- | ------------------- | ------------------------------------------------ |
| **Header**          | `./Header`          | Tailwind로 스타일링된 상단 네비게이션 바입니다.  |
| **InteractiveCard** | `./InteractiveCard` | GSAP 애니메이션이 적용된 리치 UI 컴포넌트입니다. |

## 🛠 기술 스택

- **프레임워크**: React 19
- **빌드 도구**: Vite, `@module-federation/vite`
- **스타일링**: Tailwind CSS
- **애니메이션**: GSAP (GreenSock)

## 🧩 타입 생성 (Type Generation)

이 프로젝트는 `@module-federation/dts-plugin`을 사용하여 노출된 컴포넌트의 타입을 자동으로 생성합니다.

```json
// vite.config.ts
federation({
  name: 'remote_react',
  exposes: {
    './Header': './src/exposes/Header.tsx',
    './InteractiveCard': './src/exposes/InteractiveCard.tsx',
  },
  // ...
})
```

## 🚀 개발 환경 실행

```bash
npm run dev
# http://localhost:5001 에서 실행됨
```
