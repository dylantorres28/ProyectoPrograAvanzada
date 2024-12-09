import axios from "axios";

export const CrearEncabezadoFactura = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Facturacion/registrar-encabezado-factura', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar el encabezado de la factura:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const CargarCarritoFactura = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Facturacion/cargar-carrito-factura', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al cargar carrito en la facturacion:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const RegistrarMetodoPago = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Facturacion/registrar-metodo-pago-factura', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al registrar el metodo pago:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const ConsultarFacturaCurso = async (userData) => {
    try {
        const response = await axios.get('http://localhost:5041/api/Facturacion/consultar-factura-curso', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al obtener la factura en curso:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const EliminarFacturaPendiente = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Facturacion/eliminar-factura-usuario', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al eliminar la factura:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const FinalizarFactura = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5041/api/Facturacion/finalizar-factura', userData);
        return response.data; // Devuelve la respuesta en caso de éxito
    } catch (error) {
        console.error('Error al finalizar la factura:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
