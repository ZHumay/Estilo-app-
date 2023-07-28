const router = require("express").Router();

const { get_login, get_register, post_login, post_register, get_all_users, get_user, update_profile_image, update_user, delete_user, verify_user, active_user,confirm } = require("../controllers/authControllers");

router.get("/get-login", get_login );
router.post("/post-login", post_login );
router.get("/get-register", get_register );
router.post("/post-register", post_register );


router.get("/all-users", get_all_users);
router.get("/user/:id", get_user);
router.post("/active-user", active_user);

router.patch("/update-user", update_user);
router.patch("/update-profile-image/:id", update_profile_image);
router.delete("/delete-user/:id", delete_user);
router.post('/confirm', confirm)

router.post("/verify-user", verify_user);

module.exports = router;