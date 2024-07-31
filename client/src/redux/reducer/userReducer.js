import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  ADD_FAV,
  REMOVE_FAV,
} from "../actions/action-types";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialUserState = {
  loggedIn: !!token,
  userInfo: user ? user : {},
  isAdmin: false,
  user: {},
  userDetailId: {},
  myFavorites: [],
  profile: {
    user: {},
    loading: false,
    error: null
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        userInfo: action.payload,
        myFavorites: action.favorites
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userInfo: {},
        isAdmin: false,
        myFavorites: [],
        profile: {
          user: {},
          loading: false,
          error: null
        }
      };
    case SIGNUP:
      return state;
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        myFavorites: action.favorites,
        profile: {
          user: action.payload,
          loading: false,
          error: null
        }
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: action.payload,
          loading: false,
          error: null
        }
      };
    case FETCH_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.payload
        }
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordSuccessMessage: action.payload,
        changePasswordErrorMessage: null
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordErrorMessage: action.payload,
        changePasswordSuccessMessage: null
      };
    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
      };
    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
