import { Container } from './Container';

export const Footer = () => (
  <footer className="site-footer">
    <Container>© {new Date().getFullYear()} NeoMarket. All rights reserved.</Container>
  </footer>
);
