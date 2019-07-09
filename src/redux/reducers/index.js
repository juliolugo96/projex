import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";
import projectsReducer from "./projectsReducer";
import membershipsReducer from "./membershipsReducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  projects: projectsReducer,
  memberships: membershipsReducer
});

export default rootReducer;
