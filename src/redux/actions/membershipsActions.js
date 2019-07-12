import {
  getUser,
  getMemberByEmail as fetchMemberByEmail,
  createMembership,
  getMembersByProject as getMemberships
} from "../../api";

export const FETCHING_MEMBERS = "FETCHING_MEMBERS";
export const FETCH_MEMBERS_FULFILLED = "FETCH_MEMBERS_FULFILLED";
export const FETCH_MEMBERS_REJECTED = "FETCH_MEMBERS_REJECTED";
export const LOAD_FULFILLED = "LOAD_FULFILLED";

export const getMemberByEmail = (params, callback) => async dispatch => {
  dispatch({ type: FETCHING_MEMBERS });
  try {
    const response = await fetchMemberByEmail(params);
    dispatch({ type: LOAD_FULFILLED });
    callback(response);
  } catch (err) {
    console.log("Projects::getMemberByEmail", err);
    dispatch({ type: FETCH_MEMBERS_REJECTED, payload: err.message });
  }
};

export const fetchMembers = membersSet => async dispatch => {
  dispatch({ type: FETCHING_MEMBERS });
  var membersResponse = [];
  try {
    for (var i = 0; i < membersSet.length; i++) {
      const response = await getUser({ id: membersSet[i].user });
      membersResponse.push(response);
    }
    dispatch({ type: FETCH_MEMBERS_FULFILLED, payload: membersResponse });
  } catch (err) {
    console.log("Memberships::fetchMembers", err);
    dispatch({ type: FETCH_MEMBERS_REJECTED, payload: err.message });
  }
};

export const createProjectMemberships = membersSet => async dispatch => {
  dispatch({ type: FETCHING_MEMBERS });
  try {
    for (var i = 0; i < membersSet.length; i++) {
      const response = await createMembership(membersSet[i]);
    }
    dispatch({ type: LOAD_FULFILLED, payload: membersResponse });
  } catch (err) {
    console.log("Projects::fetchProjects", err);
    dispatch({ type: FETCH_MEMBERS_REJECTED, payload: err.message });
  }
};
