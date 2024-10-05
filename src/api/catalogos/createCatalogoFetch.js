export const createCatalogo = async (formData) => {
  try {
    const url = "http://proyectsweetbakery-backend-production.up.railway.app/api/v1/catalogo";

    const params = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      const errorText = await response.text(); // Obtener el cuerpo de error como texto
      throw new Error(
        `Error en la solicitud! Estado: ${response.status}. Detalles: ${errorText}`
      );
    }

    const data = await response.json(); // Se espera que la respuesta sea JSON
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};