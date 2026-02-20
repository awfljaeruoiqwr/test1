import { gsap } from 'gsap';

const products = [
  { id: 'p-1', name: 'AeroFit 러닝화', description: '가볍고 반응성이 뛰어난 데일리 트레이닝 슈즈', category: '신발', price: 129000, rating: 4.8, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { id: 'p-2', name: 'Urban Utility 백팩', description: '출퇴근과 여행에 어울리는 20L 생활방수 백팩', category: '가방', price: 89000, rating: 4.5, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80' },
  { id: 'p-3', name: 'Wave 블루투스 헤드셋', description: '노이즈 캔슬링과 35시간 배터리를 지원하는 헤드셋', category: '전자기기', price: 179000, rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id: 'p-4', name: 'PureGlow 무드 조명', description: '앱 연동으로 밝기와 컬러를 제어하는 스마트 램프', category: '홈', price: 54000, rating: 4.3, image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80' },
  { id: 'p-5', name: 'Active Dry 티셔츠', description: '통기성과 신축성을 갖춘 퍼포먼스 상의', category: '의류', price: 39000, rating: 4.6, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'p-6', name: 'Nimbus 텀블러', description: '보온/보냉이 뛰어난 600ml 스테인리스 텀블러', category: '리빙', price: 27000, rating: 4.4, image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80' },
];

const state = { loading: true, category: '전체', cart: [], drawerOpen: false };
const view = document.querySelector('#view');
const cartRoot = document.querySelector('#cartRoot');
const toastRoot = document.querySelector('#toastRoot');
const openCartBtn = document.querySelector('#openCartBtn');
document.querySelector('#year').textContent = String(new Date().getFullYear());

const formatPrice = (v) => `${v.toLocaleString()}원`;
const totalCount = () => state.cart.reduce((a, c) => a + c.quantity, 0);
const totalPrice = () => state.cart.reduce((a, c) => a + c.quantity * c.product.price, 0);

const toast = (message) => {
  toastRoot.innerHTML = `<div class="toast" role="status">${message}</div>`;
  gsap.fromTo('.toast', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 });
  setTimeout(() => (toastRoot.innerHTML = ''), 1800);
};

const addToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  const item = state.cart.find((i) => i.product.id === productId);
  if (item) item.quantity += 1;
  else state.cart.push({ product, quantity: 1 });
  updateCartButton();
  renderCart();
  toast(`${product.name}을(를) 장바구니에 담았습니다.`);
};

const updateCartButton = () => { openCartBtn.textContent = `장바구니 (${totalCount()})`; };

const renderCart = () => {
  if (!state.drawerOpen) return (cartRoot.innerHTML = '');
  cartRoot.innerHTML = `
    <div class="cart-overlay" aria-hidden="true"></div>
    <aside class="cart-drawer" aria-label="장바구니 서랍">
      <div style="padding:1rem;border-bottom:1px solid var(--color-border);display:flex;justify-content:space-between">
        <h2 style="margin:0">장바구니</h2><button class="ghost-btn" id="closeCartBtn" aria-label="장바구니 닫기">닫기</button>
      </div>
      <div style="padding:0 1rem;overflow-y:auto;flex:1">
        ${state.cart.length === 0 ? '<p>장바구니가 비어 있습니다.</p>' : state.cart.map((item) => `
          <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" style="height:80px;object-fit:cover;border-radius:var(--radius-md)">
            <div>
              <strong>${item.product.name}</strong>
              <p>${formatPrice(item.product.price)}</p>
              <label><span class="visually-hidden">수량</span><input data-qty="${item.product.id}" type="number" min="1" value="${item.quantity}" aria-label="${item.product.name} 수량" style="width:72px"></label>
            </div>
            <button class="ghost-btn" data-remove="${item.product.id}" aria-label="${item.product.name} 제거">삭제</button>
          </div>
        `).join('')}
      </div>
      <div style="padding:1rem;border-top:1px solid var(--color-border)">
        <p>합계: ${formatPrice(totalPrice())}</p>
        <button class="checkout-btn" style="width:100%" id="checkoutFromDrawer" aria-label="체크아웃으로 이동">결제 진행</button>
      </div>
    </aside>
  `;
  gsap.fromTo('.cart-drawer', { xPercent: 100 }, { xPercent: 0, duration: 0.25, ease: 'power2.out' });

  cartRoot.querySelector('.cart-overlay').onclick = () => { state.drawerOpen = false; renderCart(); };
  cartRoot.querySelector('#closeCartBtn').onclick = () => { state.drawerOpen = false; renderCart(); };
  cartRoot.querySelector('#checkoutFromDrawer').onclick = () => { location.hash = '#/checkout'; state.drawerOpen = false; renderCart(); };
  cartRoot.querySelectorAll('[data-remove]').forEach((btn) => btn.onclick = () => {
    state.cart = state.cart.filter((i) => i.product.id !== btn.dataset.remove); updateCartButton(); renderCart();
  });
  cartRoot.querySelectorAll('[data-qty]').forEach((input) => input.onchange = () => {
    const target = state.cart.find((i) => i.product.id === input.dataset.qty);
    target.quantity = Number(input.value || 1);
    if (target.quantity <= 0) state.cart = state.cart.filter((i) => i.product.id !== input.dataset.qty);
    updateCartButton(); renderCart();
  });
};

const homeView = () => {
  const categories = ['전체', ...new Set(products.map((p) => p.category))];
  const filtered = state.category === '전체' ? products : products.filter((p) => p.category === state.category);
  view.innerHTML = `
    <section class="hero"><p>신규 컬렉션 런칭</p><h1 style="margin-top:0">오늘의 라이프스타일 아이템을 만나보세요</h1><p>무료배송 + 첫 구매 10% 할인 쿠폰</p></section>
    <section class="category-list" aria-label="카테고리 섹션">${categories.slice(1).map((c) => `<span class="category-chip">#${c}</span>`).join('')}</section>
    <div class="filter-bar"><h2>추천 상품</h2><label><span class="visually-hidden">카테고리 필터</span><select id="categorySelect" class="filter-select" aria-label="카테고리 선택">${categories.map((c) => `<option value="${c}" ${state.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
    ${state.loading ? `<section class="u-grid-responsive">${Array.from({ length: 8 }).map(() => '<div class="skeleton"></div>').join('')}</section>` : `
      <section class="u-grid-responsive" aria-label="상품 목록">
      ${filtered.map((p) => `
        <article class="product-card">
          <a href="#/product/${p.id}" aria-label="${p.name} 상세 보기"><img src="${p.image}" alt="${p.name}" style="height:220px;object-fit:cover;width:100%"></a>
          <div class="product-card__body">
            <h3>${p.name}</h3><p class="muted">${p.description}</p>
            <div class="price-row"><strong>${formatPrice(p.price)}</strong><span aria-label="평점 ${p.rating}">⭐ ${p.rating}</span></div>
            <button class="add-btn" data-add="${p.id}" aria-label="${p.name} 장바구니 담기">장바구니 담기</button>
          </div>
        </article>
      `).join('')}
      </section>`}
  `;

  const select = document.querySelector('#categorySelect');
  if (select) select.onchange = (e) => { state.category = e.target.value; homeView(); };
  view.querySelectorAll('[data-add]').forEach((btn) => (btn.onclick = () => addToCart(btn.dataset.add)));
};

const productDetailView = (id) => {
  const p = products.find((item) => item.id === id);
  view.innerHTML = p ? `
    <section>
      <img src="${p.image}" alt="${p.name}" style="border-radius:var(--radius-lg);max-height:420px;width:100%;object-fit:cover">
      <h1>${p.name}</h1><p>${p.description}</p><p>가격: ${formatPrice(p.price)}</p><p>평점: ⭐ ${p.rating}</p>
    </section>
  ` : `<section><p>상품을 찾을 수 없습니다.</p><a href="#/">목록으로 돌아가기</a></section>`;
};

const checkoutView = () => {
  view.innerHTML = `
    <section>
      <h1>체크아웃</h1>
      ${state.cart.length === 0 ? '<p>결제할 상품이 없습니다.</p>' : state.cart.map((i) => `<p>${i.product.name} x ${i.quantity}</p>`).join('')}
      <p>총 결제금액: ${formatPrice(totalPrice())}</p>
      <button class="checkout-btn" id="payBtn" aria-label="결제 완료">결제 완료</button>
    </section>
  `;
  const payBtn = document.querySelector('#payBtn');
  if (payBtn) payBtn.onclick = () => { state.cart = []; updateCartButton(); toast('결제가 완료되었습니다.'); };
};

const router = () => {
  const hash = location.hash || '#/';
  if (hash.startsWith('#/product/')) return productDetailView(hash.replace('#/product/', ''));
  if (hash === '#/checkout') return checkoutView();
  return homeView();
};

openCartBtn.onclick = () => { state.drawerOpen = true; renderCart(); };
window.addEventListener('hashchange', router);

router();
setTimeout(() => { state.loading = false; if ((location.hash || '#/') === '#/') homeView(); }, 600);
