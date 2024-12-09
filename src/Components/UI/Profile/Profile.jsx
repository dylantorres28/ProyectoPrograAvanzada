import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import  useUser  from '../../../Hooks/useUser.js'; // Importar el hook

const Profile = () => {
  const { user } = useUser(); // Obtener el usuario del contexto
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/perfil");
  };

  return (
    <button onClick={handleClick} className="flex items-center text-white p-4">
      <AccountCircleIcon fontSize="large" />
      <div className="ml-4">
        <div className="font-semibold">{user?.email|| 'Invitado'}</div> 
        <div className="text-sm text-left text-gray-400">
          {user?.userType || 'Usuario'}
        </div>
      </div>
    </button>
  );
};

export default Profile;