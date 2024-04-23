import React, { useState } from 'react';

function Authsl() {
    const [userExists, setUserExist] = useState(false);
    const [userName, setUserName] = useState("");
    const [formStep, setFormStep] = useState(1);

    const generarNombreAleatorio = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let nombreAleatorio = 'INVITADO';
        for (let i = 0; i < 5; i++) {
            nombreAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return nombreAleatorio;
    };

    const handleEnterUser = async () => {
        const userNameT = userName;
        const response = await fetch(`http://localhost:3003/api/name/${userNameT}`);

        if (response.ok) {
            setUserExist(true);
        } else {
            setUserExist(false);
        }
    };

    const handleNextStep = () => {
        setFormStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setFormStep(prevStep => prevStep - 1);
    };

    let stepComponent;

    switch (formStep) {
        case 1:
            stepComponent = (
                <div className="container mx-auto p-8 items-center flex flex-col justify-center h-full w-full">
                    <h1 className="text-green-100 text-5xl font-sans font-bold m-11">Bienvenido a Choosic</h1>
                    <div className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-content md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="mb-8" >
                            <label className="block text-gray-70 0 text-sm font-bold mb-2" htmlFor="username">
                                Ingresa un nombre de usuario para entrar o deja el espacio en blanco para obtener uno aleatorio
                            </label>
                            <input
                                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="username"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Ingrese su nombre de usuario"

                            />
                        </div>

                        <div className="mb-4">
                            <button onClick={handleEnterUser}
                                className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Ingresar
                            </button>

                        </div>
                    </div>

                </div>
            );
            break;
        case 2:
            stepComponent = (
                <div>
                    {userExists ? (
                        <p>El usuario existe en la base de datos. Mostrar componente para usuario existente.</p>
                    ) : (
                        <p>El usuario no existe en la base de datos. Mostrar componente para nuevo usuario.</p>
                    )}
                </div>
            );
            break;
        default:
            stepComponent = <div>No se ha definido ningún paso.</div>;
    }

    return (
        <div>
            {stepComponent}
            <button disabled={formStep === 1} onClick={handlePrevStep}>Anterior</button>
            <button disabled={formStep === 2} onClick={handleNextStep}>Siguiente</button>
        </div>
    );
}

export default Authsl;
