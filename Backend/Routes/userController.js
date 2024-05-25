// Backend/Routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController=require('../Controller/userController')

const {listUser}=userController


router.post('/listUsers',listUser)






module.exports = router;