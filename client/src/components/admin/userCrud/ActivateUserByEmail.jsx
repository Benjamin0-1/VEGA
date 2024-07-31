import React, { useState, useEffect } from 'react';

const localUrl = 'http://localhost:3001';

function ActivateUserByEmail() {
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleActivate = async () => {
        try {
            
            if (!userEmail) {
                setError('debe incluir un email')
                setSuccessMessage('')
                return
            };

            const response = await fetch(`${localUrl}/admin/user/activateuserbyemail`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({email: userEmail})
            });

            if (response.status === 403) {
                setError('no tienes permiso para realizar esta operacion')
                setSuccessMessage('')
                return
            };

            if (response.status === 201) {
                setSuccessMessage(`usuario con email: ${userEmail} activado exitosamente`)
                setError('');
                return
            };
            
            const data = await response.json();

            if (data.userNotFound) {
                setError('usuario no encontrado')
                setSuccessMessage('')
                return
            };

            if (data.userAlreadyEnabled) {
                setError('esta usuario ya esta activado')
                setSuccessMessage('')
                return
            };
            


        } catch (error) {
            console.log(`error activando usuario por email: ${error}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                    Email del Usuario
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="userEmail"
                    type="email"
                    placeholder="Ingrese el email del usuario"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleActivate}
                >
                    Activar Usuario
                </button>
                {error && (
                    <div className="mt-4 p-4 bg-red-200 text-red-800 rounded">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );


};


export default ActivateUserByEmail;
