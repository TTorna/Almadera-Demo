import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const whatsappNumber = '5491112345678';

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] mt-[80px]">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" 
          alt="Contacto Almadera" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-[0.4em] uppercase drop-shadow-md text-center px-4 mb-4">
            Hablemos
          </h1>
          <p className="text-white/80 text-sm md:text-base tracking-[0.2em] uppercase font-light max-w-2xl text-center px-6">
            Proyectos a medida. Asesoramiento personalizado.
          </p>
        </div>
      </div>

      <div className="container-custom py-24 md:py-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-fontenla-lightText mb-16">
          <Link to="/" className="hover:text-fontenla-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-fontenla-dark font-bold">Contacto</span>
        </div>

        <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
          
          {/* Contact Info */}
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-fontenla-dark mb-12">
              Información de Contacto
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 mb-16 w-full justify-center">
              <div className="flex flex-col items-center group">
                <div className="p-5 bg-fontenla-gray rounded-full group-hover:bg-fontenla-wood transition-colors mb-6">
                  <MapPin className="w-7 h-7 text-fontenla-dark group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-2">Sede Central</h4>
                <p className="text-sm font-light text-fontenla-lightText">Av. Libertador 1234<br/>CABA, Argentina</p>
              </div>

              <div className="flex flex-col items-center group">
                <div className="p-5 bg-fontenla-gray rounded-full group-hover:bg-fontenla-wood transition-colors mb-6">
                  <Phone className="w-7 h-7 text-fontenla-dark group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-2">Teléfono</h4>
                <p className="text-sm font-light text-fontenla-lightText">+54 11 1234-5678</p>
              </div>

              <div className="flex flex-col items-center group">
                <div className="p-5 bg-fontenla-gray rounded-full group-hover:bg-fontenla-wood transition-colors mb-6">
                  <Mail className="w-7 h-7 text-fontenla-dark group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-2">Email</h4>
                <a href="mailto:info@almadera.com" className="text-sm font-light text-fontenla-lightText hover:text-fontenla-wood transition-colors">
                  info@almadera.com
                </a>
              </div>
            </div>

            <div className="w-full max-w-sm pt-12 border-t border-fontenla-border mx-auto">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-fontenla-dark mb-6">Atención Inmediata</h4>
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" /> Chat por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
