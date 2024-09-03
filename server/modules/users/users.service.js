const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";


exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
        );
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).send("Email or password is incorrect");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).send("Email or password is incorrect");
        }
        const token = jwt.sign({ id: user.rows[0].id }, secret);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3", [username, email, id]);
        res.json("User was updated");
    } catch (error) {
        console.error(error.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("User was deleted");
    } catch (error) {
        console.error(error.message);
    }
}

