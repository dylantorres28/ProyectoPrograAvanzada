import React from "react";
import { NavLink } from "react-router-dom";
import  useUser  from "../../../Hooks/useUser.js"


const HeaderNavigation = () => {
    const { user } = useUser(); // Obtener el usuario del contexto

    // Obtener el tipo de usuario
    const userType = user?.userType || "Usuario"; // Por defecto 'Usuario'

    // Filtrar las rutas según el tipo de usuario
    const getNavLinks = () => {
        switch (userType) {
            case "Administrador":
                return [
                    { path: "/home", displayProfile: "Home" },
                    { path: "/perfil/myprofile", displayProfile: "My Profile" },
                    { path: "/perfil/accounts", displayProfile: "Accounts" },
                    { path: "/perfil/addSong", displayProfile: "Add Song" },
                    { path: "/perfil/addArtist", displayProfile: "Add Artist" },
                    { path: "/perfil/addAlbum", displayProfile: "Add Album" },
                    { path: "/perfil/control", displayProfile: "Control" },
                ];
            case "Contabilidad":
                return [
                    { path: "/home", displayProfile: "Home" },
                    { path: "/perfil/control", displayProfile: "Control" },
                ];
            case "Usuario":
            default:
                return [
                    { path: "/home", displayProfile: "Home" },
                    { path: "/perfil/myprofile", displayProfile: "My Profile" },
                    { path: "/perfil/control", displayProfile: "Control" },
                ];
        }
    };

    const navLinks = getNavLinks();
    
    return (
        <header >
            <div className="flex justify-between items-center max-w-screen-md mx-auto">
                {/* Navegación */}
                <nav className="flex space-x-6">
                    {navLinks.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "text-[#9BC9B4] font-semibold" : "text-white"
                            }
                        >
                            {item.displayProfile}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};
 
export default HeaderNavigation;