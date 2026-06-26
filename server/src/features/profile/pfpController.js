import {
    findProfileByUserId,
    findProfileByUsername,
    findProfileByUsernameForOtherUser,
    updateProfileByUserId,
} from "./pfpModels.js";

const parseUserId = (value) => {
    const userId = Number(value);
    return Number.isInteger(userId) && userId > 0 ? userId : null;
};

const validateProfileUpdates = (body) => {
    const updates = {};

    if (Object.prototype.hasOwnProperty.call(body, "full_name")) {
        const fullName = String(body.full_name || "").trim().replace(/\s+/g, " ");
        if (!fullName) {
            return { error: "Full name is required" };
        }
        if (fullName.length > 100) {
            return { error: "Full name must be 100 characters or fewer" };
        }

        const [firstName, ...lastNameParts] = fullName.split(" ");
        updates.first_name = firstName;
        updates.last_name = lastNameParts.join(" ") || null;
    }

    if (Object.prototype.hasOwnProperty.call(body, "first_name")) {
        const firstName = String(body.first_name || "").trim();
        if (firstName.length > 50) {
            return { error: "First name must be 50 characters or fewer" };
        }
        updates.first_name = firstName || null;
    }

    if (Object.prototype.hasOwnProperty.call(body, "last_name")) {
        const lastName = String(body.last_name || "").trim();
        if (lastName.length > 50) {
            return { error: "Last name must be 50 characters or fewer" };
        }
        updates.last_name = lastName || null;
    }

    if (Object.prototype.hasOwnProperty.call(body, "username")) {
        const username = String(body.username || "").trim();
        if (!username) {
            return { error: "Username is required" };
        }
        if (username.length > 50) {
            return { error: "Username must be 50 characters or fewer" };
        }
        updates.username = username;
    }

    if (Object.prototype.hasOwnProperty.call(body, "bio")) {
        const bio = String(body.bio || "").trim();
        if (bio.length > 255) {
            return { error: "Bio must be 255 characters or fewer" };
        }
        updates.bio = bio || null;
    }

    if (Object.prototype.hasOwnProperty.call(body, "description")) {
        const description = String(body.description || "").trim();
        if (description.length > 1000) {
            return { error: "Description must be 1000 characters or fewer" };
        }
        updates.description = description || null;
    }

    if (Object.keys(updates).length === 0) {
        return { error: "No profile fields provided" };
    }

    return { updates };
};

const updateProfileForUser = async (userId, body) => {
    const existingProfile = await findProfileByUserId(userId);

    if (!existingProfile) {
        return { status: 404, body: { message: "Profile not found" } };
    }

    const { updates, error } = validateProfileUpdates(body);

    if (error) {
        return { status: 400, body: { message: error } };
    }

    if (updates.username) {
        const duplicateProfile = await findProfileByUsernameForOtherUser(
            updates.username,
            userId
        );

        if (duplicateProfile) {
            return { status: 409, body: { message: "Username already exists" } };
        }
    }

    const profile = await updateProfileByUserId(userId, updates);

    return {
        status: 200,
        body: {
            message: "Profile updated successfully",
            profile,
        },
    };
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const profile = await findProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProfileByUserId = async (req, res) => {
    try {
        const userId = parseUserId(req.params.userId);

        if (!userId) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const profile = await findProfileByUserId(userId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = parseUserId(req.params.userId);

        if (!userId) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const result = await updateProfileForUser(userId, req.body);
        res.status(result.status).json(result.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCurrentProfile = async (req, res) => {
    try {
        const result = await updateProfileForUser(req.auth.userId, req.body);
        res.status(result.status).json(result.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Avatar file is required" });
        }

        const avatar = `/uploads/avatars/${req.file.filename}`;
        const profile = await updateProfileByUserId(req.auth.userId, { avatar });

        res.json({
            message: "Avatar updated successfully",
            profile,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Description
export const updateDescription = async (req, res) => {
    try {
        const { username } = req.params;
        const { description } = req.body;
        const profile = await findProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const { updates, error } = validateProfileUpdates({
            description,
        });

        if (error) {
            return res.status(400).json({ message: error });
        }

        const updatedProfile = await updateProfileByUserId(profile.user_id, updates);

        res.json({
            message: "Description updated successfully",
            profile: updatedProfile,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update username
export const updateUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername } = req.body;
        const profile = await findProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const { updates, error } = validateProfileUpdates({
            username: newUsername,
        });

        if (error) {
            return res.status(400).json({ message: error });
        }

        const duplicateProfile = await findProfileByUsernameForOtherUser(
            updates.username,
            profile.user_id
        );

        if (duplicateProfile) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const updatedProfile = await updateProfileByUserId(profile.user_id, {
            username: updates.username,
        });

        res.json({
            message: "Username updated successfully",
            profile: updatedProfile,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
