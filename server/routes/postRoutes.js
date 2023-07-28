
const router = require("express").Router();
const { create_post, get_post, all_posts, delete_post, update_post, like_dislike  } = require("../controllers/postController");

router.post("/create-post", create_post);
router.get("/post/:id", get_post);
router.get("/posts", all_posts);
router.delete("/delete-post/:id", delete_post);
router.patch("/update-post/:id", update_post)
router.post("/like-dislike/:id", like_dislike);

module.exports = router;
