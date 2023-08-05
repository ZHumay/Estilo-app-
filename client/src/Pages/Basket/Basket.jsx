import React, {  useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./basket.css";
import {  BasketContext } from "../../context/BasketContext";
import axios from "axios";
import { useActiveUserContext } from "../../context/activeUserContext";

const Basket = () => {
  //  const [total, setTotal] = useState(0);
  const { addToBasket, removeFromBasket, basketItems, total } = useContext(BasketContext);
  const { activeUser } = useActiveUserContext();

  const handleClick = async (post) => {
    try {
      if (!basketItems.some((item) => item._id === post._id)) {
        // If the item is not in the basket, add it to the basket
        const res = await axios.post(`/api/auth/user/${activeUser._id}/basketItems`, {
          newItem: post
        });
        addToBasket(res.data);
      } else {
        // If the item is already in the basket, remove it from the basket
        const res = await axios.delete(`/api/auth/user/${activeUser._id}/basketItems`, {
          data: { itemToDelete: post },
        });
        removeFromBasket(post);
      }
    } catch (error) {
      console.error("Error adding/removing item to/from basket:", error);
    }
  };
  
  return (
    <div className="basket">
      <Container>
        <div className="top">
          <div className="total">Total Count : {total().toFixed(2)}$</div>
          <div>
            {/* {
              users.some((item) => item.islogin === true)? :<></>

            } */}
          </div>
        </div>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          {basketItems.map((post,index) => (
            <Grid item xs={3} style={{ padding: 20 }} key={index}>
              <Card
                sx={{ maxWidth: 345 }}
                style={{
                  height: "100%",
                  border: "1px solid gray ",
                  padding: 10,
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="150px"
                  style={{ width: 200, margin: "0 auto", objectFit: "contain" }}
                  image={post.postImage}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 18,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.price}$
                  </Typography>
                </CardContent>
                <CardActions>
                <Button
              size="small"
              variant="text"
              className={basketItems.some((item) => item._id === post._id) ? "remove-btn" : "add-btn"}
              onClick={() => handleClick(post)}
            >
              {basketItems.some((item) => item._id === post._id) ? (
                // Show RemoveShoppingCartIcon if the item is in the basket
                <span className="btn-body">
                  Delete
                </span>
              ) : (
                // Show AddShoppingCartIcon if the item is not in the basket
                <span className="btn-body">
                  <AddShoppingCartIcon style={{ paddingLeft: 10, width: "50px", height: "20px", color: "a569bd" }} />
                </span>
              )}
            </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Basket;
