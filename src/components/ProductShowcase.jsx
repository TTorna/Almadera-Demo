import { products } from '../data/mockData';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const whatsappNumber = '5491112345678'; 
  const getWhatsAppUrl = (productName) => {
    return `https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20consultar%20por%20el%20producto:%20${encodeURIComponent(productName)}`;
  };

  return (
    <section className="py-24 md:py-32 bg-fontenla-gray" id="productos">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 border-b border-fontenla-border pb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-fontenla-dark mb-4 md:mb-0">
            Destacados
          </h2>
          <Link to="/productos" className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-lightText hover:text-fontenla-dark transition-colors border-b border-transparent hover:border-fontenla-dark pb-1">
            Ver Todos los Productos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link to={`/producto/${product.id}`} key={product.id} className="group flex flex-col relative bg-white p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500">
              
              {/* Product Image & Badges */}
              <div className="relative aspect-square overflow-hidden mb-6 bg-fontenla-gray flex items-center justify-center">
                {product.tag && (
                  <div className="absolute top-0 left-0 z-10 bg-fontenla-dark text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]">
                    {product.tag}
                  </div>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Add to Cart Button (WhatsApp Action) */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a 
                    href={getWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-fontenla-dark text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-black transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Consultar
                  </a>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="text-center mt-auto">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-3 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[12px] text-fontenla-lightText tracking-wider font-medium">
                  {product.price || 'Consultar Precio'}
                </p>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
