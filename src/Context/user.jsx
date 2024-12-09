import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext(); // Ahora lo exportas explícitamente

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para guardar los datos del usuario

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};