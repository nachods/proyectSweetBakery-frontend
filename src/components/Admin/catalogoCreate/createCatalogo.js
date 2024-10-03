import React, { useState } from "react";
import { createCatalogo } from "../../../api/catalogos/createCatalogoFetch"; // Importar función para crear menú
import styles from '../../../pages/admin/panelAdmin/PanelAdminPage.module.css'// Importar estilos

const CreateCatalogo = ({ onCatalogoCreated }) => {
  /* Estado inicial del formulario con los campos necesarios */
  const [formData, setFormData] = useState({
    nombre: "", // Nombre del menú
    detalle: "", // Detalle del menú
    categoria: "", // Categoría del menú
    image: null, // Archivo de imagen (ahora se guarda el archivo en lugar de una URL)
  });

  /* Estados para mensajes de error y éxito */
  const [error, setError] = useState(""); // Mensaje de error
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [preview, setPreview] = useState(null); // Vista previa de la imagen

  /* Maneja los cambios en los campos de texto */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
  };

  /* Maneja el cambio de archivo para la imagen */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: file }); // Guarda el archivo en el estado
        setPreview(reader.result); // Actualiza la vista previa de la imagen
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
  };

  /* Maneja el envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]); // Agrega los datos al FormData
        }
      });

      const res = await createCatalogo(formDataToSend); // Enviar datos del formulario
      setError(""); // Limpia el mensaje de error
      setSuccess(res.msg || "Catalogo creado con éxito"); // Muestra el mensaje de éxito del backend
      if (onCatalogoCreated) onCatalogoCreated(); // Llama a la función para actualizar los menús
    } catch (error) {
      setError(error.message || "Error al crear el Catalogo"); // Mensaje genérico de error
      setSuccess(""); // Limpia el mensaje de éxito
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.contForm}>
        <input className={styles.FormInput}
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
        <input className={styles.FormInput}
          type="text"
          name="detalle"
          placeholder="Detalle del producto"
          value={formData.detalle}
          onChange={handleInputChange}
          required
        />
        <input className={styles.FormInput}
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleInputChange}
          required
        />
        <input className={styles.FormInput2}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              border: "1px solid #df3821",
              borderRadius: "10px",
              padding: "5px",
            }}
          />
        )}
        {error && <p className="alert alert-danger">{error}</p>}
        <button type="submit" className={styles.button}>
          Crear
        </button>
        {success && <p className="alert alert-success">{success}</p>}
      </form>
    </div>
  );
};

export default CreateCatalogo;
