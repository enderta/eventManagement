const express = require("express");
const router = express.Router();
const userController = require("./events.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post("/events", verifyToken, userController.createEvent);

router.get("/events", verifyToken, userController.getEvents);

router.get("/events/:id", verifyToken, userController.getEvent);

router.put("/events/:id", verifyToken, userController.updateEvent);

router.delete("/events/:id", verifyToken, userController.deleteEvent);

router.get("/events/organizer/:id", verifyToken, userController.getEventsByOrganizer);

module.exports = router;



