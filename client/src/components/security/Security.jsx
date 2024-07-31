import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isFirebaseUser, setIsFirebaseUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.firebaseUid) {
      setIsFirebaseUser(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentpassword') setCurrentPassword(value);
    if (name === 'newpassword') setNewPassword(value);
    if (name === 'confirmnewpassword') setConfirmNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!newPassword || !confirmNewPassword) {
        toast.warning('Por favor complete todos los campos.');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        toast.error('La nueva contraseña y la confirmación no coinciden.');
        return;
      }

      if (!isFirebaseUser && !currentPassword) {
        toast.warning('Por favor ingrese la contraseña actual.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No se encontró el token de autenticación.');
        return;
      }

      const endpoint = 'http://localhost:3001/user/change-password';
      const requestBody = isFirebaseUser
        ? { newPassword }
        : { currentPassword, newPassword, confirmNewPassword };

      const response = await axios.post(endpoint, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Contraseña actualizada exitosamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

    } catch (error) {
      console.error('Error cambiando la contraseña:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Fallo al cambiar la contraseña.');
      } else {
        toast.error('Error interno del servidor.');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-zinc-200 w-[700px] mx-auto mt-12">
        <div className="bg-zinc-50">
          <div className="bg-zinc-50 text-lg font-semibold p-4 mb-6">
            Cambiar Contraseña
          </div>
        </div>
        <div>
          <form className="p-4" onSubmit={handleSubmit}>
            {!isFirebaseUser && (
              <div className="mb-4">
                <label className="block mb-1" htmlFor="currentpassword">
                  Contraseña Actual
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  type="password"
                  id="currentpassword"
                  name="currentpassword"
                  value={currentPassword}
                  onChange={handleChange}
                  placeholder="Ingrese la contraseña actual"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-1" htmlFor="newpassword">
                Nueva Contraseña
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="password"
                id="newpassword"
                name="newpassword"
                value={newPassword}
                onChange={handleChange}
                placeholder="Ingrese la nueva contraseña"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="confirmnewpassword">
                Confirmar Nueva Contraseña
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="password"
                id="confirmnewpassword"
                name="confirmnewpassword"
                value={confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirme la nueva contraseña"
              />
            </div>

            <button
              className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800"
              type="submit"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
