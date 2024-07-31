import {
    GET_TEMPLATE_ID,
    GET_TEMPLATE_BY_SEARCH,
    GET_TEMPLATES,
    GET_TECHNOLOGIES,
    GET_CATEGORIES,
    GET_FILTERED_TEMPLATES,
    SEARCH_NOT_FOUND,
    
  } from "../actions/action-types";
const initialTemplatesState = {

    allTemplates: [],
    detailTemplate: [],
    detailTemplateCopy: [],
    templates: [],
    myFavorites: [],
    
    filters: {
      technologies: [],
      categories: []
    },
    totalPages: 1
};

const templatesReducer = (state = initialTemplatesState, action) => {
    switch (action.type) {
      case GET_TEMPLATES:
        return {
          ...state,
          templates: action.payload,
          allTemplates: action.payload,

        };
      case GET_FILTERED_TEMPLATES:
        return {
          ...state,
          templates: action.payload.templates,
          totalPages: action.payload.totalPages
        };
      case GET_TEMPLATE_ID:
        return {
          ...state,
          detailTemplate: action.payload,
          detailTemplateCopy: action.payload
          
        };
        case GET_TEMPLATE_BY_SEARCH:
          return {
            ...state,
            templates: action.payload,
          };
        case SEARCH_NOT_FOUND:
          return {
            ...state,
            templates: [],
            searchError: "No se encontraron coincidencias para su búsqueda.",
          };

      case GET_TECHNOLOGIES:
        return {
          ...state,
          filters: {...state.filters, technologies: action.payload},
        };
      case GET_CATEGORIES:
        return {
          ...state,
          filters: {...state.filters, categories: action.payload},
        };

        
      default:
        return {
          ...state,
        };
    }
  };
  
  export default templatesReducer;