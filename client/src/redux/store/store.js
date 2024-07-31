import {createStore, applyMiddleware, compose} from "redux"
import {thunk as thunkMiddleware} from "redux-thunk"
import rootReducer from "../reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))
)

