import express from "express";

import {
    addModule,
    editModule,
    getAdminDashboardSummary,
    getModule,
    getModules,
    removeModule,
} from "./moduleController.js";

import {
    requireAdmin,
    requireAuth,
} from "../../middleware/auth.js";

const adminModuleRoute = express.Router();


adminModuleRoute.use(requireAuth);
adminModuleRoute.use(requireAdmin);

// Must remain before "/:id"
adminModuleRoute.get(
    "/dashboard-summary",
    getAdminDashboardSummary
);

// Get every module, including unpublished modules
adminModuleRoute.get(
    "/",
    getModules
);

// Get one module
adminModuleRoute.get(
    "/:id",
    getModule
);

// Create a module
adminModuleRoute.post(
    "/",
    addModule
);

// Update a module
adminModuleRoute.put(
    "/:id",
    editModule
);

// Delete a module
adminModuleRoute.delete(
    "/:id",
    removeModule
);

export default adminModuleRoute;
