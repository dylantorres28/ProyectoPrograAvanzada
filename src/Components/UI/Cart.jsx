import React, { useId } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddToCart from '../UI/AddToCart.jsx';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import useUser from '../../Hooks/useUser.js';
import { CrearEncabezadoFactura, CargarCarritoFactura } from '../../Apis/BillApi.js'; 

export function Cart() {
    const cartCheckboxId = useId();
    const navigate = useNavigate(); // Inicializa useNavigate
    const { user } = useUser();

    const handleContinue = async () => {
        try {
            // 1. Llamar a CrearEncabezadoFactura
            const encabezadoResponse = await CrearEncabezadoFactura({ correo: user.email });
            console.log('Encabezado de factura creado:', encabezadoResponse);
            
            // 2. Llamar a CargarCarritoFactura
            const carritoResponse = await CargarCarritoFactura({ correo: user.email });
            console.log('Carrito cargado en la factura:', carritoResponse);
            
            // 3. Redirigir a la página de Payment Gateway
            navigate('/factura');
        } catch (error) {
            console.error('Error al procesar la factura:', error);
            alert('Ocurrió un error al crear la factura. Inténtalo de nuevo.');
        }
    };
    
    return (
        <>
            <label className="cursor-pointer absolute z-50 right-9 top-5 flex  hover:scale-105 " htmlFor={cartCheckboxId}>
                <ShoppingCartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden className="peer" />

            <div className="bg-[#1A1A1A]  hidden items-center peer-checked:flex flex-col fixed right-0 top-0 h-full w-[450px] max-w-full  transition-transform duration-300 ease-in-out transform translate-x-full peer-checked:translate-x-0 z-40">

                <div className="w-full p-8"></div>
                <div className="overflow-y-auto space-y-4">
                    <AddToCart />
                </div>
                <div className="w-full p-7">
                    <button className="bg-black" onClick={handleContinue}>Continuar</button>
                </div>
            </div>

        </>
    );
}
