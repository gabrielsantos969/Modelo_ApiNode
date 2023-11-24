const mysql = require('mysql2');
const config = require('config');

try{
    mysql.createConnection(config.get('database'));
    const connection = mysql.createPool(config.get('database'));
    console.log('Successful database connection!');
    module.exports = connection;
}catch(error){
    console.error('Error connecting to database:', error.message);
    throw error;
}