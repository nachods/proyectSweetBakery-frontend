import { React, useState } from 'react';
import styles from './Catalogo.module.css';
import Background from '../../components/Background/Background';
import Footer from '../../components/Footer/footer';
import OneCard from '../../components/OneCardCatalogo/oneCard';

export const CatalogoPage = () => {
  const [searchProductos, setSearchProductos] = useState(""); // Buscador
  const [filterActive, setFilterActive] = useState("all"); // Filtrado

  return (
    <Background>
      <div className={styles.containerTotal}>
        <div className={styles.catalogoText}>
          <span className={styles.title}>Catálogo</span>
          <span className={styles.title2}>Sweet Bakery</span>
        </div>
        <p className={styles.text}>Los precios no se publican debido al cambio constante de los insumos</p>
        <div className={styles.containerCatalogo}>
          <div className={styles.containerSearch}>
            <input
              className={styles.inputSearch}
              type="text"
              placeholder="Buscar por nombre"
              value={searchProductos}
              onChange={(e) => setSearchProductos(e.target.value)}
            />
            <select
              className={styles.inputSearch}
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="op1">op1</option>
              <option value="op2">op2</option>
              <option value="op3">op3</option>
            </select>
          </div>
          <div className={styles.containerCards}>
            <OneCard
              key='asd'
              title='Torta A'
              picture='asd'
              desc='DDL'
            />
            <OneCard
              key='asd'
              title='Torta A'
              picture='asd'
              desc='DDL'
            />
            <OneCard
              key='asd'
              title='Torta A'
              picture='asd'
              desc='DDL'
            />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
