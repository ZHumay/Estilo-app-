const cloudinary = require("cloudinary").v2;
const postModel = require("../models/postModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const create_post = async (req, res) => {
  try {
    const file = req.files.blogImage;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      try {
        if (result) {
          const post = new postModel({
            title: req.body.title,
            color: req.body.color,
            price: req.body.price,
            size:req.body.size,
            description: req.body.description,
            category: req.body.category,
            gender:req.body.gender,
            authorId : req.body.activeUserId,
            postImage: result.url,
          });

          const savePost = await post.save();

          if (savePost) {
            res
              .status(200)
              .json({ post: savePost, msg: "Product created successfully !!" });

          } else {
            res.json({ msg: "Something wents wrong" });
          }
        } else {
          console.log(err);
          res.json({ msg: err });
        }
      } catch (error) {
        res.json({ msg: error.message });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const get_post = async (req, res) => {

  const id = req.params.id;

  try{
    const post = await postModel.findById(id);

    if(post){
      res.status(200).json({post : post});
    }
    else{
      res.json({msg : "Post not found"});
    }
  }catch(error){
    console.log(error.message);
    res.json({msg : error.message});
  }
};

const all_posts = async (req, res) => {
  try{

    const posts = await postModel.find();

    if(posts){
      res.status(200).json({msg : "Data fetched successfully", posts : posts})
    }

  }catch(error){
    console.log(error.message);
    res.json({msg : "Data can't fetch"});
  }
};


const update_post = async (req, res) => {
  try {
    if (req.files) {
      // Handle image upload if there is a new image
      const file = req.files.blogImage;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        try {
          if (result) {
            // Update post with the new image URL
            const updatedPost = {
              title: req.body.title,
              color: req.body.color,
              price: req.body.price,
              size: req.body.size,
              description: req.body.description,
              category: req.body.category,
              gender:req.body.gender,
              authorId: req.body.activeUserId,
              postImage: result.url,
            };

            const post = await postModel.findByIdAndUpdate(req.params.id, updatedPost);

            if (post) {
              res.status(200).json({ msg: "Product updated successfully", post: post });
            } else {
              res.json({ msg: "Post not updated, Something went wrong" });
            }
          } else {
            console.log(err);
            res.json({ msg: err });
          }
        } catch (error) {
          res.json({ msg: error.message });
        }
      });
    } else {
      // Update post without uploading a new image
      const updatedPost = {
        title: req.body.title,
        color: req.body.color,
        price: req.body.price,
        size: req.body.size,
        description: req.body.description,
        category: req.body.category,
        gender:req.body.gender,
        authorId: req.body.activeUserId,
      };

      const post = await postModel.findByIdAndUpdate(req.params.id, updatedPost);

      if (post) {
        res.status(200).json({ msg: "Product updated successfully", post: post });
      } else {
        res.json({ msg: "Post not updated, Something went wrong" });
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const delete_post = async (req, res) => {
  try{
    const deletePost = await postModel.findByIdAndDelete(req.params.id);

    if(deletePost){
      res.status(200).json({msg : "Post deleted Successfully", post : deletePost});
    }
    else{
      res.json({msg : "Post not deleted"})
    }

  }catch(error){
     console.log(error.message);
     res.json({msg : "Post not deleted"});
  }
};


const like_dislike = async (req, res) =>{
  try{
    const postId = req.params.id;
    const userId = req.body.userId;

    const post = await postModel.findById(postId);

    if(post){
      
      if(!post.likes.includes(userId)){
        await postModel.updateOne({_id : postId}, {$push : { likes : userId}});
        res.status(200).json({msg : "Post has been liked", liked : true})
      }
      else{
        await postModel.updateOne({ _id : postId },{ $pull: { likes : userId }});
        res.status(200).json({msg : "Post has been disliked", liked : false});
        console.log("Post has been disliked");
      }
    }
    else{
      res.json({msg : "Something wents wrong", liked : false});
    }

  }
  catch(error){
    res.json({msg : error.message, liked : false});
  }
}

module.exports = {
  create_post,
  get_post,
  all_posts,
  update_post,
  delete_post,
  like_dislike
};
