const SearchResult = (props) => {

    const handleSongInput = async () => {
        props.setSearchTracks([]);
        console.log("Estas son las propiedades que voy a meter a la base de datos papaaaa ", {
            nombre: props.name,
            duracion: props.duracion,
            uri: props.uri,
            imagen: props.imagen,
            artista: props.artista,
            roomCode: props.roomCode
        })
        const url = 'http://localhost:3003/api/agregar/cancion';

        try {
            const response = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: props.name,
                    duracion: props.duracion,
                    uri: props.uri,
                    imagen: props.imagen,
                    artista: props.artista,
                    roomCode: props.roomCode
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("sjasdlkjsdalkjsadjklasdjkladskjlasdkjlajdkls ",data.message);
            } else {
                console.error('Error al agregar la canción');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div onClick={handleSongInput} className="bg-white mb-1 mt-1">
            <p>{props.name}</p>
            <p>{props.duracion}</p>
            <p>{props.artista}</p>
            <img src={props.imagen} className="h-16 w-16" alt="" />

        </div>
    );
}

export default SearchResult;