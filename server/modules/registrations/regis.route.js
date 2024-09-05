const express = require("express");
const router = express.Router();
const regisController = require("./regis.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

// give CORS permission to all routes for all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post("/registrations", verifyToken, regisController.createRegistration);
router.get("/registrations", verifyToken, regisController.getRegistrations);
router.get("/registrations/:id", verifyToken, regisController.getRegistration);
router.put("/registrations/:id", verifyToken, regisController.updateRegistration);
router.delete("/registrations/:id", verifyToken, regisController.deleteRegistration);

router.get("/registrations/user/:id", verifyToken, regisController.getRegistrationsByUser);
router.get("/registrations/event/:id", verifyToken, regisController.getRegistrationsByEvent);
router.get("/registrations/ticket/:ticket_number", verifyToken, regisController.getRegistrationByTicketNumber);
router.get("/registrations/event/:event_id/user/:user_id", verifyToken, regisController.getRegistrationByEventAndUser);
router.get("/registrations/event/:event_id/ticket/:ticket_number", verifyToken, regisController.getRegistrationByEventAndTicketNumber);
router.get("/registrations/user/:user_id/ticket/:ticket_number", verifyToken, regisController.getRegistrationByUserAndTicketNumber);
router.get("/registrations/event/:event_id/user/:user_id/ticket/:ticket_number", verifyToken, regisController.getRegistrationByEventUserAndTicketNumber);

router.get("/registrations/event/:event_id/date/:date", verifyToken, regisController.getRegistrationsByEventAndDate);
router.get("/registrations/user/:user_id/date/:date", verifyToken, regisController.getRegistrationsByUserAndDate);
router.get("/registrations/event/:event_id/location/:location", verifyToken, regisController.getRegistrationsByEventAndLocation);
router.get("/registrations/user/:user_id/location/:location", verifyToken, regisController.getRegistrationsByUserAndLocation);
router.get("/registrations/event/:event_id/user/:user_id/location/:location", verifyToken, regisController.getRegistrationsByEventUserAndLocation);
router.get("/registrations/event/:event_id/user/:user_id/location/:location/date/:date", verifyToken, regisController.getRegistrationsByEventUserLocationAndDate);
router.get("/registrations/event/:event_id/location/:location/date/:date", verifyToken, regisController.getRegistrationsByEventLocationAndDate);
router.get("/registrations/user/:user_id/location/:location/date/:date", verifyToken, regisController.getRegistrationsByUserLocationAndDate);
router.get("/registrations/event/:event_id/user/:user_id/location/:location/date/:date/ticket/:ticket_number", verifyToken, regisController.getRegistrationsByEventUserLocationDateAndTicketNumber);

module.exports = router;