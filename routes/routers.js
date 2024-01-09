const express = require("express");
//const userdb = require("../models/userSchema");
const { register, login, validuser, logout } = require("../controller/userController");
const router = new express.Router();
const authenticate = require("../middleware/authenticate");
const userdb = require("../models/userSchema");

//const bcrypt = require("bcryptjs");

router.post("/register", register);

router.post("/login", login);

//user valid
router.get("/validuser",authenticate,validuser);

//logout
router.get("/logout",authenticate,logout);

module.exports = router;















//2 way connection
//1234---> #%@*
//#%@*---> 1234

//hasing compare
//1 way connection
// 12345 --->> @#$%&
// 12345 --->>(@#$%&, @#$%&) = true
