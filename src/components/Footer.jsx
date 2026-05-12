import React from 'react';
import { Camera } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-zinc-950 border-t border-gold/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <Camera className="text-gold w-6 h-6" />
            <span className="text-xl font-bold tracking-tighter text-white uppercase">
              BAYAFFO<span className="text-gold">STUDIO</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <a href="#" className="hover:text-gold transition-colors">Accueil</a>
            <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 gap-4">
          <p className="text-zinc-600 text-xs tracking-widest">
            &copy; {currentYear} BAYAFFO STUDIO. Tous droits réservés.
          </p>
          <p className="text-zinc-600 text-xs tracking-widest">
            Design & Développement par <span className="text-gold">Antigravity</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
