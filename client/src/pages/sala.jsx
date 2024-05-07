
import io from 'socket.io-client'
import { useEffect, useState, useContext } from 'react'
import { ContextoUsuario } from '../context/contextoUsuario';
import { Link, useParams } from 'react-router-dom'




export default function Room() {
    const { codigoSala } = useParams()
    const { userData, setUserData } = useContext(ContextoUsuario)

    useEffect(() => {
        console.log(userData)

        const socket = io('http://localhost:3003');

        socket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
        });

        socket.on('user-joined', () => {
            console.log("conectado")
        })

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor de Socket.IO');
        });

        const joinRoom = (roomId, user_id) => {

            console.log(id_user)
            socket.emit('join-room', { userId: user_id, roomId });
        };
        const id_user = userData.userId
        joinRoom(codigoSala, userData.userId);

        return () => {
            socket.disconnect();
        };
    }, []);



    const Cancion = ({ imagen, titulo, artista, duracion, numeroDeVotos, votosU, votos, numero }) => {
        return (
            <div className="flex items-center bg-white border border-gray-200 rounded p-4 mb-4 relative">
                <p className='text-lg font-semibold mr-3'>{numero}</p>
                <div className="flex items-center">
                    <img src={imagen} alt={titulo} className="h-16 w-16 mr-4 object-cover" />
                    <div>
                        <h2 className="text-lg font-semibold">{titulo}</h2>
                        <p className="text-gray-600">{artista}</p>
                        <p className="text-gray-600">{duracion}</p>
                    </div>
                </div>
                <button className="bg-emerald-500  text-white font-bold py-2 px-4 rounded float-right absolute right-6 top-4">
                    Votos: {votos}
                </button>
                <button className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right absolute right-4 top-16">
                    Votaste : {votosU}
                </button>
            </div>

        );
    };
    const ReproduciendoAhora = ({ imagen, titulo, artista, duracion }) => {
        return (
            <div className="flex items-center bg-gray-400 border border-gray-600 rounded p-4 mb-4 relative">
                <div className="flex items-center">
                    <img src={imagen} alt={titulo} className="h-16 w-16 mr-4 object-cover" />
                    <div>
                        <h2 className="text-lg font-semibold">{titulo}</h2>
                        <p className="text-gray-600">{artista}</p>
                        <p className="text-gray-600">{duracion}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='bg-gradient-to-r from-emerald-950 to-green-700'>
            <div className="container divide-y-reverse flex justify-between items-center">
                <Link to="/"><button className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 justify-start">
                    Salir
                </button>
                </Link>
                <div className='bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-4 mx-auto'>
                    Codigo de sala: {codigoSala}
                </div>
            </div>
            <div className="flex flex-row items-center justify-center h-screen">
                <div className='container '>
                    <p className="text-lg text-white mb-5 font-semibold">Reproduciendo Ahora:</p>
                    {ReproduciendoAhora({
                        imagen: "https://i1.sndcdn.com/artworks-7vXdMn5ntUZiRwOV-Fa87ag-t500x500.jpg",
                        titulo: "LOKERA",
                        artista: "Rauw Alejandro",
                        duracion: "2:22"
                    }
                    )}
                    <p className="text-lg text-white mb-5 font-semibold">Lista de reproduccion:</p>
                    {Cancion({
                        imagen: "https://www.show.news/__export/1653057679693/sites/debate/img/2022/05/20/bad_bunny_x7x.png_242310156.png",
                        titulo: "Un Verano Sin Ti", artista: "BadBunny", duracion: "2:30", votos: "15", votosU: "5",
                        numero: "1"
                    })}
                    {Cancion({
                        imagen: "https://www.show.news/__export/1653057679693/sites/debate/img/2022/05/20/bad_bunny_x7x.png_242310156.png",
                        titulo: "Callaita", artista: "BadBunny", duracion: "4:11", votos: "9", votosU: "0", numero: "2"
                    })}
                    {Cancion({
                        imagen: "https://i0.wp.com/musiclife507.com/wp-content/uploads/2023/07/Rauw-Alejandro-Playa-Saturno-Album.jpg?fit=1440%2C1440&ssl=1",
                        titulo: "DILUVIO", artista: "Rauw Alejandro", duracion: "3:30", votos: "9", votosU: "0", numero: "3"
                    })}
                    {Cancion({
                        imagen: "https://www.show.news/__export/1653057679693/sites/debate/img/2022/05/20/bad_bunny_x7x.png_242310156.png",
                        titulo: "Un Verano Sin Ti", artista: "BadBunny", duracion: "2:30", votos: "4", votosU: "2", numero: "4    "
                    })}
                </div>

            </div>
        </div>

    )
}