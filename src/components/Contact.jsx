import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContact } from '../services/api';
import { Instagram, Facebook, Send, Phone, MapPin, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8 tracking-tighter uppercase">Contactez-<span className="text-gold">Moi</span></h2>
            <p className="text-zinc-500 mb-12">Je suis disponible pour discuter de vos projets partout au Maroc. N'hésitez pas à me contacter via le formulaire ou sur les réseaux sociaux.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-gold/20 group-hover:border-gold transition-colors">
                  <Phone className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Téléphone</p>
                  <p className="text-white font-bold">07 16 68 60 14</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-gold/20 group-hover:border-gold transition-colors">
                  <Mail className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Email</p>
                  <p className="text-white font-bold">contact@bayaffostudio.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-gold/20 group-hover:border-gold transition-colors">
                  <MapPin className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Localisation</p>
                  <p className="text-white font-bold">Marrakech, Maroc</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="https://instagram.com/bayaffo" target="_blank" className="w-12 h-12 bg-zinc-900 border border-gold/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/bayaffo" target="_blank" className="w-12 h-12 bg-zinc-900 border border-gold/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/212716686014" target="_blank" className="px-6 h-12 bg-zinc-900 border border-gold/10 flex items-center gap-2 hover:bg-green-600 transition-all font-bold">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-zinc-950 p-10 border border-gold/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text" placeholder="Nom" required 
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:border-gold outline-none"
              />
              <input 
                type="email" placeholder="Email" required 
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:border-gold outline-none"
              />
              <input 
                type="tel" placeholder="Téléphone" required 
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:border-gold outline-none"
              />
              <textarea 
                placeholder="Votre Message" required rows="4"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:border-gold outline-none"
              />
              
              <button 
                type="submit" disabled={loading}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gold transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Envoi...' : (
                  <>
                    <Send size={18} /> Envoyer le Message
                  </>
                )}
              </button>

              {success && <p className="text-green-500 text-center mt-4">Message envoyé !</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
