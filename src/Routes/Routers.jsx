import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from '../App.jsx'
import LogIn from "../Components/LogIn.jsx";
import Register from "../Components/Register.jsx";

const Routers = () => {
    return <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<App />} />
        <Route path='/register' element={<Register />} />
    </Routes>
}

export default Routers;