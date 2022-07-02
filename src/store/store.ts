import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// API requests
import { axios } from "Utils/api";
// Normally use this if there were multiple reducers.
import reducers from "./combinedReducers";

export const setupStore = () =>
  createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument({ api: axios }))
  );
