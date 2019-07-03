import axios from "../../axios";

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
    console.log("Print response: ", response);
    return response.data;
  } catch (error) {
    console.log(error.response);
    console.log("Login");
    throw new Error(error);
  }
}

export async function logOut(params) {
  try {
    const response = await axios.get("/rest-auth/logout/", params);
    return response.data;
  } catch (error) {
    console.log("Logout");
    throw new Error(error);
  }
}

/// Register

export async function signUp(params) {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "application/json"
  };

  try {
    const response = await axios.post("/rest-auth/registration/", params, {
      headers
    });
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

/////////////////////////////////////////////

export async function fetchProjects(params) {
  try {
    const response = await axios.get("/projects", params);
    return response.data;
  } catch (error) {
    console.log("Projects");
    throw new Error(error);
  }
}
