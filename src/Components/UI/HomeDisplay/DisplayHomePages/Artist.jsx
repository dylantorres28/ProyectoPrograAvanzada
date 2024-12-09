import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importar useLocation para acceder al estado
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import useCart from "../../../../Hooks/useCart";
import { PlayButtom } from "../PlayButtom";

const Artist = () => {
  const { addToCart, cartDetails, removeFromCart } = useCart()
  const { state } = useLocation(); // Obtener el estado pasado por navigate()
  const artistId = state?.artistId; // Obtener el artistId del estado

  const [artistDetails, setArtistDetails] = useState(null);
  const [topTracks, setTopTracks] = useState([]); // Para almacenar las canciones populares
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {

    if (!artistId) return; // Si no hay artistId, no hacer la llamada

    const fetchArtistDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamada a la API para obtener detalles del artista
        const responseArtist = await fetch(
          `https://spotify23.p.rapidapi.com/artists/?ids=${artistId}`,
          {
            method: "GET",
            headers: {
              'x-rapidapi-key': '2b98759b01msh4b5671bdee372fep14cf6cjsnf0ad1ea9d136',
              'x-rapidapi-host': 'spotify23.p.rapidapi.com',
            },
          }
        );

        if (!responseArtist.ok) {
          throw new Error(`Error al obtener los detalles del artista: ${responseArtist.status}`);
        }

        const dataArtist = await responseArtist.json();
        setArtistDetails(dataArtist?.artists[0]); // La API devuelve un array de artistas

        // Llamada a la API para obtener las canciones populares
        const responseTracks = await fetch(
          `https://spotify-downloader9.p.rapidapi.com/artistTopTracks?id=${artistId}&country=US`,
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
        console.log(dataTracks); // Para verificar los datos en la consola

        // Accede a los tracks anidados dentro de `data.tracks`
        setTopTracks(dataTracks?.data?.tracks || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId]); // Solo se vuelve a ejecutar si cambia el artistId

  if (loading) {
    return <div className="text-center text-gray-400">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!artistDetails) {
    return <div className="text-center text-gray-400">No se encontraron detalles para este artista.</div>;
  }


  const checkSongInCart = (track) => {
    return cartDetails.some(cartItem =>
      cartItem.Vinculo_Reproduccion === track.id
    );
  };

  return (
    <article className="text-white p-4">
      <div>
        <h1 className="text-6xl font-bold">{artistDetails.name}</h1>
        <p className="text-sm text-gray-400 mt-3">
          {artistDetails.name} - {topTracks.length} Canciones - {artistDetails.followers.total} Seguidores
        </p>
      </div>
      {/*elementos html para una tabla*/}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left table-auto">{/*tabla*/}
          <thead className="text-gray-300 border-b border-gray-600">{/*El encabezado*/}
            <tr>{/*Fila*/}
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">#</th>{/*Columna*/}
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Álbum</th>
              <th className="px-4 py-2"><AccessTimeFilledIcon /></th>
              <th className="px-4 py-2">Adquirir</th>
            </tr>
          </thead>
          <tbody className="hover:bg-gray">{/*El contenedero de las filas donde se van generando*/}

            {topTracks.map((track, index) => {
              const song = {
                id: track.id,
                name: track.name,
                album: track.album.name,
                artist: track.artists[0]?.name,
                vinculoReproduccion: track.id // Use track.id as the Vinculo_Reproduccion

              };

              const isSongInCart = checkSongInCart(track);
              const durationInSeconds = Math.floor(track.duration_ms / 1000)
              const minutes = Math.floor(durationInSeconds / 60)
              const second = durationInSeconds % 60
              const Total = (`${minutes}:${second}`)

              return (
                <tr key={track.id} className="">
                  <td>
                    <PlayButtom
                      song={{
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0]?.name,
                        previewUrl: track.preview_url, // Ajusta esta propiedad según la API
                        imagen: track.album.images[0]?.url,
                      }}
                    />

                  </td>

                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center ">
                    <img
                      src={track.album.images[0]?.url || "https://via.placeholder.com/50"}
                      alt={track.name}
                      className="w-10 h-10 mr-4"
                    />
                    <div>
                      <p className="font-bold">{track.name}</p>
                      <p className="text-sm text-gray-400">{track.artists[0]?.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2">{track.album.name}</td>
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

export default Artist;