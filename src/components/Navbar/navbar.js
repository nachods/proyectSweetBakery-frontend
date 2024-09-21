import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Agregamos useLocation
import styles from './navbar.module.css';
import Logo from '../../assets/images/Logo.png';

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(true); 
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation(); // Obtenemos la ubicación actual

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navigate = useNavigate();

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
  };
  
  const handleCatalogo = (e) => {
    e.preventDefault();
    navigate('/catalogo');
  };
  
  const handleContacto = (e) => {
    e.preventDefault();
    navigate('/contacto');
  };

  return (
    <div className={`${styles.NavBar} ${showNavbar ? styles.visible : styles.hidden}`}>
      <div className={`${styles.navBarLat} ${location.pathname === '/catalogo' ? styles.hiddenButton : ''}`}>
        <button onClick={handleCatalogo}>Catálogo</button>
      </div>
      <div className={styles.navBarCenter}>
        <button onClick={handleHome}><img src={Logo} alt='Logo.png'/></button>
      </div>
      <div className={`${styles.navBarLat} ${location.pathname === '/contacto' ? styles.hiddenButton : ''}`}>
        <button onClick={handleContacto}>Contacto</button>
      </div>
    </div>
  );
}

export default NavBar;
