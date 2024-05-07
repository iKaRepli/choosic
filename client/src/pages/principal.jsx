
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
            const socket = io("https://028rplm3-3003.usw3.devtunnels.ms/")
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
                    console.log("hola como estas", data)
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
    async function createUser() {
        const url = 'http://localhost:3003/api/register'; // La URL a la que quieres enviar la solicitud POST
        const data = {
          userName: 'pele',
          password: '123456'
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (!response.ok) {
            throw new Error('Error al crear el usuario: ' + response.status);
          }
      
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error('Error al hacer la solicitud POST:', error);
        }
      }
      
      

    return (
        <div className='my-container h-screen flex flex-col  bg-gradient-to-r from-emerald-950 to-green-700'>
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