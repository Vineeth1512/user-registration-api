const express = require("express");
const router =express.Router();
const userController= require("../controllers/user.controller");
router.post("/signup",userController.signup);
router.get("/login",userController.login);

router.get("/users",userController.getAllUser);

router.delete('/delete/:id',userController.deleteUser);
module.exports =router;