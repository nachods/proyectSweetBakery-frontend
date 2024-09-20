import React from 'react';
import styles from './HomePage.module.css';
import Logo from '../../assets/images/Logo.png';
import Background from '../../components/Background/Background';
import Footer from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.link/nc2ihf', '_blank'); // Abre el enlace en una nueva pestaña
  };
  const handleIgAppRedirect = () => {
    window.open('https://www.instagram.com/_sweetbbakery/', '_blank'); // Abre el enlace en una nueva pestaña
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/catalogo');
  };

  return (
    <Background> {/* Envuelve el contenido en el componente Background */}
      <div className={styles.containerTotal}>
        <img className={styles.logo} src={Logo} alt='Logo.png' />
        <div className={styles.containerPrimary}>
          <span className={styles.title}>Sweet</span>
          <span className={styles.title2}>Bakery</span>
        </div>
        <div className={styles.containerSecondary}>
          <p className={styles.text}>¡Pasteleria y panaderia de calidad!</p>
        </div>
        <div className={styles.containerThird}>
          <button className={styles.button} onClick={handleSubmit}>Catálogo</button>
        </div>
        <div className={styles.containerFour}>
          <p className={styles.textRRSS}>¿Como contactarnos?</p>
          <div className={styles.subContainerFour}>
            <button onClick={handleWhatsAppRedirect}><i class="bi bi-whatsapp"></i>WhatsApp</button>
            <button onClick={handleIgAppRedirect}><i class="bi bi-instagram"></i>Instagram</button>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Background>
  );
}

export default HomePage;
