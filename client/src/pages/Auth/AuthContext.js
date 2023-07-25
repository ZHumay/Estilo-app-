import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CircularIndeterminate } from "../../components/CircularIndeterminate";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const token = JSON.parse(localStorage.getItem("access-token"));

  useEffect(() => {
    setLoading(true)
    getData()
  }, [token,loggedIn]);

  const getData=()=>{
    axios
    .post("http://localhost:8000/api/webuser/token", {
      token,
    })
    .then((response) => {
      setLoggedIn(true);
      setUser(response.data.user)
      setLoading(false)
    })
    .catch(() => {
      setLoggedIn(false);
      setUser(null)
      if (localStorage.getItem("access-token")!=null) {
        localStorage.removeItem("access-token");
      }
      setLoading(false)
    });
  }
  
  const handlerLogInOut = (status, redirect, token = null) => {
    setLoggedIn(status);
    if (status) {
      localStorage.setItem("access-token", JSON.stringify(token));
console.log(status);
     
    } else {
      localStorage.removeItem("access-token");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("user");
      setUser(null)
      console.log(status);
   
    }
    redirect();
  };

  const values = {
    handlerLogInOut,
    loggedIn,
    setLoggedIn,
    user,
    loading
  };
  if (loading) {
    return(
      <CircularIndeterminate/>
    )
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};