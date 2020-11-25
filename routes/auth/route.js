
const { StrErrorServer } = require('../../languages/russian');
const { Router } = require('express');
const { Registration } = require('./registration');
const { Login } = require('./login');
const { Logout } = require('./logout');

const router = Router();


// /api/auth/registration
router.post('/registration', Registration);


// /api/auth/login
router.post('/login', Login);


// /api/auth/logout
router.post('/logout', Logout);


router.all('*', async (req, res, next) => {
    res.status(404).json({ message: StrErrorServer });
});

module.exports = router;