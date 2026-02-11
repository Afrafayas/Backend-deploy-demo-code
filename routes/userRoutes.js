const express = require('express');
const router = express.Router();
const { getAllUsers,register,login,getProfile} = require('../controllers/userController');  
const { authMiddleware } = require('../middleware/auth');


router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware,getProfile);

module.exports = router;