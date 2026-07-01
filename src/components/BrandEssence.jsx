import { motion } from 'framer-motion';

const BrandEssence = () => {
  return (
    <section className="section-padding bg-white" id="brand">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 flex flex-col justify-center"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-wood-dark mb-6">Nuestra Esencia</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl text-charcoal font-display leading-tight mb-8">
              Nuestro Legado
            </h3>
            <p className="text-stone-800/70 font-light leading-relaxed mb-10 max-w-md">
              Cada pieza de Almadera nace de una profunda reverencia por la naturaleza. Transformamos maderas nobles en mobiliario que no solo habita tus espacios, sino que cuenta una historia de meticulosa artesanía y diseño atemporal.
            </p>
            <div className="w-16 h-[1px] bg-wood mb-8"></div>
            <p className="font-display italic text-xl text-charcoal/80">
              "El lujo silencioso de la madera en su estado más puro."
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-1 md:order-2 relative aspect-[4/5] w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80" 
              alt="Detalle de madera artesanal" 
              className="w-full h-full object-cover rounded-sm shadow-2xl"
            />
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-stone-100 -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrandEssence;
