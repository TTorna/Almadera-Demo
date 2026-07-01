import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Stores from './pages/Stores';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<ProductListing />} />
          <Route path="producto/:id" element={<ProductDetail />} />
          <Route path="tiendas" element={<Stores />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
