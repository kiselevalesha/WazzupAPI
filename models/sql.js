
const config = require('config');
const { LOG } = require('../utils/util')
const pool = require('./db')

async function ExecuteQuery(sql) {
    let conn;
    let result;
    try {

        conn = await pool.getConnection();        
        result = await conn.query(sql);
        //LOG(result);

    } catch (err) {
        LOG(err);
        throw err;

    } finally {
        if (conn) {
            //return conn.release();

            conn.release();            
        }
    }
    return result;
}
module.exports.ExecuteQuery = ExecuteQuery;


function getFullTableName(strTableName) {

    let strDatabaseName = config.get('DataBaseName');
    return strDatabaseName + '.' + strTableName;
}
module.exports.getFullTableName = getFullTableName;