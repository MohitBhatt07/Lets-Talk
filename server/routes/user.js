const express = require('express');
const Auth = require('../middlewares/user.js');
const router = express.Router();
const {register, login, validUser, logout, googleAuth, searchUsers, getUserById, updateInfo} =require('../controllers/userControllers.js');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/valid', Auth, validUser);
router.get('/auth/logout', Auth, logout);
router.post('/api/google', googleAuth);
router.get('/api/user?', Auth, searchUsers);
router.get('/api/users/:id', Auth, getUserById);
router.patch('/api/users/update/:id', Auth, updateInfo);


module.exports = router;