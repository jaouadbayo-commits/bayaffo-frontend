import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: "Yassine El Amrani", role: "Marié", text: "Abdelghani a capturé notre mariage avec une élégance incroyable. Les photos sont au-delà de nos attentes.", stars: 5 },
  { id: 2, name: "Sarah Bennani", role: "Modèle", text: "Un professionnel très à l'écoute. La séance portrait était fluide et le résultat est magnifique.", stars: 5 },
  { id: 3, name: "Hassan Alami", role: "CEO Tech Events", text: "Une couverture exemplaire de notre conférence annuelle. Discret et efficace.", stars: 5 },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Quote className="text-gold w-12 h-12 mx-auto mb-6 opacity-50" />
          <h2 className="text-4xl font-bold tracking-tighter uppercase">Témoignages <span className="text-gold">Clients</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-zinc-900 border border-gold/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-zinc-400 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-gold text-xs uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
