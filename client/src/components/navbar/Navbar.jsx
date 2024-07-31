import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemplateBySearch } from "../../redux/actions/templatesAction";
import { logout } from "../../redux/actions/userAction";
import Searchbar from "../searchbar/Searchbar";
import logo from "../../assets/images/VEGA.svg";
import bag from "../../assets/images/VEGA_bag.svg";
import { auth } from "../../firebase.config.jsx";
import { viewCart } from "../../redux/actions/cartActions.js";
import defaultImage from "../../assets/images/userDefault.jfif";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.userInfo);

  const [searchString, setSearchString] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  useEffect(() => {
    dispatch(viewCart());
    setShowProfileMenu(false)
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("profileMenu");
      if (menu && !menu.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchString) {
      dispatch(getTemplateBySearch(searchString));
      // No cambiar showProfileMenu aquí
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="bg-white p-4 border-b-2 border-inherit shadow">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y+15 mt-5">
                <Link to="/Home">
                  <img
                    src={logo}
                    alt="logo ReactiveMind"
                    className="w-[52px] h-[52px] transform hover:rotate-90 transition-transform duration-300 ease-in-out"
                  />
                </Link>
                <div className="text-[24px] font-light text-[#06B6D4] tracking-wider mb-3">
                  VEGA
                </div>
              </div>
            </div>
            <Link
              to="/About"
              className="text-[16px] font-bold text-[#06B6D4] tracking-wider ml-9 mt-4 
              font-inter pb-2 transition-colors duration-300 hover:font-black  hover:text-green-500 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-green-500 before:transition-all before:duration-300 hover:before:w-full"
            >
              SOBRE NOSOTROS
            </Link>
          </div>
          <Searchbar handleChange={handleChange} handleSearch={handleSearch} />
          {isAuthenticated ? (
            <div className="hidden md:block relative">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="bg-slate-800 border-[1px] border-slate-800 font-inter text-gray-800 px-3 py-2 rounded-md text-sm font-medium mr-8 flex items-center"
                  >
                    <span className="mr-2 sm:mr-4 sm:ml-0 text-white">
                      Hola, {user.name}
                    </span>
                    <svg
                      className="ml-2"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9.5L10.3301 4.67957C10.6351 4.29083 10.5546 3.72205 10.1659 3.41705C9.77714 3.11206 9.20836 3.1926 8.90337 3.58134L6 7.05951L3.09663 3.58134C2.79163 3.1926 2.22285 3.11206 1.8341 3.41705C1.44536 3.72205 1.36482 4.29083 1.66982 4.67957L6 9.5Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  {showProfileMenu && (
                    <div id="profileMenu" className="absolute right-6 mt-2 w-64 bg-white rounded-md border border-gray-200 shadow-lg z-50">
                      <div className="flex items-center p-4">
                        <img
                          src={user.imagen ? user.imagen : defaultImage}
                          alt="Foto de perfil"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {user.name} {user.lastname}
                          </p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/favorites"
                        className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mis Favoritos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>

                  )}
                </div>
                <Link to="/favorites">
                  <svg
                    className="mr-8 transform origin-center hover:fill-green-500 hover:animate-rotate-scale cursor-pointer"
                    viewBox="0 0 22 20"
                    width="26"
                    height="26"
                    fill="#06B6D4"
                  >
                    <path d="M1.795 10.556a6.195 6.195 0 018.782-8.742l.423.424.424-.424a6.193 6.193 0 018.76 0 6.197 6.197 0 01.02 8.742l-8.404 8.9a1.1 1.1 0 01-1.6 0zM11 17.098l7.607-8.055.023-.022a3.999 3.999 0 000-5.651 3.997 3.997 0 00-5.652 0l-1.2 1.201a1.1 1.1 0 01-1.556 0L9.021 3.37A3.993 3.993 0 002.2 6.195a3.994 3.994 0 001.19 2.848z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/SignIn">
                  <button className="bg-white border-[2px] border-green-500 font-inter text-green-500 hover:scale-110 hover:border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-8">
                    INGRESAR
                  </button>
                </Link>
                <Link to="/SignUp">
                  <button className="bg-white border-[2px] border-[#06B6D4] font-inter text-[#06B6D4] hover:scale-110 hover:border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-8">
                    UNETE
                  </button>
                </Link>
              </div>
            </div>
          )}
          <Link to="/cartPage">
            <img
              src={bag}
              alt="logo ReactiveMind"
              className="w-[40px] h-[40px] mr-12 transform hover:scale-125 transition-transform duration-300 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
