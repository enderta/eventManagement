const regisService = require('./regis.service');

exports.createRegistration = async (req, res) => {
    try {
        const { event_id, user_id, ticket_number } = req.body;
        const registration = await regisService.createRegistration(event_id, user_id, ticket_number);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await regisService.getRegistrations();
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await regisService.getRegistration(id);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { event_id, user_id, ticket_number } = req.body;
        await regisService.updateRegistration(id, event_id, user_id, ticket_number);
        res.json("Registration was updated");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        await regisService.deleteRegistration(id);
        res.json("Registration was deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await regisService.getRegistrationsByUser(id);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await regisService.getRegistrationsByEvent(id);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationByTicketNumber = async (req, res) => {
    try {
        const { ticket_number } = req.params;
        const registration = await regisService.getRegistrationByTicketNumber(ticket_number);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationByEventAndUser = async (req, res) => {
    try {
        const { event_id, user_id } = req.params;
        const registration = await regisService.getRegistrationByEventAndUser(event_id, user_id);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationByEventAndTicketNumber = async (req, res) => {
    try {
        const { event_id, ticket_number } = req.params;
        const registration = await regisService.getRegistrationByEventAndTicketNumber(event_id, ticket_number);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationByUserAndTicketNumber = async (req, res) => {
    try {
        const { user_id, ticket_number } = req.params;
        const registration = await regisService.getRegistrationByUserAndTicketNumber(user_id, ticket_number);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationByEventUserAndTicketNumber = async (req, res) => {
    try {
        const { event_id, user_id, ticket_number } = req.params;
        const registration = await regisService.getRegistrationByEventUserAndTicketNumber(event_id, user_id, ticket_number);
        res.json(registration);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventAndDate = async (req, res) => {
    try {
        const { event_id, date } = req.params;
        const registrations = await regisService.getRegistrationsByEventAndDate(event_id, date);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByUserAndDate = async (req, res) => {
    try {
        const { user_id, date } = req.params;
        const registrations = await regisService.getRegistrationsByUserAndDate(user_id, date);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventAndLocation = async (req, res) => {
    try {
        const { event_id, location } = req.params;
        const registrations = await regisService.getRegistrationsByEventAndLocation(event_id, location);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByUserAndLocation = async (req, res) => {
    try {
        const { user_id, location } = req.params;
        const registrations = await regisService.getRegistrationsByUserAndLocation(user_id, location);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventUserAndLocation = async (req, res) => {
    try {
        const { event_id, user_id, location } = req.params;
        const registrations = await regisService.getRegistrationsByEventUserAndLocation(event_id, user_id, location);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventUserLocationAndDate = async (req, res) => {
    try {
        const { event_id, user_id, location, date } = req.params;
        const registrations = await regisService.getRegistrationsByEventUserLocationAndDate(event_id, user_id, location, date);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventLocationAndDate = async (req, res) => {
    try {
        const { event_id, location, date } = req.params;
        const registrations = await regisService.getRegistrationsByEventLocationAndDate(event_id, location, date);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByUserLocationAndDate = async (req, res) => {
    try {
        const { user_id, location, date } = req.params;
        const registrations = await regisService.getRegistrationsByUserLocationAndDate(user_id, location, date);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.getRegistrationsByEventUserLocationDateAndTicketNumber = async (req, res) => {
    try {
        const { event_id, user_id, location, date, ticket_number } = req.params;
        const registrations = await regisService.getRegistrationsByEventUserLocationDateAndTicketNumber(event_id, user_id, location, date, ticket_number);
        res.json(registrations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}