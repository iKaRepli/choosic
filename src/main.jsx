import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<div className="my-container h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a Choosic</h1>
        <p className="text-gray-600 mb-8">Encuentra salas y chatea en tiempo real</p>
        <a to="/ingresar" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Ingresar a Sala</a>
        <a to="/crear-sala" className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">Crear Sala</a>
        <a to="/login" className="bg-gray-500 text-white px-4 py-2 rounded-md">Iniciar Sesión</a>
      </div>
    </div>
   
  </React.StrictMode>,
)
