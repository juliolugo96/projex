import {
  logIn as logInUser,
  logOut as logOutUser,
  signUp as signUpUser,
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
export const CHANGE_COLOR_SCHEMA = "CHANGE_COLOR_SCHEMA";
export const SIGNING_UP = "SIGNING_UP";
export const SIGN_UP_FULLFILED = "SIGN_UP_FULLFILED";
export const SIGN_UP_REJECTED = "SIGN_UP_REJECTED";

export const signUp = (params, callback) => async dispatch => {
  dispatch({ type: SIGNING_UP });
  try {
    const response = await signUpUser(params);
    dispatch({ type: SIGN_UP_FULLFILED, payload: response });
    callback(response);
  } catch (err) {
    console.log("currentUser::signUp", err);
    dispatch({ type: SIGN_UP_REJECTED, payload: err.message });
  }
};

export const logIn = (params, callback) => async dispatch => {
  dispatch({ type: LOGGING_IN });
  try {
    const response = await logInUser(params);
    dispatch({ type: LOG_IN_FULFILLED, payload: response });
    callback(response);
  } catch (err) {
    console.log("currentUser::logIn", err);
    dispatch({ type: LOG_IN_REJECTED, payload: err.message });
  }
};

export const retrieveCurrentUser = () => async dispatch => {
  try {
    const response = await getCurrentUser();
    const prefResponse = await getPreferences();
    const user = response;
    const preferences = prefResponse.results[0];
    dispatch({
      type: LOG_IN_FULFILLED,
      payload: {
        username: user.username,
        email: user.email,
        country: user.country,
        profile_photo: undefined,
        profilePhoto: user.profile_photo,
        colorSchema: preferences.color_schema,
        language: preferences.language
      }
    });
  } catch (err) {
    console.log("currentUser::logIn", err);
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

export const changeColorSchema = color => ({
  type: CHANGE_COLOR_SCHEMA,
  payload: color
});

export const clearErrors = () => ({ type: CLEAR_CURRENT_USER_ERRORS });
