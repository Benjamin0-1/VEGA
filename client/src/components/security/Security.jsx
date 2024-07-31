import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from "../../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Security = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (name === 'confirmpassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!newPassword || !confirmPassword) {
        toast.warning('Por favor complete todos los campos.');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('La nueva contraseña y la confirmación no coinciden.');
        return;
      }

      if (!isFirebaseUser && !currentPassword) {
        toast.warning('Por favor ingrese la contraseña actual.');
        return;
      }

      if (isFirebaseUser) {
        await dispatch(changePassword(null, newPassword));
      } else {
        await dispatch(changePassword(currentPassword, newPassword));
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast.success('Contraseña actualizada exitosamente.');

    } catch (error) {
      console.error('Error cambiando la contraseña:', error);
      if (error.message === 'Contraseña actual Incorrecta') {
        toast.error('La contraseña actual es incorrecta.');
      } else {
        toast.error('Fallo al cambiar la contraseña.');
      }
    }
  };

  return (
    <div className="">
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
              <label className="block mb-1" htmlFor="confirmpassword">
                Confirmar Nueva Contraseña
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={confirmPassword}
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
