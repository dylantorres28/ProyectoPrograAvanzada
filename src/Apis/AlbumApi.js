import axios from "axios";
 
 
export const registrarAlbum = async (userData) =>
    {
        try
        {
            const response = await axios.post('http://localhost:5041/api/Albumes/registrar-album', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al Consultar Todos los Albumes: ', error);
            throw error;
        }
    }
 
    export const actualizarAlbum = async (userData) =>
        {
            try
            {
                const response = await axios.post('http://localhost:5041/api/Albumes/actualizar-album', userData);
                return response.data;
            }
            catch(error)
            {
                console.error('Error al actualizar artista: ', error);
                throw error;
            }
        }    
 
export const ConsultarTodosAlbumes = async (userData) =>
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Albumes/consultar-todos-albumes', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al Consultar Todos los Albumes: ', error);
            throw error;
        }
    }
 