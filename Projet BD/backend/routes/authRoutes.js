const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/user/:idUtilisateur', authController.getUserInfo);
router.post('/change-password', authController.changePassword);
module.exports = router;
