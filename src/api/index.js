import axios from "../../axios";
import { persistor } from "../redux";

/***
 *
 *
 * Define all functions corresponding to API
 *
 * TO DO:
 *
 * Define controllers in Django
 *
 */

/// Authentication functions

export async function logIn(params) {
  try {
    const response = await axios.post("/rest-auth/login/", params);
    return response.data;
  } catch (error) {
    console.log("Login: ", error.response);
    throw new Error(error);
  }
}

export async function logOut(params) {
  try {
    const response = await axios.get("/rest-auth/logout/", params);
    await persistor.purge();
    return response.data;
  } catch (error) {
    console.log("Logout");
    throw new Error(error);
  }
}

/// Register

export async function signUp(params) {

  try {
    const response = await axios.post("/rest-auth/registration/", params);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

/// Register

export async function changePassword(params) {
  try {
    const response = await axios.post("/rest-auth/password/change", params);
    return response.data;
  } catch (error) {
    console.log("SignUp");
    throw new Error(error);
  }
}

/// Register

export async function resetPassword(params) {
  try {
    const response = await axios.post("/rest-auth/password/reset", params);
    return response.data;
  } catch (error) {
    console.log("SignUp");
    throw new Error(error);
  }
}

export async function getCurrentUser(params) {
  try {
    const response = await axios.get("/users/current_user");
    console.log("Get current: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Current User: ", error.response);
    throw new Error(error);
  }
}

export async function getPreferences(params) {
  try {
    const response = await axios.get("/preferences");
    return response.data;
  } catch (error) {}
}

/////////////////////////////////////////////

export async function fetchProjects(page = 1) {
  try {
    const response = await axios.get("/projects", { page: page });
    console.log("Fetch Projects: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Projects", error.response);
    throw new Error(error);
  }
}
