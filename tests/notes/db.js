
const { addUser } = require('../../models/users/db');
const { saveNote, findNote, deleteNote } = require('../../models/notes/db');
const { CopyJson, ShowTestResult } = require('../../utils/util');


async function RunAllDbNoteTests() {

    await ShowTestResult('TestAddAndFindNote', TestAddAndFindNote());

    await ShowTestResult('TestAddAndDeleteNote', TestAddAndDeleteNote());

}
module.exports.RunAllDbNoteTests = RunAllDbNoteTests;


//  Создадим и найдём заметку
async function TestAddAndFindNote() {

    let jsonUser = {
        login: "test",
        password: "test"
    }
    jsonUser = await addUser(jsonUser);

    
    let jsonNote1 = {
        note: "Какая-то заметка для теста...",
        idUser: jsonUser.id
    }
    jsonNote1 = await saveNote(jsonNote1);


    let jsonNote2 = CopyJson(jsonNote1);
    jsonNote2 = findNote(jsonNote2)

    if (jsonNote1.id === jsonNote2.id) {
        return true;
    }
    
    return false; 
}


//  Создадим, удалим и проверим флаг удаления заметки
async function TestAddAndDeleteNote() {

    let jsonUser = {
        login: "test",
        password: "test"
    }
    jsonUser = await addUser(jsonUser);

    
    let jsonNote1 = {
        note: "Какая-то заметка для теста...",
        idUser: jsonUser.id
    }
    jsonNote1 = await saveNote(jsonNote1);


    jsonNote1 = deleteNote(jsonNote1);


    let jsonNote2 = CopyJson(jsonNote1);
    jsonNote2 = findNote(jsonNote2)

    if (jsonNote1.id === jsonNote2.id) {
        return true;
    }
    
    return false; 
}


//  Найдём все заметки пользователя
