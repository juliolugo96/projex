import {
  LOG_OUT_FULFILLED,
  LOG_IN_FULFILLED,
  LOG_OUT_REJECTED,
  LOG_IN_REJECTED,
  CLEAR_CURRENT_USER_ERRORS,
  LOGGING_IN,
  SIGNING_UP,
  SIGN_UP_REJECTED,
  SIGN_UP_FULLFILED,
  CHANGE_LANGUAGE,
  CHANGE_COLOR_SCHEMA
} from "../actions/currentUserActions";

const initialState = {
  email: "",
  token: "",
  profilePhoto: "",
  language: undefined,
  colorSchema: undefined,
  isLogged: false,
  loading: false,
  errors: []
};

export default (currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loading: true };
    case LOG_IN_FULFILLED:
      return {
        ...state,
        ...action.payload,
        errors: [],
        isLogged: true,
        loading: false
      };
    case LOG_IN_REJECTED:
      return { ...state, errors: [action.payload] };
    case SIGNING_UP:
      return { ...state, loading: true };
    case SIGN_UP_FULLFILED:
      return {
        ...state,
        ...action.payload,
        errors: [],
        isLogged: true,
        loading: false
      };
    case SIGN_UP_REJECTED:
      return { ...state, errors: [action.payload] };
    case LOG_OUT_FULFILLED:
      return initialState;
    case LOG_OUT_REJECTED:
      return { ...state, errors: [action.payload] };
    case CLEAR_CURRENT_USER_ERRORS:
      return { ...state, errors: [] };
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    case CHANGE_COLOR_SCHEMA:
      return { ...state, colorSchema: action.payload };
    default:
      return state;
  }
});
