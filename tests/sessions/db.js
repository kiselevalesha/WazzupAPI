
const { addUser } = require('../../models/users/db');
const { addToken, getUserByToken, setFlagClosedSessions } = require('../../models/sessions/db');
const { LOG, CopyJson, ShowTestResult } = require('../../utils/util');


async function RunAllDbSessionTests() {

    ShowTestResult('TestAddAndFindToken', TestAddAndFindToken());

    ShowTestResult('TestAddAndDeleteToken', TestAddAndDeleteToken());

}
module.exports.RunAllDbSessionTests = RunAllDbSessionTests;


//  Создадим и найдём токен
async function TestAddAndFindToken() {

    let json = {
        login: "test",
        password: "test"
    }

    json = await addUser(json);

    let strToken = await addToken(json.id);

    let idUser = await getUserByToken(strToken);

    if (json.idUser === idUser) {
        return true;
    }
    
    return false; 
}


//  Создадим, удалим и проверим флаг закрытия сессии
async function TestAddAndDeleteToken() {

    let json = {
        login: "test",
        password: "test"
    }

    json = await addUser(json);

    let strToken = await addToken(json.id);

    await setFlagClosedSessions(json.id);

    let idUser = await getUserByToken(strToken);

    if (idUser === 0) {
        return true;
    }
    
    return false; 
}
