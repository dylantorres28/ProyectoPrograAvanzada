import React, { useId } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddToCart from '../UI/AddToCart.jsx';
import songData from "../../Apis/songData.js";

export function Cart() {
    const cartCheckboxId = useId();

    return (
        <>
            <label className="cursor-pointer absolute z-50 right-9 top-5 flex hover:scale-105" htmlFor={cartCheckboxId}>
                <ShoppingCartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden className="peer" />

            <div className="bg-[#1A1A1A] hidden items-center peer-checked:flex flex-col fixed right-0 top-0 h-full w-[450px] max-w-full  transition-transform duration-300 ease-in-out transform translate-x-full peer-checked:translate-x-0 z-40">

                <div className="w-full p-8"></div>
                <div className="overflow-y-auto space-y-4">
                    {
                        songData.map(item=>(
                            <AddToCart item={item} key={item.Nombre_Cancion} />
                        ))
                    }
                </div>
                <div className="w-full p-7">
                    <button className="bg-black">Continuar</button>
                </div>
            </div>

        </>
    );
}
