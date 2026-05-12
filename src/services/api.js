import axios from 'axios';

// En développement : http://localhost:8000
// En production (Vercel) : lit la variable VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

// Ajouter automatiquement le token JWT si disponible
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getServices = () => api.get('/services/');
export const getPortfolio = () => api.get('/portfolio/');
export const createBooking = (data) => api.post('/bookings/', data);
export const sendContact = (data) => api.post('/contact/', data);

export const BASE_URL = API_URL;

export default api;
