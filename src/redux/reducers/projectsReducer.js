import {
  FETCHING_PROJECTS,
  FETCH_PROJECTS_FULFILLED,
  FETCH_PROJECTS_REJECTED,
  SET_CURRENT_PROJECT
} from "../actions/projectsActions";
import { LOAD_FULFILLED } from "../actions/membershipsActions";

const initialState = {
  entities: [],
  errors: [],
  currentProjectId: undefined,
  nextPage: undefined,
  prevPage: undefined,
  loading: false
};

export default (projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PROJECTS:
      return { ...state, loading: true };
    case FETCH_PROJECTS_FULFILLED:
      return {
        ...state,
        loading: false,
        entities: action.payload.results,
        nextPage: action.payload.next,
        prevPage: action.payload.prev
      };
    case FETCH_PROJECTS_REJECTED:
      return {
        ...state,
        errors: [...state.errors, action.payload],
        loading: false
      };
    case LOAD_FULFILLED:
      return { ...state, loading: false };
    case SET_CURRENT_PROJECT:
      return { ...state, currentProjectId: action.payload };
    default:
      return state;
  }
});
