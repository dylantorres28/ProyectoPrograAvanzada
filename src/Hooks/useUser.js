import { useContext } from "react";
import { UserContext } from "../Context/user.jsx"; // Asegúrate de que la ruta sea correcta

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default useUser;