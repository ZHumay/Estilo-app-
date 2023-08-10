import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostCardHome from '../../Components/BlogPostCardHome/BlogPostCardHome';
import { usePostsContext } from '../../hooks/usePostsContext';
import { useNavigate } from 'react-router-dom';
import { useActiveUserContext } from '../../context/activeUserContext';

const Man = () => {
  const { posts } = usePostsContext();
  const [manPosts, setManPosts] = useState([]);
  const { activeUser } = useActiveUserContext();
  const navigate= useNavigate()
  const [category, setCategory] = useState('all'); // Kategori filtrelemesi için state

  useEffect(() => {
    const fetchManPosts = async () => {
      try {
        const res = await axios.get('/api/posts/posts');

        if (res.status === 200) {
          let manPostsArray = res.data.posts.filter(post => post.gender === 'man');

          // Kategoriye göre filtreleme
          if (category !== 'all') {
            manPostsArray = manPostsArray.filter(post => post.category === category);
          }

          setManPosts(manPostsArray);
        } else {
          console.log(res.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchManPosts();
  }, [category]); 

  return (
    activeUser? (  <div className='home'>
    <div className="home_wrapper">
      <div className="leftHome">
      {manPosts.map(post => (
        <BlogPostCardHome key={post._id} post={post} />
      ))}
    </div>
    <div className="rightHome">
           <h2 className='catogory_heading'>Categories</h2>
           <div className="categories_wrapper">
                <span className='category_item' onClick={()=> setCategory("tshirt")}>Tshirts</span>
                <span className='category_item' onClick={()=> setCategory("dress")}>Dresses</span>
                <span className='category_item' onClick={()=> setCategory("blazer")}>Blazers</span>
                <span className='category_item' onClick={()=> setCategory("jean")}>Jeans</span>
                <span className='category_item' onClick={()=> setCategory("coat")}>Coats</span>
                <span className='category_item' onClick={()=> setCategory("short")}>Shorts</span>
                <span className='category_item' onClick={()=> setCategory("skirt")}>Skirts</span>
                <span className='category_item' onClick={()=> setCategory("sweater")}>Sweaters</span>
                <span className='category_item' onClick={()=> setCategory("shoes")}>Shoes</span>
                <span className='category_item' onClick={()=> setCategory("bag")}>Bags</span>
                <span className='category_item' onClick={()=> setCategory("all")}>All</span>

           </div>
      </div>
    </div>
    </div> ) :(navigate("/login"))
  
  );
};

export default Man;
