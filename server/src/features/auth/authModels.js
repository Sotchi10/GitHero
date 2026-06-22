import { db } from './../../config/db.js';


// Find by existing user by email
export const findUserByEmail = async (email) => {
    const sql = `
        SELECT 
            u.user_id,
            u.email,
            u.password_hash,
            p.first_name,
            p.last_name,
            p.username,
            p.bio,
            p.description,
            p.gender,
            p.role,
            p.location
        FROM users u
        LEFT JOIN profile p ON u.user_id = p.user_id
        WHERE u.email = ?
    `;

    const [rows] = await db.query(sql, [email]);
    return rows[0];
};

// Find by existing username
export const findUserByUsername = async (username) => {
    const sql = `
        SELECT 
            u.user_id,
            u.email,
            u.password_hash,
            p.first_name,
            p.last_name,
            p.username,
            p.bio,
            p.description,
            p.gender,
            p.role,
            p.location
        FROM users u
        JOIN profile p ON u.user_id = p.user_id
        WHERE p.username = ?
    `;

    const [rows] = await db.query(sql, [username]);
    return rows[0];
};

//  Create user
export const createUser = async (userData) => {
    const { email, password_hash } = userData;

    const sql = `
        INSERT INTO users (email, password_hash)
        VALUES (?, ?)
    `;

    const [result] = await db.query(sql, [
        email,
        password_hash
    ]);

    return result;
};

// Create profile
export const createProfile = async (userData) => {
    const {
        user_id,
        first_name,
        last_name,
        username,
        gender,
        role,
        bio,
        description,
        location
    } = userData;

    const sql = `
        INSERT INTO profile 
        (user_id, first_name, last_name, username, bio, description, gender, role, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        user_id,
        first_name || null,
        last_name || null,
        username || null,
        bio || null,
        description || null,
        gender || null,
        role || null,
        location || null
    ]);

    return result;
};
