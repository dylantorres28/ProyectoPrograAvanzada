import React, { useState, useEffect } from 'react';
import { ConsultarFactura, ConsultarTodasFacturas } from '../../../../Apis/HistorialApi';
import useUser from '../../../../Hooks/useUser.js';

const FacturaDetalle = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    //Este es el que deberia de mostrar si sooy tipo USUARIO
    const loadFacturas = async () => {
        if (!user || !user.email) return; // Verifica que el usuario esté autenticado y tenga correo.

        let response = null; // Asegúrate de declarar la variable `response` al inicio.
        setLoading(true); // Asegura que loading esté en true cada vez que se haga la llamada.

        try {
            if (user.userType !== 'Usuario') {
                response = await ConsultarTodasFacturas();
            } else {
                response = await ConsultarFactura({
                    params: { correo: user.email }
                });
            }

            // Validar si la respuesta tiene errores.
            if (!response || response.error) {
                throw new Error(response?.error || 'Error desconocido al cargar las facturas');
            }

            setFacturas(response); // Actualiza el estado con las facturas obtenidas.
        } catch (err) {

            if (err.response?.status === 500) {
                setError('Facturas no disponibles.');
            } else {
                setError('Facturas no disponibles. Verifique su conexión o intente más tarde.');
            }
            setFacturas([]); // Limpia las facturas en caso de error.
        } finally {
            setLoading(false); // Asegura que loading se actualice correctamente.
        }
    };

    useEffect(() => {
        loadFacturas(); // Llama a la función para cargar las facturas.
    }, []);

    if (loading) return <div>Cargando facturas...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Detalles de Facturas</h2>
            {facturas.map((factura, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-lg p-6 mb-4 border border-gray-600">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Información de Factura</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <p><strong>Código de Factura:</strong> {factura.Encabezado.Codigo_Factura}</p>
                            <p><strong>Correo:</strong> {factura.Encabezado.Correo}</p>
                            <p><strong>Fecha de Compra:</strong> {new Date(factura.Encabezado.Fecha_Compra).toLocaleString()}</p>
                            <p><strong>Estado:</strong> {factura.Encabezado.Estado_Factura}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Detalles de Compra</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="border p-2">Artista</th>
                                    <th className="border p-2">Álbum</th>
                                    <th className="border p-2">Canción</th>
                                    <th className="border p-2">Cantidad</th>
                                    <th className="border p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {factura.Detalle.map((item, detailIndex) => (
                                    <tr key={detailIndex}>
                                        <td className="border p-2">{item.Nombre_Artistico}</td>
                                        <td className="border p-2">{item.Nombre_Album}</td>
                                        <td className="border p-2">{item.Nombre_Cancion}</td>
                                        <td className="border p-2">{item.Cantidad_Facturada}</td>
                                        <td className="border p-2">${item.Total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Totales</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <p><strong>Método de Pago:</strong> {factura.Totales.Descripcion_Metodo_Pago}</p>
                            <p><strong>Subtotal:</strong> ${factura.Totales.Subtotal.toFixed(2)}</p>

                            {/* Mostrar recargo solo si el método de pago es "Tarjeta Credito" */}
                            {factura.Totales.Descripcion_Metodo_Pago === "Tarjeta Credito" && (
                                <p><strong>Recargo:</strong> ${factura.Totales.Recargo.toFixed(2)}</p>
                            )}

                            <p><strong>Impuesto:</strong> ${factura.Totales.Impuesto.toFixed(2)}</p>
                            <p><strong>Total:</strong> ${factura.Totales.Total.toFixed(2)}</p>

                            {/* Mostrar los últimos 4 dígitos de la tarjeta solo si el método de pago es "Tarjeta Credito" */}
                            {factura.Totales.Descripcion_Metodo_Pago === "Tarjeta Credito" && (
                                <p><strong>Tarjeta:</strong> {factura.Totales.Ultimos_4_Digitos}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FacturaDetalle;