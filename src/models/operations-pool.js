const mysql = require('mysql');
// const pool = require('../../conn');

// const poolConnection = pool;

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
    }
})

function insertPool(data) {
    let insertQuery = "INSERT INTO clients (phone_number, name, last_name, lat, log) VALUES(?, ?, ?, ?, ?)";
    let query = mysql.format(insertQuery, [data.phone_number, data.name, data.last_name, data.lat, data.log]);

    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, result) {
            if (err) throw err;
            // callback(result);

            connection.release();
        })
    });
}

function selectCoordsStored() {

    pool.getConnection(function(err, connection, callback) {
        if (err) throw err;
        connection.query("SELECT * FROM store", function (err, result, fields) {
            if (err) throw err;
            callback(result);

            
            connection.release();

        });

    });
    
}

module.exports = {
    insertPool,
    selectCoordsStored,
}