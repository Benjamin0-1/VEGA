import axios from 'axios';
import {
  GET_ALL_TEMPLATES_REQUEST,
  GET_ALL_TEMPLATES_SUCCESS,
  GET_ALL_TEMPLATES_FAILURE,
  DELETE_TEMPLATE_REQUEST,
  DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE,
  RESTORE_TEMPLATE_REQUEST
} from './action-types';

const localURL = 'http://localhost:3001/admin/templates';

export const getAllTemplates = () => async (dispatch) => {
  dispatch({ type: GET_ALL_TEMPLATES_REQUEST });
  try {
    const { data } = await axios.get(localURL);
    dispatch({
      type: GET_ALL_TEMPLATES_SUCCESS,
      payload: data,
    });
    console.log('Plantillas cargadas exitosamente:', data);
  } catch (error) {
    dispatch({
      type: GET_ALL_TEMPLATES_FAILURE,
      payload: error.response.data,
    });
    console.error('Error al cargar las plantillas:', error);
  }
};

export const deleteTemplate = (templateId) => async (dispatch) => {
  dispatch({ type: DELETE_TEMPLATE_REQUEST });
  try {
    const { data } = await axios.delete(`${localURL}/${templateId}`);
    dispatch({
      type: DELETE_TEMPLATE_SUCCESS,
      payload: data,
    });
    console.log('Plantilla eliminada exitosamente');
  } catch (error) {
    dispatch({
      type: DELETE_TEMPLATE_FAILURE,
      payload: error.response.data,
    });
    console.error('Error al eliminar la plantilla:', error);
  }
};


export const createTemplate = (templateData) => {
    return async (dispatch) => {
      try {
        await axios.post("http://localhost:3001/admin/templates/create", templateData);
        
      } catch (error) {
        console.log(error.message);
      }
    };
};


// added
export const restoreTemplate = (templateId) => { 
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:3001/admin/templates/restore/${templateId}`);
    } catch (error) {
      console.log(error.message);
    }
  };
};

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


