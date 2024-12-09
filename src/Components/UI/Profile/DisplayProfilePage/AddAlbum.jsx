import React, { useState, useEffect } from "react";
import { ConsultarTodosAlbumes, registrarAlbum, actualizarAlbum } from '../../../../Apis/AlbumApi.js';
import EditIcon from '@mui/icons-material/Edit';
 
const AddAlbum = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombreArtista: "",
        nombreAlbum: "",
        annoLanzamiento: "",
    });
    const [editingIndex, setEditingIndex] = useState(null); // Índice para identificar el álbum en edición
    const [originalNombreArtista, setOriginalNombreArtista] = useState(""); // Nuevo estado
    const [originalNombreAlbum, setOriginalNombreAlbum] = useState(""); // Nuevo estado
    const [message, setMessage] = useState(""); // Estado para el mensaje
    const [messageType, setMessageType] = useState(""); // Estado para el tipo de mensaje (éxito/error)
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await ConsultarTodosAlbumes();
                console.log("Datos de la API:", response); // Inspeccionar la respuesta
                const albumsData = response.Albumes || [];
                setAlbums(albumsData);
            } catch (err) {
                console.error("Error al obtener los datos de álbumes:", err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchAlbums();
    }, []);
 
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
 
    // Handle edit click
    const handleEditClick = (album, index) => {
        setOriginalNombreAlbum(album.Album || ""); // Guardar el nombre original del álbum
        setOriginalNombreArtista(album.Artista || ""); // Guardar el nombre original del álbum

        setFormData({
            nombreArtista: album.Artista || "",
            nombreAlbum: album.Album || "",
            annoLanzamiento: album.Anno_Lanzamiento
                ? new Date(album.Anno_Lanzamiento).toISOString().split("T")[0]
                : "",
        });
        setIsEditing(true);
        setEditingIndex(index);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();     
        
        const apiFormData = isEditing 
        ? {
            nombre_Artista: originalNombreArtista,
            nombre_Album: originalNombreAlbum,
            nuevoNombre_Album: formData.nombreAlbum,
            nuevo_Anno_Lanzamiento: formData.annoLanzamiento 
                ? new Date(formData.annoLanzamiento).toISOString()
                : null
        }
        : {
            nombre_Artista: formData.nombreArtista,
            nombre_Album: formData.nombreAlbum,
            Anno_Lanzamiento: new Date(formData.annoLanzamiento).toISOString()
        };
    
        try {
            const response = isEditing 
                ? await actualizarAlbum(apiFormData) 
                : await registrarAlbum(apiFormData);
    
            // Mostrar mensaje del servidor o mensaje genérico
            setMessage(response?.message || (isEditing ? "Álbum actualizado con éxito" : "Álbum registrado con éxito"));
            setMessageType("success"); // Tipo de mensaje de éxito
            setTimeout(() => setMessage(""), 5000);
            
            // Reset form and refresh list
            setFormData({ 
                nombreArtista: "", 
                nombreAlbum: "", 
                annoLanzamiento: "" 
            });
            setIsEditing(false);
            setOriginalNombreArtista(""); 
            setOriginalNombreAlbum(""); 
            
            const updatedAlbums = await ConsultarTodosAlbumes();
            setAlbums(updatedAlbums.Albumes || []);
        } catch (error) {
            setMessage(error.response?.data?.error || (isEditing ? "Error al actualizar álbum" : "Error al registrar álbum"));
            setMessageType("error"); // Tipo de mensaje de error
            setTimeout(() => setMessage(""), 5000); 
        }
    };
 
    const handleCancelEdit = () => {
        setFormData({ nombreArtista: "", nombreAlbum: "", annoLanzamiento: "" });
        setIsEditing(false);
        setEditingIndex(null);
        setOriginalNombreArtistico(""); // Resetea el nombre original
        setOriginalNombreAlbum(""); // Resetea el nombre original


    };
 
    if (loading) {
        return <div>Cargando...</div>;
    }
 
    return (
        <div>
            <div className="font-bold text-5xl mb-8">
                {isEditing ? "Editar Álbum" : "Agregar un Álbum"}
            </div>

            {/* Mostrar mensaje */}
            {message && (
                <div
                    className={`text-center py-2 px-4 mb-6 rounded ${
                        messageType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                    {message}
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:space-x-10">
                {/* Formulario */}
                <div className="w-full lg:w-1/3">
                    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-6">
                        <div>
                            <input
                                id="nombreArtista"
                                name="nombreArtista"
                                type="text"
                                value={formData.nombreArtista}
                                onChange={handleInputChange}
                                required
                                disabled={isEditing} // Bloquea el campo si se está editando
                                className={`appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-t-md focus:outline-none ${isEditing ? "cursor-not-allowed" : "focus:ring-indigo-500 focus:border-[#9BC9B4]"
                                    } sm:text-sm`}
                                placeholder="Nombre del Artista"
                            />
                        </div>
                        <div>
                            <input
                                id="nombreAlbum"
                                name="nombreAlbum"
                                type="text"
                                value={formData.nombreAlbum}
                                onChange={handleInputChange}
                                required
                                className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                placeholder="Nombre del Álbum"
                            />
                        </div>
                        <div>
                            <input
                                id="annoLanzamiento"
                                name="annoLanzamiento"
                                type="date"
                                value={formData.annoLanzamiento}
                                onChange={handleInputChange}
                                required
                                className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                            />
                        </div>
                        <div className="flex space-x-4 justify-center">
                            <button
                                type="submit"
                                className="group relative w-[170px] flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                            >
                                {isEditing ? "Actualizar Álbum" : "Subir Álbum"}
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
 
                {/* Tabla */}
                <div className="w-full lg:w-2/3 mt-6 lg:mt-0 overflow-x-auto">
                    <table className="min-w-full text-left table-auto">
                        <thead className="text-gray-300 border-b border-gray-600">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Nombre Artista</th>
                                <th className="px-4 py-2">Nombre Álbum</th>
                                <th className="px-4 py-2">Fecha de Lanzamiento</th>
                                <th className="px-4 py-2">Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.length > 0 ? (
                                albums.map((album, index) => (
                                    <tr key={index} className="hover:bg-gray">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{album.Artista}</td>
                                        <td className="px-4 py-2">{album.Album}</td>
                                        <td className="px-4 py-2">{album.Anno_Lanzamiento}</td>
                                        <td className="px-4 text-center py-2">
                                            <button onClick={() => handleEditClick(album, index)}>
                                                <EditIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No hay álbumes disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
 
export default AddAlbum;