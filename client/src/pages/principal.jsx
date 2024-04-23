
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Authsl from '../components/auth'
import Join from '../components/ingresar'
import { getCookie } from '../apiFunctions'
import loader from '../assets/loader.gif'


export default function Principal() {


    const handleSubmit = (event) => {
        event.preventDefault()
        if (handleData()) {
            alert("Todo correcto")
            const socket = io("http://localhost:3000")
        }
    }



    const [isLoading, setisLoafing] = useState(true)
    const [userValues, setUserValues] = useState({
        userName: undefined,
        userPasswords: undefined,
        userIds: undefined
    })
    const [isLogged, setIsLogged] = useState(false)


    useEffect(() => {
        const fetchData = async () => {

            const userIdFromCookie = getCookie('userId')
            const userPasswordFromCookie = getCookie('userPassword')

            const response = await fetch(`http://localhost:3003/api/users/${userIdFromCookie}/${userPasswordFromCookie}`)

            if (response.ok) {

                const data = await response.json()

                if (userValues.userIds != data.user_id) {
                    console.log(data)
                    setisLoafing(false)
                    setIsLogged(true)
                    setUserValues({
                        userName: data.user_name,
                        userIds: data.user_id,
                        userPasswords: data.user_password
                    })
                }

            } else {
                setisLoafing(false)
                setIsLogged(false)
            }

        }
        fetchData()
    }, [])

    const handleLogin = () => {
        document.cookie = "userId=1; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;";
        document.cookie = "userPassword=12345; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;";
        setUserValues({
            userName: "isaac",
            userIds: "1",
            userPasswords: "12345"
        });
        setIsLogged(true);

    }

    const handleLogout = () => {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userPassword=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUserValues({
            userName: undefined,
            userIds: undefined,
            userPasswords: undefined
        });
        setIsLogged(false);

    }

    return (
        <div className='my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700'>
            <button className='bg-gray-500 hover:bg-gray-600 duration-150 text-white px-4 py-2 rounded-md' onClick={handleLogin}>
                poner cookies
            </button>
            <button onClick={handleLogout}>
                Quitar cookies
            </button>
            <div>
                {getCookie("userId")}
            </div>
            <div>
                {getCookie("userPassword")}
            </div>
            {
                isLoading ? (
                    <div className='items-center flex flex-col justify-center h-full w-full'>
                        <img src={loader} alt="loader" />

                    </div>
                ) :
                    isLogged ? <Join userName={userValues.userName} handleLogout={handleLogout}></Join> : <Authsl></Authsl>
            }
        </div>
    )

}