import { React, useState, useEffect } from 'react';
import styles from './Catalogo.module.css';
import Background from '../../components/Background/Background';
import Footer from '../../components/Footer/footer';
import OneCard from '../../components/OneCardCatalogo/oneCard';
import { getAllCatalogos } from '../../api/catalogos/getAllCatalogosFetch'

export const CatalogoPage = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [categorias, setCategorias] = useState([]);  // Nuevo estado para categorías
  const [error, setError] = useState(null);
  const [searchProductos, setSearchProductos] = useState(""); // Buscador
  const [filterActive, setFilterActive] = useState("all"); // Filtrado

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const data = await getAllCatalogos();
        console.log('Data received:', data);  // Añade este log
        setCatalogos(data);
        
        // Extraer las categorías y eliminar duplicados
        const uniqueCategorias = [...new Set(data.map(catalogo => catalogo.categoria))];
        setCategorias(uniqueCategorias);
        
        setError(null);
      } catch (error) {
        setError('Error en la carga de los menús');
        console.log('Fetch error:', error);  // Añade este log
      }
    };
    fetchCatalogos();
  }, []);

  const activeCatalogos = catalogos.filter(catalogo => catalogo.estado);

  // Filtrar por categoría primero
  const filteredByCategory = activeCatalogos.filter(catalogo =>
    filterActive === "all" || catalogo.categoria === filterActive
  );

  // Luego, filtrar por nombre en los resultados ya filtrados por categoría
  const filteredCategorias = filteredByCategory.filter(catalogo =>
    catalogo.nombre.toLowerCase().includes(searchProductos.toLowerCase())
  );

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
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
          <div className={styles.containerCards}>
            {filteredCategorias.length > 0 ? (
              filteredCategorias.map((catalogo) => {
                console.log('Image URL:', `http://proyectsweetbakery-backend-production.up.railway.app/${catalogo.image}`);
                return (
                  <OneCard
                    key={catalogo._id}
                    title={catalogo.nombre}
                    picture={`http://proyectsweetbakery-backend-production.up.railway.app/${catalogo.image}`}
                    desc={catalogo.detalle}
                  />
                );
              })
            ) : (
              <p>No hay menús para mostrar</p>
            )}
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
