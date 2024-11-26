import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query); // Llamamos a la función onSearch con el término
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && query.trim()) {
            handleSearch();
        }
    };

    return (
        <div className="w-[550px] relative">
            <input
                type="search"
                placeholder="Buscar"
                className="w-full p-2 rounded-md bg-[#F3F3F1] text-[#1A1A1A]"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#1A1A1A] rounded-md"
                onClick={handleSearch}
            >
                <SearchIcon />
            </button>
        </div>
    )
}

export default SearchBar;