import axios from 'axios';
import { GET_REVIEWS_USER, GET_REVIEWS_TEMPLATE, DELETE_REVIEW, UPDATE_REVIEW } from './action-types';

const localURL = "http://localhost:3001/reviews"
const URL = ""

export const getReviewsUser = () => {
    return async (dispatch)=>{
        const TOKEN = localStorage.getItem('token')
        try {
            const response = await axios.get(`${URL || localURL}/`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            })
            
        dispatch({
            type: GET_REVIEWS_USER,
            payload: response.data.reviews
        })
        } catch (error) {
                return error.response
    }

}}

export const getReviewsTemplate = (templateId)=>{
    return async (dispatch)=>{
        
        try {
            const {data} = await axios.get(`${URL || localURL}/${templateId}`)
            console.log('Reviews obtenidas:', data); // Agrega un console.log para ver las reviews obtenidas
           
            return dispatch({
                type: GET_REVIEWS_TEMPLATE,
                payload: data
            })
        } catch (error) {
            return error.response
        }
    }
}

export function createReviewTemplate(obj) {
    return async  ()=> {
        const TOKEN = localStorage.getItem('token')
            const { data } = await axios.post(`${URL || localURL}`,obj , {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            console.log(data) 
            

    }
}


export const deleteReview = (reviewId) => {
    return async (dispatch) => {
        const TOKEN = localStorage.getItem('token')
        try {
            await axios.delete(`${URL || localURL}/${reviewId}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            dispatch({
                type: DELETE_REVIEW,
                payload: reviewId
            });
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    };
};

export const updateReview = (id, data) => {
    const TOKEN = localStorage.getItem('token')
    return async (dispatch) => {
        try {
            const response = await axios.put(`${URL || localURL}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            dispatch({
                type: UPDATE_REVIEW,
                payload: response.data
            });
            console.log(response.data)
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    };
};

