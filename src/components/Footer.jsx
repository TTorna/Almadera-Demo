import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8" id="footer">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div>
            <h4 className="text-xl font-bold tracking-[0.2em] mb-6 uppercase">Almadera</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mobiliario de diseño. Expertos en maderas nobles y acabados de lujo para interiores y exteriores.
            </p>
            <div className="flex gap-4">
              {/* SVG Instagram */}
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* SVG Facebook */}
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-6">Navegación</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider">Home</Link></li>
              <li><Link to="/productos" className="text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider">Productos</Link></li>
              <li><Link to="/tiendas" className="text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider">Tiendas</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider">Contacto</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider">Corporativo</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>Av. Libertador 1234<br/>CABA, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@almadera.com" className="hover:text-white transition-colors">info@almadera.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Recibí las últimas novedades y beneficios exclusivos.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-transparent border border-gray-600 text-white px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit" 
                className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs text-center md:text-left">
          <p>© {new Date().getFullYear()} Almadera. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
