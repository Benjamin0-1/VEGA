import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const localUrl = 'http://localhost:3001';

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('all'); // 'all' or 'disabled'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMesage] = useState('');

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    // desactivar usuario con un click
    const handleDeactivateUser = async (userId) => {
        try {
            const response = await fetch(`${localUrl}/admin/user/disableuserbyid`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user_id: userId })
            });

            if (response.ok) {
                notifySuccess('Usuario desactivado exitosamente'); // test
             //   setSuccessMesage('Usuario desactivado exitosamente');
                setError('');
                setUsers(users => users.map(user => user.id === userId ? { ...user, deleted_at: new Date() } : user));
                setUsers(users => users.filter(user => user.id !== userId)); 
                return;
            }

            const data = await response.json();

            if (data.cannotBanAdmin) {
           //     setError('No puedes desactivar a un admin');
           notifyError('No puedes desactivar a un admin.')
                setSuccessMesage('');
                return;
            }

            if (data.userNotFound) {
             //   setError('Usuario no encontrado');
             notifyError('Usuario no encontrado')
                setSuccessMesage('');
                return;
            }

        } catch (error) {
            console.log(`Error desactivando usuario: ${error}`);
         //   setError('Ha ocurrido un error');
         notifyError('Ha ocurrido un error')
            setSuccessMesage('');
        }
    };

    // activar usuario desactivado con un click.
    const handleActivateUser = async (userId) => {
        try {
            
            //const idsToActivate = users.filter(user => user.deleted_at).map(user => user.id);

            const response = await fetch(`${localUrl}/admin/user/activateuserbyid`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({id: userId})
            });

            if (response.ok) {
           //     setSuccessMesage('Usuario desactivado exitosamente')
           notifySuccess('Usuario desactivado exitosamente') 
                setError('')
                //fetchUsers(view) // change for the .reduce method.
                // .reduce method to clear them from the screen instead of fetching the users again.
                setUsers(users => users.filter(user => user.id !== userId));
                return
            };

            const data = await response.json();

            if (data.cannotBanAdmin) {
             //   setError('No puedes desactivar a un admin')
             notifyError('No puedes desactivar a un admin') 
                setSuccessMesage('')
                return
            };

            if (data.userNotFound) {
              //  setError('usuario no encontrado')
              notifyError('Usuario no encontrado')
                setSuccessMesage('')
                return
            };

        } catch (error) {
            console.log(`error desactivando usuario: ${error}`);
            setError('Ha ocurrido un error')
            setSuccessMesage('');
        }
    };

    const fetchUsers = async (view) => {
        try {
            const url = view === 'all' ? `${localUrl}/admin/user/allusers` : `${localUrl}/admin/user/alldisabledusers`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 403) {
              //  setError('No estas autorizado para realizar esta operacion')
              notifyError('No estas autorizado para realizar esta operacion')
                return
            }

            if (response.status === 404) {
              //  setError('No hay usuarios disponibles')
              notifyError('No hay usuario disponibles')
                return
            }

            const data = await response.json();

            

            if (response.ok) {
                setUsers(data);
                setError('');
            } else {
                setUsers([]);
                setError(data.noUsersFound || data.noDisabledUsersFound || 'Ha ocurrido un error');
            }
        } catch (error) {
            setUsers([]);
         //   setError('Ha ocurrido un error');
         notifyError('Ha ocurrido un error')
        }
    };

    useEffect(() => {
        fetchUsers(view);
    }, [view]);

    

    return (
        <div className="container mx-auto p-4">
            < ToastContainer/>
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 mx-2 ${view === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setView('all')}
                >
                    Ver Todos los Usuarios
                </button>
                <button
                    className={`px-4 py-2 mx-2 ${view === 'disabled' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setView('disabled')}
                >
                    Ver Usuarios Desactivados
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            <div className="grid grid-cols-1 gap-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 bg-white rounded shadow-md">
                        <h2 className="text-lg font-bold">{user.name}</h2>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Last Name: {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
                        {user.deleted_at ? (
                            <>
                                <p className="text-red-500">Disabled</p>
                                <button
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={() => handleActivateUser(user.id)}
                                >
                                    Activate User
                                </button>
                            </>
                        ) : (
                            <button
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleDeactivateUser(user.id)}
                            >
                                Deactivate User
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default ViewUsers;
