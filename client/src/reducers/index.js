import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import colorsReducer from "./colorsReducer";

export default combineReducers({
    loginReducer,
    colorsReducer
})