import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import  useCart  from "../../Hooks/useCart.js";

const AddToCart = (props) => {
    const {addToCart} = useCart();

    const { Codigo_Cancion, Nombre_Cancion, Nombre_Artista, Nombre_Album, Precio_Cancion } = props.item

    return (
        <div className="flex items-centermb-8 bg-black justify-between p-2 w-[400px] shadow-md text-white rounded-md  ">
            <div>
                <p className="font-semibold text-lg">{Nombre_Cancion}</p>
                <p className="text-sm text-gray-400">{Nombre_Album}, {Nombre_Artista}</p>
                <p className="text-sm mb-2">${Precio_Cancion}</p>
                <p className="text-sm mb-2">Quantity: </p>

            </div>
            <div className="flex items-center gap-3">
                <button onClick ={()=> deleteCart(props.item)} className="text-red-600"><DeleteIcon /></button>
                <button onClick={()=> addToCart(props.item)}><AddCircleIcon /></button>
            </div>
        </div>
    )
}

export default AddToCart;