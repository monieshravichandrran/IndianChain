import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountsReducer from "./accountReducer";

export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
});
