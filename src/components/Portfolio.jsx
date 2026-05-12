import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolio, BASE_URL } from '../services/api';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolio();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching portfolio", error);
      // Fallback data
      setItems([
        { id: 1, title: 'Mariage Royal', category: 'Wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80' },
        { id: 2, title: 'Event Corporate', category: 'Event', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80' },
        { id: 3, title: 'Portrait Studio', category: 'Portrait', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80' },
        { id: 4, title: 'Fête Traditionnelle', category: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
        { id: 5, title: 'Lancement Produit', category: 'Event', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80' },
        { id: 6, title: 'Portrait Extérieur', category: 'Portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80' },
      ]);
    }
  };

  const categories = ['All', 'Wedding', 'Event', 'Portrait'];
  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter uppercase">Le <span className="text-gold">Portfolio</span></h2>
            <p className="text-zinc-500">Une sélection de mes travaux récents à travers le Royaume.</p>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-widest border transition-all ${filter === cat ? 'bg-gold border-gold text-black' : 'border-zinc-800 text-zinc-500 hover:border-gold/50'}`}
              >
                {cat === 'All' ? 'Tous' : cat === 'Wedding' ? 'Mariage' : cat === 'Event' ? 'Événements' : 'Portraits'}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`)}
                className="relative aspect-square cursor-pointer group overflow-hidden border border-gold/5"
              >
                <img src={item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <p className="text-gold text-xs uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-20"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain shadow-2xl border border-gold/20"
            />
            <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
