import {
  logIn as logInUser,
  logOut as logOutUser,
  getCurrentUser,
  getPreferences
} from "../../api";

// action types
export const LOGGING_OUT = "LOG_OUT";
export const LOG_OUT_FULFILLED = "LOG_OUT_FULFILLED";
export const LOG_OUT_REJECTED = "LOG_OUT_REJECTED";
export const LOGGING_IN = "LOGGING_IN";
export const LOG_IN_FULFILLED = "LOG_IN_FULFILLED";
export const LOG_IN_REJECTED = "LOG_IN_REJECTED";
export const CLEAR_CURRENT_USER_ERRORS = "CLEAR_CURRENT_USER_ERRORS";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const logIn = (params, callback) => async dispatch => {
  dispatch({ type: LOGGING_IN });
  try {
    const response = await logInUser(params);
    const user = response.data;
    dispatch({ type: LOG_IN_FULFILLED, payload: user });
    callback(response);
  } catch (err) {
    console.log("currentUser::logIn", err.response);
    dispatch({ type: LOG_IN_REJECTED, payload: err.message });
  }
};

export const retrieveCurrentUser = () => async dispatch => {
  try {
    const response = await getCurrentUser();
    const prefResponse = await getPreferences();
    const user = response.data;
    const preferences = prefResponse.data;
    console.log(preferences);
    dispatch({ type: LOG_IN_FULFILLED, payload: { ...user, ...preferences } });
  } catch (err) {
    console.log("currentUser::logIn", err.response);
    dispatch({ type: LOG_IN_REJECTED, payload: err.message });
  }
};

export const logOut = callback => async dispatch => {
  dispatch({ type: LOGGING_OUT });
  try {
    const response = await logOutUser();
    callback();
    dispatch({ type: LOG_OUT_FULFILLED, payload: response });
  } catch (err) {
    console.log("currentUser::logOut", err);
    dispatch({ type: LOG_OUT_REJECTED, payload: err.message });
  }
};

export const changeLanguage = lang => ({
  type: CHANGE_LANGUAGE,
  payload: lang
});

export const clearErrors = () => ({ type: CLEAR_CURRENT_USER_ERRORS });
