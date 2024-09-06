const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

// Global CORS configuration for all routes
router.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Public Routes
router.post("/register", userController.createUser); // Updated route name to 'register' for clarity
router.post("/login", userController.login);

// Protected Routes (Require token verification)
router.use(verifyToken); // All routes below will require token verification

router.get("/users", userController.getUsers); // Get all users
router.get("/users/:id", userController.getUser); // Get a specific user by ID
router.put("/users/:id", userController.updateUser); // Update a user by ID
router.delete("/users/:id", userController.deleteUser); // Delete a user by ID

module.exports = router;