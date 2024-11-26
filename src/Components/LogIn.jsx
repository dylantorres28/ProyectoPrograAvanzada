import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {validarCredenciales } from "../Apis/VCredenciales.js"

const LogIn = () => {
    const navigate = useNavigate(); // Definir navigate usando useNavigate
    const [email, setEmail] = useState(''); // Estado para el email
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    const handleSubmit = async (event) => {
        event.preventDefault();
        //navigate('/home');
        // Validar las credenciales usando la función importada desde Api.js
        try {
            const isValid = await validarCredenciales(email, password);
            console.log(isValid)
            if (isValid) {
                // Si las credenciales son correctas, redirige al home
                navigate('/home');
            } else {
                // Si las credenciales son incorrectas, muestra un mensaje de error
                setErrorMessage('Correo o contraseña incorrectos');
            }
        } catch (error) {
            setErrorMessage('Hubo un problema al validar las credenciales. Inténtalo nuevamente.');
        }
    };

    
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div >
                    <h2 className="mt-6 text-center text-5xl font-extrabold text-[#F3F3F1] mb-8">Inicia Sesion</h2>
                    <div className=" bg-[#4E4E4E] p-[1px]">
                    </div>

                    <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm space-y-5">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                                    required
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                                    required
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-3 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        {errorMessage && (
                        <div className="text-red-500 text-sm mt-2">
                            {errorMessage}
                        </div>
                    )}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#9BC9B4] focus:ring-[#9BC9B4] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#9BC9B4]">
                                    Password
                                </label>
                            </div>

                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-[#F3F3F1]">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-[#9BC9B4] underline hover:text-[#91AEAD]">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;