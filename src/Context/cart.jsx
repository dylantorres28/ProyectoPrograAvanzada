import { createContext, useState, useEffect } from "react";
import { registrarCarrito, cargarcarrito, eliminarcancion,editarcantidad,limpiarcarrito } from "../Apis/CarritoApi.js";
import useUser from '../Hooks/useUser.js';
//Como Funciona un contexto?
//1.Crear el contexto
export const CartContext = createContext()

//2. Crear el Provedor
export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [cartDetails, setCartDetails] = useState([])
    const { user } = useUser();

    // Método para cargar el carrito
    const loadCart = async () => {
        if (!user || !user.email) return;
    
        try {
            // Pasar el correo como parámetro
            const response = await cargarcarrito({ 
                params: { 
                    correo: user.email 
                } 
            });
    
            // Verificar si la respuesta contiene un error
            if (response && response.error) {
                // Si la respuesta tiene un error, mostrar el mensaje
                alert(response.error);  // Muestra el mensaje de error al usuario
                return;
            }
    
            // Actualizar el estado con los detalles del carrito
            setCartDetails(response.Carrito);
            
            // Opcional: si también quieres mantener un estado simple de carrito
            setCart(response.Carrito.map(item => ({
                Nombre_Cancion: item.Nombre_Cancion,
                vinculo_Cancion: item.Vinculo_Cancion,
                cantidad: item.Cantidad_Facturada
            })));
        } catch (error) {
            // Limpiar el carrito en el estado en caso de error
            setCart([]);
            setCartDetails([]);
        }
    };
    

    // Cargar el carrito cuando el componente se monte o el usuario cambie
    useEffect(() => {
        loadCart();
    }, [user?.email]);

    const addToCart = async (song) => {
        // Validaciones de entrada
        if (!song) {
            throw new Error('Información de canción inválida');
        }

        if (!user || !user.email) {
            throw new Error('Debe iniciar sesión para agregar al carrito');
        }
      
        try {
            // Payload para registrar en el carrito
            const cartItemPayload = {
                correo: user.email,
                cantidad: 1,
                vinculo_Cancion: song.id,
                vinculo_Reproduccion: song.vinculoReproduccion || song.id
            }
      
            // Intentar registrar en el carrito
            const response = await registrarCarrito(cartItemPayload);
            
            // Verificar si hubo un error en la respuesta
            if (response && response.error) {
                throw new Error(response.error);
            }
            
            // Volver a cargar el carrito para obtener los detalles actualizados
            await loadCart();

            return response; // Retorna la respuesta en caso de éxito
        } catch (error) {
            // Lanzar un error específico o personalizado
            throw new Error(error.message || 'Canción no disponible');
        }
    }

      const removeFromCart = async (song) => {
        try {
            if (user && user.email) {
                await eliminarcancion({
                    correo: user.email,
                    vinculo_Cancion: song.vinculoReproduccion || song.id
                });
      
                await loadCart();
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    }
      
      const updateCartItemQuantity = async (song, action) => {
        try {
            if (!user || !user.email) {
                console.error('Debe iniciar sesión para modificar el carrito');
                return;
            }
    
            // Find the current item in the cart
            const currentItem = cartDetails.find(
                item => item.Vinculo_Reproduccion === song.vinculoReproduccion
            );
    
            if (!currentItem) {
                console.error('Artículo no encontrado en el carrito');
                return;
            }
    
            let newQuantity;
            if (action === 'add') {
                newQuantity = currentItem.Cantidad_Facturada + 1;
            } else if (action === 'remove') {
                newQuantity = currentItem.Cantidad_Facturada - 1;
            }
    
            // If quantity would become 0 or negative, remove the item
            if (newQuantity <= 0) {
                await eliminarcancion({
                    correo: user.email,
                    vinculo_Cancion: song.vinculoReproduccion
                });
            } else {
                // Otherwise, update the quantity
                await editarcantidad({
                    correo: user.email,
                    vinculo_Cancion: song.vinculoReproduccion,
                    cantidad: newQuantity
                });

                 // Immediately update the state to reflect the new quantity
            setCartDetails(prevDetails => 
                prevDetails.map(item => 
                    item.Vinculo_Reproduccion === song.vinculoReproduccion
                        ? { ...item, Cantidad_Facturada: newQuantity }
                        : item
                )
            );

            }
    
            // Reload cart to reflect changes
            await loadCart();
        } catch (error) {
            console.error('Error al modificar cantidad:', error);
        }
    }

    const clearCart = async () => {
        try {
            if (user && user.email) {
                await limpiarcarrito({
                    Correo: user.email
                });
      
                // TODO: Implementar método de API para limpiar el carrito
                setCart([]);
                setCartDetails([]);
                }
            } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    }

    return (
        <CartContext.Provider value={{
            cart,
            cartDetails, // Añadido para acceder a los detalles completos
            addToCart,
            removeFromCart,
            updateCartItemQuantity, // Add this line  
            clearCart,
            loadCart // Exponer el método para recargar manualmente si es necesario
        }}>
            {children}
        </CartContext.Provider>
    )
}

