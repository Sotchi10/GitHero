import express from "express";
import { signup, login } from "./authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/signup", (req, res) => res.send("Hello signup!"));

router.post("/login", login);
router.get("/login", (req, res) => res.send("Hello login!"));
export default router;