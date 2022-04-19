const express = require("express")

const router = express.Router()
const { registerUser, login, getMe } = require("../controllers/userController")


router.post('/api/users', registerUser )
router.post('/api/users/login', login);
router.get('/api/user', getMe);

module.exports = router