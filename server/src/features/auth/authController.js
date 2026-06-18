import bcrypt from "bcrypt";
import { db } from "../../config/db.js";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password_hash, username, gender, user_role } = req.body;

        // validate input
        if (!email || !password_hash || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // check existing user
        const [existing] = await db.query(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password_hash, 10);

        // insert user
        await db.query(
            `INSERT INTO users (firstName, lastName, username, email, password_hash, gender, user_role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, username, email, hashedPassword, gender, user_role]
        );

        res.status(201).json({
            message: "User registered successfully",
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        // find user
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0 || users == null) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];

        // compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // success response
        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};