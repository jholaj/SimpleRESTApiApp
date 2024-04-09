const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { generateToken } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmailAndPassword(email, password); // find by mail and pass
        if (!user) {
            return res.status(401).json({ message: 'Credentials are not valid.' });
        }

        const token = generateToken({ id: user.ID, email: user.Email, role: user.Role, customerID: user.ID_Customer });
        console.log("Logged as:", user.Email, "with: ", user.Role, "priviliges.");
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error while trying to login:', error);
        res.status(500).json({ message: 'Error while trying to login' });
    }
});

module.exports = router;
