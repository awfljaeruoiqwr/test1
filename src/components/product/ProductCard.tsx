import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const ProductCard = ({ product, onAddToCart }: Props) => (
  <article className="product-card">
    <Link to={`/product/${product.id}`} aria-label={`${product.name} 상세 보기`}>
      <img src={product.image} alt={product.name} height={220} style={{ objectFit: 'cover', width: '100%' }} />
    </Link>
    <div className="product-card__body">
      <h3>{product.name}</h3>
      <p style={{ color: 'var(--color-text-muted)', minHeight: 48 }}>{product.description}</p>
      <div className="price-row">
        <strong>{product.price.toLocaleString()}원</strong>
        <span aria-label={`평점 ${product.rating}`}>⭐ {product.rating}</span>
      </div>
      <button className="add-btn" onClick={() => onAddToCart(product)} aria-label={`${product.name} 장바구니 담기`}>
        장바구니 담기
      </button>
    </div>
  </article>
);
