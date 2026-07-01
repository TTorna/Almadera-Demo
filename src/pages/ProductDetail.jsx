import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { ShoppingBag, Ruler, Truck, ShieldCheck, ZoomIn, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen pt-[120px] pb-24 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-fontenla-dark">Producto no encontrado</h2>
        <Link to="/productos" className="mt-8 inline-block btn-outline-ecommerce">Volver al catálogo</Link>
      </div>
    );
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const productImages = product.images || [product.image];
  const currentImage = productImages[currentImageIndex];

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const whatsappNumber = '5491112345678'; 
  const getWhatsAppUrl = () => {
    return `https://wa.me/${whatsappNumber}?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.name)}.%20¿Podrían%20darme%20más%20información?`;
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-24">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-fontenla-lightText mb-12">
          <Link to="/" className="hover:text-fontenla-dark transition-colors">Home</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-fontenla-dark transition-colors">Productos</Link>
          <span>/</span>
          <span className="text-fontenla-dark font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex md:flex-col order-2 md:order-1 gap-3 overflow-x-auto md:overflow-visible w-full md:w-20 shrink-0 custom-scrollbar pb-2 md:pb-0">
              {productImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative aspect-[3/4] md:aspect-square w-20 md:w-full shrink-0 overflow-hidden bg-fontenla-gray transition-all duration-300 ${currentImageIndex === idx ? 'border border-black opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom */}
            <div className="relative order-1 md:order-2 flex-1 bg-fontenla-gray aspect-square overflow-hidden group">
              {product.tag && (
                <div className="absolute top-4 left-4 z-20 bg-fontenla-dark text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em]">
                  {product.tag}
                </div>
              )}
              
              {/* Zoom Container */}
              <div 
                ref={imageRef}
                className={`w-full h-full relative bg-white ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={isZoomed ? handleMouseMove : undefined}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-75 ease-linear"
                  style={{ 
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center center' 
                  }}
                />
              </div>

              {/* Zoom Icon (Top Right) */}
              <div className="absolute top-4 right-4 z-10 bg-white/90 p-2.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <ZoomIn className="w-5 h-5 text-fontenla-dark" strokeWidth={1.5} />
              </div>

              {/* Navigation Controls (Bottom Right) */}
              {productImages.length > 1 && (
                <div className="absolute bottom-6 right-6 z-10 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={prevImage} aria-label="Anterior imagen" className="w-10 h-10 bg-white/90 hover:bg-white text-fontenla-dark flex items-center justify-center rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105">
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button onClick={nextImage} aria-label="Siguiente imagen" className="w-10 h-10 bg-white/90 hover:bg-white text-fontenla-dark flex items-center justify-center rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all hover:scale-105">
                    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pl-0 lg:pl-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-fontenla-dark mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-light tracking-widest text-fontenla-dark mb-8">
              {product.price}
            </p>

            <div className="prose prose-sm text-fontenla-lightText mb-10 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <button 
                onClick={() => addToCart(product)}
                className="w-full border border-black bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-fontenla-wood hover:border-fontenla-wood transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Agregar al Carrito
              </button>
              <a 
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-black bg-transparent text-black py-4 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Consultar
              </a>
            </div>

            {/* Features Accordion (Static for demo) */}
            <div className="border-t border-fontenla-border">
              <div className="py-5 border-b border-fontenla-border flex items-start gap-4">
                <Ruler className="w-5 h-5 text-fontenla-dark shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-1">Dimensiones</h4>
                  <p className="text-xs text-fontenla-lightText">{product.dimensions}</p>
                </div>
              </div>
              <div className="py-5 border-b border-fontenla-border flex items-start gap-4">
                <Truck className="w-5 h-5 text-fontenla-dark shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-1">Envíos a todo el país</h4>
                  <p className="text-xs text-fontenla-lightText">Cotizamos el envío según destino. Embalaje especial en madera.</p>
                </div>
              </div>
              <div className="py-5 border-b border-fontenla-border flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-fontenla-dark shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-1">Garantía Almadera</h4>
                  <p className="text-xs text-fontenla-lightText">5 años de garantía estructural de fábrica.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
