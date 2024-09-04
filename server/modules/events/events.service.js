/*CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    organizer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    event_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

const bcrypt = require("bcrypt");
const pool = require("../../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";

exports.createEvent = async (req, res) => {
    try {
        const { organizer_id, event_name, description, location, event_date } = req.body;
        const event = await pool.query(
            "INSERT INTO events (organizer_id, event_name, description, location, event_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [organizer_id, event_name, description, location, event_date]
        );
        res.json(event.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await pool.query("SELECT * FROM events");
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await pool.query("SELECT * FROM events WHERE event_id = $1", [id]);
        res.json(event.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { organizer_id, event_name, description, location, event_date } = req.body;
        await pool.query(
            "UPDATE events SET organizer_id = $1, event_name = $2, description = $3, location = $4, event_date = $5 WHERE event_id = $6",
            [organizer_id, event_name, description, location, event_date, id]
        );
        res.json("Event was updated");
    } catch (error) {
        console.error(error.message);
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM events WHERE event_id = $1", [id]);
        res.json("Event was deleted");
    } catch (error) {
        console.error(error.message);
    }
}

exports.getEventsByOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const events = await pool.query("SELECT * FROM events WHERE organizer_id = $1", [id]);
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getEventsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const events = await pool.query("SELECT * FROM events WHERE event_date = $1", [date]);
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getEventsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const events = await pool.query("SELECT * FROM events WHERE location = $1", [location]);
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
    }
}

