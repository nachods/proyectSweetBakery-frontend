export const deleteCatalogo = async (nombre) => {
    try {
      const url = "http://localhost:3977/api/v1/catalogo/" + nombre;
  
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await fetch(url, params);
  
      if (response.status !== 200) {
        throw new Error(`Error https! Estado: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  