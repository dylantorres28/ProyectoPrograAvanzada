import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const SearchDisplay = () => {

    const { results, loading } = useOutletContext();
    const navigate = useNavigate();

    return (
        <div >
            <h1 className="text-5xl py-5">Tus busquedas:</h1>
            {/* Renderizar tracks */}
            {results.tracks?.length > 0 && (
                <div className="py-5">
                    <h2 className="text-3xl mb-4">Canciones</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4  ">
                        {results.tracks.map((track, index) => {
                            // Obtener el nombre del álbum y la URL de la portada
                            const albumCoverUrl = track.data.albumOfTrack?.coverArt?.sources?.[0]?.url;
                            const albumName = track.data.albumOfTrack?.name || "Álbum desconocido";

                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-4 rounded-lg hover:bg-black  hover:bg-opacitity-80 text-white"
                                    onClick={() => {
                                        console.log('Cancion seleccionado:', track);
                                    }}
                                >
                                    {/* Mostrar la imagen del álbum si está disponible */}
                                    {albumCoverUrl ? (
                                        <img src={albumCoverUrl} alt={albumName} className="w-full h-48 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-400 rounded-lg flex items-center justify-center">
                                            <span className="text-white">Sin portada</span>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{track.data.name || "Sin nombre"}</h3>
                                    <p>{track.data.albumOfTrack.name || "Álbum desconocido"}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Renderizar artistas */}
            {results.artists?.length > 0 && (
                <div className="py-5">
                    <h2 className="text-3xl mb-4">Artistas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 ">
                        {results.artists.map((artist, index) => {
                            // Extraer el ID de la URI (después de "artist:")
                            const artistId = artist.data.uri.split(":").pop();

                            // Verificar si existen los datos de la imagen
                            const avatarImageUrl = artist.data.visuals?.avatarImage?.sources?.[0]?.url;
                            
                            if (!avatarImageUrl) return null;
                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-4 rounded-lg text-white"
                                    onClick={() => {
                                        navigate(`/home/artist/${artistId}`, {
                                            state: { artistId }, // Pasar el artistId como estado
                                        });

                                    }}
                                >

                                    <div className="flex items-center mb-3">
                                        {/* Imagen redonda y de tamaño fijo */}
                                        <div className="rounded-full overflow-hidden ">
                                            {avatarImageUrl ? (
                                                <img src={avatarImageUrl} alt={artist.data.profile?.name || "Imagen de artista"} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-400 flex items-center justify-center">
                                                    <span className="text-white">Sin imagen</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nombre del artista */}
                                    </div>
                                    <h3 className="text-xl font-bold">{artist.data.profile?.name || "Sin nombre"}</h3>
                                    <h3 className="text-sm">Artist</h3>
                                </div>
                            );

                        })}

                    </div>
                </div>
            )}

            {/* Renderizar álbumes */}
            {results.albums?.length > 0 && (
                <div className="py-5">
                    <h2 className="text-3xl mb-4">Álbumes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {results.albums.map((album, index) => (
                            <div
                                key={index}
                                className="cursor-pointer p-4 border rounded-lg bg-[#3A3A3A] text-white"
                                onClick={() => navigate(`/home/album/${album.data.uri}`, { state: album })}
                            >

                                <h3 className="text-xl font-bold">{album.data.name || "Sin nombre"}</h3>
                                <h3 className="text-sm ">{album.data.date.year || "Sin Anio"}</h3>

                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default SearchDisplay;