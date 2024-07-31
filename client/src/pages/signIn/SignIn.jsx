import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logWhitFirebase, login } from '../../redux/actions/userAction';
import { ToastContainer, toast } from 'react-toastify';

import { UserAuth } from '../../components/context/authContex';


const SignIn = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ user, setUser ] = useState(null)
  const { googleSignIn } = UserAuth();

  useEffect(() => {
    if (user !== null) {
      navigate("/profile");
    }
  }, [ user ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const response = await dispatch(login(email, password))
    if (response.status !== 200) {
      toast.error(response.data)
      setLoading(false)
      return
    }
    setEmail("");
    setPassword("")
    toast.success(`Bienvenido de vuelta, ${response.payload.name}`)
    setTimeout(() => {
      navigate("/profile")
    }, 1000);
    return
  }

  const iniciarSesion = async () => {
    try {
      setLoading(true)
      const loginWithGoogle = await googleSignIn();
      if (loginWithGoogle) {
        const { user, firebaseToken } = loginWithGoogle;
        dispatch(logWhitFirebase({ user, firebaseToken }));
        setUser(user)
        navigate("/profile");
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
        { loading ? (<div className="flex justify-center items-center">
          <div className="loader border-t-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>) :
          (<>
            <form onSubmit={ handleSubmit }>
              <h4 className="text-black text-center text-lg font-bold mb-8 tracking-wide">INICIO DE SESIÓN</h4>

              <div className="mb-3">
                <input
                  type="email"
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                  className="mt-2 p-3 form-control placeholder-opacity-50 text-sm bg-gray-300"
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              {/* <div className="mt-8 text-center text-gray-500 hover:text-black text-sm">
                <a href='/ForgotPassword'>Contraseña Olvidada?</a>
              </div> */}

              <button type="submit" className="border-2 border-green-500 text-black mt-8 p-2 mx-auto block rounded-md
        hover:bg-green-500 hover:text-white
        transform hover:scale-110 transition duration-200">
                INGRESAR
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

export default SignIn;
