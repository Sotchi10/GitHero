import { findProfileByUserId } from "../features/profile/pfpModels.js";

const parseUserId = (value) => {
    const userId = Number(value);
    return Number.isInteger(userId) && userId > 0 ? userId : null;
};

export const requireAuth = async (req, res, next) => {
    try {
        const userId = parseUserId(
            req.get("x-user-id") || req.body?.user_id || req.query?.user_id
        );

        if (!userId) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const profile = await findProfileByUserId(userId);

        if (!profile) {
            return res.status(401).json({ message: "Authenticated profile not found" });
        }

        const { role, ...authProfile } = profile;

        req.auth = {
            userId,
            role,
            profile: authProfile,
        };

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
