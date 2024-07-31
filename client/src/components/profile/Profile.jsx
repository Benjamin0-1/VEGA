import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "../../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user, loading, error, fetchProfile, updateProfile }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (user) {
      setUsername(user.username || null);
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
      setProfilePictureUrl(user.profilePictureUrl); 
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePictureUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    
    updateProfile(formData)
      .then(() => {
        toast.success("Perfil actualizado exitosamente");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Error al actualizar el perfil");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-12 mx-auto max-w-6xl ml-[300px]">
        <div className="bg-zinc-200 w-[700px] ml-[-114px]">
          <div className="bg-zinc-50">
            <div className="bg-zinc-50 text-lg font-semibold p-4 mb-6">
            Detalles de la Cuenta
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block mb-1" htmlFor="inputUsername">
                Nombre de usuario (cómo aparecerá tu nombre a otros usuarios en el sitio)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="inputUsername">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="inputUsername">
                  Apellido
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="inputEmailAddress">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                type="submit"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.profile.user,
  loading: state.user.profile.loading,
  error: state.user.profile.error,
});

export default connect(mapStateToProps, { fetchProfile, updateProfile })(Profile);
