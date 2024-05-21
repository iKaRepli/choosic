const Song = (prop) => {
    return ( 
        <div>
            <div className="flex items-center bg-white border border-gray-200 rounded p-4 mb-4 relative">
                <p className='text-lg font-semibold mr-3'>{prop.numero}</p>
                <div className="flex items-center">
                    <img src={prop.imagen} alt={prop.titulo} className="h-16 w-16 mr-4 object-cover" />
                    <div>
                        <h2 className="text-lg font-semibold">{prop.titulo}</h2>
                        <p className="text-gray-600">{prop.artista}</p>
                        <p className="text-gray-600">{prop.duracion}</p>
                    </div>
                </div>
                <button className="bg-emerald-500  text-white font-bold py-2 px-4 rounded float-right absolute right-6 top-4">
                    Votos: {prop.votos}
                </button>
                <button className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right absolute right-4 top-16">
                    Votaste : {prop.votosU}
                </button>
            </div>

        </div>
     );
}
 
export default Song;