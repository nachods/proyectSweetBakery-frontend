import React, { useState } from "react";
import { updateCatalogo } from "../../../api/catalogos/updateCatalogosFetch";
import style from '../../../pages/admin/panelAdmin/PanelAdminPage.module.css'

const UpdateCatalogItem = ({ onItemUpdated }) => {
  const [error, setError] = useState(""); // Mensaje de error
  const [success, setSuccess] = useState(""); // Mensaje de éxito
  const [preview, setPreview] = useState(null); // Vista previa de la imagen
  const [nombre, setNombre] = useState(""); // Nombre del producto a actualizar
  const [detalle, setDetalle] = useState(""); // Detalle del producto
  const [categoria, setCategoria] = useState(""); // Categoría del producto
  const [precio, setPrecio] = useState(""); // Precio del producto
  const [image, setImage] = useState(null); // Imagen del producto

  // Función para manejar el cambio en el campo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("detalle", detalle);
    formData.append("categoria", categoria);

    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await updateCatalogo(nombre, formData);
      setSuccess("Producto actualizado con éxito.");
      setError(""); // Limpiar mensajes de error
      if (onItemUpdated) onItemUpdated(); // Llama a la función para actualizar la lista de productos
    } catch (err) {
      setError("Error al actualizar el producto: " + err.message);
      setSuccess(""); // Limpiar mensajes de éxito
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.contForm}>
        <input className={style.FormInput}
          type="text"
          name="nombre"
          placeholder="Nombre (Obligatorio)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input className={style.FormInput}
          type="text"
          name="detalle"
          placeholder="Detalle"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
        />
        <input className={style.FormInput}
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input className={style.FormInput2}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className={style.button}>Actualizar</button>
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default UpdateCatalogItem;
