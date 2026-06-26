import express from "express";
import { addPost, getPost, getPosts } from "./postsController.js";
import { requireAuth, requireDeveloper } from "../../middleware/auth.js";

const postsRoute = express.Router();

postsRoute.get("/", getPosts);
postsRoute.get("/:id", getPost);
postsRoute.post("/", requireAuth, requireDeveloper, addPost);

export default postsRoute;
