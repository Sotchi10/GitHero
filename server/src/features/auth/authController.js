import { db } from "../../config/db.js";
import { signupService, getUserByUsernameService, loginService } from "./authService.js";

// Sign up
export const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, password_hash, username, gender, role } = req.body;
        // validate
        if (!email || !password_hash || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await signupService({
            first_name,
            last_name,
            email,
            username,
            password_hash,
            gender,
            role
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                username,
                email,
                role
            }
        });

    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// GET USER
export const getUserByUsername = async (req, res) => {
    try {
        const user = await getUserByUsernameService(req.query.username);

        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({
            error: err.message
        });
    }
};


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        // validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        const user = await loginService({ email, password });

        // success response
        return res.status(200).json({
            message: "Login successful",
            user: {
                userId: user.user_id,
                email: user.email,
            }
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};