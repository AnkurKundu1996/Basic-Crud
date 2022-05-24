const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.post('/register',userController.createUser);
router.post('/login', userController.loginUser);
router.post('/forget_password', userController.sendForgetPasswordMail);
router.post('/verify_OTP', userController.checkUserVCode);
router.post('/change_password', userController.changeUserPassword);
router.get('/logout', auth, userController.logoutUser);

module.exports = router;