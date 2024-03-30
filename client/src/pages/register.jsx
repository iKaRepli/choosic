
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'




export default function Register() {

const handleSubmit = (event) =>{
    event.preventDefault()
    if(handleData()){
        alert("Todo correcto")
        const socket = io("http://localhost:3000")
    }
}

const handleData = () => {
    const {username, password, confirmedPassword, email} = values;
    if(username.length <= 4 ){
        alert("El nomrbre: " + values.username + " es muy corto")
        return false
    } 
    return true

}

const handleChange = (event) =>{

    setValues({...values, [event.target.name]:event.target.value})

}


const [values,setValues] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
    email:""
})

  return (
    <div className="my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700">
            <div className="container divide-y-reverse">
                <Link to="/"><button className="bg-amber-900 hover:bg-amber-950 duration-200 text-white font-bold py-2 px-4 rounded m-4 justify-start">
                    Inicio
                </button>
                </Link>
            </div>

            <div className="container mx-auto p-8 items-center flex flex-col justify-center h-full w-full">
                <h1 className="text-green-100 text-5xl font-sans font-bold m-11">Registrarse</h1>
                <form className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center"
                    onSubmit={(e)=> handleSubmit(e)}
                    >
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nombre de Usuario:
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="username"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña:
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            onChange={(e) => handleChange(e)}
                            
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Repetir contraseña:
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="confirmedPassword"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Correo Elecronico
                        </label>
                        <input
                            className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            type="text"
                            placeholder="Ingrese un correo"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"

                        >
                            Registrarse
                        </button>
                    </div>
                    <span>¿Ya tienes una cuenta?  <Link to="/login" className='text-blue-500 underline'>Inicia sesion</Link></span>
                </form>
            </div>
        </div>
  )
}