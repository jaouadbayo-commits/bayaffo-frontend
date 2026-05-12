import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Calendar, MessageSquare, ExternalLink, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    // Basic protection (should be done via backend check too)
    if (!user) navigate('/login');
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const bRes = await api.get('/bookings/');
      const mRes = await api.get('/contact/');
      setBookings(bRes.data);
      setMessages(mRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter uppercase mb-2 flex items-center gap-4">
            <LayoutDashboard className="text-gold" /> Espace <span className="text-gold">Admin</span>
          </h1>
          <p className="text-zinc-500">Gestion des réservations et des messages clients.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="space-y-4">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-4 p-4 border transition-all text-sm uppercase tracking-widest font-bold ${activeTab === 'bookings' ? 'bg-gold border-gold text-black' : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-gold/30'}`}
            >
              <Calendar size={18} /> Réservations ({bookings.length})
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-4 p-4 border transition-all text-sm uppercase tracking-widest font-bold ${activeTab === 'messages' ? 'bg-gold border-gold text-black' : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-gold/30'}`}
            >
              <MessageSquare size={18} /> Messages ({messages.length})
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'bookings' ? (
              <div className="bg-zinc-950 border border-gold/10 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-zinc-900 text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-800">
                    <tr>
                      <th className="p-6">Client</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Service</th>
                      <th className="p-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="p-6 font-bold">{b.name}<br/><span className="text-xs font-normal text-zinc-500">{b.email}</span></td>
                        <td className="p-6 text-sm">{b.date}</td>
                        <td className="p-6 text-sm text-gold">{b.service_name || 'Service ID: ' + b.service}</td>
                        <td className="p-6">
                          <button className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr><td colSpan="4" className="p-20 text-center text-zinc-500">Aucune réservation pour le moment.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid gap-6">
                {messages.map(m => (
                  <div key={m.id} className="bg-zinc-950 border border-gold/10 p-8 hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold">{m.name}</h3>
                        <p className="text-sm text-zinc-500">{m.email} | {m.phone}</p>
                      </div>
                      <p className="text-xs text-zinc-600 uppercase tracking-widest">{new Date(m.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-zinc-400 italic leading-relaxed">"{m.message}"</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="p-20 text-center text-zinc-500 bg-zinc-950 border border-zinc-900">Aucun message pour le moment.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
