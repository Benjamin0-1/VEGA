import { GET_REVIEWS_USER, GET_REVIEWS_TEMPLATE, POST_REVIEW, DELETE_REVIEW, UPDATE_REVIEW } from "../actions/action-types";

const initialReviewsState = {
    reviews: [],
    reviewsUser: [],
    reviewsTemplate: [], 
};

const reviewsReducer = (state = initialReviewsState, action) => {
    switch (action.type) {
        case GET_REVIEWS_USER: {
            return {
                ...state,
                reviewsUser: Array.isArray(action.payload) ? action.payload : []
            };
        }

        case GET_REVIEWS_TEMPLATE: {
            return {
                ...state,
                reviewsTemplate: Array.isArray(action.payload) ? action.payload : []
            };
        }

        case POST_REVIEW: {
            return {
                ...state,
            };
        }

        case DELETE_REVIEW: {
            const { payload: reviewId } = action;
            return {
                ...state,
                reviewsTemplate: Array.isArray(state.reviewsTemplate) ? state.reviewsTemplate.filter(review => review.id !== reviewId) : [],
                reviewsUser: Array.isArray(state.reviewsUser) ? state.reviewsUser.filter(review => review.id !== reviewId) : []
            };
        }

        case UPDATE_REVIEW: {
            const updatedReview = action.payload;
            return {
                ...state,
                reviewsTemplate: Array.isArray(state.reviewsTemplate) ? state.reviewsTemplate.map(review => review.id === updatedReview.id ? updatedReview : review) : [],
                reviewsUser: Array.isArray(state.reviewsUser) ? state.reviewsUser.map(review => review.id === updatedReview.id ? updatedReview : review) : []
            };
        }

        default:
            return state;
    }
};

export default reviewsReducer;
