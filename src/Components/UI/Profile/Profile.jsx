import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";


const Profile = () => {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/perfil")
    }

    return (
        <button onClick={handleClick} className="flex items-center bg-[#1A1A1A] text-white p-4">
                <AccountCircleIcon fontSize="large"/>
                <div className="ml-4">
                    <div className="font-semibold">Dylan Torres</div>
                    <div className="text-sm text-left text-gray-400">Admin</div>
                </div>
        </button>
    )
}

export default Profile;