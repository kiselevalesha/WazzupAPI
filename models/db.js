
const config = require('config');
const mariadb = require('mariadb');
const { LOG } = require('../utils/util');


//  Создам коннектор к базе данных - mariadb
//  по данным из './config/default.json'
const pool = mariadb.createPool({
host: config.get('DataBaseHost'), 
user: config.get('DataBaseLogin'), 
password: config.get('DataBasePassword'),
database: config.get('DataBaseName')
});


//  Открываем коннектор для использования
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  } 
