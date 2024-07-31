import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localUrl = 'http://localhost:3001';

function DisableUserByEmail() {
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = async () => {
        try {
            if (!userEmail) {
                toast.error('Por favor ingresa un email');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userEmail)) {
                toast.error('Por favor ingresa un email válido');
                return;
            }

            const response = await fetch(`${localUrl}/admin/user/disableuserbyemail`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Usuario con email: ${userEmail} desactivado con éxito`);
                return;
            }

            if (response.status === 403) {
                toast.error('No estás autorizado para realizar esta operación ni desactivar a otro admin');
                return;
            }

            if (response.status === 404) {
                toast.error(`Usuario con email: ${userEmail} no existe`);
                return;
            }

            if (data.userAlreadyDisabled) {
                toast.info('Usuario ya ha sido desactivado');
                return;
            }

            if (data.cannotBanAdmin) {
                toast.error('No puedes desactivar a un usuario admin.');
                return;
            }

            toast.error(`No se pudo desactivar al usuario con email: ${userEmail}`);
        } catch (error) {
            console.error(`Error desactivando usuario por email: ${error}`);
            toast.error('Ha ocurrido un error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <ToastContainer />
            <div className="w-full max-w-xs">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                    User Email
                </label>
                <div className="flex"></div>
                    <input
                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="userEmail"
                        type="email"
                        placeholder="Enter User Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                        onClick={handleSubmit}
                    >
                        Disable User
                    </button>
                </div>
            </div>
     
    );
}

export default DisableUserByEmail;
