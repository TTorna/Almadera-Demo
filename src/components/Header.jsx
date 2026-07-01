import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { megamenuData } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Header = ({ toggleSideMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceHideMenu, setForceHideMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = () => {
    setForceHideMenu(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const whatsappUrl = 'https://wa.me/5491112345678?text=Hola,%20quisiera%20hacer%20una%20consulta.';

  return (
    <>
      {/* Search Overlay */}
      <div className={`fixed inset-0 bg-black/95 z-[60] flex items-center justify-center transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-fontenla-wood transition-colors">
          <X className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl px-6 relative">
          <input 
            type="text" 
            placeholder="¿Qué estás buscando?" 
            className="w-full bg-transparent border-b border-white/30 text-white text-2xl md:text-4xl py-4 pr-12 font-light tracking-wide focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-fontenla-wood transition-colors">
            <Search className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </form>
      </div>

    <header className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out border-b border-transparent ${isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg border-black' : 'bg-black'}`}>
      
      {/* Main Navigation */}
      <nav className="container-custom mx-auto px-4 relative">
        <div className="flex justify-between items-center h-[80px]">
          
          {/* Desktop Links (Left) */}
          <div className="hidden md:flex flex-1 items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-white h-full">
            <Link to="/" className="hover:text-fontenla-wood transition-colors h-full flex items-center">Home</Link>
            
            <div className="group h-full flex items-center">
              <Link 
                to="/productos" 
                className="hover:text-fontenla-wood transition-colors cursor-pointer h-full flex items-center"
                onMouseEnter={() => setForceHideMenu(false)}
              >
                Productos
              </Link>
              
              {/* Megamenu */}
              <div className={`fixed top-[80px] left-0 w-screen bg-[#0a0a0a] shadow-2xl transition-all duration-300 z-50 border-t border-[#222] ${forceHideMenu ? 'opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="w-full flex justify-center max-h-[80vh] py-16 px-4 lg:px-12">
                  
                  {/* Links Distribution */}
                  <div className="w-full max-w-[1600px] flex flex-wrap xl:flex-nowrap justify-between gap-x-4 gap-y-12 overflow-y-auto custom-scrollbar">
                    {megamenuData.map((col, idx) => (
                      <div key={idx} className="w-1/2 sm:w-1/3 md:w-1/4 xl:w-auto px-2 text-left mb-8 xl:mb-0 flex flex-col">
                        <Link 
                          to={`/productos?category=${encodeURIComponent(col.title)}&subcategory=Todos los Productos`}
                          onClick={handleCategoryClick}
                          className="relative inline-block text-[9px] font-bold mb-6 uppercase tracking-[0.2em] text-white whitespace-nowrap group/title self-start pb-1"
                        >
                          {col.title}
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/title:w-full"></span>
                        </Link>
                        <ul className="space-y-4">
                          {col.links.map((link, i) => (
                            <li key={i}>
                              <Link 
                                to={`/productos?category=${encodeURIComponent(col.title)}&subcategory=${encodeURIComponent(link)}`} 
                                className="relative inline-block text-[11px] font-normal text-[#888] hover:text-white transition-colors capitalize leading-relaxed group/link pb-[2px]"
                                onClick={handleCategoryClick}
                              >
                                {link}
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/link:w-full"></span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
            
            <Link to="/" className="hover:text-fontenla-wood transition-colors h-full flex items-center">Corporativo</Link>
          </div>

          {/* Logo Center */}
          <div className="flex-shrink-0 text-left md:text-center flex-1 md:flex-none ml-2 md:ml-0">
            <Link to="/" className="text-2xl lg:text-3xl font-bold tracking-[0.25em] text-white uppercase block">
              ALMADERA
            </Link>
          </div>

          {/* Icons & Links (Right) */}
          <div className="flex flex-1 justify-end items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
              <Link to="/tiendas" className="hover:text-fontenla-wood transition-colors">Tiendas</Link>
              <Link to="/contacto" className="hover:text-fontenla-wood transition-colors">Contacto</Link>
            </div>
            
            {/* Search & Cart & Mobile Toggle */}
            <div className="flex items-center gap-5 md:gap-5">
              <button 
                aria-label="Buscar" 
                className="text-white hover:text-fontenla-wood transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button 
                className="relative text-white hover:text-fontenla-wood transition-colors" 
                aria-label="Mi Carro"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-fontenla-wood text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="md:hidden ml-2 text-white hover:text-fontenla-wood transition-colors" onClick={toggleSideMenu} aria-label="Abrir menú">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      </nav>
    </header>
    </>
  );
};

export default Header;
