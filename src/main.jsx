import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyProvider from "./MyContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MyProvider>
  </BrowserRouter>
);
