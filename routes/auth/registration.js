
const { LOG } = require('../../utils/util');
const { StrErrorIncorrectRegistrationData, StrErrorShortLogin, StrErrorShortPassword,
     StrErrorLoginExist, StrErrorServer,StrOkUserAdded } = require('../../languages/russian');
const { addUser, findLogin } = require('../../models/users/db');


async function Registration(req, res) {
    try {

        const { login, password, isAutoLogin } = req.body;

        //  Простые проверки на ошибки...
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
                message: StrErrorIncorrectRegistrationData
            })
        }


        //const hashedPassword = await bcrypt.hash(password, 12);


        //  Проверяем нет ли уже такого логина в базе
        let userExist = await findLogin({ login:loginCorrect });
        if (userExist) {
            return res.status(401).json({ message: StrErrorLoginExist })
        }

        //  Если проверки пройдены, то сохраняем юзера в базе
        const user = await addUser({ login:loginCorrect, password:passwordCorrect });

        //  Подготавливаем возвращаемый json
        let json = { message: StrOkUserAdded };


        //  Если isAutoLogin, то сразу создаём токен
        if (isAutoLogin) {

            //  Создаём токен
            let strToken = getToken(user.id);

            //  Добавляем в  возвращаемый json
            json.token = strToken;
        }

        res.status(201).json(json);
    
    } catch(e) {
        res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.Registration = Registration;
