import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";
import projectsReducer from "./projectsReducer";
import membershipsReducer from "./membershipsReducer";
import tasksBoardsReducer from "./tasksBoardsReducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  projects: projectsReducer,
  memberships: membershipsReducer,
  tasksBoards: tasksBoardsReducer
});

export default rootReducer;
