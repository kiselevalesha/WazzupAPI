
const { LOG } = require('../../utils/util');
const { StrErrorTokenEmpty, StrErrorDataBase, StrErrorServer, 
    StrOkLogout } = require('../../languages/russian');
const { getUserByToken, setFlagClosedSessions } = require('../../models/sessions/db');


async function Logout(req, res) {
    try {

        //  Достаём из заголовка токен
        let strToken = req.headers.authorisation.split(' ')[1];
        if (! strToken) {
            return res.status(401).json({ message: StrErrorTokenEmpty });
        }

        //  Ищем токен в Сессиях. Достаём idUser
        let idUser = await getUserByToken(strToken);
        if (! idUser) {
            return res.status(401).json({ message: StrErrorDataBase });
        }

        //  У всех токенов idUser-а ставим флаг, что они завершены
        await setFlagClosedSessions(idUser);

        res.json({ message: StrOkLogout });
    
    } catch(e) {
        return res.status(500).json({ message: StrErrorServer });
    }
}
module.exports.Logout = Logout;
