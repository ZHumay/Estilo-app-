import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import axios from "axios";
import Cookies from "js-cookie";
import BlogPostCardHome from "../../Components/BlogPostCardHome/BlogPostCardHome";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useUsersContext } from "../../hooks/useUsersContext";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import Footer from "../../Components/Footer/Footer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CachedIcon from "@mui/icons-material/Cached";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAdminContext } from "../../context/AdminContext";
import Order from "../../Components/Order/Order";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";
import Sale from "../../Components/Sale/Sale";
import NewProducts from "../../Components/NewProducts/NewProducts";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
const Home = () => {
  const navigate = useNavigate();
  const { comments, dispatchComments } = useCommentsContext();
  const { posts, dispatch } = usePostsContext();
  const { activeUser, dispatchActiceUser } = useActiveUserContext();
  const { users, dispatchUsers } = useUsersContext();
  const [allPosts, setAllPosts] = useState();
  const [cate, setCate] = useState();
  const [gender, setgender] = useState();
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const { admin } = useAdminContext();
  const [sortOrder, setSortOrder] = useState("lowToHigh"); // Default sorting order
  const [orderItems, setOrderItems] = useState([]); // Define a state variable to hold the order items
  const [isLoading, setIsLoading] = useState(true);
const[user,setUser]=useState([])
  // Function to handle sorting order change

  const textGradientStyle = {
    background: '-webkit-linear-gradient(#F5E136, #F59036)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    // Sort the products based on the selected order
    const sortedPosts = [...allPosts];
    if (order === "lowToHigh") {
      sortedPosts.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedPosts.sort((a, b) => b.price - a.price);
    }
    setAllPosts(sortedPosts);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    <React.Fragment>
      <CardContent >
        <Typography sx={{ fontSize: 16 ,color:"#DE782E",fontWeight:"bold"}} color="text.secondary" gutterBottom>
          ORDERS <LocalMallIcon style={{transform:"translateY(2px)",width:20,height:20}}/>
        </Typography>
        <Typography style={textGradientStyle} variant="h2" component="div">
        {orderItems.length + 1}
        </Typography>
      </CardContent>
    </React.Fragment>);
const cardd = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 16,color:"#DE782E",fontWeight:"bold" }} color="text.secondary" gutterBottom>
        USERS <PersonIcon style={{transform:"translateY(3px)",width:20,height:20}}/>
      </Typography>
      <Typography style={textGradientStyle} variant="h2" component="div" >
      {user.length}
      </Typography>
    </CardContent>
  </React.Fragment>)

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "rgb(216, 216, 216)",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`api/auth/orderItems`);
      console.log(res.data.orderItems);
      setOrderItems(res.data.orderItems);
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };
fetchOrders()



const fetchUsersforAdmin = async () => {
  try {
    const res = await axios.get("/api/auth/all-users");

    if (res.status === 200) {
      setUser(res.data.users)
      setIsLoading(false);
      
    }
  } catch (error) {
    console.log(error.message);
  }
};
fetchUsersforAdmin()

  const filterCategory = (category) => {
    setCate(category);
    if (category === "all") {
      setAllPosts(posts);
    } else {
      const tempArray = posts.filter((post) => post.category === category);
      setAllPosts(tempArray);
    }
  };

  const filterColor = (color) => {
    if (color === "All") {
      setSelectedColor(null); // Reset the selected color
      setAllPosts(posts); // Show all posts
    } else {
      setSelectedColor(color);
      const tempArray = posts.filter((post) => post.color === color);
      setAllPosts(tempArray);
    }
  };

  const filterGender = (gender) => {
    setgender(gender);
    const tempArr = posts.filter((post) => post.gender === gender);
    setAllPosts(tempArr);
  };

  const handleColorModalOpen = () => {
    setIsColorModalOpen(true);
  };

  const handleColorModalClose = () => {
    setIsColorModalOpen(false);
  };
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorModalOpen(false); // Close the modal
    // Implement logic to filter posts based on the selected color
  };

  useEffect(() => {
    console.log(activeUser);
    navigate("/", { replace: true });

    const fetchActiveUser = async () => {
      try {
        if (Cookies.get("jwt")) {
          const res = await axios.post("/api/auth/active-user", {
            token: Cookies.get("jwt"),
          });

          if (res.status === 200) {
            dispatchActiceUser({
              type: "GET_ACTIVE_USER",
              payload: res.data.user,
            });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts/posts/admin");

        if (res.status === 200) {
          setAllPosts(res.data.posts);
          dispatch({ type: "SET_POSTS", payload: res.data.posts.reverse() });
        } else {
          console.log(res.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/auth/all-users");

        if (res.status === 200) {
          dispatchUsers({ type: "SET_USERS", payload: res.data.users });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/comments/all-comments");

        if (res.status === 200) {
          dispatchComments({
            type: "SET_COMMENTS",
            payload: res.data.comments,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
    fetchActiveUser();
    fetchUsers();
    fetchComments();
  }, [dispatch]);

  const clickshopwoman = () => {
    navigate("/woman");
  };
  const clickshopman = () => {
    navigate("/man");
  };

  return (
    <>
      {!admin ? (
        <>
          <div className="slider">
            <figure>
              <div className="slide">
                <div className="slide-text">
                  <h1> Women collection</h1>
                  <Button
                    style={{
                      backgroundColor: "#DE782E",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    className="slidebtn"
                    variant="contained"
                    onClick={clickshopwoman}
                  >
                    Shop now
                  </Button>
                </div>
                <img src={require("../../Images/Untitled (3).png")} alt="" />
              </div>
              <div className="slide">
                <div className="slide-text">
                  <h1 className="men"> Men collection</h1>
                  <Button
                    style={{
                      backgroundColor: "#DE782E",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
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
            <h2> Product overview</h2>
          </div>
        </>
      ) : null}

      {admin ? (
        <>
        <div className="boxes">
    <Box sx={{ minWidth: 275,marginLeft:"20px" }}>
      <Card style={{backgroundColor:"#FDF1E7 "}} variant="outlined">{card}</Card>
    </Box>
    <Box sx={{ minWidth: 275,marginLeft:"20px" }}>
      <Card style={{backgroundColor:"#FDF1E7 "}} variant="outlined">{cardd}</Card>
    </Box>

        </div>
      
        </>
      ) : (
        ""
      )}

      <div className="overview">
        <span className="gender_item" onClick={() => filterCategory("all")}>
          All products
        </span>

        <span className="gender_item" onClick={() => filterGender("woman")}>
          Woman
        </span>

        <span className="gender_item" onClick={() => filterGender("man")}>
          Man
        </span>

        <button className="filterbtn" onClick={handleColorModalOpen}>
          <FilterListIcon
            style={{
              height: "20px",
              width: "20px",
              marginBottom: "-5px",
              marginRight: "6px",
              color: "#fff",
            }}
          />
          <span className="filter">Filter by Color</span>
        </button>
        <Modal
          open={isColorModalOpen}
          onClose={handleColorModalClose}
          aria-labelledby="color-modal-title"
          aria-describedby="color-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 300 }}>
            <Typography id="color-modal-title" variant="h6" component="h2">
              Select Color
            </Typography>
            <Divider />
            <List>
              {[
                "All",
                "white",
                "black",
                "red",
                "green",
                "yellow",
                "pink",
                "blue",
                "gray",
                "orange",
                "beige",
                "purple",
                "brown",
              ].map((color) => (
                <ListItem key={color} button onClick={() => filterColor(color)}>
                  <ListItemIcon>
                    {color === "All" ? (
                      <span></span>
                    ) : (
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: color,
                          marginRight: 8,
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={color} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>

        <div className="select">
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => handleSortOrderChange(e.target.value)}
          >
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="home">
        <div className="home_wrapper">
          <div className="leftHome">
            {allPosts?.length === 0 ? (
              <p className="posts_not_found">No products of {cate} category</p>
            ) : (
              allPosts?.map((post) => {
                if (!selectedColor || post.color === selectedColor) {
                  return (
                    <BlogPostCardHome
                      key={post._id}
                      post={post}
                      color={post.color}
                    />
                  );
                }
                return null;
              })
            )}
          </div>

          <div className="rightHome">
            <h2 className="catogory_heading">Categories</h2>
            <div className="categories_wrapper">
              <span
                className="category_item"
                onClick={() => filterCategory("tshirt")}
              >
                Tshirts
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("dress")}
              >
                Dresses
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("blazer")}
              >
                Blazers
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("jean")}
              >
                Jeans
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("coat")}
              >
                Coats
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("short")}
              >
                Shorts
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("skirt")}
              >
                Skirts
              </span>
              <span
                className="category_item"
                onClick={() => filterCategory("sweater")}
              >
                Sweaters
              </span>
              {/* <span className='category_item' onClick={()=> filterCategory("shoes")}>Shoes</span> */}
              <span
                className="category_item"
                onClick={() => filterCategory("bag")}
              >
                Bags
              </span>
            </div>
          </div>
        </div>
      </div>

      <LatestProducts />
      <Sale />

      <NewProducts />
      <Footer />
    </>
  );
};

export default Home;
