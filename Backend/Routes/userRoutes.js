// Backend/Routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController=require('../Controller/userController')
const authenticateToken =require('../middleware/jwtMiddleware')

const {listUser,listMessage}=userController


router.post('/listUsers',listUser)
router.post('/getMessages',authenticateToken,listMessage)






module.exports = router;