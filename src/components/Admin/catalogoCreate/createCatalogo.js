import React, { useState } from "react";
import { createCatalogo } from "../../../api/catalogos/createCatalogoFetch"; // Importar función para crear menú
import styles from "../../../pages/admin/panelAdmin/PanelAdminPage.module.css"; // Importar estilos

const CreateCatalogo = ({ onCatalogoCreated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    detalle: "",
    categoria: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: file });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("detalle", formData.detalle);
        formDataToSend.append("categoria", formData.categoria);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        const res = await createCatalogo(formDataToSend);
        setSuccess("Producto creado con éxito.");
        setError("");

        // Llama a la función pasada como prop para actualizar la lista
        if (onCatalogoCreated) onCatalogoCreated();

    } catch (error) {
        setError("Error al crear el producto: " + error.message);
        setSuccess("");
    }
};

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.contForm}>
        <input
          className={styles.FormInput}
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.FormInput}
          type="text"
          name="detalle"
          placeholder="Detalle del producto"
          value={formData.detalle}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.FormInput}
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.FormInput2}
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
