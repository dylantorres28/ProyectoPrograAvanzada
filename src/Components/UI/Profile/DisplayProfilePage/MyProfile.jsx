import React, { useState, useEffect } from "react";
import { consultarPerfil, actualizarPerfil } from '../../../../Apis/PerfilApi';
import useUser from '../../../../Hooks/useUser.js';

const MyProfile = () => {
    const { user } = useUser(); // Obtener el usuario del contexto

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const correoUsuario = user?.email; // Obtener el correo directamente aquí
            if (!correoUsuario) {
                setError('Correo no disponible');
                setLoading(false);
                return;
            }

            try {
                const data = await consultarPerfil(correoUsuario);
                setUserData(data.Usuario[0]);
            } catch (err) {
                setError('Error al cargar el perfil');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    // Actualizar
    const handleUpdateProfile = async (event) => {
        event.preventDefault();

        const updatedData = {
            numero_Identificacion: userData.Numero_Identificacion,
            nombre_Usuario: userData.Nombre_Perfil,
            apellido_1: userData.Apellido_1,
            apellido_2: userData.Apellido_2,
            genero: userData.Genero,
            contrasenna: userData.Contrasenna,
            correo: userData.Correo,
            numero_Tarjeta: userData.Numero_Tarjeta,
            codigo_Tarjeta: userData.Codigo_Tarjeta,
            fecha_Vencimiento: userData.Fecha_Vencimiento
        };

        try {
            const response = await actualizarPerfil(updatedData);
            setUserData(response); // Se actualiza con la respuesta del API
            setEditing(false); // Desactivar modo de edición
            setSuccessMessage("Perfil actualizado correctamente");
            setTimeout(() => setSuccessMessage(null), 5000);
        } catch (err) {
            setError('Error al actualizar el perfil');
        }
    };

    // Cambios en texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="font-bold text-5xl mb-8">Mi Perfil</div>

            {/* Mensaje de éxito */}
            {successMessage && (
                <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="border-b pb-4">
                    <div className="text-xl font-bold text-white mb-4">Información de Perfil</div>

                    {/* Nombre de Usuario */}
                    <div>
                        <label className="text-white">Tipo de Usuario</label>
                        <input
                            type="text"
                            name="Nombre_Usuario"
                            value={userData?.Nombre_Perfil || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="text-white">Correo</label>
                        <input
                            type="email"
                            name="Correo"
                            value={userData?.Correo || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Nombre Real */}
                    <div>
                        <label className="text-white">Nombre Real</label>
                        <input
                            type="text"
                            name="Nombre_Real"
                            value={userData?.Nombre_Usuario || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Identificación */}
                    <div>
                        <label className="text-white">Número de Identificación</label>
                        <input
                            type="text"
                            name="Numero_Identificacion"
                            value={userData?.Numero_Identificacion || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Apellido 1 */}
                    <div>
                        <label className="text-white">Apellido 1</label>
                        <input
                            type="text"
                            name="Apellido_1"
                            value={userData?.Apellido_1 || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Apellido 2 */}
                    <div>
                        <label className="text-white">Apellido 2</label>
                        <input
                            type="text"
                            name="Apellido_2"
                            value={userData?.Apellido_2 || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Género */}
                    <div>
                        <label className="text-white">Género</label>
                        <select
                            name="Genero"
                            value={userData?.Genero || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="text-white">Contraseña</label>
                        <input
                            type="password"
                            name="Contrasenna"
                            value={userData?.Contrasenna || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>
                </div>

                {/* Información de la tarjeta */}
                <div className="border-b pb-4 mt-8">
                    <div className="text-xl font-bold text-white mb-4">Información de Tarjeta</div>

                    {/* Número de Tarjeta */}
                    <div>
                        <label className="text-white">Número de Tarjeta</label>
                        <input
                            type="text"
                            name="Numero_Tarjeta"
                            value={userData?.Numero_Tarjeta || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Código de Tarjeta */}
                    <div>
                        <label className="text-white">Código de Tarjeta</label>
                        <input
                            type="text"
                            name="Codigo_Tarjeta"
                            value={userData?.Codigo_Tarjeta || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>

                    {/* Fecha de Vencimiento */}
                    <div>
                        <label className="text-white">Fecha de Vencimiento</label>
                        <input
                            type="text"
                            name="Fecha_Vencimiento"
                            value={userData?.Fecha_Vencimiento || ''}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-white"
                        />
                    </div>
                </div>

                {/* Botón para guardar */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="group relative w-[170px] flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD]"
                    >
                        {editing ? 'Guardar Cambios' : 'Editar Perfil'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
