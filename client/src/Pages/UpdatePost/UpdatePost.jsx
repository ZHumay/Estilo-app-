import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./UpdatePost.css";
import { usePostsContext } from "../../hooks/usePostsContext";
import Footer from "../../Components/Footer/Footer";

const UpdatePost = () => {
  const {posts, dispatch} = usePostsContext();

  const { id } = useParams();


  const navigate = new useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("maindishes");
  let [blogImage, setBlogImage] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [preparationWork, setPreparationWork] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cooking, setCooking] = useState("");
  const [person, setPerson] = useState("1");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("blogImage", blogImage);
    formdata.append("ingredients", ingredients);
    formdata.append("preparationWork", preparationWork);
    formdata.append("preparation", preparation);
    formdata.append("cooking", cooking);
    formdata.append("person", person);

    axios.patch(`/api/posts/update-post/${id}`, formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Greate", res.data.msg, "success");
          dispatch({type : "UPDATE_POST", payload : res.data.post})

          navigate("/", { replace: true });
        } else {
          console.log("Something wents wrong");
          Swal.fire("Oops", res.data.msg, "info");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Oops", "Something wents wrong", "info");
      });
  };

  const handlePostingLoading = () => {

  };

  const loadPost = async () =>{
    try{
       const res = await axios.get(`http://localhost:8000/api/posts/post/${id}`);

       if(res.status === 200){
          setTitle(res.data.post.title);
          setDescription(res.data.post.description);
          setCategory(res.data.post.category);
          setPerson(res.data.post.person)
          setPreparation(res.data.post.preparation)
          setCooking(res.data.post.cooking)
          setPreparationWork(res.data.post.preparationWork)
          setIngredients(res.data.post.ingredients)
       }
       else{
        console.log("Something wents wrong");
       }
    }
    catch(error){
      console.log(error.message);
    }
  }

  useEffect(()=>{
      loadPost();
  },[])

  return (
   <>
    <div className="create_post_container">
      <form encType="multipart/form-data" className="createPostForm" onSubmit={handleFormSubmit}>
        <div className="create_post_heading">
          <h2>Update Post</h2>
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter the title"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post description : </label>
          <textarea
            type="text"
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter the description"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Select post category : </label>
          <select
            name="cars"
            onChange={(e) => {
              const selectedCategory = e.target.value;
              setCategory(selectedCategory);
            }}
          >
            <option value="maindishes">Main Dishes</option>
            <option value="desserts">Desserts</option>
            <option value="soups">Soups</option>
            <option value="salads">Salads</option>
            <option value="snacks">Snacks</option>
            <option value="beverages">Beverages</option>
            <option value="cookie">Cookie</option>
            <option value="cake">Cake</option>
            <option value="icecream">Ice Cream</option>
          </select>
        </div>

        <div className="input_field">
          <label htmlFor="#">Person : </label>
          <select
            name="cars"
            onChange={(e) => {
              const selectedPerson = e.target.value;
              setPerson(selectedPerson);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>

        <div className="input_field">
          <label htmlFor="#">Preparation time : </label>
          <input
            type="number"
            rows={5}
            value={preparation}
            onChange={(e) => {
              setPreparation(e.target.value);
            }}
            placeholder="Enter the preparation time"
            required
          />
        </div>
        <div className="input_field">
          <label htmlFor="#">Cooking time : </label>
          <input
            type="number"
            rows={5}
            value={cooking}
            onChange={(e) => {
              setCooking(e.target.value);
            }}
            placeholder="Enter the cooking time"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post preparation process : </label>
          <textarea
            type="text"
            rows={5}
            value={preparationWork}
            onChange={(e) => {
              setPreparationWork(e.target.value);
            }}
            placeholder="Enter the preparation"
            required
          />
        </div>

        <div className="input_field">
          <label htmlFor="#">Enter post ingredients : </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
            }}
            placeholder="Enter the ingredients"
            required
          />
        </div>


        <div className="post_btn_wrapper">
          <button onClick={handlePostingLoading}>
           Update Product
          </button>
        </div>
      </form>
    </div>
    <Footer/>
   </>
  );
};

export default UpdatePost;
