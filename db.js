const { query } = require('express');

require('dotenv').config();
const mysql = require('mysql2');

function db() {
    let conID;
    var con = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME, // Replace with your MySQL username (default is 'root')
        password: process.env.DB_PASSWORD, // Replace with your MySQL password (default is '' or 'root')
        database: process.env.DB_DBNAME,
        waitForConnections: true,
    });

    con.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
        } else {
            conID = connection.threadId;
            // console.log('Connected as id ' + connection.threadId);
            connection.query('SHOW TABLES LIKE "BOOKINGS"', (err, tables) => {
                if (err) {
                    console.error('Error checking if table exists:', err);
                } else {
                    if (tables.length === 0) {
                        const createTableQuery = `
                            CREATE TABLE BOOKINGS (
                                ID INT AUTO_INCREMENT PRIMARY KEY,
                                MOVIE_NAME VARCHAR(255),
                                TIME VARCHAR(255),
                                SHOW_TIME VARCHAR(255),
                                PEOPLE INT,
                                PRICE INT,
                                TOTAL_PRICE INT
                            )
                        `;
                        connection.query(createTableQuery, (err) => {
                            if (err) {
                                console.error('Error creating table:', err);
                            } else {
                                console.log('Table created successfully');
                            }
                        });
                    } else {
                        console.log('Table already exists');
                    }
                }
                connection.release(); // Release the connection back to the pool
            });
        }
    });

    return con;
}

module.exports = db;
