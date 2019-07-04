import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";
import projectsReducer from "./projectsReducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  projects: projectsReducer
});

export default rootReducer;
