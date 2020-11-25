
const { addUser, findUser, deleteUser } = require('../../models/users/db');
const { CopyJson, ShowTestResult } = require('../../utils/util');


async function RunAllDbUserTests() {

    await ShowTestResult('TestAddAndFindUser', TestAddAndFindUser());

    await ShowTestResult('TestAddAndDeleteUser', TestAddAndDeleteUser());

}
module.exports.RunAllDbUserTests = RunAllDbUserTests;



//  Создадим и найдём юзера
async function TestAddAndFindUser() {

    let json1 = {
        login: "test",
        password: "test"
    }

    json1 = await addUser(json1);
    json2 = CopyJson(json1);

    json2 = await findUser(json2);

    if (json1.id === json2.id) {
        return true;
    }
    
    return false; 
}


//  Создадим, удалим и проверим флаг удаления юзера
async function TestAddAndDeleteUser() {

    let json1 = {
        login: "test",
        password: "test"
    }

    json1 = await addUser(json1);
    json2 = CopyJson(json1);

    json2 = await deleteUser(json2);
    json3 = CopyJson(json2);

    json3 = await findUser(json3);

    if (json1.id === json2.id)
        if (json1.isDeleted === 1) {
            return true;
        }
    
    return false; 
}
