import axios from "axios";


export const registrarCarrito = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Carrito/registrar-carrito', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar al carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const editarcantidad = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Carrito/actualizar-cantidad-carrito', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al editar cantidad:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};


export const eliminarcancion = async (Correo) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Carrito/eliminar-cancion-carrito', Correo);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error eliminar la cancion del carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const limpiarcarrito = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Carrito/limpiar-carrito', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error limpiar el carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const cargarcarrito = async (userData) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Carrito/cargar-carrito', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};


