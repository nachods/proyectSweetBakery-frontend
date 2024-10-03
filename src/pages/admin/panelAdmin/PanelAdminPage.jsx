import React, { useContext } from 'react';
import styles from './PanelAdminPage.module.css';
import { userContext } from '../../../context/UserContext'; // Asegúrate de que esto sea correcto
import Background from '../../../components/Background/Background';
import CreateCatalogo from '../../../components/Admin/catalogoCreate/createCatalogo';
import UpdateCatalogItem from '../../../components/Admin/catalogoUpdate/updateCatalogo';
import AllCatalogo from '../../../components/Admin/AllCatalogo';


const PanelAdminPage = () => {
    const { logout } = useContext(userContext); // Asegúrate de que el nombre del contexto sea userContext

    return (
        <Background>
            <div className={styles.containerTotal}>
                <button onClick={logout} className={styles.logout}>Cerrar sesión</button>
                <div className={styles.containerCatalogo}>
                    <h5>Creación de producto</h5>
                    <CreateCatalogo />
                    <h5>Actualizar el producto</h5>
                    <UpdateCatalogItem />
                    <h5>Lista de productos</h5>
                    <AllCatalogo />
                </div>
            </div>
        </Background>
    )
}

export default PanelAdminPage;
