import express from "express";
import { getDevelopers, getStudents, getUsers } from "./usersController.js";

const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.get("/developers", getDevelopers);
userRoute.get("/students", getStudents);


export default userRoute;
