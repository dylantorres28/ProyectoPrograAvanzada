import axios from 'axios';

const BASE_URL = 'http://localhost:5041/api/Usuario/registrar';

export const registrarUsuario = async (userData) => {
    try {
        const response = await axios.post(BASE_URL, userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
