import { createContext, useState } from "react";

//Como Funciona un contexto?
//1.Crear el contexto
export const CartContext = createContext()

//2. Crear el Provedor
export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = song => {
        //check si la cancion ya existe en el carrito y solo le agrega cantidad no todo el objeto
        const songInCartIndex = cart.findIndex(item => item.id === song.id)

        if (songInCartIndex >= 0) {
            //una forma seria usando structureClone
            const newCart = structuredClone(cart)
            newCart[songInCartIndex].quantity += 1
            return setCart(newCart)
        }

        //la cancion no esta en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...song,
                quantity: 1
            }
        ]))
    }

    //PRUEBA
    const deleteCart = song => {
        //check si la cancion ya existe en el carrito y solo le agrega cantidad no todo el objeto
        const songInCartIndex = cart.findIndex(item => item.id === song.id)

        if (songInCartIndex >= 0) {
            //una forma seria usando structureClone
            const newCart = structuredClone(cart)
            newCart[songInCartIndex].quantity -= 1
            return setCart(newCart)
        }
    }

    const clearCart = () => {
        setCart([])
    }

    //Como lo usamos usamos el context con el provedor y usamos lo que vamos a querer acceder
    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            deleteCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )

}

