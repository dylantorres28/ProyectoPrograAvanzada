import React, { useState, useEffect } from "react";
import { registraCancion, listarGeneros } from '../../../../Apis/SongApi.js'
 
const AddSong = () => {
    const [nombre, setNombre] = useState(""); // Estado para el texto de búsqueda
    const [topTracks, setTopTracks] = useState([]); // Para almacenar las canciones populares
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para manejar el error
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null); // Canción seleccionada
    const [genre, setGenre] = useState(""); // Género
    const [quantity, setQuantity] = useState(1); // Cantidad
    const [price, setPrice] = useState(""); // Precio
 
    const [genres, setGenres] = useState([]);

    // Fetch genres when component mounts
    useEffect(() => {
      const fetchGenres = async () => {
          try {
              const genresData = await listarGeneros();
              console.log('Raw Genres Data:', genresData);
  
              const genres = genresData.Generos || genresData;
  
              const sortedGenres = genres.sort((a, b) => 
                  a.Genero.localeCompare(b.Genero)
              );
              setGenres(sortedGenres);
          } catch (error) {
              console.error('Detailed Error fetching genres:', error);
          }
      };
  
      fetchGenres();
  }, []);
    // Función para manejar el cambio de texto en la barra de búsqueda
    const handleInputChange = (e) => {
        setNombre(e.target.value); // Actualiza el estado con el texto ingresado
    };
 
    // Función para manejar la búsqueda
    const handleSearch = async () => {
        if (!nombre.trim()) return; // No hacer nada si el campo está vacío
        console.log(nombre)
        try {
            setLoading(true);
            setError(null);
 
            // Llamada a la API para obtener las canciones populares de un artista
            const responseTracks = await fetch(
                `https://spotify-downloader9.p.rapidapi.com/search?q=${nombre}&type=multi&limit=10&offset=0&noOfTopResults=5`,
                {
                    method: "GET",
                    headers: {
                        'x-rapidapi-key': '2b98759b01msh4b5671bdee372fep14cf6cjsnf0ad1ea9d136',
                        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com',
                    },
                }
            );
            if (!responseTracks.ok) {
                throw new Error(`Error al obtener las canciones populares: ${responseTracks.status}`);
            }
 
            const dataTracks = await responseTracks.json();
            console.log(dataTracks?.data?.tracks.items)
 
            setTopTracks(dataTracks?.data?.tracks.items || []); // Actualiza el estado con las canciones obtenidas
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
 
    const handleTrackSelect = (track) => {
        setSelectedTrack({
            id: track.id,
            name: track.name,
            album: track.albumOfTrack?.name || "Sin nombre de álbum",
            artist: track.artists?.items[0]?.profile?.name || "Artista desconocido",
        });
    };
 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const songData = {
          nombre_Artista: selectedTrack?.artist || '',
          nombre_Album: selectedTrack?.album || '',
          nombre_Cancion: selectedTrack?.name || '',
          nombre_Genero: genre,
          vinculo_Reproduccion: selectedTrack?.id || '',
          precio_Cancion: parseFloat(price),
          cantidad_Disponible: parseInt(quantity)
      };
  
      try {
          const response = await registraCancion(songData);
          setSuccessMessage('Canción registrada con éxito');
          console.log('Canción registrada:', response);
          // Realizar acciones adicionales después del registro exitoso
      } catch (error) {
          setError('Error al registrar la canción');
          console.error('Error al registrar canción:', error);
          // Manejar el error de registro
      } finally {
          // Limpiar los mensajes después de 5 segundos
          setTimeout(() => {
              setError(null);
              setSuccessMessage(null);
          }, 5000);
      }
  };
    // Función para manejar el evento de presionar "Enter" en el campo de búsqueda
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && nombre.trim()) {
            handleSearch();
        }
    };
 
    return (
        <div>
            {/* Barra de búsqueda */}
            <div>
                <input
                    type="search"
                    placeholder="Buscar"
                    className="w-full p-2 rounded-md bg-[#F3F3F1] text-[#1A1A1A]"
                    value={nombre}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
 
            {/* Renderizar canciones */}
            <div className="py-5">
                <h2 className="text-3xl mb-4">Canciones</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : topTracks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
                        {topTracks.map((item, index) => {
                            const albumCoverUrl = item.albumOfTrack?.coverArt?.[0]?.url;
                            const albumName = item.albumOfTrack?.name || "Track desconocido";
                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-4 rounded-lg bg-white/5 hover:bg-black text-white"
                                    onClick={() => handleTrackSelect(item)}
                                >
                                    {albumCoverUrl ? (
                                        <img src={albumCoverUrl} alt={albumName} className="w-full h-48 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-400 rounded-lg flex items-center justify-center">
                                            <span className="text-white">Sin portada</span>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{item.name || "Sin nombre"}</h3>
                                    <h3 className="text-sm">{albumName || "Sin nombre"}</h3>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No se encontraron canciones. Prueba buscando algo diferente.</p>
                )}
            </div>
 
            {/* Formulario */}
            <div className="py-5">
                <h2 className="text-3xl mb-4">Agregar Canción</h2>

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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-white">
                            ID del Track
                        </label>
                        <input
                            id="id"
                            type="text"
                            value={selectedTrack?.id || ""}
                            readOnly
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Nombre del Track
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={selectedTrack?.name || ""}
                            readOnly
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="album" className="block text-sm font-medium text-white">
                            Nombre del Álbum
                        </label>
                        <input
                            id="album"
                            type="text"
                            value={selectedTrack?.album || ""}
                            readOnly
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="artist" className="block text-sm font-medium text-white">
                            Nombre del Artista
                        </label>
                        <input
                            id="artist"
                            type="text"
                            value={selectedTrack?.artist || ""}
                            readOnly
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-white">
                            Género
                        </label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        >
                            <option value="">Selecciona un género</option>
                            {genres.map((genreItem) => (
                                <option 
                                    key={genreItem.Genero} 
                                    value={genreItem.Genero}
                                >
                                    {genreItem.Genero}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-white">
                            Cantidad
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-white">
                            Precio
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            min="0"
                            step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                            className="appearance-none bg-[#1A1A1A] block w-full px-2 py-2 border border-[#808080] text-white sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#1A1A1A] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#333333]"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
 
}
 
export default AddSong;