import React, { useEffect, useState } from 'react';
import logo from "../../../assets/images/VEGA.svg";
import { AiFillFile, AiOutlineUser, AiOutlineLogout, AiOutlineDown, AiOutlineHome } from 'react-icons/ai';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [showTemplatesMenu, setShowTemplatesMenu] = useState(false);
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const navigate = useNavigate();

  const toggleTemplatesMenu = () => setShowTemplatesMenu(!showTemplatesMenu);
  const toggleUsersMenu = () => setShowUsersMenu(!showUsersMenu);

  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/user/check-admin', { 
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.isAdmin) {
          return;
        } else {
          navigate('/home');
        }

      } catch (error) {
        console.log(`Error fetching user info: ${error}`);
      }
    };

    checkAdmin();
  }, [navigate]);



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/home');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  // non authenticated users can't access the dashboard, in the future, it will also check they are admins.
  // create a backend route to return if a user is an admin or not.
  // EXTRA: 
    // also if a user is admin, a new button will show up to go directly to the dashboard, or even better, if an 
    // admin logs in, they will be automatically redirected to the /dashboard.
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="grid grid-rows-6 h-screen">
      <div className="row-span-1 bg-gray-800 text-white flex items-center justify-between p-2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mt-1">
            <img
              src={logo}
              alt="logo ReactiveMind"
              className="w-[52px] h-[52px] transform hover:rotate-90 transition-transform duration-300 ease-in-out"
            />
            <div className="text-[24px] font-light text-[#06B6D4] tracking-wider mb-1">
              VEGA
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-5 grid grid-cols-12">
        <div className="col-span-2 bg-gray-700 text-white flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
              onClick={toggleTemplatesMenu}
            >
              <AiFillFile className="text-xl" />
              <span>Plantillas</span>
              <AiOutlineDown className={`ml-auto transition-transform ${showTemplatesMenu ? 'rotate-180' : ''}`} />
            </div>
            {showTemplatesMenu && (
              <div className="flex flex-col pl-6 space-y-2">
                <Link to="/dashboard/seeAllTemplates" className="hover:text-gray-300">Ver todas las plantillas</Link>
                <Link to="/dashboard/createTemplate" className="hover:text-gray-300">Crear Plantilla</Link>
                <Link to="/dashboard/metricsTemplates" className="hover:text-gray-300">Metricas de plantillas</Link>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
              onClick={toggleUsersMenu}
            >
              <AiOutlineUser className="text-xl" />
              <span>Usuarios</span>
              <AiOutlineDown className={`ml-auto transition-transform ${showUsersMenu ? 'rotate-180' : ''}`} />
            </div>
            {showUsersMenu && (
              <div className="flex flex-col pl-6 space-y-2">
                <Link to="/dashboard/allusers" className="hover:text-gray-300">Ver todos los usuarios</Link>
                <Link to="/dashboard/createadmin" className="hover:text-gray-300">Crear un administrador</Link>
                <Link to="/dashboard/emailallusers" className="hover:text-gray-300">Enviar mail a todos los usuarios</Link>
                <Link to="/dashboard/disableuserbyemail" className="hover:text-gray-300">Desactivar usuarios</Link>
              </div>
            )}
          </div>
          {/* <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded mt-auto"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-xl" />
            <span>Cerrar Sesión</span>
          </div> */}
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
            onClick={handleGoHome}
          >
            <AiOutlineHome className="text-xl" />
            <span>Ir a Home</span>
          </div>
        </div>
        <div className="col-span-10 p-4 overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
