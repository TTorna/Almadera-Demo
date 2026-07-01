import { MapPin, Clock, MessageCircle, Navigation2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Stores = () => {
  const whatsappNumber = '5491112345678';
  
  const stores = [
    {
      id: 1,
      name: 'Showroom Palermo Soho',
      address: 'Malabia 1520, Palermo Soho, CABA',
      hours: 'Lunes a Sábados: 10:00 a 19:00 hs',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      mapUrl: 'https://maps.google.com/?q=Malabia+1520+CABA'
    },
    {
      id: 2,
      name: 'Recoleta Design Center',
      address: 'Av. Pueyrredón 2501, Recoleta, CABA',
      hours: 'Lunes a Domingos: 11:00 a 21:00 hs',
      image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80',
      mapUrl: 'https://maps.google.com/?q=Av.+Pueyrredon+2501+CABA'
    }
  ];

  const getWhatsAppUrl = (storeName) => {
    return `https://wa.me/${whatsappNumber}?text=Hola,%20quisiera%20agendar%20una%20visita%20para%20el%20${encodeURIComponent(storeName)}.`;
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] mt-[80px]">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
          alt="Showrooms Almadera" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-[0.4em] uppercase drop-shadow-md text-center px-4 mb-4">
            Nuestros Showrooms
          </h1>
          <p className="text-white/80 text-sm md:text-base tracking-[0.2em] uppercase font-light max-w-2xl text-center px-6">
            Viví la experiencia Almadera en nuestros espacios diseñados para inspirarte.
          </p>
        </div>
      </div>

      <div className="container-custom py-24 md:py-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-fontenla-lightText mb-16">
          <Link to="/" className="hover:text-fontenla-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-fontenla-dark font-bold">Tiendas</span>
        </div>

        <div className="flex flex-col gap-24">
          {stores.map((store, index) => (
            <div key={store.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
              
              {/* Store Image */}
              <div className="w-full lg:w-1/2 aspect-[4/3] relative group overflow-hidden">
                <img 
                  src={store.image} 
                  alt={store.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Store Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-fontenla-dark mb-8">
                  {store.name}
                </h2>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-fontenla-dark shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-1">Dirección</h4>
                      <p className="text-sm font-light text-fontenla-lightText">{store.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-fontenla-dark shrink-0" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-1">Horarios</h4>
                      <p className="text-sm font-light text-fontenla-lightText">{store.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-fontenla-wood transition-colors"
                  >
                    <Navigation2 className="w-4 h-4" /> Cómo llegar
                  </a>
                  <a 
                    href={getWhatsAppUrl(store.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-black text-black py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Agendar Visita
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Stores;
