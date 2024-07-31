import React, { useState, useEffect } from 'react';

const localUrl = 'http://localhost:3001';

function CreateAdminUser() {
   
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // loading state
        try {
        
            const response = await fetch(`${localUrl}/admin/user/createadminuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 403) {
                setError('No estas autorizado para realizar esta operacion')
                setSuccessMessage('');
                return
            }

            const data = await response.json();

            if (data.missingData) {
                setError('Faltan datos')
                setSuccessMessage('')
                return
            }

            if (data.invalidEmailFormat) {
                setError('formato de email invalido.')
                setSuccessMessage('')
                return
            };

            if (data.emailAlreadyInUse) {
                setError('email ya esta en uso.')
                setSuccessMessage('')
                return
            }

            setSuccessMessage('Usuario admin creado exitosamente')
            setError('')
            
    
        } catch (error) {
            console.log(`error creando usuario admin: ${error}`);
            setError('ha ocurrido un error') 
            setSuccessMessage('') 
        };
    };

    // JSX
return (
    <div className="container mx-auto max-w-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Usuario Administrador</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                {loading ? 'Creando...' : 'Crear Usuario'}
            </button>
        </form>
    </div>
);

};




export default CreateAdminUser;