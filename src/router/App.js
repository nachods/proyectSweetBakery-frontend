import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import { CatalogoPage } from "../pages/catalogo/CatalogoPage.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";
import ContactoPage from "../pages/contacto/ContactoPage.jsx";
import NavBar from "../components/Navbar/navbar.js";
import PanelAdmin from "../pages/admin/panelAdmin/PanelAdminPage.jsx";
import { userContext } from "../context/UserContext.js"; // Cambiar a userContext

const AppRouter = () => {
  const { user } = useContext(userContext); // Asegurarse de usar userContext
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Ruta protegida */}
        <Route 
          path="/panel" 
          element={user ? <PanelAdmin /> : <Navigate to="/admin" />} // Redirige a "/" si no hay usuario
        />
      </Routes>
    </>
  );
};

export default AppRouter;
