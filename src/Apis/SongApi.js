import axios from 'axios';

export const registraCancion = async (userData) => 
    {
        try
        {
            const response = await axios.post('http://localhost:5041/api/Cancion/registrar-cancion', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al registrar cancion: ', error);
            throw error;
        }
    }
    
export const actualizarCancion = async (userData) => 
    {
        try
        {
            const response = await axios.post('http://localhost:5041/api/Cancion/actualizar-cancion', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al actualizar cancion: ', error);
            throw error;
        }
    }

export const listarGeneros = async (userData) => 
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Cancion/consultar-todos-generos', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al listar los generos: ', error);
            throw error;
        }
    }


export const ConsultarCancion = async (userData) => 
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Cancion/consultar-cancion', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al listar los generos: ', error);
            throw error;
        }
    }

export const ConsultarTodasCancion = async (userData) => 
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Cancion/consultar-todas-canciones', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al listar los generos: ', error);
            throw error;
        }
    }

export const ConsultarCancionArtista = async (userData) => 
    {
        try
        {
            const response = await axios.get('http://localhost:5041/api/Cancion/consultar-cancion-artista', userData);
            return response.data;
        }
        catch(error)
        {
            console.error('Error al listar los generos: ', error);
            throw error;
        }
    }