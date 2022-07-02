import { Provider } from "react-redux";

import "./App.css";
import { AppRoutes } from "../routes";
import { setupStore } from "../store";

// Create the store
const store = setupStore();

export const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);
