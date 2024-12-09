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
                            const trackId = track.data.id;
                            // Obtener el nombre del álbum y la URL de la portada
                            const albumCoverUrl = track.data.albumOfTrack?.coverArt?.sources?.[0]?.url;
                            const albumName = track.data.albumOfTrack?.name || "Álbum desconocido";

                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-4 rounded-lg bg-white/5 bg-opacitity-80  hover:bg-black  hover:bg-opacitity-80 text-white"
                                    onClick={() => {
                                        navigate(`/home/track/${trackId}`, {
                                            state: { trackId }, // Pasar el artistId y el id de la cancion como estado
                                        });
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
            {/* Renderizar Álbumes */}
            {results.albums?.length > 0 && (
                <div className="py-5">
                    <h2 className="text-3xl mb-4">Álbumes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
                        {results.albums.map((album, index) => {
                            const albumUrl = album.data.coverArt?.sources?.[0]?.url;
                            const albumName = album.data.name || "Álbum desconocido";
                            const albumId = album.data.uri.split(":").pop();

                            return (
                                <div
                                    key={index}
                                    className="cursor-pointer p-4 rounded-lg bg-white/5 bg-opacity-80 hover:bg-black hover:bg-opacity-80 text-white"
                                    onClick={() => {
                                        navigate(`/home/album/${albumId}`, {
                                            state: { albumId }, // Pasar el artistId y el id de la cancion como estado
                                        });
                                    }}
                                >
                                    {albumUrl ? (
                                        <img src={albumUrl} alt={albumName} className="w-full h-48 object-cover rounded-lg" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-400 rounded-lg flex items-center justify-center">
                                            <span className="text-white">Sin portada</span>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold">{albumName}</h3>
                                    <p>{album.data.date?.year || "Sin año"}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchDisplay;