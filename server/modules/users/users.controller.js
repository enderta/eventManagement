const userService = require('./users.service');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;
        if (!username || !email || !password || !role_id) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await userService.createUser({ username, email, password, role_id });
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const token = await userService.login(email, password);
        res.json(
            {
                token: token
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}


exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role_id } = req.body;
        if (!username || !email || !role_id) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const updatedUser = await userService.updateUser(id, { username, email, role_id });
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
