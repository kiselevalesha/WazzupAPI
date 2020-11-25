
const { LOG } = require('../../utils/util');
const { ExecuteQuery, getFullTableName } = require('../sql');
const config = require('config');
const { getUser } = require('./User');

const nameTableUsers = getFullTableName(config.get('TableNameUsers'));


async function findLogin(json) {
    let user = null;
    if (json) {
            let sql = 'SELECT * FROM ' + nameTableUsers + 
                        ' WHERE strLogin="' + json.login + '"';

            let result = await ExecuteQuery(sql);
            if (result.length > 0) {
                let row = result[0];
                user = getUser();
                user.id = row.id;
                user.login = row.strLogin;
                user.password = row.strPassword;
                user.isDeleted = row.isDeleted;
            }
        }
    return user;
}
module.exports.findLogin = findLogin;


async function findUser(json) {
    let user = null;
    if (json) {
            let sql = 'SELECT * FROM ' + nameTableUsers + 
                        ' WHERE strLogin="' + json.login + 
                        '" AND strPassword="' + json.password + '"';

            let result = await ExecuteQuery(sql);
            if (result.length > 0) {
                let row = result[0];
                user = getUser();
                user.id = row.id;
                user.login = row.strLogin;
                user.password = row.strPassword;
                user.isDeleted = row.isDeleted;
            }
        }
    return user;
}
module.exports.findUser = findUser;


async function addUser(json) {
    if (json) {
        let sql = 'INSERT INTO ' + nameTableUsers +
            '(strLogin, strPassword) ' +
            'VALUES ("' + json.login + '","' + json.password + '")';

        try {
            let result = await ExecuteQuery(sql);
            json.id = result.insertId;
        } catch(err) {
            LOG(err);
            throw err;
        }
    }
    return json;
}
module.exports.addUser = addUser;


async function deleteUser(json) {
    if (json)
        if (json.id) {

            let sql = 'UPDATE ' + nameTableUsers + ' SET isDeleted=1 WHERE id=' + json.id;
            
            try {
                let result = await ExecuteQuery(sql);
                if (result.affectedRows > 0) {
                    json.isDeleted = true;
                }            
            } catch(err) {
                LOG(err);
                throw err;
            }
        }
    return json;
}
module.exports.deleteUser = deleteUser;
