import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
import {
    ConsultarFacturaCurso,
    RegistrarMetodoPago,
    FinalizarFactura,
    EliminarFacturaPendiente
} from '../../../../Apis/BillApi.js';
import useUser from '../../../../Hooks/useUser.js';
 
const Payment_Gateway = () => {
    const [factura, setFactura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [cvv, setCvv] = useState('');
    const { user } = useUser();
    const navigate = useNavigate();
 
 
    // Load the current invoice (factura en curso)
    const loadFacturaCurso = async () => {
        if (!user || !user.email) {
            setError('Usuario no autenticado');
            setLoading(false);
            return;
        }
 
        try {
            const response = await ConsultarFacturaCurso({
                params: {
                    correo: user.email,
                },
            });
 
            console.log('Factura response:', response); // Add this to debug the response
 
            if (!response || !response['Factura Pendiente'] || response['Factura Pendiente'].length === 0) {
                setError('No se encontró la factura en curso');
                setLoading(false);
                return;
            }
 
            setFactura(response['Factura Pendiente'][0]);
            setLoading(false);
        } catch (err) {
            console.error('Error al obtener la factura:', err);
            setError('Error al obtener la factura en curso');
            setLoading(false);
        }
    };
 
    const handleSalir = async () => {
        try {
            if (user && user.email) {
                await EliminarFacturaPendiente({ correo: user.email });
                navigate('/home'); // Redirige a /home
            }
        } catch (err) {
            console.error('Error al eliminar la factura pendiente:', err);
            alert('Ocurrió un error al salir');
        }
    };
   
 
 
    useEffect(() => {
        loadFacturaCurso();
    }, [user?.email]);
 
    // Handle payment method selection
    const handlePaymentMethodSelect = async (method) => {
        try {
            // Register the payment method
            await RegistrarMetodoPago({
                correo: user.email,
                metodo_pago: method
            });
 
            setSelectedPaymentMethod(method);
           
            // Reload the invoice to reflect the payment method
            await loadFacturaCurso();
        } catch (err) {
            alert('Error al seleccionar el método de pago');
        }
    };
 
    // Process payment
    const handleFinalizarFactura = async () => {
        if (!selectedPaymentMethod) {
            alert('Por favor, selecciona un método de pago');
            return;
        }
   
        // Additional validation for credit card
        if (selectedPaymentMethod === 'Tarjeta Credito' && (!cvv || cvv.length !== 3)) {
            alert('Por favor, ingresa un CVV válido');
            return;
        }
   
        try {
            const paymentData = {
                correo: user.email,
                codigo_Tarjeta: selectedPaymentMethod === 'Tarjeta Credito' ? parseInt(cvv) : null
            };
   
            const response = await FinalizarFactura(paymentData);
   
            if (response) {
                alert('Factura finalizada exitosamente');
                navigate('/home');
            } else {
                alert('Error al finalizar la factura');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Error:";
            setError(errorMessage); // Establece el mensaje de error
            setTimeout(() => setError(null), 3000);
        }
    };
 
    if (loading) return <div>Cargando factura en curso...</div>;
    if (error) return <div>{error}</div>;
    if (!factura) return <div>No se pudo obtener la factura en curso</div>;
 
    return (
        <div className="container mx-auto p-4">
 
            {/* Mensaje de error */}
            {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}
 
            <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>
 
            {/* Payment Method Selection */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Selecciona un Método de Pago</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handlePaymentMethodSelect('Tarjeta Credito')}
                        className={`px-4 py-2 rounded ${selectedPaymentMethod === 'Tarjeta Credito' ? 'bg-blue-600' : 'bg-gray-600'}`}
                    >
                        Tarjeta de Crédito
                    </button>
                    <button
                        onClick={() => handlePaymentMethodSelect('Paypal')}
                        className={`px-4 py-2 rounded ${selectedPaymentMethod === 'Paypal' ? 'bg-blue-600' : 'bg-gray-600'}`}
                    >
                        PayPal
                    </button>
                    <button
                        onClick={() => handlePaymentMethodSelect('Transferencia Bancaria')}
                        className={`px-4 py-2 rounded ${selectedPaymentMethod === 'Transferencia Bancaria' ? 'bg-blue-600' : 'bg-gray-600'}`}
                    >
                        Transferencia
                    </button>
                </div>
            </div>
 
 
 
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Información de Factura</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <p><strong>Código de Factura:</strong> {factura.Encabezado.Codigo_Factura}</p>
                    <p><strong>Correo:</strong> {factura.Encabezado.Correo}</p>
                    <p><strong>Fecha de Compra:</strong> {new Date(factura.Encabezado.Fecha_Compra).toLocaleString()}</p>
                    <p><strong>Estado:</strong> {factura.Encabezado.Estado_Factura}</p>
                </div>
            </div>
 
            {/* Invoice Details */}
            <div className="bg-[#1A1A1A] rounded-lg p-6 mb-4 border border-gray-600">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Detalles de Compra</h3>
                    {factura.Detalle && factura.Detalle.length > 0 ? (
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
                                {factura.Detalle.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border p-2">{item.Nombre_Artistico}</td>
                                        <td className="border p-2">{item.Nombre_Album}</td>
                                        <td className="border p-2">{item.Nombre_Cancion}</td>
                                        <td className="border p-2">{item.Cantidad_Facturada}</td>
                                        <td className="border p-2">${item.Total_Cancion.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center p-4">No hay detalles de compra disponibles</div>
                    )}
                </div>
 
                {/* Totals */}
                <div>
                    <h3 className="text-xl font-semibold">Totales</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                    {factura.Totales ? (
                        <>
                            <p><strong>Impuesto:</strong> ${factura.Totales.Impuesto.toFixed(2)}</p>
                            <p><strong>Subtotal:</strong> ${factura.Totales.Subtotal.toFixed(2)}</p>
                           
                            {/* Mostrar método de pago y últimos 4 dígitos si es tarjeta de crédito */}
                            {factura.Totales.Descripcion_Metodo_Pago === 'Tarjeta Credito' && (
                                <>
                            <p><strong>Recargo:</strong> ${factura.Totales.Recargo.toFixed(2)}</p>
                            <p><strong>Tarjeta:</strong> {factura.Totales.Ultimos_4_Digitos}</p>
                                </>
                            )}
                           
                            <p className="col-span-2 text-xl font-bold"><strong>Total:</strong> ${factura.Totales.Total.toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="col-span-2 text-center">No se pueden mostrar los totales</p>
                    )}
                    </div>
                </div>
            </div>
            {/* CVV Input for Credit Card */}
            {selectedPaymentMethod === 'Tarjeta Credito' && (
            <div className="mb-4">
            <label htmlFor="cvv" className="block mb-2">Codigo Tarjeta</label>
            <input
                type="text"
                id="cvv"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2 border rounded bg-[#1A1A1A] text-white border-[#808080]"
                placeholder="Ingrese el codigo tarjeta"
            />
            </div>
            )}
            {/* Pay Button */}
            <button
                onClick={handleFinalizarFactura}
                disabled={!selectedPaymentMethod}
                className={`w-full p-3 rounded ${
                    selectedPaymentMethod
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Finalizar Pago
            </button>
            <br />
            <button
                onClick={handleSalir}
                className="w-full p-3 rounded bg-red-600 hover:bg-red-700 mt-4 text-white"
            >
                Salir
            </button>
        </div>
    );
};
 
export default Payment_Gateway;