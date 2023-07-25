import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./pages/Auth/AuthContext";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount:false
    }
  }
});
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <QueryClientProvider client={queryClient}> 
        <App />
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
  </Provider>
);