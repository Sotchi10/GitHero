import { db } from './../../config/db.js';

export const findUserByEmail = async (email) => {
    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.query(
            sql,
            [email]
        );  
        console.log(rows[0]);
        return rows[0];

    } catch (err) {
        throw err;
    }
};