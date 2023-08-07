import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./basket.css";
import { BasketContext } from "../../context/BasketContext";
import axios from "axios";
import { useActiveUserContext } from "../../context/activeUserContext";
import Order from "../../Components/Order/Order";
import { useParams } from "react-router-dom";

const Basket = () => {
  //  const [total, setTotal] = useState(0);
  const {id} = useParams();

  const { addToBasket, removeFromBasket, basketItems, total } =
    useContext(BasketContext);
  const { activeUser } = useActiveUserContext();
  const [productCounts, setProductCounts] = useState([]);

  const handleClick = async (post) => {
    try {
      if (!basketItems.some((item) => item._id === post._id)) {
        // If the item is not in the basket, add it to the basket
        const res = await axios.post(
          `/api/auth/user/${activeUser._id}/basketItems`,
          {
            newItem: post,
          }
        );
        addToBasket(res.data);
      } else {
        // If the item is already in the basket, remove it from the basket
        const res = await axios.delete(
          `/api/auth/user/${activeUser._id}/basketItems`,
          {
            data: { itemToDelete: post },
          }
        );
        removeFromBasket(post);
      }
    } catch (error) {
      console.error("Error adding/removing item to/from basket:", error);
    }
  };

  const handleIncrementCount = async (postId) => {
    try {
      await axios.post(`/api/posts/post/${postId}/incrementOrderedCount`);
      setProductCounts((prevState) => ({
        ...prevState,
        [postId]: (prevState[postId] || 1) + 1,
      }));
    } catch (error) {
      console.error('Error incrementing ordered count:', error);
    }
  };
  
  const handleDecrementCount = async (postId) => {
    try {
      await axios.post(`/api/posts/post/${postId}/decrementOrderedCount`);
      setProductCounts((prevState) => {
        const currentCount = prevState[postId] || 0;
        const updatedCount = currentCount - 1;
        const newCount = updatedCount >= 0 ? updatedCount : 0;
  
        return {
          ...prevState,
          [postId]: newCount,
        };
      });
    } catch (error) {
      console.error('Error decrementing ordered count:', error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basketItems.forEach((item) => {
      const count = productCounts[item._id] || 1;
      totalPrice += item.price * count;
    });
    return totalPrice;
  };

  return (
    <>
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          transform: "translateY(79px)",
        }}
        container
        spacing={4}
      >
        {basketItems.map((post, index) => (
          <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
            <Card
              sx={{ height: "200px" }}
              style={{
                margin: "20px 30px 30px 62px",
                width: "1400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "62px",
                border: "0.5px solid #EDECEB  ",
                boxShadow: "none",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={post.postImage}
                style={{
                  width: "190px",
                  margin: "0px",
                  height: "200px",
                  alignSelf: "flex-start", // Align the image to the top left corner
                }}
                alt={post.title}
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
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  className="title"
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="rgb(66,64,64)"
                  fontSize={"17px"}
                >
                  Price: {`${post.price}$`}
                </Typography>
                <label htmlFor="size">Select size:</label>
                <select name="size" id={`${post._id}`}>
                  {post.size[0].split(",").map((item) => (
                    <option value={item.trim()} key={item}>
                      {item.trim()}
                    </option>
                  ))}
                </select>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "960px",
                }}
              >
                <Button
                  style={{ marginRight: "-40px" }}
                  onClick={() => handleIncrementCount(post?._id)}
                  startIcon={
                    <AddIcon style={{ color: "#A1A1A1 ", fontSize: "27px" }} />
                  }
                ></Button>

                <Button style={{ color: "gray", fontSize: "16px" }}>
                  {productCounts[post?._id] || 1}
                </Button>
                <Button
                  style={{ marginLeft: "-20px" }}
                  onClick={() => handleDecrementCount(post?._id)}
                  startIcon={
                    <RemoveIcon
                      style={{ color: "#A1A1A1 ", fontSize: "30px" }}
                    />
                  }
                ></Button>
                <Button
                  size="small"
                  variant="text"
                  className={
                    basketItems.some((item) => item._id === post._id)
                      ? "remove-btn"
                      : "add-btn"
                  }
                  onClick={() => handleClick(post)}
                >
                  {basketItems.some((item) => item._id === post._id) ? (
                    // Show RemoveShoppingCartIcon if the item is in the basket
                    <span className="btn-body">
                      <DeleteIcon className="delete-icon" />
                    </span>
                  ) : (
                    // Show AddShoppingCartIcon if the item is not in the basket
                    <span className="btn-body">
                      <AddShoppingCartIcon
                        style={{
                          paddingLeft: 10,
                          width: "50px",
                          height: "20px",
                          color: "a569bd",
                        }}
                      />
                    </span>
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="total">Total Price: {`${calculateTotalPrice()}$`}</div>
      <Order />
    </>
  );
};

export default Basket;
