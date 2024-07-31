import { ADD_TO_CART, DELETE_TO_CART, NOTFOUND_CART, VIEW_CART } from "../actions/action-types";

const initialCartState = {
    InCart: {},
    error: "",
}

const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case VIEW_CART:
            return {
                ...state,
                InCart: action.payload,
            }
        case NOTFOUND_CART:
            return {
                ...state,
                error: action.payload
            }
        case ADD_TO_CART:
            return {
                ...state,
                InCart: action.payload
            }
        case DELETE_TO_CART:
            return {
                ...state,
                InCart: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;