import { featuredCategories } from '../data/mockData';

const CategoryGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-white" id="categorias">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-center mb-16 uppercase text-fontenla-dark">
          Explorá por Categoría
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCategories.map((cat) => (
            <div key={cat.id} className="relative group overflow-hidden h-[350px] md:h-[500px] cursor-pointer">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 px-10 py-5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] group-hover:bg-white transition-all duration-500">
                  <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-fontenla-dark">
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
