import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createBooking, getServices } from '../services/api';
import { CheckCircle, Calendar, MessageSquare, User, Phone, Mail, Camera } from 'lucide-react';

const BookingForm = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      // Fallback
      setServices([
        { id: 1, title: 'Photo simple' },
        { id: 2, title: 'Vidéo courte' },
        { id: 3, title: 'Vidéo professionnelle' },
        { id: 4, title: "Couverture d'événements" },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await createBooking(formData);
      setStatus({ type: 'success', msg: 'Votre demande de réservation a été envoyée avec succès !' });
      setFormData({ name: '', phone: '', email: '', service: '', date: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', msg: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-black border border-gold/20 p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -z-10" />
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase">Réserver une <span className="text-gold">Séance</span></h2>
            <p className="text-zinc-500">Choisissez votre service et la date souhaitée.</p>
          </div>

          {status.msg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 p-4 text-center border ${status.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-500' : 'bg-red-900/20 border-red-500 text-red-500'}`}
            >
              {status.type === 'success' && <CheckCircle className="inline-block mr-2 w-5 h-5" />}
              {status.msg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
                <input 
                  type="text" required placeholder="Nom complet" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
                <input 
                  type="tel" required placeholder="Téléphone" 
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Camera className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
                <select 
                  required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none appearance-none transition-colors"
                >
                  <option value="">Sélectionner un service</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
                <input 
                  type="date" required 
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors text-white"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gold/50 w-5 h-5" />
                <textarea 
                  placeholder="Message (facultatif)" rows="1"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 pl-12 focus:border-gold outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" disabled={loading}
                className="w-full bg-gold text-black py-4 font-bold uppercase tracking-[0.2em] hover:bg-gold-light transition-all disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Confirmer la Réservation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
