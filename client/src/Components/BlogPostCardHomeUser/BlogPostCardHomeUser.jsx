import React, { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';
import '../BlogPostCardHome/BlogPostCardHome.css';
import { BasketContext } from '../../context/BasketContext';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const BlogPostCardHomeUser = ({ post,color }) => {
  const { activeUser } = useActiveUserContext();
  const { posts, dispatch } = usePostsContext();
  const { basketItems } = useContext(BasketContext);
  const { addToBasket, removeFromBasket,  } = useContext(BasketContext);

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(activeUser?._id));

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
        window.location.reload()
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

  // const handleClick = (post) => {
  //   if (!basketItems.some((item) => item._id === post._id)) {
  //     addToBasket(post)
  //   }
  //   else (
  //     removeFromBasket(post)

  //   )
  // }


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
    <div className={`blog-post-card-home ${color ? `color-${color}` : ''}`}>
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
              More...
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
            ) :(    <Button
              size="small"
              variant="text"
              className={basketItems.some((item) => item._id === post._id) ? "remove-btn" : "add-btn"}
              onClick={() => handleClick(post)}
            >
              {basketItems.some((item) => item._id === post._id) ? (
                // Show RemoveShoppingCartIcon if the item is in the basket
                <span className="btn-body">
                  <RemoveShoppingCartIcon style={{ paddingLeft: 10, width: "50px", height: "20px", color: "a569bd" }} />
                </span>
              ) : (
                // Show AddShoppingCartIcon if the item is not in the basket
                <span className="btn-body">
                  <AddShoppingCartIcon style={{ paddingLeft: 10, width: "50px", height: "20px", color: "a569bd" }} />
                </span>
              )}
            </Button>
            )}
          </div> 
        
        </div>
      )}
    </div>
  );
};

export default BlogPostCardHomeUser;

