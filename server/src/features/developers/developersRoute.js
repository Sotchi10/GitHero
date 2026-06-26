import express from "express";
import { getDevelopers } from "./developersController.js";

const developersRoute = express.Router();

developersRoute.get("/", getDevelopers);

export default developersRoute;
