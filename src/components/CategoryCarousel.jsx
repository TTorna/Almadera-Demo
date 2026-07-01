import { featuredCategories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    navigate(`/productos?subcategory=${encodeURIComponent(title)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-white" id="categorias">
      <div className="container-custom">
        {/* Static Grid Container (3 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {featuredCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="group cursor-pointer flex flex-col w-full h-[320px] md:h-[400px]"
              onClick={() => handleCategoryClick(cat.title)}
            >
              {/* Header: Title and Ver Más */}
              <div className="flex justify-between items-end border-b border-gray-400 pb-2 mb-8 group-hover:border-black transition-colors">
                <h3 className="text-xl md:text-3xl font-light text-gray-600 uppercase tracking-widest group-hover:text-black transition-colors">
                  {cat.title}
                </h3>
                
                <div className="flex flex-col items-center justify-end text-gray-500 group-hover:text-black transition-colors pb-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Ver Más</span>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center p-2 w-full">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
