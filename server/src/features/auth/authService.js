import { findUserByEmail, findUserByUsername, createUser, createProfile } from "./authModels.js";
import bcrypt from "bcrypt";

// get username
export const getUserByUsernameService = async (username) => {
    if (!username) throw new Error("Username is required");

    const user = await findUserByUsername(username);

    if (!user) throw new Error("User not found");

    return user;
};

// sing up
export const signupService = async (userData) => {
    const { first_name, last_name, email, username, password_hash, gender, role } = userData;

    // check email
    const existEmail = await findUserByEmail(email);
    if (existEmail) throw new Error("Email already exists");

    // check username
    const existUsername = await findUserByUsername(username);
    if (existUsername) throw new Error("Username already exists");

    // hash password
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // create user
    const user = await createUser({
        email,
        password_hash: hashedPassword,
    });

    const userId = user.insertId;

    // create profile for user
    await createProfile({
        user_id: userId,
        first_name: first_name,
        last_name: last_name,
        username,
        gender,
        role,
        bio: null,
        description: null,
        location: null
    });

    return {
        user_id: userId,
        email,
        username
    };
};

// log in service
export const loginService = async (userData) => {
    const { email, password } = userData;

    // check email
    const user = await findUserByEmail(email);
    if (!user) throw new Error("Email not exists");

    // compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    delete user.password_hash;

    return user;
}
