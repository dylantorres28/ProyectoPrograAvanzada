// ProfilePage.jsx
import React from "react";
import PlayerMusic from '../../PlayerMusic.jsx'
import SideBar from "../../SideBar.jsx";
import HeaderNavigation from "./HeaderNavigation.jsx";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
    return (
        <div className="text-white h-screen bg-gradient-to-br from-[#01283A] to-black">
            <div className="p-6 h-[8%]">
                <HeaderNavigation/>
            </div>
            <div className="h-[77%] flex">
                <SideBar />
                <div className='w-[100%] m-2 px-6 pt-4 rounded-lg bg-black bg-opacity-50 text-[#F3F3F1] overflow-auto lg:w-[75%] lg:ml-0'>
                    <Outlet /> {/* Aquí se renderizarán los componentes en base a las rutas */}
                </div>
            </div>
            <PlayerMusic />
        </div>
    );
}

export default ProfilePage;