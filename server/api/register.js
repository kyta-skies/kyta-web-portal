import { defineEventHandler, readBody, useNitroApp } from 'h3';
import crypto from 'crypto'; // Ensure this is working on the server-side

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);
    const nitroApp = useNitroApp();
    
    if (!nitroApp || !nitroApp.db) {
        console.error('Database is not properly initialized.');
        return { success: false, message: 'Database not found' };
    }

    const db = nitroApp.db;

    try {
        // Hash password if required by your RADIUS setup, or leave plain text if needed
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        // Insert into radcheck table
        const [result] = await db.execute(
            'INSERT INTO radcheck (username, attribute, op, value) VALUES (?, "Cleartext-Password", ":=", ?)',
            [username, hashedPassword]
        );

        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error inserting into radcheck:', error);
        return { success: false, message: 'Error registering user' };
    }
});
