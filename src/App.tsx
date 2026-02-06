import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartDrawer } from './components/cart/CartDrawer';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Container } from './components/layout/Container';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { productsService } from './services/products';
import './styles/app.css';
import type { Product } from './types/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsService.getProducts().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <Container>
        <main className="container-main">
          <Routes>
            <Route path="/" element={<HomePage products={products} loading={loading} />} />
            <Route path="/product/:productId" element={<ProductDetailPage products={products} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </Container>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default App;
