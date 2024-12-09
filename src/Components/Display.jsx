import React from "react";
import { Outlet } from "react-router-dom";


const Display = ({ results, loading }) => {

  console.log("Datos en Display:", results);

  return (
    <div className='w-[100%] m-2 px-6 pt-4 rounded-lg bg-black bg-opacity-50 text-[#F3F3F1] overflow-auto lg: w-[75%] lg:ml-0'>
      {/* <div>
        <h1 className="text-5xl">Bienvenido, Dylan Torres</h1>
      </div>*/}
      {loading ? (
        <div className="text-center text-gray-400 mt-4">Cargando resultados....</div>
      ) : (
        <Outlet context={{ results, loading }} />
      )}
    </div>
  )
}

export default Display;