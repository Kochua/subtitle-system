import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import serverMsgReducer from "./serverMsgReducer";

export default combineReducers({
  serverMsg: serverMsgReducer,
  form: reduxForm
});
