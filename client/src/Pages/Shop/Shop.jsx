import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../Shop/shop.css";
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
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAdminContext } from '../../context/AdminContext';
import Carousel from "../../Components/CarouselSwiper/Carousel";

function Shop() {
  const navigate = useNavigate();
  const { comments, dispatchComments } = useCommentsContext();
  const { posts, dispatch } = usePostsContext();
  const { activeUser, dispatchActiceUser } = useActiveUserContext();
  const { users, dispatchUsers } = useUsersContext();
  const [allPosts, setAllPosts] = useState();
  const [cate, setCate] = useState();
  const [gender, setgender] = useState();
  const {admin}=useAdminContext()

  const filterCategory = (category) => {
    setCate(category);
    if (category === "all") {
      setAllPosts(posts);
    } else {
      const tempArray = posts.filter((post) => post.category === category);
      setAllPosts(tempArray);
    }
  };

  const filterGender = (gender) => {
    setgender(gender);
    const tempArr = posts.filter((post) => post.gender === gender);
    setAllPosts(tempArr);
  };

  useEffect(() => {
    console.log(activeUser);
    navigate("/shop", { replace: true });

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

    fetchPosts();
  }, [dispatch]);

  return (
    <>
      {activeUser && !admin ? (
        <div className="shop">
          <div className="home">
            <div className="home_wrapper">
              <div className="leftHome">
                {allPosts?.length === 0 ? (
                  <p className="posts_not_found">
                    No Products of {cate} Category
                  </p>
                ) : (
                  allPosts?.map((post) => {
                    return <BlogPostCardHome key={post._id} post={post} />;
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
        </div>
      ) : (
        navigate("/login")
      )}
      <h2 className="popular-products">Most popular products</h2>
      <Carousel/>
      <Footer />

    </>
  );
}

export default Shop;
