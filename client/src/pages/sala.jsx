
import io from 'socket.io-client'
import { useEffect, useState, useContext } from 'react'
import { ContextoUsuario } from '../context/contextoUsuario';
import { Link, useParams } from 'react-router-dom'
import Song from '../components/cancion';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchResultsList from '../components/SearchResultList';


export default function Room() {
    const { codigoSala } = useParams()
    const { userData, setUserData } = useContext(ContextoUsuario)
    const [socket, setSocket] = useState(null)
    const [searchTracks, setSearchTracks] = useState({})

    useEffect(() => {
        console.log(userData)

        const newSocket = io('http://localhost:3003');
        setSocket(newSocket)
        newSocket.on('connect', () => {
            console.log('Conectado al servidor de Socket.IO');
        });

        newSocket.on('user-joined', () => {
            console.log("conectado")
        })

        newSocket.on('disconnect', () => {
            console.log('Desconectado del servidor de Socket.IO');
        });
        newSocket.on('resultados-busqueda', (data) => {
            console.log("Search trachs", searchTracks)
            const tracks = data.tracks.items.map(track => ({
                name: track.name,
                uri: track.uri,
                duration: track.duration_ms,
                artist: track.artists.map(artist => artist.name).join(', '),
                imagen: track.album.images[1].url
            }));
            
            console.log("Searcheddsasd tracks", tracks)

            setSearchTracks(tracks)

        });

        
        const joinRoom = (roomId, user_id) => {

            console.log(id_user)
            newSocket.emit('join-room', { userId: user_id, roomId });
        };
        const id_user = userData.userId
        joinRoom(codigoSala, userData.userId);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {

    },[searchTracks])

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
                <SearchBar roomCode={codigoSala} socket={socket} />
                {searchTracks.length > 0 && (<SearchResultsList roomCode = {codigoSala} setSearchTracks= {setSearchTracks}tracks = {searchTracks}/>)}




                    <p className="text-lg text-white mb-5 font-semibold">Reproduciendo Ahora:</p>
                    {ReproduciendoAhora({
                        imagen: "https://i1.sndcdn.com/artworks-7vXdMn5ntUZiRwOV-Fa87ag-t500x500.jpg",
                        titulo: "LOKERA",
                        artista: "Rauw Alejandro",
                        duracion: "2:22"
                    }
                    )}
                    <p className="text-lg text-white mb-5 font-semibold">Lista de reproduccion:</p>

                    <Song
                        imagen="https://www.show.news/__export/1653057679693/sites/debate/img/2022/05/20/bad_bunny_x7x.png_242310156.png"
                        titulo="Un Verano Sin Ti"
                        artista="BadBunny"
                        duracion="2:30"
                        votos="9"
                        votosU="5"
                        numero="1"
                    />
                </div>

            </div>
        </div>

    )
}