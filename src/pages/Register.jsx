import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/register/`, formData);

      setStatus({ type: 'success', msg: 'Compte créé ! Redirection vers la connexion...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: "Erreur lors de l'inscription. Le nom d'utilisateur existe peut-être déjà." });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-950 border border-gold/20 p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-gold w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Inscription</h2>
          <p className="text-zinc-500 text-sm mt-2">Rejoignez la communauté Bayaffo Studio</p>
        </div>

        {status.msg && (
          <div className={`mb-6 p-4 border text-sm flex items-center gap-2 ${status.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-red-900/20 border-red-500 text-red-500'}`}>
            {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
            <input 
              type="text" required placeholder="Nom d'utilisateur"
              value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
            <input 
              type="email" required placeholder="Email"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
            <input 
              type="password" required placeholder="Mot de passe"
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-gold-light transition-all"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-zinc-500 mt-8 text-sm">
          Déjà un compte ? <Link to="/login" className="text-gold hover:underline">Se connecter</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
