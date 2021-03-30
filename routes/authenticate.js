const path = require('path');

const express = require('express');


const authenController = require('../controllers/authenticated');
const router = express.Router();


router.get('/authenticate/register',authenController.getRegisterForm)
router.post('/register',authenController.postRegisterForm);


router.get('/authenticate/login',authenController.getLoginForm);
router.post('/login',authenController.postLoginForm);







module.exports = router;