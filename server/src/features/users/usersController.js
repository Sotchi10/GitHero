import { findAllDevelopers, findAllStudents, findAllUsers } from "./usersModels.js";

export const getUsers = async (_req, res) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getDevelopers = async (_req, res) => {
    try {
        const developers = await findAllDevelopers();
        res.json(developers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getStudents = async (_req, res) => {
    try {
        const students = await findAllStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

