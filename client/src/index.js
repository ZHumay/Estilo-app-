import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./pages/Auth/AuthContext";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./store/dataSlice"
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
   dataReducer:dataReducer,
  },
});
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
  </Provider>
);