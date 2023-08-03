import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePostsContext } from "../../hooks/usePostsContext";
import "./SinglePost.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageLoader from "../PageLoader/PageLoader";
import { format } from "timeago.js";
import Comments from "../../Components/Comments/Comments";

import { useUsersContext } from "../../hooks/useUsersContext";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import Footer from "../../Components/Footer/Footer";
import Cookies from "js-cookie";

const SinglePost = () => {
  const { dispatch } = usePostsContext();
  const { users } = useUsersContext();
  
  const {id} = useParams();
  const {activeUser, dispatchActiceUser} = useActiveUserContext();
  const [currentPost, setCurrentPost] = useState();
  const [postAuthor, setPostAuthor] = useState();
  const [likeCount, setLikeCount] = useState(0);



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

  useEffect(() => {
    const activeUserFromStorage = JSON.parse(localStorage.getItem("activeUser"));

    // Eğer "activeUser" değeri depolama alanında varsa, context içinde güncelle
    if (activeUserFromStorage) {
      dispatchActiceUser({ type: "GET_ACTIVE_USER", payload: activeUserFromStorage });
      console.log(activeUser);

    }

    const fetchCurrentPost = async () => {
      try {

        const res = await axios.get(`/api/posts/post/${id}`);

        if (res.status === 200) {
          setCurrentPost(res.data.post);
          setLikeCount(res.data.post.likes.length);

          users?.map((user) => {
            if (user?._id === res.data.post.authorId) {
              setPostAuthor(user);
            }
          });
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
   
      const fetchActiveUser = async () =>{
        try{

          if(Cookies.get("jwt")){
              const res = await axios.post("/api/auth/active-user", {token : Cookies.get("jwt")} );

              if(res.status === 200){
                dispatchActiceUser({type : "GET_ACTIVE_USER", payload : res.data.user});
              }
              
            }
          }
          catch(error){
            console.log(error.message);
          }
      }


    fetchCurrentPost();
    fetchActiveUser()
  }, [id,dispatchActiceUser]);


  return (
    <>
      {currentPost&&activeUser? (
        <div className="single_blog_post_wrapper">
          <div className="single_blog_post">
            <Link to={`/profile/${postAuthor?._id}`}>
              {postAuthor ? (
                <div className="blog_post_author_single">
                  <div className="left">
                    <img
                      src={postAuthor ? postAuthor.profileImage : ""}
                      alt=""
                    />
                  </div>
                  <div className="author_name_wrapper">
                    <h2 className="__title">
                      {postAuthor ? postAuthor.name : "XYZ"}
                    </h2>
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
              <p>
                <span className="author_txxt">Author</span> : {postAuthor?.name}
              </p>
              {postAuthor ? <p>{format(postAuthor.updatedAt)}</p> : ""}
            </div>
        

            <div className="single_post_description_wrapper">
              <p className="red-text">Description: <span className="span"> {currentPost ? currentPost.description : ""}</span></p>
            </div>
      
            <div className="single_post_description_wrapper">
              <p className="red-text"> Size: <span className="span">{currentPost ? currentPost.size : ""}</span> </p>
            </div>
            
            <div className="single_post_description_wrapper">
              <div className="red-text"> Color:
              {currentPost && currentPost.color ? (
          <div  className={`color-indicator ${currentPost.color.toLowerCase()}`}
          >
          </div>
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
      <Footer/>
    </>
  );
};

export default SinglePost;