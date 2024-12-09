import React, { useState, useEffect } from "react";
import { ConsultarTodosArtistas, registrarArtista, actualizarArtista, ConsultarArtista } from '../../../../Apis/ArtistsApi';
import EditIcon from '@mui/icons-material/Edit';

const AddArtist = () => {
    const [error, setError] = useState(null); // Estado para manejar el error
    const [successMessage, setSuccessMessage] = useState(null); // Estado para manejar el éxito
    const [artists, setArtists] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [isEditing, setIsEditing] = useState(false);
    const [editingArtistId, setEditingArtistId] = useState(null);
    const [formData, setFormData] = useState({ 
        nombreArtistico: "",
        fechaNacimiento: "",
        nombreReal: "",
        nacionalidad: "",
    });

const [originalNombreArtistico, setOriginalNombreArtistico] = useState("");


    // Fetch artists on component mount
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await ConsultarTodosArtistas();
                const artistsData = response.Artistas || [];
                setArtists(artistsData);
            } catch (err) {
                console.error("Error al obtener los datos de artistas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditClick = (artist) => {
        // Format the date to match the date input format (YYYY-MM-DD)
        const formattedDate = artist.Fecha_Nacimiento 
            ? new Date(artist.Fecha_Nacimiento).toISOString().split('T')[0] 
            : '';

        setOriginalNombreArtistico(artist.Nombre_Artistico || "");

        setFormData({
            nombreArtistico: artist.Nombre_Artistico || "",
            fechaNacimiento: formattedDate,
            nombreReal: artist.Nombre_Real || "",
            nacionalidad: artist.Nacionalidad || ""
        });
        setIsEditing(true);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();     
        
        const apiFormData = isEditing 
        ? {
            nombre_Artistico: originalNombreArtistico,
            nombre_Nacionalidad: formData.nacionalidad,
            nombre_Artistico_Nuevo: formData.nombreArtistico,
            fecha_Nacimiento: new Date(formData.fechaNacimiento).toISOString(),
            nombre_Real: formData.nombreReal
        }
        : {
            nombre_Nacionalidad: formData.nacionalidad,
            nombre_Artistico: formData.nombreArtistico,
            fecha_Nacimiento: new Date(formData.fechaNacimiento).toISOString(),
            nombre_Real: formData.nombreReal
        };
    
        try {
            const response = isEditing 
                ? await actualizarArtista(apiFormData) 
                : await registrarArtista(apiFormData);
    
            setSuccessMessage(response?.message || (isEditing 
                ? "Artista actualizado con éxito" 
                : "Artista registrado con éxito"));
            setTimeout(() => setSuccessMessage(null), 5000);
            
            // Reset form and refresh list
            setFormData({ nombreArtistico: "", fechaNacimiento: "", nombreReal: "", nacionalidad: "" });
            setIsEditing(false);
            
            const updatedArtists = await ConsultarTodosArtistas();
            setArtists(updatedArtists.Artistas || []);
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error al registrar artista";
            setError(errorMessage); // Establece el mensaje de error
            setTimeout(() => setError(null), 5000); // Limpia el error después de 5 segundos
        }
    };
    // Cancel editing
    const handleCancelEdit = () => {
        setFormData({ nombreArtistico: "", fechaNacimiento: "", nombreReal: "", nacionalidad: "" });
        setIsEditing(false);
        setEditingArtistId(null);
        setOriginalNombreArtistico(""); // Resetea el nombre original
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="font-bold text-5xl mb-8">
                {isEditing ? "Editar Artista" : "Agregar un Artista"}
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
                <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:space-x-10">
                {/* Form Section */}
                <div className="w-full lg:w-1/3">
                    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-6">
                        <div>
                            <input
                                id="nacionalidad"
                                name="nacionalidad"
                                type="text"
                                value={formData.nacionalidad}
                                onChange={handleInputChange}
                                required
                                className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                placeholder="Nacionalidad"
                            />
                        </div>
                        <div>
                            <input
                                id="nombreArtistico"
                                name="nombreArtistico"
                                type="text"
                                value={formData.nombreArtistico}
                                onChange={handleInputChange}
                                required
                                className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                placeholder="Nombre Artístico"
                            />
                        </div>
                        <div>
                            <input
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                type="date"
                                value={formData.fechaNacimiento}
                                onChange={handleInputChange}
                                required
                                className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                            />
                        </div>
                        <div>
                            <input
                                id="nombreReal"
                                name="nombreReal"
                                type="text"
                                value={formData.nombreReal}
                                onChange={handleInputChange}
                                required
                                className="appearance-none rounded-b-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                placeholder="Nombre Real"
                            />
                        </div>
                        <div className="flex space-x-4 justify-center">
                            <button
                                type="submit"
                                className="group relative w-[170px] flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                            >
                                {isEditing ? "Actualizar Artista" : "Subir Artista"}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="group relative w-[170px] flex justify-center py-2 px-4 border border-red-500 text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="w-full lg:w-2/3 mt-6 lg:mt-0 overflow-x-auto">
                    <table className="min-w-full text-left table-auto">
                        <thead className="text-gray-300 border-b border-gray-600">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Nombre Artístico</th>
                                <th className="px-4 py-2">Fecha de Nacimiento</th>
                                <th className="px-4 py-2">Nombre Real</th>
                                <th className="px-4 py-2">Nacionalidad</th>
                                <th className="px-4 py-2">Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.length > 0 ? (
                                artists.map((artist, index) => (
                                    <tr key={index} className="hover:bg-gray">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{artist.Nombre_Artistico}</td>
                                        <td className="px-4 py-2">{artist.Fecha_Nacimiento}</td>
                                        <td className="px-4 py-2">{artist.Nombre_Real}</td>
                                        <td className="px-4 py-2">{artist.Nacionalidad}</td>
                                        <td className="px-4 text-center py-2">
                                            <button onClick={() => handleEditClick(artist)}>
                                                <EditIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No hay artistas disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AddArtist;