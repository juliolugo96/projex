import axios from "../../axios";
import { persistor } from "../redux";

/// Authentication functions

export async function logIn(params) {
  try {
    const response = await axios.post("/rest-auth/login/", params);
    return response.data;
  } catch (error) {
    console.log("users::logIn");
    throw new Error(error);
  }
}

export async function logOut(params) {
  try {
    const response = await axios.get("/rest-auth/logout/", params);
    await persistor.purge();
    return response.data;
  } catch (error) {
    console.log("users::logOut");
    throw new Error(error);
  }
}

/// Registration

export async function signUp(params) {
  try {
    const response = await axios.post("/rest-auth/registration/", params);
    return response.data;
  } catch (error) {
    console.log("users::signUp");
    throw new Error(error);
  }
}

/// Password management

export async function changePassword(params) {
  try {
    const response = await axios.post("/rest-auth/password/change", params);
    return response.data;
  } catch (error) {
    console.log("users::changePassword");
    throw new Error(error);
  }
}

export async function resetPassword(params) {
  try {
    const response = await axios.post("/rest-auth/password/reset", params);
    return response.data;
  } catch (error) {
    console.log("users::resetPassword");
    throw new Error(error);
  }
}

// Current user

export async function getCurrentUser(params) {
  try {
    const response = await axios.get("/users/current_user");
    console.log("Get current: ", response.data);
    return response.data;
  } catch (error) {
    console.log("users::getCurrentUser");
    throw new Error(error);
  }
}

export async function getPreferences(params) {
  try {
    const response = await axios.get("/preferences");
    return response.data;
  } catch (error) {}
}

// Projects

export async function fetchProjects(page = 1) {
  try {
    const response = await axios.get("/projects", { page: page });
    return response.data;
  } catch (error) {
    console.log("Projects::fetchProjects", error.response);
    throw new Error(error);
  }
}

export async function createProject(params, callback) {
  try {
    const response = await axios.post(`/projects/`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::createProject", error.response);
    throw new Error(error);
  }
}

export async function updateProject(params, callback) {
  try {
    const response = await axios.put(`/projects/${params.id}`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::updateProject", error.response);
    throw new Error(error);
  }
}

export async function deleteProject(params, callback) {
  try {
    const response = await axios.delete(`/projects/${params.id}`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::deleteProject", error.response);
    throw new Error(error);
  }
}

// Memberships

export async function getMemberByEmail(params, callback) {
  try {
    const response = await axios.get("/users/user_by_email", { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::getMemberByEmail", error.response);
    throw new Error(error);
  }
}

export async function getUser(params, callback) {
  try {
    const response = await axios.put(`/users/${params.id}`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Users::getUser", error.response);
    throw new Error(error);
  }
}

export async function createMembership(params, callback) {
  try {
    const response = await axios.post("/memberships", { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::createMemberships", error.response);
    throw new Error(error);
  }
}

export async function updateMembership(params, callback) {
  try {
    const response = await axios.put(`/memberships/${params.id}`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::updateMemberships", error.response);
    throw new Error(error);
  }
}

export async function deleteMembership(params, callback) {
  try {
    const response = await axios.put(`/memberships/${params.id}`, { params });
    callback(response);
    return response.data;
  } catch (error) {
    console.log("Projects::deleteMemberships", error.response);
    throw new Error(error);
  }
}
