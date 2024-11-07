import React, { useId } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Cart() {
    const cartCheckboxId = useId()

    return (
        <>
            <label className="cursor-pointer absolute z-[9999] right-9 top-5 justify-center flex items-center hover:scale-105" htmlFor={cartCheckboxId}>
                <ShoppingCartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden className="peer" />

            <aside className="bg-[#1A1A1A] hidden p-36 fixed right-0 top-0 w-[350px] transition-all duration-300 ease-in-out peer-checked:block peer-checked:h-full">
                <ul>
                    <div className="bg-black rounded-md w-[200px]">
                        <h1>
                            Helloooooooo
                        </h1>
                        <h4>
                            NAda
                        </h4>

                        <footer className="flex gap-2 justify-center ">
                            <h1>
                                Qty: 1
                            </h1>
                            <button className="bg-white text-black">
                                +
                            </button>
                        </footer>
                    </div>
                </ul>

            </aside>
        </>
    )
}
