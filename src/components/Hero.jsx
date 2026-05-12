import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold uppercase tracking-[0.5em] mb-4 text-sm font-medium"
        >
          Photographe Professionnel au Maroc
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
        >
          Abdelghani <span className="text-gold">Bayaffo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto italic"
        >
          "Capturez vos plus beaux moments."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a href="#portfolio" className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-gold-light transition-all">
            Voir Portfolio
          </a>
          <a href="#booking" className="px-8 py-4 border border-white/30 backdrop-blur-sm text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Réserver Maintenant
          </a>
        </motion.div>
      </div>

      {/* Darija Text Overlay for Artistic Touch */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-20">
        <p className="text-gold text-2xl font-serif">Musawwir mohtaref</p>
        <p className="text-white text-sm uppercase tracking-widest"> أحسن اللحظات</p>
      </div>
    </section>
  );
};

export default Hero;
