# NeoMarket 프론트엔드

Vite + React + TypeScript 기반의 쇼핑 사이트 데모입니다. 상품 목록/상세/장바구니/체크아웃 흐름을 포함하고, 디자인 토큰, 접근성, 기본 UX 개선 요소(스켈레톤/애니메이션/토스트)를 적용했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

빌드/검증:

```bash
npm run build
npm run lint
```

## 폴더 구조

```text
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      Container.tsx
    product/
      ProductCard.tsx
      ProductGrid.tsx
      FilterBar.tsx
    cart/
      CartDrawer.tsx
      CartItem.tsx
  pages/
    HomePage.tsx
    ProductDetailPage.tsx
    CheckoutPage.tsx
  styles/
    tokens.css
    globals.css
    app.css
  store/
    cartStore.ts
  data/
    products.ts
  services/
    products.ts
  types/
    product.ts
    cart.ts
```

## 주요 기능

- **상품목록(Home)**: 히어로 배너, 카테고리 섹션, 필터 바, 상품 그리드, 스켈레톤 로딩.
- **상품상세(ProductDetail)**: 라우트 기반 상세 페이지(`/product/:productId`).
- **장바구니(Cart Drawer)**: 추가/삭제/수량변경/합계 계산, 드로어 전환 애니메이션.
- **체크아웃(Checkout)**: 결제 목록/합계 표시와 결제 완료(장바구니 비우기).
- **UX/A11y**: sticky 헤더, hover 애니메이션, 토스트 알림, `aria-label`, `focus-visible`, 이미지 `alt`.

## 기술 포인트

- **상태관리**: `zustand` 기반 `cartStore`로 장바구니 로직 분리.
- **데이터 계층 분리**: `data/products.ts`(mock 데이터) + `services/products.ts`(API 전환 대비 인터페이스).
- **디자인 시스템**: `styles/tokens.css`에서 색상/간격/반경/그림자/타이포 스케일 선언.
