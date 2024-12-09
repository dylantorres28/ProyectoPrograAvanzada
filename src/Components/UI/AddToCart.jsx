import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import useCart from "../../Hooks/useCart.js";

function CarItem({
    Nombre_Cancion, 
    Nombre_Artistico, 
    Nombre_Album, 
    Precio_Cancion, 
    Cantidad_Facturada, 
    addToCart, 
    removeFromCart
}) {
    return (
        <div className="flex items-center mb-8 bg-black justify-between p-2 w-[400px] shadow-md text-white rounded-md">
            <div>
                <p className="font-semibold text-lg">{Nombre_Cancion}</p>
                <p className="text-sm text-gray-400">{Nombre_Album}, {Nombre_Artistico}</p>
                <p className="text-sm mb-2">${Precio_Cancion.toFixed(2)}</p>
                <p className="text-sm mb-2">Cantidad: {Cantidad_Facturada}</p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={removeFromCart} 
                    className="text-red-600"
                >
                    <DeleteIcon />
                </button>
                <button onClick={addToCart}>
                    <AddCircleIcon />
                </button>
            </div>
        </div>
    )
}

const AddToCart = () => {
    const { cartDetails, updateCartItemQuantity,clearCart} = useCart();

    return (
        <div>
             {/* Solo muestra el botón para limpiar el carrito si hay productos */}
             {cartDetails.length > 0 && (
                <button 
                    onClick={clearCart} 
                    className="bg-red-600 text-white p-2 mb-4 w-full rounded-md"
                >
                    Limpiar carrito
                </button>
            )}

            {cartDetails.map((item, index) => (
                <CarItem 
                    key={index} 
                    {...item}
                    addToCart={() => updateCartItemQuantity({ 
                        vinculoReproduccion: item.Vinculo_Reproduccion 
                    }, 'add')}
                    removeFromCart={() => updateCartItemQuantity({ 
                        vinculoReproduccion: item.Vinculo_Reproduccion 
                    }, 'remove')}
                />
            ))}    
        </div>
    )
}

export default AddToCart;