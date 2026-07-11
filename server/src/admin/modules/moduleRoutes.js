import express from "express";
import {getModules, getModule, addModule, editModule, removeModule} from "./moduleController.js";

const moduleRoute = express.Router();

moduleRoute.get("/", getModules);

moduleRoute.get("/:id", getModule);

moduleRoute.post("/", addModule);

moduleRoute.put("/:id", editModule);

moduleRoute.delete("/:id", removeModule);

export default moduleRoute;