import { useCartStore } from '../store/cartStore';

export const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();

  return (
    <section>
      <h1>체크아웃</h1>
      {items.length === 0 ? <p>결제할 상품이 없습니다.</p> : null}
      {items.map((item) => (
        <p key={item.product.id}>
          {item.product.name} x {item.quantity}
        </p>
      ))}
      <p>총 결제금액: {totalPrice().toLocaleString()}원</p>
      <button className="checkout-btn" onClick={clearCart} aria-label="결제 완료">
        결제 완료
      </button>
    </section>
  );
};
