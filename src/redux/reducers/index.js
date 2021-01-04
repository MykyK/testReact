import { combineReducers } from "redux";
import auth from "./authReducer";
import promise from "./promiseReducer";

export default combineReducers({
  auth:auth,
  promise:promise,
});
