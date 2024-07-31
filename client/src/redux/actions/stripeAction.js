import axios from "axios";
const localURL = "http://localhost:3001/payment"
const URL = ""

export function checkoutSession() {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios.post(`${URL || localURL}/checkout-session`, {}, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (data.status === 201) {
                localStorage.setItem("orderId", data.order)
                window.open(data.session_url, '_self');
            }
            return dispatch({});
        } catch (error) {
            console.log(error);
        }
    }
}

export function checkoutSuccess() {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        const order = localStorage.getItem("orderId")
        try {
            const { data } = await axios.post(`${URL || localURL}/checkout-success?order_id=${order}`, {}, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (data.status === 201) {
                window.open(data.session_url, '_blank');
                localStorage.removeItem("orderId")
            }
            return dispatch({});
        } catch (error) {
            console.log(error);
        }
    }
}

export function checkoutCancel() {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        const order = localStorage.getItem("orderId")
        try {
            const { data } = await axios.post(`${URL || localURL}/checkout-cancel?order_id=${order}`, {}, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (data.status === 200) {
                localStorage.removeItem("orderId");
            }
            return dispatch({});
        } catch (error) {
            console.log(error);
        }
    }
}