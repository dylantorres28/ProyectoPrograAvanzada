import axios from "axios";


export const registrarArtista = async (userData) => 
    {
        try
        {
            const response = await axios.post('http://localhost:5041/api/Artista/registrar-artista', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al registrar artista: ', error);
            throw error;
        }
    }
    
export const actualizarArtista = async (userData) => 
    {
        try
        {
            const response = await axios.post('http://localhost:5041/api/Artista/actualizar-artista', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al actualizar artista: ', error);
            throw error;
        }
    }
export const ConsultarArtista = async (userData) =>
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Artista/consultar-artista', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al actualizar artista: ', error);
            throw error;
        }
    }
 
export const ConsultarTodosArtistas = async (userData) =>
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Artista/consultar-todos-artistas', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al actualizar artista: ', error);
            throw error;
        }
    }
 
 