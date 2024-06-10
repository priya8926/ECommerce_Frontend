import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Store'
import App2 from "./StudentReport/App2";

store.subscribe(() => store.getState())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
      {/* <App /> */}
      <App2/>
    </Provider>
  </BrowserRouter>
);
