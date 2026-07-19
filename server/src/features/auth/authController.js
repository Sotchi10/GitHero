import { db } from "../../config/db.js";
import { signupService, getUserByUsernameService, loginService } from "./authService.js";
import jwt from "jsonwebtoken";

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
                user_id: user.user_id,
                username,
                email,
                role: user.role
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
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

        if (!jwtSecret || !jwtExpiresIn) {
            return res.status(500).json({
                message: "JWT configuration is missing"
            });
        }

        const token = jwt.sign(
            {
                userId: user.user_id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            jwtSecret,
            { expiresIn: jwtExpiresIn }
        );

        // success response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                userId: user.user_id,
                email: user.email,
                username: user.username,
                role: user.role,
            }
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
