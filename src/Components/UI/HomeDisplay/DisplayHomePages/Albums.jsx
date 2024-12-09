import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importar useLocation para acceder al estado
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import useCart from "../../../../Hooks/useCart";
import { PlayButtom } from "../PlayButtom";

const Albums = () => {
    const { addToCart, cartDetails, removeFromCart } = useCart()
    const { state } = useLocation(); // Obtener el estado pasado por navigate()
    const albumId = state?.albumId; // Obtener el artistId del estado

    const [topTracks, setTopTracks] = useState([]); // Para almacenar las canciones populares
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!albumId) return; // Si no hay trackId, no hacer la llamada

        const fetchArtistDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                // Llamada a la API para obtener las canciones populares
                const responseTracks = await fetch(
                    `https://spotify-downloader9.p.rapidapi.com/albumTracks?id=${albumId}`,
                    {
                        method: "GET",
                        headers: {
                            'x-rapidapi-key': '6d9fffcfdemshd08751e3d52224dp1617f2jsnedd42c360250',
                            'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com',
                        },
                    }
                );

                if (!responseTracks.ok) {
                    throw new Error(`Error al obtener las canciones populares: ${responseTracks.status}`);
                }

                const dataTracks = await responseTracks.json();
                console.log(dataTracks); // Para verificar los datos en la consola

                // Accede a los tracks anidados dentro de `data.tracks`
                setTopTracks(dataTracks?.data?.album?.tracks || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistDetails();
    }, [albumId]);

    if (loading) {
        return <div className="text-center text-gray-400">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    const checkSongInCart = (track) => {
        return cartDetails.some(cartItem =>
            cartItem.Vinculo_Reproduccion === track.id
        );
    };

    return (
        <article className="text-white p-4">

            {/*elementos html para una tabla*/}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left table-auto">{/*tabla*/}
                    <thead className="text-gray-300 border-b border-gray-600">{/*El encabezado*/}
                        <tr>{/*Fila*/}
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">#</th>{/*Columna*/}
                            <th className="px-4 py-2">Título</th>
                            <th className="px-4 py-2">Link</th>
                            <th className="px-4 py-2"><AccessTimeFilledIcon /></th>
                            <th className="px-4 py-2">Adquirir</th>
                        </tr>
                    </thead>
                    <tbody className="hover:bg-gray">{/*El contenedero de las filas donde se van generando*/}

                        {topTracks.map((track, index) => {
                            const song = {
                                id: track.id,
                                name: track.name,
                                artist: track.artists[0]?.name || "Artista desconocido",
                                vinculoReproduccion: track.id // Use track.id as the Vinculo_Reproduccion
                            };

                            const isSongInCart = checkSongInCart(track);
                            const durationInSeconds = Math.floor(track.duration_ms / 1000)
                            const minutes = Math.floor(durationInSeconds / 60)
                            const second = durationInSeconds % 60
                            const Total = (`${minutes}:${second.toString().padStart(2, '0')}`)

                            return (
                                <tr key={track.id} className="">
                                    <td>
                                        <PlayButtom
                                            song={{
                                                id: track.id,
                                                name: track.name,
                                                artist: track.artists[0]?.name,
                                                previewUrl: track.preview_url, // Ajusta esta propiedad según la API
                                            }}
                                        />

                                    </td>

                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2 flex items-center ">
                                        <div>
                                            <p className="font-bold">{track.name}</p>
                                            <p className="text-sm text-gray-400">{track.artists[0]?.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={track.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline"
                                        >
                                            Ir al enlace
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">{Total || "Sin Duracion"}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={async () => {
                                                try {
                                                    if (isSongInCart) {
                                                        await removeFromCart(song);
                                                    } else {
                                                        const response = await addToCart(song);
                                                        if (response && response.error) {
                                                            throw new Error(response.error);
                                                        }
                                                    }
                                                } catch (error) {
                                                    const errorMessage = "La canción no está disponible para su compra";
                                                    setError(errorMessage);
                                                    setTimeout(() => setError(null), 2000);
                                                }
                                            }}
                                            className={`px-2 py-1 ml-2 rounded ${isSongInCart ? "text-red-600" : "text-green-600"
                                                }`}>
                                            {isSongInCart ? <DeleteIcon /> : <AddCircleIcon />}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </article>
    );
};

export default Albums;