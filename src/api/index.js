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

export async function createProject(params) {
  try {
    const response = await axios.post(`/projects`, params);
    return response.data;
  } catch (error) {
    console.log("Projects::createProject", error.response);
    throw new Error(error);
  }
}

export async function updateProject(params) {
  try {
    const response = await axios.patch(`/projects/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Projects::updateProject", error.response);
    throw new Error(error);
  }
}

export async function deleteProject(params) {
  try {
    const response = await axios.delete(`/projects/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Projects::deleteProject", error.response);
    throw new Error(error);
  }
}

// Memberships

export async function getMemberByEmail(params) {
  try {
    const response = await axios.get("/users/user_by_email", params);
    return response.data;
  } catch (error) {
    console.log("Projects::getMemberByEmail", error.response);
    throw new Error(error);
  }
}

export async function getUser(params) {
  try {
    const response = await axios.get(`/users/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Users::getUser", error.response);
    throw new Error(error);
  }
}

export async function createMembership(params) {
  try {
    const response = await axios.post("/memberships", params);
    return response.data;
  } catch (error) {
    console.log("Projects::createMemberships", error.response);
    throw new Error(error);
  }
}

export async function updateMembership(params) {
  try {
    const response = await axios.patch(`/memberships/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Projects::updateMemberships", error.response);
    throw new Error(error);
  }
}

export async function deleteMembership(params) {
  try {
    const response = await axios.delete(`/memberships/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Projects::deleteMemberships", error.response);
    throw new Error(error);
  }
}

// Board

export async function getBoards(params) {
  try {
    const response = await axios.get(
      `/boards?project=${params.project}`,
      params
    );
    return response.data;
  } catch (error) {
    console.log("Boards::getBoards", error.response);
    throw new Error(error);
  }
}

/// Tasks

export async function fetchTasks(params) {
  try {
    const response = await axios.get(`/tasks?board=${params.board}`, params);
    return response.data;
  } catch (error) {
    console.log("Tasks::fetchTasks", error.response);
    throw new Error(error);
  }
}

export async function createTask(params) {
  try {
    const response = await axios.post(`/tasks`, params);
    return response.data;
  } catch (error) {
    console.log("Tasks::createTask", error.response);
    throw new Error(error);
  }
}

export async function updateTask(params) {
  try {
    const response = await axios.patch(`/tasks/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Tasks::updateTask", error.response);
    throw new Error(error);
  }
}

export async function deleteTask(params) {
  try {
    const response = await axios.delete(`/tasks/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Tasks::deleteTask", error.response);
    throw new Error(error);
  }
}

export async function getTask(params) {
  try {
    const response = await axios.get(`/tasks/${params.id}`, params);
    return response.data;
  } catch (error) {
    console.log("Tasks::getTask", error.response);
    throw new Error(error);
  }
}

//
