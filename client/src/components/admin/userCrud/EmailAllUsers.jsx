import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const localUrl = 'http://localhost:3001';

function EmailAllUsers() {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMesage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // los correos tardan.
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);


    const handleEmailSending = async () => {
        setIsLoading(true)

        try {
            
            const response = await fetch(`${localUrl}/admin/user/email-all-users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({subject, message}) // <-- subject and message
            });

            if (response.ok) {
            //    setSuccessMesage('Emails enviados exitosamente')
            notifySuccess("Emails enviados exitosamente")
                setIsLoading(false);
                setError('');
                // limpiar los inputs.
                setSubject('');
                setMessage('');
                return
            };

            const data = await response.json();

            if (data.missingData) {
             //   setError('Faltan datos.')
             notifyError('Faltan datos')
                setSuccessMesage('')
                setIsLoading(false)
                return
            };

            if (data.noEmailsFound) {
             //   setError('No se han encontrado correos.')
             notifyError('No se han encontrado emails')
                setSuccessMesage('')
                setIsLoading(false)
                return
            };

        } catch (error) {
            console.log(`error enviando correos: ${error}`);
            notifyError('Ha ocurrido un error')
        } finally {
            setIsLoading(false)
        }
    };

    // JSX
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            < ToastContainer/>
            <h1 className="text-2xl font-bold mb-4">Enviar Email a Todos los Usuarios</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleEmailSending(); }}>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Asunto:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                >
                    {isLoading ? 'Enviando...' : 'Enviar Email'}
                </button>
            </form>
         
        </div>
    );
};

export default EmailAllUsers;
