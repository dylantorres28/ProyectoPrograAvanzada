import axios from 'axios';

const BASE_URL = 'http://localhost:5041/api/Usuario/validar-credenciales'; // Asegúrate de que esta URL sea correcta

// Función para validar las credenciales
export const validarCredenciales = async (correo, contrasenna) => {
    try {
        const credencialesDTO = { Correo: correo, Contrasenna: contrasenna };
        const response = await axios.post(BASE_URL, credencialesDTO);

        // Devuelve el valor booleano de la propiedad 'EsValido'
        return response.data.EsValido;
    } catch (error) {
        console.error('Error al validar credenciales:', error);
        throw error; // Lanza el error para que pueda ser manejado donde se llame
    }
};