const express = require('express')
const { registerController, loginController } = require("../controller/authController");
const { requireSignIn, isSeller } = require('../middleware/authMiddleware')


const router = express.Router()


router.post('/register', registerController)

router.post('/login', loginController)

//protected route for user and seller authentication

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get('/seller-auth', requireSignIn, isSeller, (req, res) => {
    res.status(200).send({ ok: true });
});



module.exports = router