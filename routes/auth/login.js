
const { LOG } = require('../../utils/util');
const { StrErrorShortLogin, StrErrorShortPassword,
    StrErrorServer,StrErrorIncorrectLoginData } = require('../../languages/russian');
const { addToken } = require('../../models/sessions/db');
const { findUser } = require('../../models/users/db');


async function Login(req, res) {
    try {

        const { login, password } = req.body;
        let errors = [];

        let loginCorrect = login.match(/[a-zA-Z0-9]+/g)[0];
        if (loginCorrect.length < 5) {
            errors.push(StrErrorShortLogin)
        }
        
        let passwordCorrect = password.match(/[a-zA-Z0-9]+/g)[0];
        if (passwordCorrect.length < 6) {
            errors.push(StrErrorShortPassword)
        }


        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors.array(),
                message: StrErrorIncorrectLoginData
            })
        }

        //  Ищем юзера
        const user = await findUser({ login:loginCorrect, password:passwordCorrect })

        if (! user) {
            return res.status(401).json({ message: StrErrorIncorrectLoginOrPassword })
        }

        //  Сохраняем токен в Сессиях для idUser
        const token = await addToken(user.id);

        res.json({ token, userId: user.id});
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.Login = Login;
