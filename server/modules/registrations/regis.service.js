/*CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    user_id INT REFERENCES users(id),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";

exports.createRegistration = async (req, res) => {
    try {
        const { event_id, user_id, ticket_number } = req.body;
        const registration = await pool.query(
            "INSERT INTO registrations (event_id, user_id, ticket_number) VALUES ($1, $2, $3) RETURNING *",
            [event_id, user_id, ticket_number]
        );
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await pool.query("SELECT * FROM registrations");
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE id = $1", [id]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { event_id, user_id, ticket_number } = req.body;
        await pool.query(
            "UPDATE registrations SET event_id = $1, user_id = $2, ticket_number = $3 WHERE id = $4",
            [event_id, user_id, ticket_number, id]
        );
        res.json("Registration was updated");
    } catch (error) {
        console.error(error.message);
    }
}

exports.deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM registrations WHERE id = $1", [id]);
        res.json("Registration was deleted");
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE user_id = $1", [id]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1", [id]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationByTicketNumber = async (req, res) => {
    try {
        const { ticket_number } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE ticket_number = $1", [ticket_number]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationByEventAndUser = async (req, res) => {
    try {
        const { event_id, user_id } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2", [event_id, user_id]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationByEventAndTicketNumber = async (req, res) => {
    try {
        const { event_id, ticket_number } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND ticket_number = $2", [event_id, ticket_number]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationByUserAndTicketNumber = async (req, res) => {
    try {
        const { user_id, ticket_number } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE user_id = $1 AND ticket_number = $2", [user_id, ticket_number]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationByEventUserAndTicketNumber = async (req, res) => {
    try {
        const { event_id, user_id, ticket_number } = req.params;
        const registration = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2 AND ticket_number = $3", [event_id, user_id, ticket_number]);
        res.json(registration.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventAndDate = async (req, res) => {
    try {
        const { event_id, date } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND registration_date = $2", [event_id, date]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByUserAndDate = async (req, res) => {
    try {
        const { user_id, date } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE user_id = $1 AND registration_date = $2", [user_id, date]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventAndLocation = async (req, res) => {
    try {
        const { event_id, location } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND location = $2", [event_id, location]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByUserAndLocation = async (req, res) => {
    try {
        const { user_id, location } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE user_id = $1 AND location = $2", [user_id, location]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventUserAndLocation = async (req, res) => {
    try {
        const { event_id, user_id, location } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2 AND location = $3", [event_id, user_id, location]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventUserLocationAndDate = async (req, res) => {
    try {
        const { event_id, user_id, location, date } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2 AND location = $3 AND registration_date = $4", [event_id, user_id, location, date]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventLocationAndDate = async (req, res) => {
    try {
        const { event_id, location, date } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND location = $2 AND registration_date = $3", [event_id, location, date]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByUserLocationAndDate = async (req, res) => {
    try {
        const { user_id, location, date } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE user_id = $1 AND location = $2 AND registration_date = $3", [user_id, location, date]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getRegistrationsByEventUserLocationDateAndTicketNumber = async (req, res) => {
    try {
        const { event_id, user_id, location, date, ticket_number } = req.params;
        const registrations = await pool.query("SELECT * FROM registrations WHERE event_id = $1 AND user_id = $2 AND location = $3 AND registration_date = $4 AND ticket_number = $5", [event_id, user_id, location, date, ticket_number]);
        res.json(registrations.rows);
    } catch (error) {
        console.error(error.message);
    }
}
