import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountsReducer from "./accountReducer";
import contractReducer from "./contractsReducer";

export default combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  contract: contractReducer
});
