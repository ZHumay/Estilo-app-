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
import { BasketContext } from "../../context/BasketContext";

const Basket = () => {
  //  const [total, setTotal] = useState(0);
  const { addToBasket, removeFromBasket, basketItems, total } = useContext(BasketContext);

  const handleClick = (post) => {
    if (!basketItems.some((item) => item._id === post._id)) {
      addToBasket(post);
    } else {
      removeFromBasket(post);
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
                    variant="contained"
                    className={
                      basketItems.some((item) => item._id === post._id)
                        ? "remove-btn"
                        : "add-btn"
                    }
                    onClick={() => handleClick(post)}
                  >
                    {!basketItems.some((item) => item._id === post._id) ? (
                      <span className="btn-body">
                        Add Basket{" "}
                        <AddShoppingCartIcon style={{ paddingLeft: 10 }} />{" "}
                      </span>
                    ) : (
                      <span className="btn-body">
                        Remove Basket{" "}
                        <RemoveShoppingCartIcon style={{ paddingLeft: 10 }} />{" "}
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
