import {
  getBoards,
  fetchTasks as getTasks,
  createTask as generateTask
} from "../../api";

export const FETCHING_BOARDS = "FETCHING_BOARDS";
export const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
export const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
export const FETCHING_TASKS = "FETCHING_TASKS";
export const FETCH_TASKS_FULFILLED = "FETCH_TASKS_FULFILLED";
export const FETCH_TASKS_REJECTED = "FETCH_TASKS_REJECTED";

export const fetchBoards = params => async dispatch => {
  dispatch({ type: FETCHING_BOARDS });
  try {
    const response = await getBoards(params);
    // console.log("fetchBoards response: ", response);
    dispatch({ type: FETCH_BOARDS_FULFILLED, payload: response });
  } catch (err) {
    console.log("tasks::fetchBoards", err);
    dispatch({ type: FETCH_BOARDS_REJECTED, payload: err.message });
  }
};

export const fetchTasks = params => async dispatch => {
  dispatch({ type: FETCHING_TASKS });
  try {
    const response = await getTasks(params);
    console.log("fetchTasks response: ", response);
    dispatch({ type: FETCH_TASKS_FULFILLED, payload: response });
  } catch (err) {
    console.log("tasks::fetchTasks", err);
    dispatch({ type: FETCH_TASKS_REJECTED, payload: err.message });
  }
};

export const createTask = (params, callback) => async dispatch => {
  dispatch({ type: FETCHING_TASKS });
  try {
    const response = await generateTask(params);
    console.log("fetchTasks response: ", response);
    callback(response);
    dispatch({ type: LOAD_FULFILLED });
  } catch (err) {
    console.log("tasks::fetchTasks", err);
    dispatch({ type: FETCH_TASKS_REJECTED, payload: err.message });
  }
};
