const mysql = require('mysql2/promise');

// Import useRuntimeConfig from Nuxt's composables
import { useRuntimeConfig } from '#imports';

const config = useRuntimeConfig();

const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
