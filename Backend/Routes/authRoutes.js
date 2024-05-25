
const express = require('express');
const { signup, login } = require('../Controller/authController');

const router = express.Router();

router.post('/usersignup', signup);
router.post('/userlogin', login);

module.exports = router;
