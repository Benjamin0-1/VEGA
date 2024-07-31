import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createReviewTemplate } from "../../redux/actions/reviewsAction";
import { validate } from "./validation";
import { ToastContainer, toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';

const ReviewForm = ({ templateId }) => {
  
    const dispatch = useDispatch();
    const [state, setState] = useState({ rating: '', content: '', idTemplate: templateId });
    const [errors, setErrors] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: name === 'rating' ? parseInt(value) : value });
        setErrors(validate({ ...state, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReviewTemplate(state))
            .then(() => {
                toast.success('Opinión enviada con éxito'); 
                setTimeout(() => {
                    window.location.reload(); 
                }, 2000);
            })
            
            .catch((error) => {
                toast.error('Error al enviar la opinión');
            });
    };

    const handleEmojiClick = (emojiObject) => {
        setState({ ...state, content: state.content + emojiObject.emoji });
        setShowEmojiPicker(false);
    };

    return (
        <div className="flex flex-col items-center">
            <ToastContainer />
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Dejar una opinión</h2>
                <div className="mb-4">
                    <Rating
                        name="rating"
                        value={state.rating}
                        onChange={handleChange}
                        precision={1}
                    />
                    {errors.rating && <p className="text-red-500 text-xs italic">{errors.rating}</p>}
                </div>
                <div className="mb-4">
                    <TextField
                        id="content"
                        name="content"
                        label="Escribe tu opinión"
                        value={state.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        className="mb-2"
                    />
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1"
                    >
                        😃
                    </button>
                    
                    {showEmojiPicker && (
                        <div className="absolute z-50 mt-2">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                    {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
                </div>
                <div className="flex justify-between">
                    <button
                    
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;