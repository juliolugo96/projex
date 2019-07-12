import {
  fetchProjects as getProjects,
  createProject as generateProject,
  createMembership
} from "../../api";
import { LOAD_FULFILLED } from "./membershipsActions";
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
    console.log("Projects::fetchProjects", error.response);
    dispatch({ type: FETCH_PROJECTS_REJECTED, payload: error.message });
  }
};

export const createProject = (params, callback) => async dispatch => {
  dispatch({ type: FETCHING_PROJECTS });
  try {
    const responseProject = await generateProject(
      params.projectParams
    );

    const format = params.membershipsParams;
    for (var i = 0; i < format.length; i++) {
      const response = await createMembership(
        { ...format[i], project: responseProject.id }
      );
    }
    dispatch({ type: LOAD_FULFILLED });
    callback(responseProject);
  } catch (error) {
    console.log("Projects::createProject", error);
    dispatch({ type: FETCH_PROJECTS_REJECTED, payload: error.message });
  }
};

export const setCurrentProject = id => ({
  type: SET_CURRENT_PROJECT,
  payload: id
});
