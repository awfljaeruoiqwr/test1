import { Link, useParams } from 'react-router-dom';
import type { Product } from '../types/product';

type Props = {
  products: Product[];
};

export const ProductDetailPage = ({ products }: Props) => {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section>
        <p>상품을 찾을 수 없습니다.</p>
        <Link to="/">목록으로 돌아가기</Link>
      </section>
    );
  }

  return (
    <section>
      <img src={product.image} alt={product.name} style={{ borderRadius: 'var(--radius-lg)', maxHeight: 420, width: '100%', objectFit: 'cover' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>가격: {product.price.toLocaleString()}원</p>
      <p>평점: ⭐ {product.rating}</p>
    </section>
  );
};
