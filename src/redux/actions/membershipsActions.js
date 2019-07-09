import { getUser } from "../../api";

export const FETCHING_MEMBERS = "FETCHING_MEMBERS";
export const FETCH_MEMBERS_FULFILLED = "FETCH_MEMBERS_FULFILLED";
export const FETCH_MEMBERS_REJECTED = "FETCH_MEMBERS_REJECTED";

export const fetchMembers = membersSet => async dispatch => {
  dispatch({ type: FETCHING_MEMBERS });
  let membersResponse = [];
  try {
    for (var i = 0; i < membersSet.length; i++) {
      const emptyCallback = e => {};
      const response = await getUser(membersSet[i].user, emptyCallback);
      membersResponse.push(response);
    }
    dispatch({ type: FETCH_MEMBERS_FULFILLED, payload: membersResponse });
  } catch (error) {
    console.log("Projects::fetchProjects", err.response);
    dispatch({ type: FETCH_MEMBERS_REJECTED, payload: err.message });
  }
};
