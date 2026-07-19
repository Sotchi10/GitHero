import { findProfileByUserId } from "../features/profile/pfpModels.js";
import jwt from "jsonwebtoken";

const parseUserId = (value) => {
    const userId = Number(value);
    return Number.isInteger(userId) && userId > 0 ? userId : null;
};

export const requireAuth = async (req, res, next) => {
    try {
        const authorization = req.get("authorization");

        if (!authorization) {
            return res.status(401).json({ message: "Bearer token is required" });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Bearer token is required" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT configuration is missing" });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }

            return res.status(401).json({ message: "Invalid token" });
        }

        const userId = parseUserId(payload.userId);

        if (!userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const profile = await findProfileByUserId(userId);

        if (!profile) {
            return res.status(401).json({ message: "Authenticated profile not found" });
        }

        const { role, ...authProfile } = profile;

        req.user = {
            id: userId,
            userId,
            email: payload.email,
            username: payload.username,
            role,
        };
        req.auth = { userId, role, profile: authProfile };

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const requireDeveloper = (req, res, next) => {
    const role = String(req.auth?.role || "").toLowerCase();

    if (role !== "developer") {
        return res.status(403).json({
            message: "Only developers can create posts",
        });
    }

    next();
};
export const requireAdmin = (req, res, next) => {
    const role = String(req.auth?.role || "").toLowerCase();

    if (role !== "admin") {
        return res.status(403).json({
            message: "Only admin can manage changes",
        });
    }

    next();
};
