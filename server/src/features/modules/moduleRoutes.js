import express from "express";
import { requireAuth } from "../../middleware/auth.js";
import { completeLesson, getModule, getUserDashboardSummary, listModuleLessons, listModules, openLesson } from "./moduleController.js";

const moduleRoute = express.Router();
moduleRoute.use(requireAuth);
moduleRoute.get("/", listModules);
moduleRoute.get("/dashboard-summary", getUserDashboardSummary);
moduleRoute.post("/lessons/:lessonId/open", openLesson);
moduleRoute.post("/lessons/:lessonId/complete", completeLesson);
moduleRoute.get("/:id/lessons", listModuleLessons);
moduleRoute.get("/:id", getModule);
export default moduleRoute;
