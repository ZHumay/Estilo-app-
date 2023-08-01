import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';
import './BlogPostCardHome.css';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../../store/cartActions";

const BlogPostCardHome = ({ post }) => {
  const cartItems = useSelector((state) => state.cartReducer.items);
  const navigate = useNavigate()
  const { activeUser } = useActiveUserContext();
  const { posts, dispatch } = usePostsContext();
  const [postCounts, setpostCounts] = useState([]);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(activeUser?._id));




  const isAdded = (postId) => {
    return cartItems.some((item) => item.id === postId);
  };

  const handleAddToCart = (post) => {
    dispatch(addToCart(post));
    const updatedCartItems = [...cartItems, post];
    setpostCounts((prevState) => ({
      ...prevState,
      [post._id]: (prevState[post._id] || 0) + 1,
    }));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    console.log("true");

  };

  const handleRemoveFromCart = (postId) => {
    dispatch(removeFromCart(postId));
    const updatedCartItems = cartItems.filter((item) => item.id !== postId);
    setpostCounts((prevState) => {
      const updatedCounts = { ...prevState };
      delete updatedCounts[postId];
      return updatedCounts;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };


  const handleSettingId = async (currentPost_Id) => {
    try {
      // handleSettingId function logic can be implemented here if needed
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/posts/delete-post/${id}`);

      if (res.status === 200) {
        dispatch({ type: 'DELETE_POST', payload: res.data.post });
        window.location.reload();

      } else {
        console.log('Post not deleted, Something went wrong');
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleLikeDislike = async (postId) => {
    try {
      const res = await axios.post(`/api/posts/like-dislike/${postId}`, {
        userId: activeUser?._id,
      });

      if (res.status === 200) {
        setLikeCount(res.data.liked ? likeCount + 1 : likeCount - 1);
        setIsLiked(res.data.liked);
      } else {
        console.log('Post not liked or disliked');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="blog-post-card-home">
      <div className="blog-post-home-image_wrapper">
        <img src={post?.postImage} alt="post image" />
      </div>

      <div className="post_home_title">
        <p>{post?.title}</p>
      </div>

      {activeUser && (
        <div className="post_home_bottom_wrapper">
          <div className="left">
            <div className="like">
              <p
                className="like_actual_icon"
                onClick={() => {
                  handleLikeDislike(post?._id);
                }}
              >
                <i
                  className={`${
                    isLiked ? 'fa-solid fa-star liked' : 'fa-regular fa-star'
                  }`}
                ></i>
                <span className="like_count">{likeCount}</span>
              </p>
            </div>
            <Link
              className="view_post_home"
              to={`/post/${post?._id}`}
              onClick={() => handleSettingId(post?._id)}
            >
              More info...
            </Link>
          </div>

          <div className="right">
            {activeUser._id === post?.authorId ? (
              <>
                <p className="post_icon_wrapper">
                  <Link to={`/update-post/${post?._id}`}>
                    <EditIcon className="post_icon" />
                  </Link>
                </p>
                <p
                  className="post_icon_wrapper"
                  onClick={() => {
                    handleDelete(post?._id);
                  }}
                >
                  <Link to="/">
                    <DeleteIcon className="post_icon delete_post_icon_home" />
                  </Link>
                </p>
              </>
            ) : (
              isAdded(post?.postId) ? (
                <Button
                  style={{
                    color: "#A569BD",
                    border: "none",
                    marginTop: "20px",
                  }}
                  variant="outlined"
                  onClick={() => handleRemoveFromCart(post?.postId)}
                >
                  <RemoveShoppingCartOutlinedIcon style={{ marginLeft: "-35px" }} />
                </Button>
              ) : (
                <Button
                  style={{
                    color: "#A569BD",
                    marginTop: "20px",
                    border: "none"
                  }}
                  variant="outlined"
                  onClick={() => handleAddToCart(post)} // Assuming you pass the entire post object to add to the cart
                >
                  <AddShoppingCartOutlinedIcon style={{ marginLeft: "-35px" }} />
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostCardHome;
