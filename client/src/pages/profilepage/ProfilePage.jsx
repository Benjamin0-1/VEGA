import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../../components/profile/Profile";
import Billing from "../../components/billing/Billing";
import Security from "../../components/security/Security";
import UserReviews from "../../components/reviews/UserReviews";
import { useSelector } from "react-redux";

const ProfilePage = ({ fetchProfile }) => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("Profile");

  // Redireccionar a "Profile" al cargar la página
  useEffect(() => {
    setComponenteSeleccionado("Profile");
  }, []);

  const handleClick = (componente) => {
    setComponenteSeleccionado(componente);
  };

  return (
    <div className="">
      <nav className="flex items-center my-3 mx-auto max-w-6xl">
        <button
          className={`flex-1 text-center font-inter font-semibold text-gray-800 ${
            componenteSeleccionado === "Profile" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleClick("Profile")}
        >
          PERFIL
        </button>

        <span className="border-l border-gray-300 h-10"></span>
        <button
          className={`flex-1 text-center font-inter font-semibold text-gray-800 ${
            componenteSeleccionado === "Billing" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleClick("Billing")}
        >
          HISTORIAL DE PAGOS
        </button>
        <span className="border-l border-gray-300 h-10"></span>
        <button
          className={`flex-1 text-center font-inter font-semibold text-gray-800 ${
            componenteSeleccionado === "Security" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleClick("Security")}
        >
          SEGURIDAD
        </button>
        <span className="border-l border-gray-300 h-10"></span>
        <button
          className={`flex-1 text-center font-inter font-semibold text-gray-800 ${
            componenteSeleccionado === "Reviews" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleClick("Reviews")}
        >
          RESEÑAS
        </button>
      </nav>
      <hr className="my-4 mt-1 border-b-1 border-gray-300" />

      {componenteSeleccionado === "Profile" && <Profile />}
      {componenteSeleccionado === "Billing" && <Billing />}
      {componenteSeleccionado === "Security" && <Security />}
      {componenteSeleccionado === "Reviews" && <div id="reviews"><UserReviews /></div>}
    </div>
  );
};

export default ProfilePage;
