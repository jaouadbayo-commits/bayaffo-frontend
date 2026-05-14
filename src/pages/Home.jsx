import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      {user && <Services />}
      <Portfolio />
      <Testimonials />
      {user && <BookingForm />}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
