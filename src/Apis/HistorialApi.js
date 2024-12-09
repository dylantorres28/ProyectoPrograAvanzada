import axios from "axios";

export const ConsultarFactura = async (userData) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Facturacion/consultar-factura-terminadas_usuario', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar al carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const ConsultarTodasFacturas = async (userData) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Facturacion/consultar-todas-facturas-terminadas', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar al carrito:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const ConsultarFacturasBiblioteca = async (userData) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Facturacion/consultar-biblioteca', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al cargar canciones de la biblioteca:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};