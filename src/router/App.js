import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import { CatalogoPage } from "../pages/catalogo/CatalogoPage.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";
import ContactoPage from "../pages/contacto/ContactoPage.jsx";
import NavBar from "../components/Navbar/navbar.js";

const AppRouter = () => {
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
      </Routes>
    </>
  );
};

export default AppRouter;
