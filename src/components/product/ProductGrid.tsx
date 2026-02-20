import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
};

export const ProductGrid = ({ products, loading, onAddToCart }: Props) => {
  if (loading) {
    return (
      <section className="u-grid-responsive" aria-label="상품 로딩 중">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="skeleton" key={`skeleton-${index}`} aria-hidden="true" />
        ))}
      </section>
    );
  }

  return (
    <section className="u-grid-responsive" aria-label="상품 목록">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
};
