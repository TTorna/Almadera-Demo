import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

const MainLayout = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="relative font-sans">
      <Header toggleSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      <CartDrawer />
      
      {/* Contenido dinámico de las páginas */}
      <main className="min-h-screen">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
