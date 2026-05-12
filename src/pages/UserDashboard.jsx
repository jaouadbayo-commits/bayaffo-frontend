import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Image as ImageIcon, LogOut, User as UserIcon } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const mockPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80', title: 'Votre Mariage - Photo 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80', title: 'Votre Mariage - Photo 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80', title: 'Séance Portrait' },
    { id: 4, url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80', title: 'Événement Pro' },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 bg-zinc-950 p-8 border border-gold/10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center">
              <UserIcon className="text-gold w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Bienvenue, <span className="text-gold">{user?.username}</span></h1>
              <p className="text-zinc-500">Accédez à vos galeries privées et téléchargements.</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <ImageIcon className="text-gold" /> Vos <span className="text-gold">Photos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-zinc-900 border border-gold/5 overflow-hidden"
              >
                <img src={photo.url} alt={photo.title} className="w-full h-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-sm font-bold mb-2">{photo.title}</h3>
                  <button className="text-xs text-gold font-bold uppercase tracking-widest border border-gold/30 px-4 py-2 hover:bg-gold hover:text-black transition-all">Télécharger</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-950 border border-gold/10 p-10 text-center">
          <h3 className="text-xl font-bold mb-4">Besoin d'autres fichiers ?</h3>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">Si vous ne trouvez pas toutes vos photos ou si vous souhaitez commander des tirages papier, contactez Abdelghani directement.</p>
          <a href="/#contact" className="inline-block px-10 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] hover:bg-gold-light transition-all">Contacter le Studio</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
