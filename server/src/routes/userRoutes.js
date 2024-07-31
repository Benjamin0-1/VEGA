const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite } = require("../handlers/userHandlers");
const { getProfile, updateProfile, changePassword } = require("../services/usersServices");
const loginRequire = require("../middlewares/loginRequire");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/",loginRequire,)
    .post("/favorite", loginRequire, addFavorite)
    .get("/favorite",loginRequire, getFavorites)
    .delete("/favorite",loginRequire, deleteFavorite)
    .get("/profile", loginRequire, getProfile) 
    .put("/profile", loginRequire, updateProfile)
    .post('/change-password', loginRequire, changePassword);
    
module.exports = userRouter