import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./CreatePost.css";
import SendingLoader from "../../Components/SendingLoader/SendingLoader";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import Footer from "../../Components/Footer/Footer";

const CreatePost = () => {

  const { dispatch } = usePostsContext();
  const { activeUser } = useActiveUserContext();
  const navigate = new useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [preparationWork, setPreparationWork] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cooking, setCooking] = useState("");
  const [category, setCategory] = useState("maindishes");
  const [person, setPerson] = useState("1");
  let [blogImage, setBlogImage] = useState([]);
  const [prevImage, setPrevImage] = useState([]);
  const [imageSelected, setImageSelected] = useState(false)
  const [sending, setSending] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setSending(true);

    let formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("ingredients", ingredients);
    formdata.append("preparationWork", preparationWork);
    formdata.append("preparation", preparation);
    formdata.append("cooking", cooking);
    formdata.append("category", category);
    formdata.append("person", person);
    formdata.append("blogImage", blogImage);
    formdata.append("activeUserId", activeUser._id);

    axios
      .post("/api/posts/create-post", formdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {

          setSending(false);

          dispatch({type :"CREATE_POST", payload : res.data.post}); 


          Swal.fire("Greate", res.data.msg, "success");

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

  return (
   <>
    <div className="create_post_container">
      <form encType="multipart/form-data" className="createPostForm" onSubmit={handleFormSubmit}>
        <div className="create_post_heading_wrapper">
          <h2 className="create_post_heading">Create New Recipe</h2>
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
            name="category"
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
            name="person"
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

        <div className="input_field">
        <label htmlFor="#">Select post image : </label>
          <input
            type="file"
            onChange={(e) => {
              setBlogImage(e.target.files[0]);
              setPrevImage(URL.createObjectURL(e.target.files[0]));
              setImageSelected(true);
            }}

            required
          />
          <br />
          {imageSelected ?<img className="prev-image" width={200} height={150} src={prevImage} alt="image preview" /> : ""}
        </div>

        <div className="post_btn_wrapper">
          <button onClick={handlePostingLoading}>
          { sending ? <SendingLoader /> : "Create New Product" }
          </button>
        </div>
      </form>
    </div>
    <Footer/>
   </>
  );
};

export default CreatePost;
