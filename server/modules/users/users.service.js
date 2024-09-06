const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret"; // Use environment variables for security

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: '1h' }); // Expiring token after 1 hour for better security
};

// Create User
exports.createUser = async ({ username, email, password, role_id }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, email, hashedPassword, role_id]
    );
    return newUser.rows[0];
};

// User Login
exports.login = async (email, password) => {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
        throw new Error("Invalid email or password");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
        throw new Error("Invalid email or password");
    }
    return generateToken(user.rows[0].id);
};

// Get All Users
exports.getUsers = async () => {
    const users = await pool.query("SELECT id, username, email FROM users");
    return users.rows;
};

// Get Single User
exports.getUser = async (id) => {
    const user = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
        throw new Error("User not found");
    }
    return user.rows[0];
};

// Update User
exports.updateUser = async (id, { username, email, role_id }) => {
    const updatedUser = await pool.query(
        "UPDATE users SET username = $1, email = $2, role_id = $3 WHERE id = $4 RETURNING *",
        [username, email, role_id, id]
    );
    if (updatedUser.rows.length === 0) {
        throw new Error("User not found");
    }
    return updatedUser.rows[0];
};

// Delete User
exports.deleteUser = async (id) => {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (deletedUser.rowCount === 0) {
        throw new Error("User not found");
    }
    return deletedUser.rows[0];
};