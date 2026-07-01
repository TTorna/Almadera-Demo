import { ShoppingBag, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useCart } from '../context/CartContext';

const ProductCarousel = ({ title, products, bgColor = 'bg-white', paddingClass = 'py-20 md:py-28' }) => {
  const { addToCart } = useCart();
  const whatsappNumber = '5491112345678'; 
  const getWhatsAppUrl = (productName) => {
    return `https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20consultar%20por%20el%20producto:%20${encodeURIComponent(productName)}`;
  };

  if (!products || products.length === 0) return null;

  const nextButtonId = `next-${title.replace(/\\s+/g, '-').toLowerCase()}`;
  const prevButtonId = `prev-${title.replace(/\\s+/g, '-').toLowerCase()}`;

  // Ensure enough slides for infinite loop (Swiper needs more slides than slidesPerView)
  const displayProducts = products.length < 8 ? [...products, ...products, ...products].slice(0, 8) : products;

  return (
    <section className={`${paddingClass} ${bgColor} relative overflow-hidden`} id="productos">
      <div className="container-custom relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-fontenla-border pb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-fontenla-dark mb-4 md:mb-0">
            {title}
          </h2>
          <Link to="/productos" className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-lightText hover:text-fontenla-dark transition-colors border-b border-transparent hover:border-fontenla-dark pb-1">
            Ver Todos
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Navigation Arrows (Absolute to the sides) */}
          <button id={prevButtonId} className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white shadow-lg border border-gray-100 hover:border-black text-gray-500 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 hidden md:block" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button id={nextButtonId} className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white shadow-lg border border-gray-100 hover:border-black text-gray-500 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 hidden md:block" aria-label="Siguiente">
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            navigation={{
              nextEl: `#${nextButtonId}`,
              prevEl: `#${prevButtonId}`,
            }}
            className="pb-8"
          >
            {displayProducts.map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`} className="!w-[280px] md:!w-[320px]">
                <Link to={`/producto/${product.id}`} className="group flex flex-col relative bg-white p-5 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 h-full border border-transparent hover:border-gray-100">
                  
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
                    
                    {/* Hover Buttons */}
                    <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                        className="w-full bg-black text-white py-3 text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 hover:bg-fontenla-wood transition-colors border-b border-gray-800"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} /> Agregar Carrito
                      </button>
                      <a 
                        href={getWhatsAppUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-fontenla-dark text-white py-3 text-[10px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} /> Consultar
                      </a>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center mt-auto">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-fontenla-lightText tracking-wider font-medium">
                      {product.price || 'Consultar Precio'}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
