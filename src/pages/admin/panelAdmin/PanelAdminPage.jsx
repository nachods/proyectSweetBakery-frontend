import React, { useState, useEffect, useContext } from "react";
import styles from './PanelAdminPage.module.css';
import { userContext } from '../../../context/UserContext';
import Background from '../../../components/Background/Background';
import CreateCatalogo from '../../../components/Admin/catalogoCreate/createCatalogo';
import UpdateCatalogItem from '../../../components/Admin/catalogoUpdate/updateCatalogo';
import OneCard from "../../../components/OneCardCatalogo/oneCard";
import { getAllCatalogos } from "../../../api/catalogos/getAllCatalogosFetch";
import { deleteCatalogo } from "../../../api/catalogos/deleteCatalogoFetch";

const PanelAdminPage = () => {
    const { logout } = useContext(userContext);

    const [catalogos, setCatalogos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [searchProductos, setSearchProductos] = useState("");
    const [filterActive, setFilterActive] = useState("all");

    useEffect(() => {
        fetchCatalogos();
    }, []);

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

    // Función para eliminar catálogo
    const handleDeleteCatalogo = async (nombre) => {
        try {
            await deleteCatalogo(nombre);
            setCatalogos((prevCatalogos) =>
                prevCatalogos.filter((catalogo) => catalogo.nombre !== nombre)
            );
            setError(null);
        } catch (error) {
            setError(`Error al eliminar el catálogo: ${error.message}`);
        }
    };

    // Callback que se ejecutará cuando se cree o actualice un catálogo
    const handleCatalogoCreatedOrUpdated = () => {
        fetchCatalogos(); // Refresca los catálogos sin recargar la página
    };

    const activeCatalogos = catalogos.filter((catalogo) => catalogo.estado);
    const filteredByCategory = activeCatalogos.filter(
        (catalogo) => filterActive === "all" || catalogo.categoria === filterActive
    );
    const filteredCategorias = filteredByCategory.filter((catalogo) =>
        catalogo.nombre.toLowerCase().includes(searchProductos.toLowerCase())
    );

    return (
        <Background>
            <div className={styles.containerTotal}>
                <button onClick={logout} className={styles.logout}>
                    Cerrar sesión
                </button>
                <div className={styles.containerCatalogo}>
                    <div className={styles.containerSections}>
                        <div>
                            <h5>Creación de producto</h5>
                            <CreateCatalogo onCatalogoCreated={handleCatalogoCreatedOrUpdated} />
                        </div>
                        <div>
                            <h5>Actualizar el producto</h5>
                            <UpdateCatalogItem onItemUpdated={handleCatalogoCreatedOrUpdated} />
                        </div>
                    </div>
                    <h5>Lista de productos</h5>
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                                <option key={index} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.containerCards}>
                        {filteredCategorias.length > 0 ? (
                            filteredCategorias.map((catalogo) => (
                                <div key={catalogo._id}>
                                    <OneCard
                                        title={catalogo.nombre}
                                        picture={`http://proyectsweetbakery-backend-production.up.railway.app/${catalogo.image}`}
                                        desc={catalogo.detalle}
                                    />
                                    <button
                                        className={styles.buttonDelete}
                                        onClick={() => handleDeleteCatalogo(catalogo.nombre)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No hay menús para mostrar</p>
                        )}
                    </div>
                </div>
            </div>
        </Background>
    );
};

export default PanelAdminPage;
