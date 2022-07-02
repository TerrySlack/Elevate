import { combineReducers } from "redux";

// Import Reducers
import { HomeReducer } from "Containers/Home";

export default combineReducers({
  home: HomeReducer,
});
