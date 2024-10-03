import React, { useState, useEffect } from "react";
import OneCard from "../OneCardCatalogo/oneCard";
import { getAllCatalogos } from "../../api/catalogos/getAllCatalogosFetch";
import { deleteCatalogo } from "../../api/catalogos/deleteCatalogoFetch"; // Función para eliminar
import style from '../../pages/admin/panelAdmin/PanelAdminPage.module.css';

const AllCatalogo = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [searchProductos, setSearchProductos] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const data = await getAllCatalogos();
        setCatalogos(data);

        const uniqueCategorias = [
          ...new Set(data.map((catalogo) => catalogo.categoria)),
        ];
        setCategorias(uniqueCategorias);
        setError(null);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchCatalogos();
  }, []);

  // Función para eliminar catálogo
  const handleDeleteCatalogo = async (nombre) => {
    try {
      await deleteCatalogo(nombre); // Llama a la API para eliminar el catálogo
      setCatalogos((prevCatalogos) => prevCatalogos.filter((catalogo) => catalogo.nombre !== nombre)); // Elimina del estado local
      setError(null);
    } catch (error) {
      setError(`Error al eliminar el catálogo: ${error.message}`);
    }
  };

  const activeCatalogos = catalogos.filter((catalogo) => catalogo.estado);
  const filteredByCategory = activeCatalogos.filter(
    (catalogo) => filterActive === "all" || catalogo.categoria === filterActive
  );
  const filteredCategorias = filteredByCategory.filter((catalogo) =>
    catalogo.nombre.toLowerCase().includes(searchProductos.toLowerCase())
  );

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={style.containerSearch}>
        <input
          className={style.inputSearch}
          type="text"
          placeholder="Buscar por nombre"
          value={searchProductos}
          onChange={(e) => setSearchProductos(e.target.value)}
        />
        <select
          className={style.inputSearch}
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
        >
          <option value="all">Todos</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <div className={style.containerCards}>
        {filteredCategorias.length > 0 ? (
          filteredCategorias.map((catalogo) => (
            <div key={catalogo._id}>
              <OneCard
                title={catalogo.nombre}
                picture={`http://localhost:3977/${catalogo.image}`}
                desc={catalogo.detalle}
              />
              {/* Botón para eliminar */}
              <button className={style.buttonDelete} onClick={() => handleDeleteCatalogo(catalogo.nombre)}>
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay menús para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default AllCatalogo;
