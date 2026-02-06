import { useCartStore } from '../../store/cartStore';
import { CartItem } from './CartItem';

export const CartDrawer = () => {
  const { isOpen, items, toggleDrawer, setQuantity, removeItem, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => toggleDrawer(false)} aria-hidden="true" />
      <aside className="cart-drawer" aria-label="장바구니 서랍">
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>장바구니</h2>
          <button className="ghost-btn" onClick={() => toggleDrawer(false)} aria-label="장바구니 닫기">닫기</button>
        </div>
        <div style={{ padding: '0 1rem', overflowY: 'auto', flex: 1 }}>
          {items.length === 0 ? <p>장바구니가 비어 있습니다.</p> : null}
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onQuantity={(value) => setQuantity(item.product.id, value)}
              onRemove={() => removeItem(item.product.id)}
            />
          ))}
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <p>합계: {totalPrice().toLocaleString()}원</p>
          <button className="checkout-btn" style={{ width: '100%' }} onClick={() => toggleDrawer(false)} aria-label="체크아웃으로 이동">
            결제 진행
          </button>
        </div>
      </aside>
    </>
  );
};
