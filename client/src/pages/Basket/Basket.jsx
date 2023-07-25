import Navbar from "../../components/Navbar/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../Auth/AuthContext";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart,addToCart } from '../../store/cartActions';
function Basket() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useContext(AuthContext);
  // const handleOrderClick = () => {
  //   const storedUser = JSON.parse(localStorage.getItem('registeredusers'));
  //   if (storedUser) {
  //     window.alert('Your order is complete');
  //   } else {
  //     window.alert('You must register');
  //     navigate("/register");
  //   }
  // };

  const items = useSelector((state) => state.cartReducer.items);
  // Accessing cart items from the Redux store
  const [productCounts, setProductCounts] = useState([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems && loggedIn) {
      // You don't need this line because items are already available through Redux state
      // dispatch(setItems(JSON.parse(cartItems)));
    }
  }, [dispatch, loggedIn]);

  const handleIncrementCount = (productId) => {
    setProductCounts((prevState) => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1,
    }));

  };

  const handleDecrementCount = (productId) => {
    setProductCounts((prevState) => {
      const currentCount = prevState[productId] || 0;
      const updatedCount = currentCount - 1;
      const newCount = updatedCount >= 0 ? updatedCount : 0;

      return {
        ...prevState,
        [productId]: newCount,
      };
    });
  };
  const handleRemoveFromBasket = (productId) => {
    dispatch(removeFromCart(productId));
    const updatedCartItems = items.filter((item) => item.id !== productId);
    setProductCounts((prevState) => {
      const updatedCounts = { ...prevState };
      delete updatedCounts[productId];
      return updatedCounts;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      const count = productCounts[item.id] || 0;
      totalPrice += item.price * count;
    });
    return totalPrice;
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      dispatch({ type: "SET_CART_ITEMS", payload: JSON.parse(cartItems) });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          transform: "translateY(100px)",
        }}
        container
        spacing={4}
      >
        {items.map((item) => (
          <Grid key={item.id} item xs={6} sm={6} md={4} lg={3}>
            <Card
              sx={{ height: "200px" }}
              style={{
                margin: "30px",
                width: "1460px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                style={{
                  width: "100px",
                  margin: "35px 0px 5px 25px",
                  height: "auto",
                  alignSelf: "flex-start", // Align the image to the top left corner
                }}
                alt={item.title}
              />
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "500px",
                  flexDirection: "column",
                  color: "rgb(66, 64, 64)",
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {`${item.price}$`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {item.category}
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "960px",
                }}
              >
                <Button
                style={{marginRight:"-40px"}}
                  onClick={() => handleIncrementCount(item.id)}
                  startIcon={<AddIcon style={{color:"#A569BD",fontSize:"30px"}}/>}
                ></Button>

                <Button style={{color:"gray",fontSize:"16px"}}>
                {productCounts[item.id] || 0  }
                </Button>
                <Button
                style={{marginLeft:"-20px"}}
                  onClick={() => handleDecrementCount(item.id)}
                  startIcon={<RemoveIcon style={{color:"#A569BD",fontSize:"33px"}} />}
                ></Button>
                <Button
                  style={{ color: "#F5624A" }}
                  onClick={() => handleRemoveFromBasket(item.id)}
                  startIcon={<DeleteIcon />}
                >
                  
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <div style={{ fontWeight: "bold", fontSize: 30, marginTop: 60 ,marginLeft:36,color:"rgb(69,60,60)"}}>
        Total Price: {`${calculateTotalPrice()}$`}
        {/* ... (previous code) */}
      </div>
    </>
  );
}

export default Basket;
