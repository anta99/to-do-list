import listsReducer from "./lists";
import tasksReducer from "./tasks";
import {combineReducers} from "redux";

const allReducers=combineReducers({
    list:listsReducer,
    task:tasksReducer
});
export default allReducers;