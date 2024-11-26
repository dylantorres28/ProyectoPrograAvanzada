import React from "react";
import SearchBar from "./UI/SearchBar.jsx";
import Profile from "./UI/Profile/Profile.jsx";
import { Cart } from './UI/Cart.jsx'

const NavBar = ({onSearch}) => {
    return (

        <div className="w-full h-[8%] flex justify-between items-center text-[#F3F3F1] ">
            <div>
                <Profile />
            </div>
            < div>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div>
                <Cart />
            </div>
        </div>
    )
}

export default NavBar;