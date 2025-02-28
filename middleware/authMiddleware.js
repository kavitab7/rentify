const JWT = require('jsonwebtoken')
const dotenv = require("dotenv")
const userModel = require('../models/user')

const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } catch (err) {
        console.log(err)
    }
}

const isSeller = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 'seller') {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in seller middelware",
        });
    }
};

module.exports = { requireSignIn, isSeller };
