import { useMemo, useState } from 'react';
import { FilterBar } from '../components/product/FilterBar';
import { ProductGrid } from '../components/product/ProductGrid';
import { useToast } from '../hooks/useToast';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types/product';

type Props = {
  products: Product[];
  loading: boolean;
};

export const HomePage = ({ products, loading }: Props) => {
  const [category, setCategory] = useState('전체');
  const addItem = useCartStore((state) => state.addItem);
  const { message, setMessage } = useToast();

  const categories = useMemo(() => ['전체', ...new Set(products.map((product) => product.category))], [products]);

  const filteredProducts = useMemo(
    () => (category === '전체' ? products : products.filter((product) => product.category === category)),
    [products, category],
  );

  const onAddToCart = (product: Product) => {
    addItem(product);
    setMessage(`${product.name}을(를) 장바구니에 담았습니다.`);
  };

  return (
    <>
      <section className="hero">
        <p>신규 컬렉션 런칭</p>
        <h1 style={{ marginTop: 0 }}>오늘의 라이프스타일 아이템을 만나보세요</h1>
        <p>무료배송 + 첫 구매 10% 할인 쿠폰</p>
      </section>
      <section className="category-list" aria-label="카테고리 섹션">
        {categories.slice(1).map((item) => (
          <span key={item} className="category-chip">
            #{item}
          </span>
        ))}
      </section>
      <FilterBar categories={categories} category={category} onCategoryChange={setCategory} />
      <ProductGrid products={filteredProducts} loading={loading} onAddToCart={onAddToCart} />
      {message ? (
        <div className="toast-wrap" role="status" aria-live="polite">
          <div className="toast">{message}</div>
        </div>
      ) : null}
    </>
  );
};
