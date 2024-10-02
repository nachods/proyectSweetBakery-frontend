export const updateCatalogo = async (nombre, formData) => {
    try {
        const url = 'http://localhost:3977/api/v1/catalogo/' + nombre;

        const params = {
            method: 'PATCH',
            body: formData,
        };

        const response = await fetch(url, params);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
    } catch (error) {
        throw error;
    }
};
