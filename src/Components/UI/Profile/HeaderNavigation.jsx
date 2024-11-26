import React from "react";
import { NavLink } from "react-router-dom";
//import {useUser } from "./useUser.js"

const navLinks = [
    { path: '/perfil/myprofile', displayProfile: 'My Profile' },
    { path: '/perfil/accounts', displayProfile: 'Accounts' },
    { path: '/perfil/addSong', displayProfile: 'Add Song' },
    { path: '/perfil/addArtist', displayProfile: 'Add Artist' },
    { path: '/perfil/addAlbum', displayProfile: 'Add Album' },
    { path: '/perfil/control', displayProfile: 'Control' },
];

const HeaderNavigation = () => {
    //poner como prop esto ({ userRole})

    //const { userRole } = useUser();

    // Define los enlaces de navegación por rol
    {/* const filteredLinks = navLinks.filter(item => {
        if (userRole === "admin") return true; // Admin: muestra todos los enlaces
        if (userRole === "contador") return ["My Profile", "Control"].includes(item.displayProfile);
        if (userRole === "usuario") return item.displayProfile === "My Profile";
        return false;
    });
    */}


    return (
            <div className="flex justify-center space-x-6">
                {navLinks.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => isActive ? "text-[#9BC9B4] font-semibold" : "text-white"}
                    >
                        {item.displayProfile}
                    </NavLink>
                ))}
            </div>
    );
};

export default HeaderNavigation;