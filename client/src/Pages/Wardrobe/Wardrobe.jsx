import React, { useEffect , useState } from 'react';
import "./Wardrobe.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useActiveUserContext } from '../../hooks/useActiveUserContext';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useUsersContext } from '../../hooks/useUsersContext';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import Footer from '../../Components/Footer/Footer';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CachedIcon from "@mui/icons-material/Cached";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Box,
  Button, Divider, List, ListItem, ListItemIcon, ListItemText, Modal, Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAdminContext } from '../../context/AdminContext';
import BlogPostCardHomeUser from '../../Components/BlogPostCardHomeUser/BlogPostCardHomeUser';
import {useUserPostsContext} from "../../hooks/useUserPostsContext"
const Wardrobe = () => {

  const navigate = useNavigate();
  const {comments, dispatchComments} = useCommentsContext();
  const {posts, dispatch} = useUserPostsContext(); 
  const {activeUser, dispatchActiceUser} = useActiveUserContext();
  const {users, dispatchUsers} = useUsersContext();
  const [allPosts, setAllPosts] = useState();
  const [cate, setCate] = useState();
  const [gender,setgender]=useState()
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const {admin}=useAdminContext()


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgb(216, 216, 216)',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};



  const filterCategory = (category) =>{
    setCate(category);
    if(category === "all"){
      setAllPosts(posts);
    }
    else{
      const tempArray = posts.filter((post) => post.category === category);
      setAllPosts(tempArray);
    }
   
  }

  const filterColor = (color) => {
    setSelectedColor(color);
      const tempArray = posts.filter((post) => post.color === color);
      setAllPosts(tempArray);
    
  };
  

  const filterGender=(gender)=>{
     setgender(gender);
     const tempArr=posts.filter((post)=>post.gender===gender)
     setAllPosts(tempArr)
  }

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
    
  useEffect(()=>{
    console.log(activeUser);
      navigate("/wardrobe", {replace : true});

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

        const fetchPosts = async () =>{
          try{
            const res = await axios.get("/api/posts/posts");

            if(res.status === 200){
              setAllPosts(res.data.posts);
              dispatch({type :"SET_POSTS_USER", payload : res.data.posts.reverse()})
            }
            else{
              console.log(res.data.msg)
            }

          }catch(error){
            console.log(error.message);
          }
      }

      const fetchUsers = async () =>{
        try{
          const res = await axios.get("/api/auth/all-users");

          if(res.status === 200){
             dispatchUsers({type : "SET_USERS", payload : res.data.users});
          }
        }
        catch(error){
          console.log(error.message);
        }
      }


      const fetchComments = async () =>{
        try{
          const res = await axios.get("/api/comments/all-comments");

          if(res.status === 200){
            dispatchComments({ type : "SET_COMMENTS" , payload : res.data.comments});
          }
        }
        catch(error){
          console.log(error.message);
        }
      }

     fetchPosts();
     fetchActiveUser();
     fetchUsers();
     fetchComments();

  },[dispatch])



  return (   
    <>
 {!admin &&activeUser ? (
    <>
   <div className="overview">

<span className='gender_item' onClick={()=> filterCategory("all")}>All products</span>


<span className='gender_item' onClick={()=> filterGender("woman")}>Woman</span>

<span className='gender_item' onClick={()=> filterGender("man")}>Man</span>

<button className="filterbtn" onClick={handleColorModalOpen}>
<FilterListIcon
style={{
height: "20px",
width: "20px",
marginBottom: "-5px",
marginRight: "6px",
}}
/>
<span style={{ color: "rgb(70, 70, 70)", fontSize: "15px" }}>
Filter by Color
</span>
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
<List >
{[
'white', 'black', 'red', 'green', 'yellow', 'pink',
'blue', 'gray', 'orange', 'beige', 'purple', 'brown'
].map((color) => (
<ListItem
key={color}
button
onClick={() =>  filterColor(color)}
>
<ListItemIcon>
<div
  style={{
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: 8,
  }}
/>
</ListItemIcon>
<ListItemText primary={color} />
</ListItem>
))}
</List>

</Box>
</Modal>

</div>

<div className='home_user'>

<div className="home_wrapper_user">
<div className="leftHome_user">
    {
  

    allPosts?.length === 0 ? <p className='posts_not_found'>No products of {cate} category</p>: 
    allPosts?.map((post) => {
      if (!selectedColor || post.color === selectedColor) {
        return <BlogPostCardHomeUser key={post._id} post={post} color={post.color} />;
      }
      return null;
    })
    
     
   
  }
</div>

<div className="rightHome">
   <h2 className='catogory_heading'>Categories</h2>
   <div className="categories_wrapper">
        <span className='category_item' onClick={()=> filterCategory("tshirt")}>Tshirts</span>
        <span className='category_item' onClick={()=> filterCategory("dress")}>Dresses</span>
        <span className='category_item' onClick={()=> filterCategory("blazer")}>Blazers</span>
        <span className='category_item' onClick={()=> filterCategory("jean")}>Jeans</span>
        <span className='category_item' onClick={()=> filterCategory("coat")}>Coats</span>
        <span className='category_item' onClick={()=> filterCategory("short")}>Shorts</span>
        <span className='category_item' onClick={()=> filterCategory("skirt")}>Skirts</span>
        <span className='category_item' onClick={()=> filterCategory("sweater")}>Sweaters</span>
        <span className='category_item' onClick={()=> filterCategory("shoes")}>Shoes</span>
        <span className='category_item' onClick={()=> filterCategory("bag")}>Bags</span>
   </div>
</div>


</div>

</div>
<Footer/>
    </>
 ) :( navigate("/"))}
   
   </>
  
  )
}

export default Wardrobe
