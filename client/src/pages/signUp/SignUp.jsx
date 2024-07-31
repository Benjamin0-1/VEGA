import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'tailwindcss/tailwind.css';
import { logWhitFirebase, signup } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import { UserAuth } from '../../components/context/authContex';

const SignUp = () => {
  const [ name, setName ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
  const userInfo = {}

  useEffect(() => {
    userInfo.name = name
    userInfo.lastname = lastname
    userInfo.email = email
    userInfo.password = password
    userInfo.confirmPassword = confirmPassword
  }, [ name, email, password, confirmPassword, lastname ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password != userInfo.confirmPassword) return toast.error("Las contraseñas no coinciden")
    setLoading(true)
    await dispatch(signup(userInfo))
      .then(res => {
        if (res.status === 201) {
          toast.success(res.data)
          setName("");
          setLastname("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => {
            navigate("/SignIn")
          }, 2000);
          setLoading(false);
          return
        } else return toast.error(res.data);
      })
  };

  const iniciarSesion = async () => {
    try {
      setLoading(true)
      const loginWithGoogle = await googleSignIn();
      if (loginWithGoogle) {
        const { user, firebaseToken } = loginWithGoogle;
        dispatch(logWhitFirebase({ user, firebaseToken }));
        navigate("/home");
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <div title="Register - Ecommer App" className="flex justify-center items-center h-screen bg-gray-200">
      <ToastContainer position="bottom-right" />
      <div className="border-2 border-green-500 bg-white p-12 rounded-lg shadow-lg">
        { loading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) :
          (
            <>
              <form onSubmit={ handleSubmit }>
                <h4 className="text-black text-center text-lg font-bold mb-8 tracking-wide">REGISTRARSE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                    placeholder="Ingresa tu nombre"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={ lastname }
                    onChange={ (e) => setLastname(e.target.value) }
                    className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                    placeholder="Ingresa tu apellido"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                    placeholder="Ingresa tu email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                    placeholder="Ingresa la contraseña"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={ confirmPassword }
                    onChange={ (e) => setConfirmPassword(e.target.value) }
                    className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                    placeholder="Confirma la contraseña"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 border-green-500 text-black mt-8 p-2 mx-auto block rounded-md hover:bg-green-500 hover:text-white transform hover:scale-110 transition duration-200"
                >
                  REGISTRAR
                </button>
              </form>
              <p className='text-sm mt-4 text-gray-500'>Ó ingresa con una cuenta externa</p>
              <button onClick={ () => iniciarSesion() } className="border-2 border-green-500 text-black mt-4 p-2 mx-auto block rounded-md
        hover:bg-green-500 hover:text-white
        transform hover:scale-110 transition duration-200">
                <FaGoogle /></button>
            </>
          ) }
      </div>
    </div>
  );
};

export default SignUp;
