import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <div className="w-[600px] relative">
            <input type="search" placeholder="Buscar" className='w-full p-2 rounded-md bg-[#F3F3F1] text-[#1A1A1A]'/>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#1A1A1A] rounded-md">
                <SearchIcon/>
            </button>
        </div>
    )
}

export default SearchBar;