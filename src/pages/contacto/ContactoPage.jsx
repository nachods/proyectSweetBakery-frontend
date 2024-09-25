import React from 'react';
import styles from './Contacto.module.css';
import Background from '../../components/Background/Background';
import Footer from '../../components/Footer/footer';

const ContactoPage = () => {

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.link/nc2ihf', '_blank'); // Abre el enlace en una nueva pestaña
  };
  const handleIgAppRedirect = () => {
    window.open('https://www.instagram.com/_sweetbbakery/', '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <Background>
      <div className={styles.containerTotal}>
        <div className={styles.containerFour}>
          <h2 className={styles.textRRSS}>Para contactarnos puedes usar los siguientes medios:</h2>
          <div className={styles.subContainerFour}>
            <button onClick={handleWhatsAppRedirect}><i class="bi bi-whatsapp"></i>WhatsApp</button>
            <button onClick={handleIgAppRedirect}><i class="bi bi-instagram"></i>Instagram</button>
          </div>
          <h5 className={styles.textRRSS2}>Atendemos todos los días de 10hs a 20hs</h5>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Background>
  )
}

export default ContactoPage