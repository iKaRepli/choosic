
import io from 'socket.io-client'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Login() {
    const [connection, setConecction] = useState(false)

    return (
        <div className="my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700">
            <div className="container divide-y-reverse">
                <Link to="/"><button className="bg-amber-900 hover:bg-amber-950 duration-200 text-white font-bold py-2 px-4 rounded m-4 justify-start">
                    Inicio
                </button>
                </Link>
            </div>

            <div className="container mx-auto p-8 items-center flex flex-col justify-center h-full w-full">
                <h1 className="text-green-100 text-5xl font-sans font-bold m-11">Inicio de sesion</h1>
                <form className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center">
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nombre de Usuario:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                    <span>No tienes cuenta?  <Link to="/register" className='text-blue-500 underline'>Registrate</Link></span>
                </form>
            </div>
        </div>

    )
}