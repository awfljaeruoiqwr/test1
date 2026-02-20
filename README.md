# NeoMarket 프론트엔드

기존 React + TypeScript 버전은 유지하면서, 동일한 기능과 UI를 **Vanilla JavaScript + HTML + CSS + GSAP**로도 구현했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

- React 버전: `http://localhost:5173/`
- Vanilla(JS/HTML/CSS/GSAP) 버전: `http://localhost:5173/vanilla/`

빌드/검증:

```bash
npm run build
npm run lint
```

## 폴더 구조

```text
src/                       # 기존 React + TS 버전
vanilla/
  index.html               # Vanilla 엔트리
  styles.css               # Vanilla 스타일
  main.js                  # Vanilla 로직 + 라우팅 + 상태 + GSAP
```

## 주요 기능 (React/Vanilla 공통)

- **상품목록(Home)**: 히어로 배너, 카테고리 섹션, 필터 바, 상품 그리드, 스켈레톤 로딩.
- **상품상세(ProductDetail)**: 라우트 기반 상세 페이지.
- **장바구니(Cart Drawer)**: 추가/삭제/수량변경/합계 계산, 드로어 애니메이션.
- **체크아웃(Checkout)**: 결제 목록/합계 표시와 결제 완료.
- **UX/A11y**: sticky 헤더, hover 애니메이션, 토스트 알림, `aria-label`, `focus-visible`, 이미지 `alt`.

## Vanilla 구현 상세

- Hash 라우팅: `#/`, `#/product/:id`, `#/checkout`
- 상태 관리: 전역 `state` 객체 + 렌더 함수 재호출
- 애니메이션: GSAP 사용
  - 토스트 등장 애니메이션
  - Cart Drawer 슬라이드 인 애니메이션

## 개발 로그 (수정/오류 해결 기록)

1. **요구사항 반영 방식 변경**
   - 초기 React 구현은 유지하고, 동일 기능의 Vanilla 페이지를 `/vanilla` 경로로 별도 추가하여 “기존 프로젝트 유지” 요구를 충족했습니다.

2. **Vite에서 다중 페이지 제공 확인**
   - `vanilla/index.html`을 추가해 `http://localhost:5173/vanilla/` 경로에서 직접 접근 가능하도록 구성했습니다.

3. **애니메이션 라이브러리 연동**
   - `gsap` 설치 후 ES module import 방식(`import { gsap } from 'gsap'`)으로 적용했습니다.

4. **장바구니 드로어 이벤트 재바인딩 이슈 대응**
   - 드로어를 매 렌더링 시 재생성하므로, 수량/삭제/닫기 버튼 이벤트를 `renderCart()` 내부에서 재바인딩하도록 정리했습니다.

5. **스켈레톤 → 실제 데이터 전환 처리**
   - 홈 진입 시 600ms 로딩 상태를 유지한 뒤 상품 카드로 전환해 기존 UX와 동일하게 맞췄습니다.
