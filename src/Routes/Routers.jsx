import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from '../App.jsx'
import LogIn from "../Components/LogIn.jsx";
import Register from "../Components/Register.jsx";
import ProfilePage from "../Components/UI/Profile/ProfilePage.jsx";
import Accounts from '../Components/UI/Profile/DisplayProfilePage/Accounts.jsx';
import AddSong from '../Components/UI/Profile/DisplayProfilePage/AddSong.jsx';
import AddArtist from '../Components/UI/Profile/DisplayProfilePage/AddArtist.jsx';
import AddAlbum from '../Components/UI/Profile/DisplayProfilePage/AddAlbum.jsx';
import Control from '../Components/UI/Profile/DisplayProfilePage/Control.jsx';
import MyProfile from "../Components/UI/Profile/DisplayProfilePage/MyProfile.jsx";
import Artist from "../Components/UI/HomeDisplay/DisplayHomePages/Artist.jsx";
import Generos from "../Components/UI/HomeDisplay/DisplayHomePages/Generos.jsx";
import Welcome from "../Components/UI/HomeDisplay/DisplayHomePages/Welcome.jsx";
import SearchDisplay from "../Components/UI/HomeDisplay/DisplayHomePages/SearchDisplay.jsx";
import Payment_Gateway from "../Components/UI/Profile/DisplayProfilePage/Payment_Gateway.jsx"
import Tracks from "../Components/UI/HomeDisplay/DisplayHomePages/Tracks.jsx";
import Albums from "../Components/UI/HomeDisplay/DisplayHomePages/Albums.jsx"; 

const Routers = () => {
    return <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path="/factura" element={<Payment_Gateway />}/>

        {/* Las Rutas del Home*/}
        <Route path='/home' element={<App />} >
            <Route path="search" element={<SearchDisplay />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="artist/:id" element={<Artist />} />
            <Route path="track/:id" element={<Tracks />} />
            <Route path="album/:id" element={<Albums />} />
            <Route path="generos" element={<Generos />} />
        </Route>

        {/* Las Rutas del Perfil*/}
        <Route path="/perfil" element={<ProfilePage />}>
            {/* Ruta por defecto para renderizar a la primera*/}
            <Route index element={<Navigate to="/perfil/myprofile" replace />} />

            <Route path="myprofile" element={<MyProfile />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="addSong" element={<AddSong />} />
            <Route path="addArtist" element={<AddArtist />} />
            <Route path="addAlbum" element={<AddAlbum />} />
            <Route path="control" element={<Control />} />
        </Route>

    </Routes>
}

export default Routers;