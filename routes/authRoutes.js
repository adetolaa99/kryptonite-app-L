const express = require("express");

const authController = require("../controllers/authController.js");

const AuthRouter = express.Router();

AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);
AuthRouter.post("/verify-otp", authController.verifyOtp);

module.exports = AuthRouter;
