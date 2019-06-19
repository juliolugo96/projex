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
    return response.data;
  } catch (error) {
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
  try {
    const response = await axios.post("/rest-auth/registration/", params);
    return response.data;
  } catch (error) {
    console.log("SignUp");
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
