const express = require("express"); // Importing express

const { register, login, getUser } = require("../controllers/authController");

const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewares/auth");

const router = express.Router(); // Spinning up router

// =================================
// router.post("/register", register); // creating a post router pathway for register
router.route("/register").post(register).all(methodNotAllowed); // Advance method of craeting post path way and Error Handling

// ==============================
// router.post("/login", login); // creating a post router pathway for login
router.route("/login").post(login).all(methodNotAllowed); // Advance method of craeting post path way and Error Handling

// ==============================
// router.route("/user").post(auth, getUser) // creating a post router for valid token
router.route("/user").post(auth, getUser).all(methodNotAllowed);
// =============================
module.exports = router;
