import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";
import "./SinglePost.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageLoader from "../PageLoader/PageLoader";
import { format } from "timeago.js";
import Comments from "../../Components/Comments/Comments";
import { BasketContext } from "../../context/BasketContext";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavContext } from "../../context/FavContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUsersContext } from "../../hooks/useUsersContext";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import Footer from "../../Components/Footer/Footer";
import Cookies from "js-cookie";
import { useAdminContext } from "../../context/AdminContext";

const SinglePost = () => {
  const { dispatch } = usePostsContext();
  const { users, dispatchUsers } = useUsersContext();
  console.log(users);
  const { id } = useParams();
  const { activeUser, dispatchActiceUser } = useActiveUserContext();
  const [currentPost, setCurrentPost] = useState();
  const [postAuthor, setPostAuthor] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const { basketItems } = useContext(BasketContext);
  const { addToBasket, removeFromBasket } = useContext(BasketContext);
  const { favItems, addToFav, removeFromFav } = useContext(FavContext);
  const { admin } = useAdminContext();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/posts/delete-post/${id}`);

      if (res.status === 200) {
        dispatch({ type: "DELETE_POST", payload: res.data.post });
      } else {
        console.log("Post not deleted , Something wents wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = async (post) => {
    try {
      const itemToAdd = {
        _id: post._id,
        title: post.title,
        description: post.description,
        size: post.size,
        price: post.price,
        color: post.color,
        category: post.category,
        gender: post.gender,
        authorId: post.authorId,
        likes: post.likes,
        postImage: post.postImage,
        userType: post.userType,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      // Sepete eklemek için kullanılan düğme
      const basketButton = document.getElementById(`basketButton-${post._id}`);

      if (!basketItems.some((item) => item._id === post._id)) {
        // Eğer sepete ekli değilse, sepete ekle
        const res = await axios.post(
          `/api/auth/user/${activeUser._id}/basketItems`,
          {
            newItem: itemToAdd,
          }
        );
        addToBasket(res.data);
      } else {
        // Eğer sepete ekliyse, sepetten çıkar
        const res = await axios.delete(
          `/api/auth/user/${activeUser._id}/basketItems`,
          {
            data: { itemToDelete: itemToAdd },
          }
        );
        removeFromBasket(itemToAdd);
      }
    } catch (error) {
      console.error("Error adding/removing item to/from basket:", error);
    }
  };

  const handleFav = async (post) => {
    try {
      const itemToAddFav = {
        _id: post._id,
        title: post.title,
        description: post.description,
        size: post.size,
        price: post.price,
        colorr: post.color,
        category: post.category,
        gender: post.gender,
        authorId: post.authorId,
        likes: post.likes,
        postImage: post.postImage,
        userType: post.userType,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      if (!favItems.some((item) => item._id === post._id)) {
        // Eğer favorilerde değilse, favorilere ekle
        const res = await axios.post(
          `/api/auth/user/${activeUser._id}/favItems`,
          {
            newItem: itemToAddFav,
          }
        );
        addToFav(res.data);
      } else {
        // Eğer favorilerdeyse, favorilerden çıkar
        const res = await axios.delete(
          `/api/auth/user/${activeUser._id}/favItems`,
          {
            data: { itemToDelete: itemToAddFav },
          }
        );
        removeFromFav(itemToAddFav);
      }
    } catch (error) {
      console.error("Error adding/removing item to/from fav:", error);
    }
  };

  useEffect(() => {
    const activeUserFromStorage = JSON.parse(
      localStorage.getItem("activeUser")
    );

    if (activeUserFromStorage) {
      dispatchActiceUser({
        type: "GET_ACTIVE_USER",
        payload: activeUserFromStorage,
      });
      console.log(activeUser);
    }
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

    const fetchCurrentPost = async () => {
      try {
        const res = await axios.get(`/api/posts/post/${id}`);

        if (res.status === 200) {
          setCurrentPost(res.data.post);
          console.log(currentPost);
          users?.map((user) => {
            if (user?._id === currentPost.authorId) {
              setPostAuthor(user);
              console.log(postAuthor.name);
            }
          });
          setLikeCount(res.data.post.likes.length);
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

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

    fetchCurrentPost();
    fetchActiveUser();
    fetchUsers();
  }, [id, dispatchActiceUser]);

  return (
    <>
      {currentPost && activeUser ? (
        <div className="single_blog_post_wrapper">
          <div className="single_blog_post">
            <Link to={`/profile/${postAuthor?._id}`}>
              {postAuthor ? (
                <div className="blog_post_author_single">
                  <div className="left">
                    {/* <img
                      src={currentPost ? postAuthor.profileImage : ""}
                      alt=""
                    /> */}
                  </div>
                  <div className="author_name_wrapper">
                    {/* <h2 className="__title">
                      {postAuthor ? postAuthor.name : "XYZ"}
                    </h2> */}
                  </div>
                </div>
              ) : (
                ""
              )}
            </Link>
            <div className="single_post_img_wrapper">
              <img
                src={currentPost ? currentPost.postImage : ""}
                alt="postImg"
              />
            </div>
            <div className="title_and_buttons_wrapper">
              <div className="single_post_title_wrappper">
                <p>{currentPost ? currentPost.title : ""}</p>
              </div>

              {activeUser?._id === currentPost?.authorId ? (
                <div className="buttons_wrapper">
                  <p className="post_icon_wrapper">
                    <Link
                      to={`/update-post/${
                        currentPost ? currentPost?._id : null
                      }`}
                    >
                      <EditIcon className="post_icon" />
                    </Link>
                  </p>
                  <p
                    className="post_icon_wrapper"
                    onClick={() => {
                      handleDelete(currentPost ? currentPost?._id : null);
                    }}
                  >
                    <Link to="/">
                      <DeleteIcon className="post_icon delete_post_icon_home" />
                    </Link>
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="author_and_timestamps">
              {/* <p>
                <span className="author_txxt">Author</span> : {postAuthor?.name}
              </p> */}
              {/* {postAuthor ? <p>{format(postAuthor.updatedAt)}</p> : ""} */}
            </div>

            {!admin ? (
              <>
                <Button style={{marginLeft:"-20px"}}
                  size="small"
                  variant="text"
                  className={
                    favItems.some((item) => item._id === currentPost._id)
                      ? "remove-btn-fav"
                      : "add-btn-fav"
                  }
                  onClick={() => handleFav(currentPost)}
                >
                  {favItems.some((item) => item._id === currentPost._id) ? (
                    <FavoriteIcon
                      style={{
                        width: "50px",
                        height: "25px",
                        color: "#DC4944",
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      style={{
                        width: "50px",
                        height: "25px",
                        color: "#DC4944", // Kırmızı renk
                      }}
                    />
                  )}
                </Button>
              </>
            ) : (
              " "
            )}

            {!(activeUser._id === currentPost?.authorId) ? (
              <>
                <Button 
                 style={{marginLeft:'-25px'}}
                  size="small"
                  id={`basketButton-${currentPost._id}`}
                  variant="text"
                  className={
                    basketItems.some((item) => item._id === currentPost._id)
                      ? "remove-btn"
                      : "add-btn"
                  }
                  onClick={() => handleClick(currentPost)}
                >
                  {basketItems.some((item) => item._id === currentPost._id) ? (
                    // Show RemoveShoppingCartIcon if the item is in the basket
                    <span className="btn-body">
                      <RemoveShoppingCartIcon
                        style={{
                          paddingLeft: 10,
                          width: "50px",
                          height: "25px",
                          color: "orange",
                          transform: "translateY(2.6px)",
                        }}
                      />
                    </span>
                  ) : (
                    // Show AddShoppingCartIcon if the item is not in the basket
                    <span className="btn-body">
                      <AddShoppingCartIcon
                        style={{
                          paddingLeft: 10,
                          width: "50px",
                          height: "25px",
                         
                          color: "orange",
                          transform: "translateY(2.6px)",
                        }}
                      />
                    </span>
                  )}
                </Button>
              </>
            ) : (
              ""
            )}

            <div className="single_post_description_wrapper">
              <p className="red-text">
                Description:{" "}
                <span className="span">
                  {" "}
                  {currentPost ? currentPost.description : ""}
                </span>
              </p>
            </div>
            <div className="single_post_description_wrapper">
              <p className="red-text">
                Price:{" "}
                <span className="span">
                  {" "}
                  {currentPost ? `${currentPost.price}$` : ""}
                </span>
              </p>
            </div>

            <div className="single_post_description_wrapper">
              <p className="red-text">
                {" "}
                Size:{" "}
                <span className="span">
                  {currentPost ? currentPost.size : ""}
                </span>{" "}
              </p>
            </div>

            <div className="single_post_description_wrapper">
              <div className="red-text">
                {" "}
                Color:
                {currentPost && currentPost.color ? (
                  <div
                    className={`color-indicator ${currentPost.color.toLowerCase()}`}
                  ></div>
                ) : (
                  console.log("color yoxdu")
                )}
              </div>
              {/* <p>{currentPost ? currentPost.color : ""}</p> */}
            </div>
            <Comments post={currentPost} />
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
      <Footer />
    </>
  );
};

export default SinglePost;
