const userService = require('./users.service');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role_id } = req.body;
        if (!username || !email || !password || !role_id) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await userService.createUser({ username, email, password, role_id });
        res.json({
            username: user.username,
            email: user.email,
            role_id: user.role_id

        });
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
        const user = await userService.getUserByEmail(email); // Fetch user details by email
        res.json({
            token: token,
            message: "Login successful",
            user: {
                id: user.id,
                role: user.role_id
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
/*exports.getUserByEmail = async (email) => {
    const user = await pool.query("SELECT id, role_id FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
        throw new Error("User not found");
    }
    return user.rows[0];
};*/

exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            user_id: user.id,
            role_id: user.role_id
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            user_id: deleted.id,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}


exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json({
            username: users.username,
            email: users.email,
            user_id: users.id
        }

        );
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
        res.json({
            username: user.username,
            email: user.email,
            user_id: user.id
        });
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
        const updated = await userService.updateUser(id, { username, email, role_id });
        if (!updated) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            username: updated.username,
            email: updated.email,
            role_id: updated.role_id
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

