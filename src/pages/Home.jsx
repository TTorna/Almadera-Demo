import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCarousel from '../components/ProductCarousel';
import { products } from '../data/mockData';

const Home = () => {
  const novedades = products.filter(p => p.tag === 'NUEVO' || p.tag === 'TENDENCIA');
  const ofertas = products.filter(p => p.tag === 'OUTLET' || p.price === ''); // Asumiendo que price '' o OUTLET es oferta para mostrar algo. En realidad voy a poner algunos OUTLET

  // Si ofertas esta vacio por la data mockeada, agarramos algunos productos al azar para llenar el carrusel y que se vea el diseño
  const displayOfertas = ofertas.length > 0 ? ofertas : products.slice(0, 4);

  return (
    <>
      <Hero />
      <CategoryCarousel />
      <ProductCarousel 
        title="Novedades" 
        products={novedades} 
        bgColor="bg-fontenla-gray" 
        paddingClass="pt-20 md:pt-28 pb-10 md:pb-14"
      />
      <ProductCarousel 
        title="Ofertas" 
        products={displayOfertas} 
        bgColor="bg-white" 
        paddingClass="pt-10 md:pt-14 pb-20 md:pb-28"
      />
    </>
  );
};

export default Home;
