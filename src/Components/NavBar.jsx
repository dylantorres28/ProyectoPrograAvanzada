import React from "react";
import SearchBar from "./UI/SearchBar.jsx";
import {Cart} from './UI/Cart.jsx'

const NavBar = () => {
    return (

        <div className="w-full h-[8%] flex justify-between items-center text-[#F3F3F1] px-4">
            <div>
                Hola header
            </div>
            < div>
                <SearchBar/>
            </div>
            <div>
                <Cart/>
            </div>
        </div>
    )
}

export default NavBar;