import { motion } from 'framer-motion';

const TheWorkshop = () => {
  const steps = [
    { title: 'Selección', desc: 'Escogemos las maderas más nobles, respetando sus vetas y tiempos de secado natural.' },
    { title: 'Corte y Armado', desc: 'Nuestros ebanistas combinan técnicas ancestrales con precisión contemporánea.' },
    { title: 'Lustre Natural', desc: 'Acabados a mano con aceites naturales que nutren y protegen, resaltando la belleza orgánica.' },
  ];

  return (
    <section className="section-padding bg-charcoal text-white relative overflow-hidden" id="workshop">
      {/* Subtle Background Texture/Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-luminosity"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-light mb-6"
          >
            El Taller Almadera
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-300 font-light leading-relaxed"
          >
            Donde el diseño encuentra la maestría artesanal. Cada mueble es el resultado de cientos de horas de dedicación.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 border border-wood-light/30 rounded-full flex items-center justify-center mb-6 group-hover:border-wood transition-colors duration-500">
                <span className="font-display text-2xl text-wood-light">{index + 1}</span>
              </div>
              <h4 className="text-xl font-display mb-4 tracking-wide">{step.title}</h4>
              <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheWorkshop;
