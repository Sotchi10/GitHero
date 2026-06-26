import express from "express";
import {
    getProfile,
    getProfileByUserId,
    updateDescription,
    updateCurrentProfile,
    updateProfile,
    updateUsername,
} from "./pfpController.js";
import { requireAuth } from "../../middleware/auth.js";

const pfpRoute = express.Router();

// Update authenticated user's profile
pfpRoute.put("/", requireAuth, updateCurrentProfile);
// Get active user's profile by auth user ID
pfpRoute.get("/user/:userId", getProfileByUserId);
// Update active user's profile by auth user ID
pfpRoute.patch("/user/:userId", updateProfile, updateDescription, updateUsername);
// Get profile
pfpRoute.get("/:username", getProfile);
//// Update Description
//pfpRoute.put("/:username/description", updateDescription);
//// Update Username
//pfpRoute.put("/:username/username", updateUsername);

export default pfpRoute;
