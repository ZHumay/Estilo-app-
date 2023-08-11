import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import {useUsersContext} from "../../hooks/useUsersContext"
import SearchResult from "../SearchResult/SearchResult";
import Overlay from "../Overlay/Overlay";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useAdminContext } from "../../context/AdminContext";
const Navbar = () => {
  const { activeUser } = useActiveUserContext();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResultContainerStyle, setSearchResultContainerStyle] = useState("hideSearch");
  const { dispatchActiceUser } = useActiveUserContext();
  const {dispatchAdmin}=useAdminContext()
  const {admin}=useAdminContext()

  const handleLogout = () => {
    dispatchActiceUser({ type: "GET_ACTIVE_USER", payload: null });
    dispatchAdmin({ type: "GET_ADMIN", payload: null });

    localStorage.removeItem("activeUser");
    localStorage.removeItem("admin")
    Cookies.remove("jwt");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleSearch = () => {
    if (searchResultContainerStyle === "hideSearch") {
      setSearchResultContainerStyle("showSearch");
    } else {
      setSearchResultContainerStyle("hideSearch");
    }
  };
console.log(admin);
  return (
    <div className="navbar">
      {searchResultContainerStyle === "showSearch" && (
        <>
          <SearchResult
            searchValue={searchValue}
            className={searchResultContainerStyle}
          />
          <Overlay
            className={searchResultContainerStyle}
            onClick={handleSearch}
          />
        </>
      )}

<div className="left">
  <div className="logo">
    <Link to="/">
      <span
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "20px",
          fontWeight: "700",
        }}
        className="logo-text"
      >
        Estilo
      </span>
    </Link>
  </div>
  <div className="right">
    <div className="menu-link">
  
      {!admin ? (
        <>
            <Link
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "17px",
          fontWeight: "700",
        }}
        to="/"
        className="ml"
      >
        Home
      </Link>
          <Link
            style={{
              color: "rgb(66, 64, 64)",
              fontSize: "17px",
              fontWeight: "700",
            }}
            to="/shop"
            className="ml"
          >
            Shop
          </Link>
          <Link
            style={{
              color: "rgb(66, 64, 64)",
              fontSize: "17px",
              fontWeight: "700",
            }}
            to="/woman"
            className="ml"
          >
            Woman
          </Link>
          <Link
            style={{
              color: "rgb(66, 64, 64)",
              fontSize: "17px",
              fontWeight: "700",
            }}
            to="/man"
            className="ml"
          >
            Man
          </Link>
          <Link
            style={{
              color: "rgb(66, 64, 64)",
              fontSize: "17px",
              fontWeight: "700",
            }}
            to="/contact"
            className="ml"
          >
            Contact
          </Link>
          <Link
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "17px",
          fontWeight: "700",
        }}
        to="/create-post/user"
        className="ml"
      >
        Add product
      </Link>
      <Link
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "17px",
          fontWeight: "700",
        }}
        to="/wardrobe"
        className="ml"
      >
        Wardrobe
      </Link>
        </>
      ) : 
      (
        <>
          <Link
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "17px",
          fontWeight: "700",
        }}
        to="/"
        className="ml"
      >
        Home
      </Link>
      <Link
        style={{
          color: "rgb(66, 64, 64)",
          fontSize: "17px",
          fontWeight: "700",
        }}
        to="/create-post"
        className="ml"
      >
        Create
      </Link>


        </>
      )
      
      }


    
    </div>
  </div>
</div>


      {activeUser ? (
        <div className="center">
          <div className="search_wrapper">
            <input
              type="text"
              placeholder="Search something ...."
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
              onFocus={handleSearch}
            />
            <SearchIcon className="search-icon-nav" />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="rightt">
        <div className="menu-link">
          {activeUser ? (
            <>
            {!admin ? (
              <>
              <Link
                to="/basket"
                style={{ color: "rgb(66,64,64)", fontSize: "17px", fontWeight: "700",marginRight:"-50px"}}
                className="ml"
              >
                <ShoppingBagOutlinedIcon style={{width:"30px",height:"24px",transform:"translateY(5.2px)"}}/>
              </Link>
              </>
            ) : (null)}
               

              <Link
                to="/"
                onClick={handleLogout}
                style={{ color: "rgb(66,64,64)", fontSize: "17px", fontWeight: "700",marginRight:"-65px"}}
                className="ml"
              >
                Logout
              </Link>

              <Link to={`/profile/${activeUser && activeUser._id}`} className="nav_profile_img" >
                <img
                  src={activeUser && activeUser.profileImage}
                  alt="Profile"
                  className="nav_profile_image"
                />
                
              </Link>
           
            </>
          ) : (
            <>
            <div className="rightt" >
            <Link
                to="/login"
                style={{ color: "rgb(66,64,64)", fontSize: "17px", fontWeight: "700" }}
                className="ml"
              >
                Login 
                <LoginIcon style={{width:"30px",height:"20px",transform:"translateY(5px)"}}/>
              </Link>
              <Link
                to="/register"
                style={{ color: "rgb(66,64,64)", fontSize: "17px", fontWeight: "700" }}
                className="ml"
              >
                Register
                <HowToRegIcon style={{width:"30px",height:"20px",transform:"translateY(5px)"}}/>
              </Link>
            </div>
           
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
