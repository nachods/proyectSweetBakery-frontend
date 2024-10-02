// components/Admin/AllCatalogo.js
import React, { useState, useEffect } from "react";
import OneCard from "../OneCardCatalogo/oneCard";
import { getAllCatalogos } from "../../api/catalogos/getAllCatalogosFetch";

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
        setError("Error en la carga de los menús");
        console.log("Fetch error:", error);
      }
    };
    fetchCatalogos();
  }, []);

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
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchProductos}
          onChange={(e) => setSearchProductos(e.target.value)}
        />
        <select
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
      <div>
        {filteredCategorias.length > 0 ? (
          filteredCategorias.map((catalogo) => (
            <OneCard
              key={catalogo._id}
              title={catalogo.nombre}
              picture={`http://localhost:3977/${catalogo.image}`}
              desc={catalogo.detalle}
            />
          ))
        ) : (
          <p>No hay menús para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default AllCatalogo;
