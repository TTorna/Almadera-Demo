import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const whatsappNumber = '5491112345678';

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }).replace(',00', '');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    let message = 'Hola, me gustaría concretar la compra de los siguientes artículos:\\n\\n';
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Cant: ${item.quantity}) - ${item.price || 'Consultar precio'}\\n`;
    });
    
    const total = getCartTotal();
    if (total > 0) {
      message += `\\n*Total Estimado:* $${total.toLocaleString()}\\n`;
    }
    
    message += '\\nAguarde su respuesta para coordinar envío y pago. ¡Gracias!';
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[80] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-fontenla-dark flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Mi Carrito
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-black transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-200" strokeWidth={1} />
              <p className="text-gray-500 text-xs uppercase tracking-widest">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="border-b border-black text-xs font-bold uppercase tracking-widest pb-1 hover:text-fontenla-wood hover:border-fontenla-wood transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 bg-fontenla-gray shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col flex-1 py-1">
                    <div className="flex justify-between items-start mb-1">
                      <Link to={`/producto/${item.id}`} onClick={() => setIsCartOpen(false)} className="text-xs font-bold uppercase tracking-widest text-fontenla-dark hover:text-fontenla-wood transition-colors pr-4 line-clamp-2">
                        {item.name}
                      </Link>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-fontenla-lightText mb-4">{item.price || 'Consultar Precio'}</p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Estimado</span>
              <span className="text-lg font-bold text-fontenla-dark">
                {getCartTotal() > 0 ? formatPrice(getCartTotal()) : 'Consultar'}
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-fontenla-dark text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors flex justify-center items-center gap-2"
            >
              Iniciar Compra por WhatsApp
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-center mt-4 text-[10px] uppercase font-semibold text-gray-400 hover:text-gray-800 transition-colors"
            >
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
