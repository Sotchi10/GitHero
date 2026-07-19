import express from "express";
import { addModule, editModule, getAdminDashboardSummary, getAvailableModule, getAvailableModuleLessons, getAvailableModules, getModule, getModules, removeModule } from "./moduleController.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";

const moduleRoute = express.Router();
const adminModuleRoute = express.Router();

moduleRoute.get("/", getAvailableModules);
moduleRoute.get("/:id/lessons", getAvailableModuleLessons);
moduleRoute.get("/:id", getAvailableModule);

adminModuleRoute.use(requireAuth, requireAdmin);

adminModuleRoute.get("/dashboard-summary", getAdminDashboardSummary);
adminModuleRoute.get("/", getModules);
adminModuleRoute.get("/:id", getModule);

adminModuleRoute.post("/", addModule);

adminModuleRoute.put("/:id", editModule);

adminModuleRoute.delete("/:id", removeModule);

export default moduleRoute;
export { adminModuleRoute };
