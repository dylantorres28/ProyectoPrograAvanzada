import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = ({ formData, onFormDataChange, onNext}) => {

    console.log('onFormDataChange prop:', onFormDataChange);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFormDataChange({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // Llamar a onNext para ir al siguiente paso
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#01283A] to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-5xl font-extrabold text-[#F3F3F1] mb-8">Regístrate</h2>
                    <div className=" bg-[#4E4E4E] p-[1px]">
                    </div>
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-5">
                            <div>
                                <label htmlFor="nombre" className="sr-only">Nombre</label>
                                <input
                                    id="cedula"
                                    name="cedula"
                                    maxLength="9"
                                    inputMode="numeric"
                                    required
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Cedula"
                                />
                            </div>
                            <div>
                                <label htmlFor="nombre" className="sr-only">Nombre</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="apellido1" className="sr-only">Primer Apellido</label>
                                <input
                                    id="apellido1"
                                    name="apellido1"
                                    type="text"
                                    required
                                    value={formData.apellido1}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Primer Apellido"
                                />
                            </div>
                            <div>
                                <label htmlFor="apellido2" className="sr-only">Segundo Apellido</label>
                                <input
                                    id="apellido2"
                                    name="apellido2"
                                    type="text"
                                    required
                                    value={formData.apellido2}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Segundo Apellido"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none rounded-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="genero" className="text-gray-500 block">Género</label>
                            <select
                                id="genero"
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>

                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                            >
                                Siguiente
                            </button>
                        </div>

                    </form>
                    <p className="mt-2 text-center text-sm text-[#F3F3F1]">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login" className="font-medium text-[#9BC9B4] underline hover:text-[#91AEAD]">
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;