import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, featuredCategories } from '../data/mockData';
import { ChevronDown, Plus, Minus, LayoutGrid, Square, SlidersHorizontal, X, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'Catálogo';
  const currentSubcategory = searchParams.get('subcategory') || 'Todos los Productos';
  const currentSearch = searchParams.get('search') || '';
  const { addToCart } = useCart();
  const whatsappNumber = '5491112345678'; 
  const getWhatsAppUrl = (productName) => {
    return `https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20consultar%20por%20el%20producto:%20${encodeURIComponent(productName)}`;
  };

  const [showFilters, setShowFilters] = useState(() => window.innerWidth >= 1024);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'large'
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortMethod, setSortMethod] = useState('newest');
  
  const [openFilters, setOpenFilters] = useState({
    categorias: false,
    material: false,
    tapizado: false
  });
  
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 100000);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 100000);
    setPriceRange([priceRange[0], value]);
  };

  const toggleFilter = (filterKey) => {
    setOpenFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const filteredProducts = products.filter(product => {
    // Search logic (checks name and description)
    if (currentSearch) {
      const searchLower = currentSearch.toLowerCase();
      if (!product.name.toLowerCase().includes(searchLower) && 
          !product.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    } else {
      // If no search, filter by category
      if (currentSubcategory !== 'Todos los Productos') {
        if (product.subcategory?.toLowerCase() !== currentSubcategory.toLowerCase()) return false;
      }
    }
    
    if (product.price) {
      const getPrice = (priceStr) => Number(priceStr.replace(/[^0-9]/g, ''));
      const productPrice = getPrice(product.price);
      if (productPrice < priceRange[0] || (priceRange[1] < 10000000 && productPrice > priceRange[1])) {
        return false;
      }
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortMethod === 'price_asc' || sortMethod === 'price_desc') {
      const getPrice = (priceStr) => Number(priceStr.replace(/[^0-9]/g, ''));
      const priceA = getPrice(a.price);
      const priceB = getPrice(b.price);
      return sortMethod === 'price_asc' ? priceA - priceB : priceB - priceA;
    }
    return 0;
  });
  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      
      {/* Category Hero Image */}
      <div className="relative w-full h-[35vh] md:h-[50vh] mt-[80px]">
        <img 
          src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1920&q=80" 
          alt={currentSearch ? 'Búsqueda' : currentSubcategory} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase drop-shadow-md text-center px-4">
            {currentSearch ? `Búsqueda: "${currentSearch}"` : currentSubcategory}
          </h1>
        </div>
      </div>

      <div className="container-custom mt-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-fontenla-lightText mb-2 lg:mb-6 border-b border-fontenla-border pb-4">
          <Link to="/" className="hover:text-fontenla-dark transition-colors">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/productos" className="hover:text-fontenla-dark transition-colors">Productos</Link>
          {currentSearch ? (
            <>
              <span className="mx-1">/</span>
              <span className="text-fontenla-lightText capitalize">Búsqueda</span>
            </>
          ) : (
            <>
              {currentCategory !== 'Catálogo' && (
                <>
                  <span className="mx-1">/</span>
                  <span className="hover:text-fontenla-dark transition-colors cursor-pointer capitalize">{currentCategory.toLowerCase()}</span>
                </>
              )}
              {currentSubcategory !== 'Todos los Productos' && (
                <>
                  <span className="mx-1">/</span>
                  <span className="text-fontenla-lightText capitalize">{currentSubcategory.toLowerCase()}</span>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Desktop Sidebar / Filters */}
          <aside className="hidden lg:block w-1/4 transition-all duration-300">
            {showFilters && (
              <div className="sticky top-[100px] bg-transparent p-0 mb-0">
                
              {/* Material Filter */}
              <div className="mb-6 border-b border-fontenla-border pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer group mb-4"
                  onClick={() => toggleFilter('material')}
                >
                  <h3 className="text-xs font-bold uppercase tracking-widest text-fontenla-dark">Material</h3>
                  {openFilters.material ? (
                    <Minus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  )}
                </div>
                
                {openFilters.material && (
                  <ul className="space-y-3 mt-4 animation-fade-in">
                    {['Acero inoxidable', 'Acero pulido', 'Hierro', 'Madera', 'Madera de Guindo'].map((item, idx) => (
                      <li key={idx}>
                        <button className="text-xs font-light text-fontenla-lightText hover:text-fontenla-wood transition-colors text-left">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tapizado Filter */}
              <div className="mb-6 border-b border-fontenla-border pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggleFilter('tapizado')}
                >
                  <h3 className="text-xs font-bold uppercase tracking-widest text-fontenla-dark">Tapizado</h3>
                  {openFilters.tapizado ? (
                    <Minus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  )}
                </div>
                
                {openFilters.tapizado && (
                  <ul className="space-y-3 mt-6 animation-fade-in">
                    {['Pana', 'Cuero Natural', 'Cuero Ecológico', 'Lino'].map((item, idx) => (
                      <li key={idx}>
                        <button className="text-xs font-light text-fontenla-lightText hover:text-fontenla-wood transition-colors text-left">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
            )}
          </aside>

          {/* Mobile Full Screen Filter Drawer */}
          <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col lg:hidden ${showFilters ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4 flex justify-end shrink-0">
              <button onClick={() => setShowFilters(false)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="px-10 pt-2 pb-6 flex-1 overflow-y-auto">
              
              {/* Categorías */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer mb-4"
                  onClick={() => toggleFilter('categorias')}
                >
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-fontenla-dark">Categorías</h3>
                  {openFilters.categorias ? (
                    <Minus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  )}
                </div>
                {openFilters.categorias && (
                  <ul className="space-y-3 mt-4 relative animation-fade-in">
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>
                    {['Banquetas', 'Carro bar', 'Chaise Longue', 'Conjunto Mesas de Centro', 'Consolas', 'Dressoires', 'Espejos'].map((item, idx) => (
                      <li key={idx}>
                        <button className="text-[13px] font-light text-gray-400 hover:text-black transition-colors text-left w-full pr-4">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Material Filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggleFilter('material')}
                >
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-fontenla-dark">Material</h3>
                  {openFilters.material ? (
                    <Minus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  )}
                </div>
                {openFilters.material && (
                  <ul className="space-y-3 mt-6 animation-fade-in">
                    {['Acero inoxidable', 'Acero pulido', 'Hierro', 'Madera', 'Madera de Guindo'].map((item, idx) => (
                      <li key={idx}>
                        <button className="text-[13px] font-light text-gray-400 hover:text-black transition-colors text-left w-full">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tapizado Filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div 
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => toggleFilter('tapizado')}
                >
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-fontenla-dark">Tapizado</h3>
                  {openFilters.tapizado ? (
                    <Minus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-fontenla-dark" strokeWidth={2} />
                  )}
                </div>
                {openFilters.tapizado && (
                  <ul className="space-y-3 mt-6 animation-fade-in">
                    {['Pana', 'Cuero Natural', 'Cuero Ecológico', 'Lino'].map((item, idx) => (
                      <li key={idx}>
                        <button className="text-[13px] font-light text-gray-400 hover:text-black transition-colors text-left w-full">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Precio (Dual Range Slider) */}
              <div className="mb-6 pb-6">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-fontenla-dark">Rango de Precio</h3>
                </div>
                <div className="px-2">
                  <div className="relative h-1 bg-gray-200 rounded-lg mb-6">
                    {/* Active Track */}
                    <div 
                      className="absolute h-1 bg-black rounded-lg" 
                      style={{ 
                        left: `${(priceRange[0] / 10000000) * 100}%`, 
                        right: `${100 - (priceRange[1] / 10000000) * 100}%` 
                      }}
                    ></div>
                    
                    {/* Min Slider */}
                    <input 
                      type="range" 
                      min="0" 
                      max="10000000" 
                      step="100000"
                      value={priceRange[0]} 
                      onChange={handleMinChange} 
                      className="absolute w-full top-0 h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                    />
                    {/* Max Slider */}
                    <input 
                      type="range" 
                      min="0" 
                      max="10000000" 
                      step="100000"
                      value={priceRange[1]} 
                      onChange={handleMaxChange} 
                      className="absolute w-full top-0 h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold mt-4">
                    <span className="bg-black text-white px-2 py-1 rounded">
                      ${priceRange[0].toLocaleString()}
                    </span>
                    <span className="bg-black text-white px-2 py-1 rounded">
                      ${priceRange[1] >= 10000000 ? '10.000.000+' : priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Filtrar Button Footer */}
            <div className="w-full bg-white p-6 border-t border-gray-100 shrink-0">
              <button 
                onClick={() => setShowFilters(false)} 
                className="w-full bg-black text-white py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-fontenla-wood transition-colors"
              >
                Aplicar Filtros ({sortedProducts.length})
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`w-full transition-all duration-300 ${showFilters ? 'lg:w-3/4' : 'lg:w-full'}`}>
            
            {/* Toolbar */}
            <div className="sticky lg:static top-[79px] lg:top-auto z-40 lg:z-auto bg-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6 mb-6 lg:mb-8 text-[10px] text-fontenla-lightText border-b border-fontenla-border pb-2 pt-2 lg:pb-4 lg:pt-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              
              {/* Mobile Actions: Filter + Sort (Row) - Clean Design */}
              <div className="flex w-full lg:hidden justify-between items-center py-2">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-3 text-[13px] font-bold text-fontenla-dark"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filtros</span>
                </button>

                <div className="flex items-center relative">
                  <button 
                    className="flex items-center gap-2 text-fontenla-lightText font-normal text-[13px] outline-none"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span>
                      {sortMethod === 'newest' && 'Más Nuevo'}
                      {sortMethod === 'price_asc' && 'Precio: Menor'}
                      {sortMethod === 'price_desc' && 'Precio: Mayor'}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl border border-fontenla-border z-20 overflow-hidden">
                      <ul className="py-1">
                        <li className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'newest' ? 'font-bold' : ''}`} onClick={() => { setSortMethod('newest'); setShowSortDropdown(false); }}>Más Nuevo</li>
                        <li className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'price_asc' ? 'font-bold' : ''}`} onClick={() => { setSortMethod('price_asc'); setShowSortDropdown(false); }}>Precio: Menor a Mayor</li>
                        <li className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'price_desc' ? 'font-bold' : ''}`} onClick={() => { setSortMethod('price_desc'); setShowSortDropdown(false); }}>Precio: Mayor a Menor</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Actions: Filter */}
              <div className="hidden lg:flex w-auto justify-start items-center gap-4">
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-fontenla-dark hover:text-fontenla-wood transition-colors"
                >
                  <span>{showFilters ? '< Ocultar Filtros' : '> Mostrar Filtros'}</span>
                </button>
              </div>

              {/* Desktop info & Sort */}
              <div className="hidden lg:flex items-center justify-end flex-1 gap-6">
                
                {/* Sort Dropdown */}
                <div className="flex items-center justify-center relative border-r border-fontenla-border pr-6">
                  <span className="mr-1">Ordenar por:</span>
                  <button 
                    className="flex items-center justify-between w-[120px] text-fontenla-dark font-semibold outline-none"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span className="normal-case tracking-normal text-xs">
                      {sortMethod === 'newest' && 'Más Nuevo'}
                      {sortMethod === 'price_asc' && 'Precio: Menor'}
                      {sortMethod === 'price_desc' && 'Precio: Mayor'}
                    </span>
                    <ChevronDown className="w-3 h-3 shrink-0 ml-2" strokeWidth={2} />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl border border-fontenla-border z-20 overflow-hidden">
                      <ul className="py-1">
                        <li 
                          className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'newest' ? 'font-bold' : ''}`}
                          onClick={() => { setSortMethod('newest'); setShowSortDropdown(false); }}
                        >
                          Más Nuevo
                        </li>
                        <li 
                          className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'price_asc' ? 'font-bold' : ''}`}
                          onClick={() => { setSortMethod('price_asc'); setShowSortDropdown(false); }}
                        >
                          Precio: Menor a Mayor
                        </li>
                        <li 
                          className={`px-4 py-3 hover:bg-fontenla-gray cursor-pointer text-xs ${sortMethod === 'price_desc' ? 'font-bold' : ''}`}
                          onClick={() => { setSortMethod('price_desc'); setShowSortDropdown(false); }}
                        >
                          Precio: Mayor a Menor
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <span>Mostrando <strong>{sortedProducts.length} de {sortedProducts.length}</strong> resultados</span>
                
                <div className="flex items-center gap-2">
                  <span className="mr-1">Vista:</span>
                  <Square 
                    className={`w-3.5 h-3.5 cursor-pointer transition-all ${viewMode === 'large' ? 'text-fontenla-dark fill-fontenla-dark' : 'text-fontenla-lightText fill-transparent'}`} 
                    onClick={() => setViewMode('large')}
                  />
                  <LayoutGrid 
                    className={`w-3.5 h-3.5 cursor-pointer transition-all ${viewMode === 'grid' ? 'text-fontenla-dark' : 'text-fontenla-lightText'}`} 
                    strokeWidth={viewMode === 'grid' ? 3 : 1.5} 
                    onClick={() => setViewMode('grid')}
                  />
                </div>
              </div>
            </div>

            {/* Grid Layout matching reference */}
            {sortedProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-light tracking-[0.1em] text-sm uppercase mb-4">No se encontraron productos en esta categoría.</p>
                <Link to="/productos" className="border border-fontenla-dark text-fontenla-dark px-8 py-3 text-xs uppercase font-bold hover:bg-fontenla-dark hover:text-white transition-colors">
                  Ver todo el catálogo
                </Link>
              </div>
            ) : (
              <div className={`px-6 sm:px-0 grid grid-cols-1 sm:grid-cols-2 ${viewMode === 'grid' ? (showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4') : 'lg:grid-cols-2'} gap-x-12 md:gap-x-16 lg:gap-x-24 gap-y-16 sm:gap-y-20 transition-all duration-300`}>
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col items-center">
                    <Link to={`/producto/${product.id}`} className="w-full flex flex-col items-center">
                      <div className="w-full aspect-[4/3] bg-fontenla-gray flex items-center justify-center mb-6 overflow-hidden relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
                      <div className="text-center">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-fontenla-dark mb-2 group-hover:text-fontenla-wood transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[11px] font-light text-fontenla-lightText uppercase tracking-widest mb-3">
                          {product.subcategory || currentSubcategory}
                        </p>
                        <p className="text-[11px] font-semibold text-fontenla-dark tracking-[0.1em]">
                          {product.price || 'Consultar Precio'}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductListing;
