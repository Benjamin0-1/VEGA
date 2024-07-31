import { useState } from "react";
import { Rating, Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
import UpdateReviewForm from "./UpdateReviewForm";

const UserReviewCard = ({ id, idTemplate, content, rating, date, onDelete }) => {
    const [update, setUpdate] = useState(false);

    const updateReview = () => {
        setUpdate(!update);
    };

    const handleClose = () => {
        setUpdate(false);
    };

    return (
        <div className="">
            <div className="max-w-xs rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white p-4">
                <Link to={`/detail/${idTemplate}`}>
                    <div className="mb-4">
                        <span className="font-semibold text-lg">Tu opinión: </span>
                    </div>
                    <div className="mb-4">
                        <Rating value={rating} readOnly />
                    </div>
                    <div className="text-gray-800 mb-4">{content}</div>
                    <div className="text-gray-600 text-sm">{date}</div>
                </Link>

                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={() => onDelete(id)}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500"
                    >
                        Eliminar
                    </button>

                    <button
                        onClick={updateReview}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500"
                    >
                        {update ? "Cancelar" : "Editar"}
                    </button>
                </div>

                <Modal
                    open={update}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <UpdateReviewForm review={{ id, content, rating }} handleClose={handleClose} />
                    </Box>
                </Modal>
            </div>
            <br />
        </div>
    );
};

export default UserReviewCard;


