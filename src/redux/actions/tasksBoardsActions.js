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
export const LOAD_FULFILLED = "LOAD_FULFILLED";

export const fetchBoards = params => async dispatch => {
  dispatch({ type: FETCHING_BOARDS });
  dispatch({ type: FETCHING_TASKS });
  try {
    const responseBoards = await getBoards(params);
    var tasksResponse = {};
    for (var i = 0; i < responseBoards.results.length; i++) {
      const response = await getTasks({ board: responseBoards.results[i].id });
      // console.log("Response:", response.results);
      tasksResponse[responseBoards.results[i].id] = response.results;
    }
    console.log("fetchBoards response: ", tasksResponse);
    dispatch({ type: FETCH_BOARDS_FULFILLED, payload: responseBoards.results });
    dispatch({ type: FETCH_TASKS_FULFILLED, payload: tasksResponse });
  } catch (err) {
    console.log("tasks::fetchBoards", err);
    dispatch({ type: FETCH_BOARDS_REJECTED, payload: err.message });
  }
};

export const createTask = params => async dispatch => {
  dispatch({ type: FETCHING_TASKS });
  try {
    const response = await generateTask(params);
    console.log("createTask response: ", response);
    dispatch({ type: LOAD_FULFILLED });
  } catch (err) {
    console.log("tasks::createTask", err);
    dispatch({ type: FETCH_TASKS_REJECTED, payload: err.message });
  }
};

export const updateExistingTask = params => async dispatch => {
  dispatch({ type: FETCHING_TASKS });
  try {
    const response = await generateTask(params);
    console.log("createTask response: ", response);
    dispatch({ type: LOAD_FULFILLED });
  } catch (err) {
    console.log("tasks::createTask", err);
    dispatch({ type: FETCH_TASKS_REJECTED, payload: err.message });
  }
};
