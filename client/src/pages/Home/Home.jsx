import React, { useContext, useEffect, useState } from "react";
import "../Home/Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CachedIcon from "@mui/icons-material/Cached";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { addToCart, removeFromCart } from "../../store/cartActions";
import { useQuery } from "react-query";
import { axiosInstance } from "../../network/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AuthContext } from "../Auth/AuthContext";
function Home() {

  const [productCounts, setProductCounts] = useState([]);
  const cartItems = useSelector((state) => state.cartReducer.items);
  const{loggedIn}=useContext(AuthContext)

  const { data, isLoading, error } = useQuery("productsData", () =>
    axiosInstance.get("products")
  );
  
  const isAdded = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };
  const dispatch = useDispatch();
  const navigate=useNavigate()



  const handleAddToCart = (product) => {
    if (loggedIn) {
      dispatch(addToCart(product));
      const updatedCartItems = [...cartItems, product];
      setProductCounts((prevState) => ({
        ...prevState,
        [product.id]: (prevState[product.id] || 0) + 1,
      }));
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      alert("You must be logged in to add items to the cart.");
      navigate('/signin');
    }
  };
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      dispatch({ type: "SET_CART_ITEMS", payload: JSON.parse(cartItems) });
    }
  }, [loggedIn]);
  
  const handleRemoveFromCart = (productId) => {
    if(loggedIn){
      dispatch(removeFromCart(productId));
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      setProductCounts((prevState) => {
        const updatedCounts = { ...prevState };
        delete updatedCounts[productId];
        return updatedCounts;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  else{
    localStorage.removeItem("cartItems")
  }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const clickshopwoman = () => {
    navigate("/woman");
  }
  const clickshopman=()=>{
    navigate("/man")
  }



  return (
    <>
      <Navbar />
      <div className="slider">
        <figure>
          <div className="slide">
            <div className="slide-text">
              <h1> Women collection</h1>
              <Button
                style={{ backgroundColor: "#A569BD" }}
                className="slidebtn"
                variant="contained"
                onClick={clickshopwoman}
              >
                Shop now
              </Button>
            </div>
            <img
              src="https://themewagon.github.io/cozastore/images/slide-01.jpg"
              alt=""
            />
          </div>
          <div className="slide">
            <div className="slide-text">
              <h1> Men collection</h1>
              <Button
                style={{ backgroundColor: "#A569BD" }}
                className="slidebtn"
                variant="contained"
                onClick={clickshopman}

              >
                Shop now
              </Button>
            </div>
            <img
              src="https://themewagon.github.io/cozastore/images/slide-03.jpg"
              alt=""
            />
          </div>
        </figure>
      </div>

      <div className="about">
        <div className="about-section">
          <div className="delivery">
            <LocalShippingIcon className="icon" />
            <h3> Free delivery</h3>
            <p className="freeshipping">Free Shipping on all order</p>
          </div>
          <div className="separator"> </div>

          <div className="return-policy">
            <CachedIcon className="icon" />
            <h3> Return policy</h3>
            <p className="freeshipping">Free Shipping on all order</p>
          </div>
          <div className="separator"> </div>

          <div className="support">
            <SupportAgentIcon className="icon" />
            <h3>24/7 Support</h3>
            <p className="freeshipping">Free Shipping on all order</p>
          </div>
          <div className="separator"> </div>

          <div className="secure-payment">
            <PaymentIcon className="icon" />
            <h3>Secure payment</h3>
            <p className="freeshipping">Free Shipping on all order</p>
          </div>
        </div>
      </div>
      <div className="h2" style={{ width: "300px" }}>
        <h2
          style={{
            transform: "translateX(70px)",
            color: "rgb(66, 64, 64)",
            fontSize: "29px",
            width: "300px",
          }}
        >
          {" "}
          Product overview
        </h2>
      </div>
      <div className="overview">
        <Link className="overview_link" to="/allproducts">
          All products
        </Link>

        <Link className="overview_link" to="/women">
          Women
        </Link>
        <Link className="overview_link" to="/men">
          Men
        </Link>
        <button className="filterbtn">
          {" "}
          <FilterListIcon
            style={{
              height: "20px",
              width: "20px",
              marginBottom: "-5px",
              marginRight: "6px",
            }}
          />
          <span style={{ color: "rgb(70, 70, 70)", fontSize: "15px" }}>
            Filter
          </span>
        </button>
      </div>

      <Grid style={{ marginTop: "30px" }} container spacing={3}>
        {data?.data.map((product) => (
          <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
            {!isAdded(product.id) && (
              <Card
                sx={{ height: "100%", maxWidth: "300px" }}
                style={{ margin: "auto" }}
              >
                <FavoriteBorderIcon
                  style={{
                    color: "#A569BD",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                />
                <CardMedia
                  component="img"
                  image={product.image}
                  style={{
                    width: "40%",
                    height: "auto",
                    margin: "40px auto ",
                  }}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {`${product.price}$`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">

                    <Button
                      style={{
                        color: "#A569BD",
                        border: "none",
                        marginTop: "20px",
                      }}
                      variant="outlined"
                      onClick={() => handleAddToCart(product)}
                    >
                      <AddShoppingCartIcon style={{ marginLeft: "-35px" }} />
                    </Button>

                  </Typography>
                </CardContent>
              </Card>
            )}
            {isAdded(product.id) && (
              <Card
                sx={{ height: "100%", maxWidth: "300px" }}
                style={{ margin: "auto" }}
              >
                <FavoriteBorderIcon
                  style={{
                    color: "#A569BD",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                />

                <CardMedia
                  component="img"
                  image={product.image}
                  style={{
                    width: "40%",
                    height: "auto",
                    margin: "40px auto ",
                  }}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {`${product.price}$`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                  
                  {loggedIn ? (
    <Button
      style={{
        color: "#A569BD",
        marginTop: "20px",
        border: "none"
      }}
      variant="outlined"
      onClick={() => handleRemoveFromCart(product.id)}
    >
      <RemoveShoppingCartIcon style={{ marginLeft: "-35px" }} />
    </Button>
  ) :    <Button
                      style={{
                        color: "#A569BD",
                        border: "none",
                        marginTop: "20px",
                      }}
                      variant="outlined"
                      onClick={() => handleAddToCart(product)}
                    >
                      <AddShoppingCartIcon style={{ marginLeft: "-35px" }} />
                    </Button>}
                
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;