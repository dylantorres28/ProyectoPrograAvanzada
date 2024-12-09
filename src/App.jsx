import React, { useState } from 'react';
import NavBar from './Components/NavBar.jsx';
import SideBar from './Components/SideBar.jsx';
import Display from './Components/Display.jsx';
import PlayerMusic from './Components/PlayerMusic.jsx';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para manejar la búsqueda
  const handleSearch = async (query) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '2b98759b01msh4b5671bdee372fep14cf6cjsnf0ad1ea9d136',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const filteredResults = {
        query, // Guarda el término de búsqueda
        artists: data.artists?.items || [],
        albums: data.albums?.items || [],
        tracks: data.tracks?.items || [],
      };

      console.log('Resultados filtrados:', filteredResults);

      setSearchResults(filteredResults);
      navigate('/home/search');
    } catch (error) {
      console.error('Error al buscar en la API de Spotify:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

//bg-[#1A1A1A]
  return (
    
        <div className='h-screen bg-gradient-to-br from-[#01283A] to-black'>
          <NavBar onSearch={handleSearch} />
          <div className='h-[77%] flex'>
            <SideBar />
            <Display results={searchResults} loading={loading} />
          </div>
          <PlayerMusic/>
        </div>
  )
}

export default App