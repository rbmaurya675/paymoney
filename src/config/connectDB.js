const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'abcclub'
});

/*
const connection = mysql.createPool({
    host: '103.186.184.79',
    user: 'sgstrava_rtgrgfrdsgdsad',
    password: '_dCa@vN4Q*N7',
    database: 'sgstrava_poojajimam'
});
*/

export default connection;