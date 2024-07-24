

require('dotenv').config();
const mysql = require('mysql2');
const { Client } = require('pg');
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function db() {
    const con = new Client({
        user: 'your_username',
        host: 'localhost',
        database: 'your_database',
        password: 'your_password',
        port: 5432,
    });

    client.connect()
        .then(() => console.log('Connected to PostgreSQL'))
        .catch(err => console.error('Connection error', err.stack));

return con;
}

module.exports = db;
