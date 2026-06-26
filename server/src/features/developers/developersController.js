import { findAllDevelopers } from "./developersModels.js";

export const getDevelopers = async (_req, res) => {
    try {
        const developers = await findAllDevelopers();
        res.json(developers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
