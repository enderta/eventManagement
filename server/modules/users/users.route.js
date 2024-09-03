const express = require("express");
const router = express.Router();
const userController = require("./users.controller");
const verifyToken = require("../../middlewares/verifyToken");
const cors = require("cors");

//give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.post("/users", userController.createUser);

router.post("/login", userController.login);

router.get("/users", verifyToken, userController.getUsers);

router.get("/users/:id", verifyToken, userController.getUser);

router.put("/users/:id", verifyToken, userController.updateUser);

router.delete("/users/:id", verifyToken, userController.deleteUser);

module.exports = router;