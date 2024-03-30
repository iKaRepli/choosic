
import io from 'socket.io-client'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Options() {
  const [connection, setConecction] = useState(false)

  // const socket = io("http://localhost:3000")

  return (
    <div className="my-container h-screen flex w-full items-center justify-center bg-gradient-to-r from-emerald-950 to-green-700">
      <div className="text-center w-65">
        <h1 className="text-5xl font-bold mb-4 text-green-50">Bienvenido a Choosic</h1>
        <p className="text-green-600 mb-8 font-bold">Conectate a salas y vota en tiempo real</p>
        <div className="justify-between flex w-90 ">  
          <Link to="/room"> <button className="bg-amber-900 hover:bg-amber-950  duration-150 border  text-white px-4 py-2 rounded-md">Ingresar a Sala</button></Link>
          <Link to="/login"><button className="bg-amber-900 hover:bg-amber-950 duration-150 text-white px-4 py-2 rounded-md">Iniciar Sesión</button></Link>
          <button className="bg-gray-500 hover:bg-gray-600 duration-150 text-white px-4 py-2 rounded-md">Crear sala</button>
        </div>



      </div>
    </div>
  )
}

