import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./reducer";
import {Toaster} from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: rootReducer,
});
root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
  </BrowserRouter>
);
