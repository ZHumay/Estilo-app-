const router = require("express").Router();
const { create_post, get_post, all_posts, delete_post, update_post, like_dislike, incrementOrderedCount, decrementOrderedCount, get_productcountinbasket, get_allcount, } = require("../controllers/postController");

router.post("/create-post", create_post);
router.get("/post/:id", get_post);
router.get("/posts", all_posts);
router.delete("/delete-post/:id", delete_post);
router.patch("/update-post/:id", update_post)
router.post("/like-dislike/:id", like_dislike)
router.post('/post/:id/incrementOrderedCount', incrementOrderedCount);
router.post('/post/:id/decrementOrderedCount',decrementOrderedCount);
router.get("/post/:id/productcountinbasket", get_productcountinbasket);
router.get("/get-allcount", get_allcount);


module.exports = router;