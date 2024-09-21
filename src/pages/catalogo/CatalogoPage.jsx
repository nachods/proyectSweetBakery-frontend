import React from 'react';
import styles from './Catalogo.module.css';
import Background from '../../components/Background/Background';
import Footer from '../../components/Footer/footer';

export const CatalogoPage = () => {
  return (
    <Background>
      <div className={styles.containerTotal}>
        <div className={styles.catalogoText}>
          <span className={styles.title}>Catálogo</span>
          <span className={styles.title2}>Sweet Bakery</span>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
