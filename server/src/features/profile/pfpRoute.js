import express from "express";
import {
    getProfile,
    getProfileByUserId,
    updateDescription,
    updateProfile,
    updateUsername,
} from "./pfpController.js";

const pfpRoute = express.Router();

// Get active user's profile by auth user ID
pfpRoute.get("/user/:userId", getProfileByUserId);
// Update active user's profile by auth user ID
pfpRoute.patch("/user/:userId", updateProfile);
// Get profile
pfpRoute.get("/:username", getProfile);
// Update Description
pfpRoute.put("/:username/description", updateDescription);
// Update Username
pfpRoute.put("/:username/username", updateUsername);

export default pfpRoute;
