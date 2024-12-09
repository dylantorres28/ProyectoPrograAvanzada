import axios from 'axios';

export const consultarPerfil = async (correo) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Usuario/consultar-perfil', {
            params: { Correo: correo }
        });
        return response.data; 
    } catch (error) {
        console.error('Error al consultar el perfil: ', error);
        throw error; 
    }
};

//Actualizar
export const actualizarPerfil = async (usuarioData) => {
    try {
        console.log("Datos que se enviarán:", usuarioData);
        const response = await axios.post('http://localhost:5041/api/Usuario/actualizar-usuario', usuarioData);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar perfil: ', error);
        throw error;
    }
};

