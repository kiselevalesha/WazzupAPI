
"use strict";

const config = require('config');
const { LOG } = require('./utils/util')
const { getFullTableName } = require('./models/sql')
const pool = require('./models/db')

const sqlCreateTable = "CREATE TABLE IF NOT EXISTS ";
const sqlCreateIndex = "CREATE INDEX IF NOT EXISTS ";

let arraySQLs = [];
let sql;


//  Создаём отдельную базу данных. Её название берём из конфига - './config/default.json'
sql = 'CREATE DATABASE IF NOT EXISTS ' + config.get('DataBaseName');
arraySQLs.push(sql);


//  Таблица пользователей
sql = sqlCreateTable + getFullTableName(config.get('TableNameUsers')) +
" (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, strLogin VARCHAR(30) NOT NULL, strPassword VARCHAR(150), isDeleted INT(1) UNSIGNED DEFAULT 0)";
arraySQLs.push(sql);


//  Для каждой сессии свой токен. По сути таблица токенов.
sql = sqlCreateTable + getFullTableName(config.get('TableNameSessions')) +
" (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, idUser INT(6) UNSIGNED, strToken VARCHAR(250) NOT NULL, idHashToken INT(6) UNSIGNED DEFAULT 0, ageCreated TIMESTAMP DEFAULT current_timestamp(), intExpiried INT(9) UNSIGNED, isDeleted INT(1) UNSIGNED DEFAULT 0)";
arraySQLs.push(sql);
sql = sqlCreateIndex + "TestSessionIndex ON testSessions(idUser)";
arraySQLs.push(sql);


//  Таблица заметок
sql = sqlCreateTable + getFullTableName(config.get('TableNameNotes')) +
" (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY, idUser INT(6) NOT NULL, strNote VARCHAR(1000), isDeleted INT(1) UNSIGNED DEFAULT 0, isShared INT(1) UNSIGNED DEFAULT 0, ageCreated TIMESTAMP DEFAULT current_timestamp(), ageChanged TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp())";
arraySQLs.push(sql);
sql = sqlCreateIndex + "TestNoteIndex ON testNotes(idUser)";
arraySQLs.push(sql);




function CreateDBTables() {
    arraySQLs.forEach(function(item, index) {
        CreateDBTable(item, (index +1 == arraySQLs.length));        
    });
}

async function CreateDBTable(sql, flagIsFinish) {
    let conn;
    try {

        conn = await pool.getConnection();
        
        let result = await conn.query(sql);
        LOG(result);

    } catch (err) {
        LOG(err);
        throw err;
    } finally {

        if (flagIsFinish) {
            LOG("End");
            process.exit(0);            
        }

        if (conn) {
            return conn.release();
        }
    }
}

CreateDBTables();
