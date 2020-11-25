
const config = require('config');
const jwt = require('jsonwebtoken');

const { LOG, getHash } = require('../../utils/util');
const { ExecuteQuery, getFullTableName } = require('../sql');

const nameTableSessions = getFullTableName(config.get('TableNameSessions'));


async function addToken(idUser) {
    let strToken = null;
    if (idUser) {

        //  Генерируем новый токен
        strToken = jwt.sign(
            { userId: idUser },
            config.get('secretKey'),
            { expiresIn: '1h'}
        );

        let idHashToken = getHash(strToken);

        //  Сохраняем в базе
        let sql = 'INSERT INTO ' + nameTableSessions +
                '(strToken, idHashToken, idUser) ' +
                'VALUES ("' + strToken + '",' + idHashToken + ',' + idUser + ')';        
        try {
            let result = await ExecuteQuery(sql);
        } catch(err) {
            LOG(err);
            throw err;
        }
    }
    
    return strToken;
}
module.exports.addToken = addToken;


async function getUserByToken(strToken) {
    let idUser = 0;
    let idHashToken = getHash(strToken);

    //  Найти в базе idUser по токену и хэшу токена
    let sql = 'SELECT * FROM ' + nameTableSessions + 
            ' WHERE idHashToken=' + idHashToken + ' AND strToken="' + strToken + '" AND isDeleted=0';

    let result = await ExecuteQuery(sql);
    if (result.length > 0) {
        let row = result[0];
        idUser = row.idUser;
    }

    return idUser;
}
module.exports.getUserByToken = getUserByToken;


async function setFlagClosedSessions(idUser) {

    //  Установить в базе по idUser всем флаг закрытия сессии isDeleted=1
    let sql = 'UPDATE ' + nameTableSessions + ' SET ' + 
            'isDeleted=1  WHERE  idUser=' + idUser;

    try {
        let result = await ExecuteQuery(sql);
    } catch(err) {
        LOG(err);
        throw err;
    }

}
module.exports.setFlagClosedSessions = setFlagClosedSessions;


async function isExpiriedToken(strToken) {

    //  Тут должна быть проверка, что время жизни токена не истекло
    //  ...


    //  Найдём idUser
    let idUser = await getUserByToken(strToken);

    //  Проверим, что пользователь не разлогинился
    let sql = 'SELECT * FROM ' + nameTableSessions + 
            ' WHERE idUser=' + idUser + ' AND isDeleted=0';

    let result = await ExecuteQuery(sql);
    if (result.length > 0) {
        return true;
    }

    return false;
}
module.exports.isExpiriedToken = isExpiriedToken;
