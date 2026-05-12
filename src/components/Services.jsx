import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getServices, BASE_URL } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services", error);
      // Fallback data
      setServices([
        { id: 1, title: 'Photo simple', description: 'Une séance photo rapide et efficace.', price: 10, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80' },
        { id: 2, title: 'Vidéo courte', description: 'Idéal pour vos réseaux sociaux.', price: 100, image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Vidéo professionnelle', description: 'Qualité cinéma pour vos projets.', price: 1000, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80' },
        { id: 4, title: "Couverture d'événements", description: 'Présence complète pour vos événements.', price: 0, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80' },
      ]);
    }
  };

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase">Nos <span className="text-gold">Services</span></h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-zinc-900 border border-gold/10 overflow-hidden hover:border-gold/50 transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image.startsWith('http') ? service.image : `${BASE_URL}${service.image}`} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 h-12 overflow-hidden">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-bold text-lg">
                    {service.price > 0 ? `${service.price} DH` : "Prix sur demande"}
                  </span>
                  <a href="#booking" className="text-xs uppercase tracking-widest border-b border-gold pb-1 hover:text-gold transition-colors">Réserver</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
