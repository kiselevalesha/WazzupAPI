
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    /*
    try {

        const token = req.headers.authorisation.split(' ')[1];

        if (! token) {
            return res.status(401).json({ message: 'Нет авторизационного токена'})
        }

        const decoded = jwt.verify(token, config.get('secretKey'));
        req.user = decoded;

    } catch(e) {
        res.status(401).json({ message: 'Ошибка при авторизации'})
    }
    */

}