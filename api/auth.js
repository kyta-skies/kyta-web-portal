// Example with Express.js
const express = require('express');
const router = express.Router();
const radius = require('radius');
const dgram = require('dgram');

const RADIUS_SERVER = '192.168.1.120';
const RADIUS_SECRET = 'testing123';
const RADIUS_PORT = 1812;

router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const packet = radius.encode({
    code: 'Access-Request',
    secret: RADIUS_SECRET,
    identifier: 0,
    attributes: [
      ['User-Name', username],
      ['User-Password', password]
    ]
  });

  const client = dgram.createSocket('udp4');
  client.send(packet, 0, packet.length, RADIUS_PORT, RADIUS_SERVER, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error communicating with RADIUS server' });
    }
  });

  client.on('message', (msg) => {
    const response = radius.decode({ packet: msg, secret: RADIUS_SECRET });
    if (response.code === 'Access-Accept') {
      res.json({ success: true, redirectURL: '/success' });
    } else {
      res.json({ success: false });
    }
    client.close();
  });
});

module.exports = router;
