// server/plugins/db.js
import mysql from "mysql2/promise";

export default defineNitroPlugin(() => {
    const pool = mysql.createPool({
        host: "localhost", // Update with your database host
        user: "radius_user", // Update with your MariaDB user
        password: "your_password", // Update with your MariaDB password
        database: "radius", // FreeRADIUS database name
    });

    return {
        db: pool,
    };
});


