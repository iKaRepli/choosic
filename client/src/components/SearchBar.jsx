import { useState } from 'react'
import io from 'socket.io-client'

const SearchBar = (props) => {
    const [input,setInput] = useState("")

    const handleSearchSong = () => {
        props.socket.emit('searchSong',{roomCode: props.roomCode, query: input})
    }
    return ( 
        <div>
            <input className="" type="text" name="queryInput"  onChange={(e) => {setInput(e.target.value)}}/>
            <button className = "bg-white"onClick={handleSearchSong}>Buscar </button>
        </div>
     );
}
 
export default SearchBar;