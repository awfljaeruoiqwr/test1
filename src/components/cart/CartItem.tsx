import type { CartItem as CartItemType } from '../../types/cart';

type Props = {
  item: CartItemType;
  onQuantity: (value: number) => void;
  onRemove: () => void;
};

export const CartItem = ({ item, onQuantity, onRemove }: Props) => (
  <div className="cart-item">
    <img src={item.product.image} alt={item.product.name} style={{ borderRadius: 'var(--radius-md)', height: 80, objectFit: 'cover' }} />
    <div>
      <strong>{item.product.name}</strong>
      <p>{item.product.price.toLocaleString()}원</p>
      <label>
        <span className="visually-hidden">수량 선택</span>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(event) => onQuantity(Number(event.target.value))}
          style={{ width: 72 }}
          aria-label={`${item.product.name} 수량`}
        />
      </label>
    </div>
    <button className="ghost-btn" onClick={onRemove} aria-label={`${item.product.name} 제거`}>
      삭제
    </button>
  </div>
);
