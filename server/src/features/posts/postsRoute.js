import express from "express";
import { addPost, getPost, getPosts, removePost } from "./postsController.js";
import { requireAuth, requireDeveloper } from "../../middleware/auth.js";

const postsRoute = express.Router();

postsRoute.get("/", getPosts);
postsRoute.get("/:id", getPost);
postsRoute.post("/", requireAuth, requireDeveloper, addPost);
postsRoute.delete("/:id", requireAuth, removePost);

export default postsRoute;
