import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../redux/actions/reviewsAction";
import { Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const UpdateReviewForm = ({ review, handleClose }) => {
    const [formData, setFormData] = useState({
        rating: review.rating,
        content: review.content
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.content.length < 15) {
            toast.error('El contenido no puede ser menor a 15 caracteres');
            return;
        }

        dispatch(updateReview(review.id, formData))
            .then(() => {
                toast.success('Opinión actualizada con éxito');
                setTimeout(() => {
                    handleClose(); // Cerrar el modal después de la actualización
                    navigate('/profile', { replace: true });
                    window.location.hash = '#reviews'; // Esto hará que la página se desplace a la sección de reseñas
                }, 1000);
            })
            .catch((error) => {
                toast.error('Error al actualizar la opinión');
            });
    };

    return (
        <div className="flex flex-col items-center">
            <ToastContainer />
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Actualizar opinión</h2>
                <div className="mb-4">
                    <Rating
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        precision={1}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        id="content"
                        name="content"
                        label="Escribe tu opinión"
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        className="mb-2"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReviewForm;
