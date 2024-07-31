import axios from "axios";
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  REMOVE_FAV,
  ADD_FAV,
  VIEW_FAVS,
} from "./action-types";
import { toast } from "react-toastify";


const localURL = "http://localhost:3001/user";
const URL = "";

export function login(email, password) {
  return async (dispatch) => {
    try {
      const { data, status } = await axios.post(`${URL || localURL}/login`, {
        email,
        password,
      });

      if (status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userInfo));
      }
      return dispatch({
        type: LOGIN,
        payload: data.userInfo,
        status: status,
        favorites: data.userInfo.Favorites
      });
    } catch (error) {

      return error.response;
    }
  };
}


export function logWhitFirebase(userInfo) {
  return async (dispatch) => {
    try {
      console.log(userInfo);
      const { data } = await axios.post(`${URL || localURL}/login`, {
        firebaseToken: userInfo.user.accessToken
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userInfo));
      return dispatch({
        type: LOGIN,
        payload: data.userInfo,
        favorites: data.userInfo.Favorites
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function signup(userForm) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${localURL}/register`, userForm);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}


export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROFILE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${localURL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);
      return dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data, favorites: data.Favorites });
    } catch (error) {
      return dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    }
  };
};


export const updateProfile = (updatedProfileData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${localURL}/profile`, updatedProfileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
  };
};

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({ type: LOGOUT });
  };
}

export const changePassword = (currentPassword, newPassword) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`${localURL}/change-password`, { currentPassword, newPassword }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: res.data.message
    });
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.message === 'Contraseña actual Incorrecta') {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: 'Contraseña actual Incorrecta'
      });
    } else {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: error.response.data.message || 'Error interno del servidor'
      });
    }
    throw error;
  }

};
export const addFav = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${URL || localURL}/favorite`, { templateId: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return dispatch({
        type: ADD_FAV,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return toast.error("Debes iniciar sesión para añadir este producto a favoritos")
      }
      return error.response
    }
  }
};
export const removeFav = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${URL || localURL}/favorite`,
        {
          data: { templateId: id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return dispatch({
        type: REMOVE_FAV,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
};

export const viewFavs = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${URL || localURL}/favorite`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      return dispatch({
        type: VIEW_FAVS,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return toast.error("Debes iniciar sesión para añadir este producto a favoritos")
      }
      return error.response
    }
  }
};