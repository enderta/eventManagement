const userService = require('./users.service');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userService.createUser(username, email, password);
        res.json(user);
    } catch (error) {
        console.error(error.message);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);
        res.json(token);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error.message);
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        await userService.updateUser(username, email, id);
        res.json("User was updated");
    } catch (error) {
        console.error(error.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.json("User was deleted");
    } catch (error) {
        console.error(error.message);
    }
}

