import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
// import toast from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    // const navigate = useNavigate();
  
    // // Form  function
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const res = await axios.post("/api/v1/auth/forgot-password", {
    //       email,
    //       newPassword,
    //       answer
    //     });
    //     if (res && res.data.success) {
    //       toast.success(res.data && res.data.message);

    //       navigate("/login");
    //     } else {
    //       toast.error(res.data.message);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error("Something went wrong");
    //   }
    // };

  return (
                 <div title="Register - Ecommer App" className="flex justify-center items-center h-screen bg-gray-200">
                 <div className="border-2 border-green-500 bg-white p-12 rounded-lg shadow-lg">
        <form onSubmit>
          <h4 className="text-black text-center text-lg font-bold mb-8 tracking-wide">RECUPERAR CONTRAÑAS</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-2 p-3 form-control placeholder-opacity-50 text-sm"
              id="exampleInputEmail1"
              placeholder="Enter Your Favorite Sport..."
              required
            />
          </div>

          <button type="submit" className="border-2 border-green-500 text-black mt-8 p-2 mx-auto block rounded-md
        hover:bg-green-500 hover:text-white
        transform hover:scale-110 transition duration-200">
            LOGIN
          </button>
        </form>
      </div>
      </div>
  )
}

export default ForgotPassword;