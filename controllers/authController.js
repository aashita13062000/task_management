const { sign } = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ email, password });
    if (user) {
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ token });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id });
        process.env.JWT_SECRET, { expiresIn: '30d' };
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, authUser };