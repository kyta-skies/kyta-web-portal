// server/api/auth.js
import { defineEventHandler, readBody } from "h3";
import radius from "radius";
import dgram from "dgram";

const RADIUS_SERVER = "127.0.0.1";
const RADIUS_SECRET = "testing123";
const RADIUS_PORT = 1812;

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);

    const packet = radius.encode({
        code: "Access-Request",
        secret: RADIUS_SECRET,
        identifier: 0,
        attributes: [
            ["User-Name", username],
            ["User-Password", password],
        ],
    });

    const client = dgram.createSocket("udp4");

    return new Promise((resolve) => {
        client.send(packet, 0, packet.length, RADIUS_PORT, RADIUS_SERVER, (err) => {
        if (err) {
            resolve({
                success: false,
                message: "Error communicating with RADIUS server",
            });
            client.close();
        }
    });

    client.on("message", (msg) => {
        const response = radius.decode({ packet: msg, secret: RADIUS_SECRET });
        if (response.code === "Access-Accept") {
            resolve({ success: true, message: "Authentication successful" });
        } else {
            resolve({ success: false, message: "Invalid credentials" });
        }
        client.close();
        });
    });
});
