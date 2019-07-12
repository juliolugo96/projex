import {
  FETCHING_BOARDS,
  FETCH_BOARDS_FULFILLED,
  FETCH_BOARDS_REJECTED,
  FETCHING_TASKS,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED
} from "../actions/tasksBoardsActions";
import { LOAD_FULFILLED } from "../actions/membershipsActions";

const initialState = {
  tasks: [],
  boards: [],
  errors: [],
  loadingBoards: false,
  loadingTasks: false
};

export default (tasksBoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_BOARDS:
      return { ...state, loadingBoards: true };
    case FETCH_BOARDS_FULFILLED:
      return {
        ...state,
        loadingBoards: false,
        boards: action.payload.results
      };
    case FETCH_BOARDS_REJECTED:
      return {
        ...state,
        loadingBoards: false,
        errors: [...state.errors, action.payload]
      };
    case FETCHING_TASKS:
      return { ...state, loadingTasks: true };
    case FETCH_TASKS_FULFILLED:
      return {
        ...state,
        loadingTasks: false,
        tasks: action.payload.results
      };
    case FETCH_TASKS_REJECTED:
      return {
        ...state,
        loadingTasks: false,
        errors: [...state.errors, action.payload]
      };
    case LOAD_FULFILLED:
      return {
        ...state,
        loadingBoards: false,
        loadingTasks: false
      };
    default:
      return state;
  }
});
