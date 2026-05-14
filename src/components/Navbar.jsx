import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Camera, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À Propos', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-gold/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Camera className="text-gold w-8 h-8" />
          <span className="text-2xl font-bold tracking-tighter text-white">
            BAYAFFO<span className="text-gold">STUDIO</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs uppercase tracking-widest hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-6 border-l border-white/10 pl-8">
              {user.username === 'admin' && (
                <Link to="/admin-custom" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-all">Admin</Link>
              )}
              <Link to="/dashboard" className="text-xs uppercase tracking-widest text-gold font-bold hover:text-white transition-all flex items-center gap-2">
                <UserIcon size={14} /> {user.username ? user.username : 'Espace Client'}
              </Link>
              <button onClick={logout} className="text-xs uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-all">Quitter</button>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gold">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black border-b border-gold/20 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg uppercase tracking-widest text-center hover:text-gold"
            >
              {link.name}
            </a>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg uppercase tracking-widest text-center text-gold">Tableau de bord</Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-lg uppercase tracking-widest text-center text-red-500">Déconnexion</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg uppercase tracking-widest text-center text-gold">Connexion</Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
