const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (err) {
        console.log(err);
    }
};

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

const registerController = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, role } = req.body;

        // Validation
        if (!firstname) return res.send({ message: 'Firstname is required' });
        if (!lastname) return res.send({ message: 'Lastname is required' });
        if (!email) return res.send({ message: 'Email is required' });
        if (!password) return res.send({ message: 'Password is required' });
        if (!phone) return res.send({ message: 'Phone is required' });
        if (!role) return res.send({ message: 'Role is required' });

        // Check for existing user
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists',
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const user = new userModel({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            role,
        });

        await user.save();
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in login',
        });
    }
};

module.exports = { registerController, loginController };
