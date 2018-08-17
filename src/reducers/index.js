import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import serverMsgReducer from "./serverMsgReducer";
import tablesReducer from "./tablesReducer";
import uploadReducer from "./uploadReducer";

export default combineReducers({
  serverMsg: serverMsgReducer,
  form: reduxForm,
  tables: tablesReducer,
  upload: uploadReducer
});
