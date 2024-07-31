import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserReviewCard from "./UserReviewCard";
import { getReviewsUser, deleteReview } from "../../redux/actions/reviewsAction";

const UserReviews = () => {
    const dispatch = useDispatch();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    const reviews = useSelector((state) => state.reviews.reviewsUser) || [];

    useEffect(() => {
        dispatch(getReviewsUser());
    }, [dispatch]);

    const openDeleteModal = (idReview) => {
        setSelectedReviewId(idReview);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedReviewId(null);
    };

    const confirmDelete = () => {
        dispatch(deleteReview(selectedReviewId));
        closeDeleteModal();
    };


    return (
        <div>
           
            <div className="bg-white shadow-md mt-12 max-w-6xl mx-auto">
              
                <div className="bg-zinc-50 text-lg font-inter font-semibold p-4">
                    <h2>Mis opiniones</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
                    {Array.isArray(reviews) && reviews.map((e, index) => (
                        <UserReviewCard
                            key={index}
                            id={e.id}
                            idTemplate={e?.idTemplate}
                            content={e?.content}
                            rating={e?.rating}
                            date={e?.date}
                            onDelete={openDeleteModal}
                        />
                    ))}
                </div>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <button
                            onClick={closeDeleteModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                        >
                            X
                        </button>
                        <h2>¿Estás seguro de que deseas eliminar esta reseña?</h2>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeDeleteModal}
                                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviews;