import { fetchProjects as getProjects } from "../../api";
import {normalize} from "normalizr";

export const FETCHING_PROJECTS = "FETCHING_PROJECTS";
export const FETCH_PROJECTS_FULFILLED = "FETCH_PROJECTS_FULFILLED";
export const FETCH_PROJECTS_REJECTED = "FETCH_PROJECTS_REJECTED";
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";

export const fetchProjects = (page = 1) => async dispatch => {
  dispatch({ type: FETCHING_PROJECTS });
  try {
    const response = await getProjects(page);
    dispatch({ type: FETCH_PROJECTS_FULFILLED, payload: response });
  } catch (error) {
    console.log("Projects::fetchProjects", err.response);
    dispatch({ type: FETCH_PROJECTS_REJECTED, payload: err.message });
  }
};

export const setCurrentProject = (id) => ({
    type: SET_CURRENT_PROJECT,
    payload: id
})