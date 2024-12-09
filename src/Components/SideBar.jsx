import React, { useState, useEffect } from 'react';
import { ConsultarFacturasBiblioteca } from '../Apis/HistorialApi';
import useUser from '../Hooks/useUser.js';

const SideBar = () => {
    const [biblioteca, setBiblioteca] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        const fetchBiblioteca = async () => {
            if (!user || !user.email) {
                setError('Usuario no autenticado');
                setLoading(false);
                return;
            }

            try {
                const response = await ConsultarFacturasBiblioteca({
                    params: {
                        correo: user.email,
                    },
                });

                console.log('Biblioteca response:', response);

                if (!response || !response.Biblioteca) {
                    setBiblioteca([]);
                } else {
                    setBiblioteca(response.Biblioteca);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error al obtener la biblioteca:', err);
                setError('Error al cargar la biblioteca');
                setBiblioteca([]);
                setLoading(false);
            }
        };

        fetchBiblioteca();
    }, [user?.email]);

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-[#F3F3F1] hidden lg:flex">
            <div className="bg-black bg-opacity-50 overflow-auto h-[100%] rounded-lg">
                <div className='p-4 flex items-center justify-between'>
                    <p className="text-lg font-bold">Mi Biblioteca</p>
                </div>
                {loading ? (
                    <div className="text-white p-4">Cargando biblioteca...</div>
                ) : error ? (
                    <div className="text-red-500 p-4">{error}</div>
                ) : (
                    <div className="p-2">
                        {biblioteca.length === 0 ? (
                            <div className="text-gray-400 p-4 text-center">
                                No hay canciones en tu biblioteca
                            </div>
                        ) : (
                            biblioteca.map((cancion, index) => (
                                <div
                                    key={index}
                                    className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                                >
                                    <p className="font-semibold text-white">{cancion.Nombre_Cancion}</p>
                                    <p className="text-sm text-gray-300">{cancion.Nombre_Artistico}</p>
                                    <p className="text-xs text-gray-400">{cancion.Nombre_Album}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SideBar;