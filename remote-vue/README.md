# Remote Vue Application

Module Federation을 통해 React Host에 통합되는 Vue 3 애플리케이션입니다.

## 📦 노출 모듈 (Exposed Modules)

| 모듈                 | 경로                 | 설명                                                       |
| -------------------- | -------------------- | ---------------------------------------------------------- |
| **DashboardContent** | `./DashboardContent` | 데이터 시각화 및 KPI 카드가 포함된 메인 콘텐츠 영역입니다. |
| **Button**           | `./Button`           | 간단한 Vue 버튼 컴포넌트입니다.                            |

## 🛠 기술 스택

- **프레임워크**: Vue 3.5
- **빌드 도구**: Vite, `@module-federation/vite`
- **스타일링**: Standard CSS (scoped)
- **타입 체크**: `vue-tsc`

## 🔄 React-Vue 통합

Host App은 래퍼(Wrapper) 컴포넌트를 사용하여 이러한 Vue 컴포넌트를 React DOM 트리에 마운트합니다. Host의 상태 변경 사항은 props 또는 공유 스토어를 통해 전달됩니다.

## 🚀 개발 환경 실행

```bash
npm run dev
# http://localhost:5002 에서 실행됨
```
