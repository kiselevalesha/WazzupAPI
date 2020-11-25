
"use strict";

const { RunAllDbUserTests } = require('./tests/users/db');
const { RunAllDbNoteTests } = require('./tests/notes/db');
const { RunAllDbSessionTests } = require('./tests/sessions/db');

const { RunAllApiUserTests } = require('./tests/users/api');
const { RunAllApiNoteTests } = require('./tests/notes/api');
const { LOG } = require('./utils/util');


async function RunAllTests() {

    LOG('\n\n Start Tests: ');

    //  Проверка работы DB

    await RunAllDbUserTests();

    await RunAllDbNoteTests();
    
    await RunAllDbSessionTests();


    //  Проверка работы API

    await RunAllApiUserTests();

    await RunAllApiNoteTests();

}

RunAllTests();
