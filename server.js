'use strict';

const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const filePath = path.resolve(__dirname, req.url);
        if (filePath.endsWith('.json')) {
            res.setHeader('Content-Type', 'application/json');
        }
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    } else {
        res.writeHead(405);
        res.end('Method not allowed');
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Handle incoming messages here
    });

    // Example of sending a message with try-catch for error handling
    try {
        ws.send('Welcome to the WebSocket server');
    } catch (error) {
        console.error('Error sending WebSocket message:', error);
    }
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
