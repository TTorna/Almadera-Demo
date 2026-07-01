import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { megamenuData } from '../data/mockData';

const SideMenu = ({ isOpen, onClose }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (idx) => {
    if (openCategory === idx) {
      setOpenCategory(null);
    } else {
      setOpenCategory(idx);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      ></div>

      {/* Off-canvas Menu */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-screen bg-black text-white z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={onClose} className="hover:text-fontenla-wood transition-colors p-2">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <Link to="/" onClick={onClose} className="block py-3 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-fontenla-wood transition-colors">
            Home
          </Link>
          
          <div className="py-1">
            <Link to="/productos" onClick={onClose} className="block text-[12px] font-bold uppercase tracking-[0.15em] mb-2 hover:text-fontenla-wood transition-colors py-2">
              Productos
            </Link>
            
            <ul className="pl-0 space-y-1">
              {megamenuData.map((col, idx) => (
                <li key={idx} className="border-b border-white/5 last:border-0">
                  <button 
                    onClick={() => toggleCategory(idx)}
                    className="w-full flex justify-between items-center py-3 text-[13px] text-white/80 hover:text-white transition-colors"
                  >
                    <span className="capitalize tracking-wider">{col.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openCategory === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openCategory === idx ? 'max-h-[300px] pb-2' : 'max-h-0'}`}>
                    <ul className="space-y-3 pl-4 pt-1">
                      {col.links.map((link, i) => (
                        <li key={i}>
                          <Link 
                            to={`/productos?category=${encodeURIComponent(col.title)}&subcategory=${encodeURIComponent(link)}`} 
                            onClick={onClose} 
                            className="text-[12px] text-white/50 hover:text-white transition-colors block py-0.5"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 mt-4 pt-4 mb-4">
            <Link to="/" onClick={onClose} className="block py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-fontenla-wood transition-colors">Corporativo</Link>
            <Link to="/" onClick={onClose} className="block py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-fontenla-wood transition-colors">Sobre Almadera</Link>
            <Link to="/tiendas" onClick={onClose} className="block py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-fontenla-wood transition-colors">Tiendas</Link>
            <Link to="/contacto" onClick={onClose} className="block py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] hover:text-fontenla-wood transition-colors">Contacto</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
