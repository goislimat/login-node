import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import flashReducer from "./flashReducer";

export default combineReducers({
  auth: authReducer,
  flashMessage: flashReducer,
  form: formReducer
});
