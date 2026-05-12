import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden border border-gold/30">
              <img 
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80" 
                alt="Abdelghani Bayaffo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border-b-2 border-r-2 border-gold -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">
              L'art derrière <br /> <span className="text-gold">l'objectif</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Passionné par la photographie depuis mon plus jeune âge, je me suis spécialisé dans la capture d'émotions authentiques à travers le Maroc. Mon approche mêle technique moderne et sensibilité artistique.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Que ce soit pour un mariage, un événement corporatif ou un portrait professionnel, je m'engage à transformer vos instants précieux en souvenirs éternels.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-gold text-3xl font-bold mb-2">5+</h4>
                <p className="text-zinc-500 uppercase text-xs tracking-widest">Ans d'expérience</p>
              </div>
              <div>
                <h4 className="text-gold text-3xl font-bold mb-2">200+</h4>
                <p className="text-zinc-500 uppercase text-xs tracking-widest">Événements couverts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
