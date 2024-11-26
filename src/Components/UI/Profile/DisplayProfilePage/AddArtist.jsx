import React from "react";
import '../../../../Apis/AddArtists.js'

const AddArtist = () => {
    return (
        <div >
            <div className="font-bold text-5xl">
                Agregar un Artista
            </div>

            <div className="mt-8 w-full  max-w-md space-y-6" >

                <div className="rounded-md shadow-sm space-y-5"> </div>
                <div>
                    <input
                        id="nacionalidad"
                        name="nacionalidad"
                        type="text"
                        //value={email} 
                        //onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        required
                        className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                        placeholder="Nacionalidad"
                    />
                </div>

                <div>
                    <input
                        id="nombreArtistico"
                        name="nombreArtistico"
                        type="text"
                        //value={email} 
                        //onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        required
                        className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                        placeholder="Nombre Artistico"
                    />
                </div>

                <div>
                    <input
                        id="fecha_nacimineto"
                        name="fecha_nacimineto"
                        type="date"
                        //value={email} 
                        //onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        required
                        className="appearance-none bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                    />
                </div>

                <div>
                    <input
                        id="nombreReal"
                        name="nombreReal"
                        type="text"
                        //value={email} 
                        //onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        required
                        className="appearance-none rounded-b-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"
                        placeholder="Nombre Real"
                    />
                </div>
                <div>
                    <input
                        id="nombreReal"
                        name="nombreReal"
                        type="file"
                        //value={email} 
                        //onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        required
                        className="appearance-none rounded-b-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080]  focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] focus:z-10 sm:text-sm"

                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-[170px] flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                    >
                        Subir Artista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddArtist;