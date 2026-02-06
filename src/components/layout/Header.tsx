import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { Container } from './Container';

export const Header = () => {
  const count = useCartStore((state) => state.totalCount());
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);

  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="홈으로 이동">
            NeoMarket
          </Link>
          <nav className="nav-links" aria-label="주요 메뉴">
            <Link to="/">상품</Link>
            <Link to="/checkout">체크아웃</Link>
          </nav>
          <button className="ghost-btn" onClick={() => toggleDrawer(true)} aria-label="장바구니 열기">
            장바구니 ({count})
          </button>
        </div>
      </Container>
    </header>
  );
};
