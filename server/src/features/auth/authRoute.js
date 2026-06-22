import express from "express";
import { signup, login, getUserByUsername } from "./authController.js";

const authRoute = express.Router();

// Signup
authRoute.post("/signup", signup);
// Login
authRoute.post("/login", login);
// Get username
authRoute.get("/users", getUserByUsername);

export default authRoute;