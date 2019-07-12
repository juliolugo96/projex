import {
  FETCHING_MEMBERS,
  FETCH_MEMBERS_FULFILLED,
  FETCH_MEMBERS_REJECTED,
  LOAD_FULFILLED
} from "../actions/membershipsActions";

const initialState = {
  entities: [],
  errors: [],
  loading: false
};

export default (membershipsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_MEMBERS:
      return { ...state, loading: true };
    case FETCH_MEMBERS_FULFILLED:
      return {
        ...state,
        entities: action.payload,
        loading: false
      };
    case FETCH_MEMBERS_REJECTED:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, action.payload]
      };
    case LOAD_FULFILLED:
      return { ...state, loading: false };
    default:
      return state;
  }
});
