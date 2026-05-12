import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate('/');
    } catch (err) {
      setError('Identifiants invalides. Veuillez réessayer.');
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
            <LogIn className="text-gold w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Connexion</h2>
          <p className="text-zinc-500 text-sm mt-2">Accédez à votre espace Bayaffo Studio</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-500 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
            <input 
              type="text" required placeholder="Nom d'utilisateur"
              value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
            <input 
              type="password" required placeholder="Mot de passe"
              value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gold text-black py-4 font-bold uppercase tracking-widest hover:bg-gold-light transition-all"
          >
            Se Connecter
          </button>
        </form>

        <p className="text-center text-zinc-500 mt-8 text-sm">
          Pas encore de compte ? <Link to="/register" className="text-gold hover:underline">S'inscrire</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
