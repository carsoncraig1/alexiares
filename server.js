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

// TRAPIIIIIIIIIIII

// Functions
const extractSingleIP = (ipString) => {
    if (!ipString) return null;
    const ips = ipString.split(',');
    return ips[0].trim();
};

const hashValue = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
};

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



// Middleware to receive TRAPI Beta Traffic (FLUENT CVR)
app.get('/api/shein/v2/cvr', async (req, res) => {
    const { s1, s5, price, leadid, tid } = req.query;
    const timestamp = new Date().toISOString();
    res.status(200).send('OK');
});




// Sephora API

    // Test SEPH API Pixel Events
app.get('/api/sephora/test/v1', async (req, res, next) => {
    const { s1, ttclid } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);
    const payload = {
        event_source: "web",
        event_source_id: "CPBIPP3C77U2JI2IFOR0",
        test_event_code: "TEST13106",
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
                'Access-Token': '362bc64018aad2bc4fd55d121fd54c5f7c6f2ae0',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Test Event Sent. ${ttclid} ${s1}`, response.data);
    } catch (error) {
        console.error('Error TESTING POST request:', error);
    }
});

// Middleware to cloak SEPH API Traffic
app.get('/sephapi/:s1', (req, res, next) => {
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
                const destination = \`https://tok-reward.com/api/sephora/v1/entry?s1=\${s1}&ttclid=\${ttclid}\`;
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = destination;
                    } else {
                    }
            </script>
            <title>${s1}</title>
        </head>
        <body>
            <h1>Welcome to ${s1} Shop!</h1>
            <p>You are shopping at: ${s1}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served SephAPI Trojan (${s1})`);
});

// Middleware to receive SEPH API Traffic (ENTRY)
app.get('/api/sephora/v1/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(`https://klcxb6.mcgo2.com/visit/d198df7c-4379-4818-9f7c-ea8e2a34cf6a?slug=paramerror`);
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: "CPBIPP3C77U2JI2IFOR0",
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
                    url: "https://tok-reward.com"
                }
            }
        ]
    };
    
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '362bc64018aad2bc4fd55d121fd54c5f7c6f2ae0',
                'Content-Type': 'application/json'
            }
        });

        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://klcxb6.mcgo2.com/visit/16fdfaa7-e6eb-4b8d-b63d-c02ccc4371ac?s1=${s1}&ttclid=${ttclid}`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://klcxb6.mcgo2.com/visit/16fdfaa7-e6eb-4b8d-b63d-c02ccc4371ac?s1=entryposterror`);
    }
});


// Middleware to receive SEPH API Traffic (EXIT)
app.get('/api/sephora/v1/exit', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect('https://glitchy.go2cloud.org/aff_c?offer_id=481&aff_id=2159');
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

   const payload = {
        event_source: "web",
        event_source_id: "CPBIPP3C77U2JI2IFOR0",
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
                page: {
                    url: "https://tok-reward.com"
                }
            }
        ]
    };

    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '362bc64018aad2bc4fd55d121fd54c5f7c6f2ae0',
                'Content-Type': 'application/json'
            }
        });

        console.log(`CTR Posted (${s1})`);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=481&aff_id=2159&source=${s1}`);
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=481&aff_id=2159&source=exitposterror`);
    }
});


// Lululemon TRAPI v1

    // Test Lulu API Pixel Events
app.get('/api/lulu/test/v1', async (req, res, next) => {
    const { s1, ttclid } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);
    const payload = {
        event_source: "web",
        event_source_id: "CPERFEBC77U45REKKCJ0",
        test_event_code: "TEST13106",
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
                'Access-Token': '25d5f20ffa1eae06bf1816df84b167b32978f804',
                'Content-Type': 'application/json'
            }
        });
        console.log(`Test Event Sent. ${ttclid} ${s1}`, response.data);
    } catch (error) {
        console.error('Error TESTING POST request:', error);
    }
});

// Middleware to cloak Lulu API Traffic
app.get('/luluapi/:s1', (req, res, next) => {
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
                const destination = \`https://tok-reward.com/api/lulu/v1/entry?s1=\${s1}&ttclid=\${ttclid}\`;
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = destination;
                    } else {
                    }
            </script>
            <title>${s1}</title>
        </head>
        <body>
            <h1>Welcome to ${s1} Shop!</h1>
            <p>You are shopping at: ${s1}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served LuluAPI Trojan (${s1})`);
});

// Middleware to receive Lulu API Traffic (ENTRY)
app.get('/api/lulu/v1/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(`https://tok-reward.com/luluapi.html?s1=paramerror`);
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: "CPERFEBC77U45REKKCJ0",
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
                    url: "https://tok-reward.com"
                }
            }
        ]
    };
    
    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '25d5f20ffa1eae06bf1816df84b167b32978f804',
                'Content-Type': 'application/json'
            }
        });

        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://tok-reward.com/luluapi.html?s1=${s1}&ttclid=${ttclid}`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://tok-reward.com/luluapi.html?s1=entryposterror`);
    }
});


// Middleware to receive Lulu API Traffic (EXIT)
app.get('/api/lulu/v1/exit', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect('https://glitchy.go2cloud.org/aff_c?offer_id=463&aff_id=2159');
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

   const payload = {
        event_source: "web",
        event_source_id: "CPERFEBC77U45REKKCJ0",
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
                page: {
                    url: "https://tok-reward.com"
                }
            }
        ]
    };

    try {
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/event/track/', payload, {
            headers: {
                'Access-Token': '25d5f20ffa1eae06bf1816df84b167b32978f804',
                'Content-Type': 'application/json'
            }
        });

        console.log(`CTR Posted (${s1})`);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=463&aff_id=2159&source=${s1}`);
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=463&aff_id=2159&source=exitposterror`);
    }
});



// Reca TRAPI v2.1 (Shein)


// Middleware to cloak Reca TRAPI Traffic
app.get('/reca/:s1', (req, res, next) => {
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
                const destination = \`https://tok-reward.com/api/reca/v2/entry?s1=\${s1}&ttclid=\${ttclid}\`;
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = destination;
                    } else {
                    }
            </script>
            <title>${s1}</title>
        </head>
        <body>
            <h1>Welcome to ${s1} Shop!</h1>
            <p>You are shopping at: ${s1}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served TRAPI Trojan (${s1})`);
});

// Middleware to receive Reca TRAPI Traffic (ENTRY)
app.get('/api/reca/v2/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(`https://tok-reward.com/recashein.html`);
        console.log('TRAPI: UTM Error @ Entry (Reca/v2)')
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: "PIXEL ID NEEDED",
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
                'Access-Token': 'ACCESS TOKEN NEEDED',
                'Content-Type': 'application/json'
            }
        });

        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://tok-reward.com/recashein.html?s1=${s1}&ttclid=${ttclid}`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://tok-reward.com/recashein.html`);
    }
});


// Middleware to receive Reca TRAPI Traffic (EXIT)
app.get('/api/reca/v2/exit', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect('https://spnccrzone.com/?nc2u=N1TKAaFwAm26L%2b%2fv5DgCaeHmFZjWo2Y7vQJDRoz7h5U%3d&s1=trapierror');
        console.log('TRAPI: UTM Error @ Exit (Reca/v2)')
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

   const payload = {
        event_source: "web",
        event_source_id: "PIXEL ID NEEDED",
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
                'Access-Token': 'ACCESS TOKEN NEEDED',
                'Content-Type': 'application/json'
            }
        });

        console.log(`CTR Posted (${s1})`);
        res.redirect(`https://spnccrzone.com/?nc2u=N1TKAaFwAm26L%2b%2fv5DgCaeHmFZjWo2Y7vQJDRoz7h5U%3d&s1=${s1}&s5=${ttclid}`);
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(`https://spnccrzone.com/?nc2u=N1TKAaFwAm26L%2b%2fv5DgCaeHmFZjWo2Y7vQJDRoz7h5U%3d&s1=trapierror`);
    }
});



// Middleware to receive TRAPI Beta Traffic (FLUENT CVR)
app.get('/api/shein/v2/cvr', async (req, res) => {
    const { s1, s5, price, } = req.query;
    const event_time = Math.floor(Date.now() / 1000);
    res.status(200).send('OK');

  //  CODE OUT CVR HANDLING HERE
    
});



// Middleware to pass on Jay's SubIDs SHEIN
app.get('/jshein/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://fortyseven.cloud/jshein.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// DUDDUS PIXEL

// Middleware to cloak DUDDUS PIXEL Traffic
app.get('/duddpixel/:s1', (req, res, next) => {
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
                const destination = \`https://tok-reward.com/api/dudd/v1/entry?s1=\${s1}&ttclid=\${ttclid}\`;
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (utmXXX === "__PLACEMENT__") {
                    } else if (isMobileDevice) {
                        window.location.href = destination;
                    } else {
                    }
            </script>
            <title>${s1}'s Web Shop</title>
        </head>
        <body>
            <h1>Welcome to ${s1}'s Famous Web Shop!</h1>
            <p>You should find everything you need right here at ${s1}.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served duddPIXEL Trojan (${s1})`);
});

// Middleware to receive DUDDUS PIXEL Traffic (ENTRY)
app.get('/api/dudd/v1/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    if (!s1 || !ttclid) {
        return res.redirect(`https://docs.google.com/forms/d/e/1FAIpQLSfNB9DEDsoFbAx-E8-GTl1aWdRn4iT_TQU3_8lqXSwkAqiErA/viewform?usp=sf_link`);
        console.log('PIXEL: UTM Error @ Entry (Dudd/v1)')
    }
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const event_time = Math.floor(Date.now() / 1000);
    const external_id = hashValue(ttclid);

    const payload = {
        event_source: "web",
        event_source_id: "CPRD23JC77UF05LN0550",
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
                'Access-Token': '1f0242fb9af501afae734ad921816ca6d0597624',
                'Content-Type': 'application/json'
            }
        });

        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://docs.google.com/forms/d/e/1FAIpQLSfNB9DEDsoFbAx-E8-GTl1aWdRn4iT_TQU3_8lqXSwkAqiErA/viewform?usp=sf_link`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://docs.google.com/forms/d/e/1FAIpQLSfNB9DEDsoFbAx-E8-GTl1aWdRn4iT_TQU3_8lqXSwkAqiErA/viewform?usp=sf_link`);
    }
});


// END TRAPI

// ALEXIARES V3
// const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent);

const xorEncrypt = (str, key) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
};

// SHEIN ESPANOL

// SHEIN V3
app.get('/sheinv3/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const lander = `https://tokreward.com/trshein.html?slug=${slug}`;
    const key = 'delet-';
    const encryptedlander = xorEncrypt(lander, key);
    const trojanHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
                const urlParams = new URLSearchParams(window.location.search);
                const ttclid = urlParams.get("ttclid");
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (ttclid && isMobileDevice) {
                    const xorDecrypt = (str, key) => {
                        let result = '';
                        for (let i = 0; i < str.length; i++) {
                            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
                        }
                        return result;
                    };
                    const nine = "${key}";
                    const eight = "${encryptedlander}";
                    const seven = xorDecrypt(eight, nine);
                    window.location.href = seven;
                }
            </script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                header {
                    background-color: #333;
                    color: #fff;
                    padding: 1rem 0;
                    text-align: center;
                }
                main {
                    padding: 2rem;
                }
                .banner {
                    background-color: #e0e0e0;
                    padding: 2rem;
                    text-align: center;
                }
                .products {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }
                .product {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 200px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .product img {
                    max-width: 100%;
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 1rem;
                }
                footer {
                    background-color: #333;
                    color: #fff;
                    padding: 1rem 0;
                    text-align: center;
                    margin-top: 2rem;
                }
            </style>
       <body>
            <header>
                <h1>Welcome to ${slug} Shop!</h1>
            </header>
            <main>
                <div class="banner">
                    <h2>Exclusive Offers on Trendy Fashion</h2>
                    <p>Shop the latest trends and get the best deals at ${slug} Shop.</p>
                </div>
                <div class="products">
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 1">
                        <h3>Trendy Top</h3>
                        <p>$19.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 2">
                        <h3>Stylish Jeans</h3>
                        <p>$39.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 3">
                        <h3>Fashionable Jacket</h3>
                        <p>$59.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 4">
                        <h3>Elegant Dress</h3>
                        <p>$49.99</p>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; ${new Date().getFullYear()} ${slug} Shop. All rights reserved.</p>
            </footer>
        </body>
        </html>
            `;
            res.send(trojanHTML);
     console.log(`Served sheinv3 Trojan (${slug})`);
});

// SHEIN ESP
app.get('/esp/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/sheinesp.html`;
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
            <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        header {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 1rem;
        }
        main {
            padding: 20px;
        }
        footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
        </head>
        <body>
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
             <main>
        <h2>About Us</h2>
        <p>This is a simple website.</p>
    </main>
     <footer>
         <p>&copy; 2024 My Website. All rights reserved. | <a href="https://tokreward.com/pp.html">Privacy Policy</a></p>
    </footer>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served ESP Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/905/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=905`;
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
            <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: #f0f0f0;
            color: #333;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        header {
            background-color: #4a90e2;
            padding: 2em;
            text-align: right;
        }
        h1 {
            font-size: 2.5em;
            margin: 0;
            color: #fff;
        }
        .content {
            flex: 1;
            padding: 2em;
            max-width: 800px;
            margin: 0 auto;
        }
        .shop-info {
            background-color: #e2e2e2;
            border-left: 5px solid #4a90e2;
            padding: 1em;
            margin-bottom: 2em;
        }
        footer {
            background-color: #333;
            color: #fff;
            padding: 1em;
            text-align: center;
        }
        footer a {
            color: #4a90e2;
            text-decoration: none;
        }
        footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <h1>${slug} Emporium</h1>
    </header>
    
    <div class="content">
        <div class="shop-info">
            <p>Exploring the wonders of: <strong>${slug}</strong></p>
        </div>
        
        <h2>Discover the Extraordinary</h2>
        <p>Welcome to a realm where imagination meets reality. Our curated collection awaits your discovery.</p>
        
        <h3>Why Choose Us?</h3>
        <ul>
            <li>Unparalleled selection</li>
            <li>Expertly crafted experiences</li>
            <li>Journey into the unknown</li>
        </ul>
    </div>

    <footer>
        <p>Embark on your adventure &copy; 2024 ${slug} Emporium | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
    </footer>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 905 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/9052/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=905`;
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
            <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f9f3e6;
        color: #2c3e50;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header {
        background-color: #e67e22;
        padding: 1.5em;
        text-align: center;
    }
    h1 {
        font-size: 3em;
        margin: 0;
        color: #fff;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .content {
        flex: 1;
        padding: 2.5em;
        max-width: 900px;
        margin: 0 auto;
    }
    .shop-info {
        background-color: #fdf2e9;
        border-radius: 10px;
        padding: 1.2em;
        margin-bottom: 2.5em;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    footer {
        background-color: #34495e;
        color: #ecf0f1;
        padding: 1em;
        text-align: center;
    }
    footer a {
        color: #3498db;
        text-decoration: none;
    }
    footer a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <header>
        <h1>${slug} Bazaar</h1>
    </header>
    
    <div class="content">
        <div class="shop-info">
            <p>Unveiling the mysteries of: <strong>${slug}</strong></p>
        </div>
        
        <h2>Embark on a Mystical Journey</h2>
        <p>Step into a world where the extraordinary becomes tangible. Our collection of wonders awaits your exploration.</p>
        
        <h3>The ${slug} Experience</h3>
        <ul>
            <li>Artifacts from distant realms</li>
            <li>Enchanted items for the discerning collector</li>
            <li>Gateways to unexplored dimensions</li>
        </ul>
    </div>
    <footer>
        <p>Unlock the secrets of ${slug} &copy; 2024 ${slug} Bazaar | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
    </footer>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 905 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/9053/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=905`;
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
            <style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Courier New', monospace;
        background-color: #000;
        color: #0f0;
        overflow: hidden;
    }
    .terminal {
        height: 100vh;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
    }
    .cursor {
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        50% { opacity: 0; }
    }
    .header {
        font-size: 1.5em;
        margin-bottom: 20px;
    }
    .content {
        margin-bottom: 20px;
    }
    .menu {
        margin-bottom: 20px;
    }
    .menu-item {
        cursor: pointer;
    }
    .menu-item:hover {
        text-decoration: underline;
    }
    .footer {
        margin-top: 40px;
        font-size: 0.8em;
    }
    a {
        color: #0f0;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
<div class="terminal">
    <div class="header">
        <pre>${slug}</pre>
        <p>Welcome to ${slug} System v1.0.0</p>
    </div>

    <div class="content">
        <p>> Initializing ${slug} protocols...</p>
        <p>> ${slug} core systems online.</p>
        <p>> Enter command or select option:</p>
    </div>

    <div class="menu">
        <p class="menu-item">> 1. Access ${slug} Database</p>
        <p class="menu-item">> 2. Run ${slug} Diagnostics</p>
        <p class="menu-item">> 3. Activate ${slug} Subsystems</p>
        <p class="menu-item">> 4. Exit</p>
    </div>

    <div class="input">
        > <span class="cursor">█</span>
    </div>

    <div class="footer">
        <p>${slug} System &copy; 2024 | <a href="https://tokreward.com/pp.html">Privacy Protocol</a></p>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const response = document.createElement('p');
                response.textContent = `> Executing ${item.textContent.slice(3)}...`;
                item.parentNode.insertBefore(response, item.nextSibling);
            });
        });
    });
</script>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 905 Trojan (${slug})`);
});


// SHEIN BH FLUENT
app.get('/876/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/sheinesp.html?slug=876`;
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
            <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #2c3e50;
        color: #ecf0f1;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header {
        background-color: #e74c3c;
        padding: 1em;
        text-align: center;
    }
    h1 {
        font-size: 2em;
        margin: 0;
        text-transform: uppercase;
    }
    .content {
        flex: 1;
        padding: 2em;
        max-width: 900px;
        margin: 0 auto;
    }
    .featured-dish {
        background-color: #34495e;
        border-radius: 10px;
        padding: 1em;
        margin-bottom: 2em;
    }
    footer {
        background-color: #e74c3c;
        color: #ecf0f1;
        padding: 1em;
        text-align: center;
    }
    footer a {
        color: #3498db;
        text-decoration: none;
    }
    footer a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <header>
        <h1>${slug} Bistro</h1>
    </header>
    
    <div class="content">
        <div class="featured-dish">
            <p>Today's Special: <strong>${slug} Surprise Platter</strong></p>
        </div>
        
        <h2>Savor the Flavor Revolution</h2>
        <p>Welcome to a culinary journey that defies expectations. Our innovative menu pushes the boundaries of taste.</p>
        
        <h3>Our Gastronomy Principles:</h3>
        <ul>
            <li>Farm-fresh, locally sourced ingredients</li>
            <li>Fusion of global cuisines</li>
            <li>Molecular gastronomy techniques</li>
        </ul>
    </div>
    <footer>
        <p>Indulge in culinary artistry &copy; 2024 ${slug} Bistro | <a href="https://tokreward.com/pp.html">Privacy Pledge</a></p>
    </footer>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 876 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/8762/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/sheinesp.html?slug=876`;
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
            <style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Montserrat', sans-serif;
        background-color: #000;
        color: #fff;
    }
    .starfield {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIi8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgeD0iMTAiIHk9IjEwIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjMwIiB5PSIzMCIgZmlsbD0id2hpdGUiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4PSI1MCIgeT0iNTAiIGZpbGw9IndoaXRlIi8+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgeD0iNzAiIHk9IjcwIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHg9IjkwIiB5PSI5MCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=');
        animation: twinkle 10s linear infinite;
    }
    @keyframes twinkle {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
    .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
    }
    h1 {
        font-size: 4rem;
        margin-bottom: 0.5rem;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
    }
    .shop-info {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
    .portal {
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, #00ffff, #000080);
        border-radius: 50%;
        margin: 2rem auto;
        animation: pulse 4s infinite alternate;
    }
    @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 20px #00ffff; }
        100% { transform: scale(1.1); box-shadow: 0 0 40px #00ffff; }
    }
    .features {
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 800px;
        margin-top: 2rem;
    }
    .feature {
        background-color: rgba(0, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    .feature:hover {
        background-color: rgba(0, 255, 255, 0.2);
        transform: translateY(-5px);
    }
    footer {
        margin-top: 2rem;
        font-size: 0.9rem;
    }
    a {
        color: #00ffff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <div class="starfield"></div>
    <div class="content">
        <h1>${slug} Gateway</h1>
        <div class="shop-info">Your portal to: <strong>${slug}</strong></div>
        <div class="portal"></div>
        <p>Step through the ${slug} Gateway and discover realms beyond imagination.</p>
        <div class="features">
            <div class="feature">
                <h3>Cosmic Artifacts</h3>
                <p>Relics from distant galaxies</p>
            </div>
            <div class="feature">
                <h3>Dimensional Shifts</h3>
                <p>Experience alternate realities</p>
            </div>
            <div class="feature">
                <h3>Ethereal Essences</h3>
                <p>Capture the spirit of the cosmos</p>
            </div>
        </div>
        <footer>
            <p>Transcend reality with ${slug} &copy; 2024 | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
        </footer>
    </div>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 876 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/ary/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=ARY`;
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
            <style>
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #e8f5e9;
        color: #263238;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header {
        background-color: #2e7d32;
        padding: 1.8em;
        text-align: left;
    }
    h1 {
        font-size: 2.8em;
        margin: 0;
        color: #fff;
        letter-spacing: 2px;
    }
    .content {
        flex: 1;
        padding: 3em;
        max-width: 1000px;
        margin: 0 auto;
    }
    .shop-info {
        background-color: #c8e6c9;
        border: 2px solid #2e7d32;
        padding: 1.5em;
        margin-bottom: 2.5em;
        border-radius: 15px;
    }
    footer {
        background-color: #1b5e20;
        color: #fff;
        padding: 1.2em;
        text-align: center;
    }
    footer a {
        color: #81c784;
        text-decoration: none;
    }
    footer a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <header>
        <h1>${slug} Grove</h1>
    </header>
    
    <div class="content">
        <div class="shop-info">
            <p>Nurturing the essence of: <strong>${slug}</strong></p>
        </div>
        
        <h2>Cultivate Your Inner Wilderness</h2>
        <p>Welcome to a sanctuary where nature's wisdom and modern living intertwine. Our carefully tended collection awaits your discovery.</p>
        
        <h3>Embrace the ${slug} Spirit</h3>
        <ul>
            <li>Eco-friendly innovations</li>
            <li>Handcrafted botanical wonders</li>
            <li>Sustainable lifestyle essentials</li>
        </ul>
    </div>
    <footer>
        <p>Grow with ${slug} &copy; 2024 ${slug} Grove | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
    </footer>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served ARY Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/870/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=870`;
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
            <style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;
    }
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        height: 100vh;
    }
    .sidebar {
        background-color: rgba(0, 0, 0, 0.5);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .main-content {
        padding: 2rem;
        overflow-y: auto;
    }
    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    .shop-info {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 2rem;
    }
    .feature-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    .feature-item {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 1rem;
        transition: transform 0.3s ease;
    }
    .feature-item:hover {
        transform: translateY(-5px);
    }
    footer {
        margin-top: auto;
    }
    a {
        color: #ffd700;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <h1>${slug} Nexus</h1>
            <div class="shop-info">
                <p>Bridging realities: <strong>${slug}</strong></p>
            </div>
            <footer>
                <p>&copy; 2024 ${slug} Nexus</p>
                <p><a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
            </footer>
        </div>
        <div class="main-content">
            <h2>Traverse the Boundary</h2>
            <p>Step into the ${slug} Nexus, where the impossible becomes tangible and the extraordinary becomes your new normal.</p>
            
            <h3>Nexus Offerings</h3>
            <div class="feature-list">
                <div class="feature-item">
                    <h4>Reality Shifters</h4>
                    <p>Tools to bend your perception</p>
                </div>
                <div class="feature-item">
                    <h4>Quantum Relics</h4>
                    <p>Artifacts from parallel universes</p>
                </div>
                <div class="feature-item">
                    <h4>Temporal Echoes</h4>
                    <p>Glimpses of past and future</p>
                </div>
                <div class="feature-item">
                    <h4>Consciousness Expanders</h4>
                    <p>Unlock hidden potentials of your mind</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 870 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/947/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=947`;
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
            <style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Playfair Display', serif;
        background-color: #f0e6d2;
        color: #3a3a3a;
    }
    .scroll {
        height: 100vh;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
    }
    section {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
    }
    .hero {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="50" height="50" fill="%23d4af37"/><rect x="50" y="50" width="50" height="50" fill="%23d4af37"/></svg>');
        background-size: 20px 20px;
    }
    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        text-align: center;
        color: #8b4513;
    }
    .shop-info {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        font-style: italic;
    }
    .features {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
    }
    .feature {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        width: 250px;
    }
    .feature:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .feature h3 {
        color: #8b4513;
        margin-top: 0;
    }
    footer {
        background-color: #3a3a3a;
        color: #f0e6d2;
        padding: 1rem;
        text-align: center;
    }
    a {
        color: #d4af37;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <div class="scroll">
        <section class="hero">
            <h1>${slug} Atelier</h1>
            <div class="shop-info">Crafting wonders from: <strong>${slug}</strong></div>
        </section>
        
        <section>
            <h2>Our Masterpieces</h2>
            <div class="features">
                <div class="feature">
                    <h3>Timeless Treasures</h3>
                    <p>Heirlooms with stories to tell</p>
                </div>
                <div class="feature">
                    <h3>Bespoke Creations</h3>
                    <p>Tailored to your wildest dreams</p>
                </div>
                <div class="feature">
                    <h3>Artisanal Wonders</h3>
                    <p>Crafted with passion and precision</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Visit Our Atelier</h2>
            <p>Step into a world where creativity knows no bounds</p>
            <p>Open by appointment only</p>
        </section>
        
        <footer>
            <p>Discover the art of ${slug} &copy; 2024 ${slug} Atelier | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
        </footer>
    </div>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 947 Trojan (${slug})`);
});

// SHEIN BH FLUENT
app.get('/948/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tokreward.com/shein.html?slug=948`;
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
            <style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Lato', sans-serif;
        background-color: #1a1a1a;
        color: #e0e0e0;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-auto-rows: minmax(100px, auto);
        gap: 10px;
        height: 100vh;
        padding: 20px;
        box-sizing: border-box;
    }
    .item {
        background-color: #2a2a2a;
        padding: 20px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    .item:hover {
        transform: scale(1.02);
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    }
    .header {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title {
        font-size: 2.5rem;
        color: #00ffff;
        text-transform: uppercase;
        letter-spacing: 3px;
    }
    .shop-info {
        font-style: italic;
    }
    .main {
        grid-column: 1 / span 8;
        grid-row: 2 / span 2;
    }
    .sidebar {
        grid-column: 9 / -1;
        grid-row: 2 / span 2;
    }
    .feature {
        grid-column: span 4;
    }
    .footer {
        grid-column: 1 / -1;
        text-align: center;
    }
    h2 {
        color: #00ffff;
        border-bottom: 1px solid #00ffff;
        padding-bottom: 10px;
    }
    a {
        color: #00ffff;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        .container {
            grid-template-columns: 1fr;
        }
        .main, .sidebar, .feature {
            grid-column: 1 / -1;
        }
    }
</style>
</head>
<body>
    <div class="container">
        <header class="item header">
            <h1 class="title">${slug} Nexus</h1>
            <div class="shop-info">Converging realities of <strong>${slug}</strong></div>
        </header>
        
        <main class="item main">
            <h2>Enter the Nexus</h2>
            <p>Welcome to the intersection of imagination and reality. Here at ${slug} Nexus, we curate experiences that challenge your perception and expand your horizons.</p>
        </main>
        
        <aside class="item sidebar">
            <h2>Nexus Updates</h2>
            <p>Stay tuned for our next reality-bending event. The boundaries of ${slug} are ever-expanding.</p>
        </aside>
        
        <div class="item feature">
            <h3>Reality Fragments</h3>
            <p>Collect pieces of alternate worlds</p>
        </div>
        
        <div class="item feature">
            <h3>Paradox Puzzles</h3>
            <p>Challenge your mind with impossible riddles</p>
        </div>
        
        <div class="item feature">
            <h3>Quantum Quests</h3>
            <p>Embark on journeys across multiple realities</p>
        </div>
        
        <footer class="item footer">
            <p>Transcend the ordinary with ${slug} &copy; 2024 ${slug} Nexus | <a href="https://tokreward.com/pp.html">Privacy Assurance</a></p>
        </footer>
    </div>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served 948 Trojan (${slug})`);
});






// DUDDV3 CLOAKER
app.get('/duddv3/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const seven = `https://docs.google.com/forms/d/e/1FAIpQLSfTHpUqnxFVnmsQy7UuJMd9fJ3-Id_TgESDhNsRjpjnCiWytQ/viewform?usp=sf_link}`;
    const key = 'delet-';
    const eight = xorEncrypt(seven, key);
    const trojanHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
                // Cloaker logic
                const urlParams = new URLSearchParams(window.location.search);
                const ttclid = urlParams.get("ttclid");
                const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent);
                if (ttclid || (isMobileDevice && isTok)) {
                    const xorDecrypt = (str, key) => {
                        let result = '';
                        for (let i = 0; i < str.length; i++) {
                            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
                        }
                        return result;
                    };
                    const nine = "${key}";
                    const eight = "${eight}";
                    const seven = xorDecrypt(eight, nine);
                    window.location.href = seven;
                } else {
                }
            </script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                header {
                    background-color: #333;
                    color: #fff;
                    padding: 1rem 0;
                    text-align: center;
                }
                main {
                    padding: 2rem;
                }
                .banner {
                    background-color: #e0e0e0;
                    padding: 2rem;
                    text-align: center;
                }
                .products {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                }
                .product {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 200px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .product img {
                    max-width: 100%;
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 1rem;
                }
                footer {
                    background-color: #333;
                    color: #fff;
                    padding: 1rem 0;
                    text-align: center;
                    margin-top: 2rem;
                }
            </style>
       <body>
            <header>
                <h1>Welcome to ${slug}'s Latest Shop!</h1>
            </header>
            <main>
                <div class="banner">
                    <h2>Our Best Offers on the Latest Fashion</h2>
                    <p>Shop the newest trends and get the huge deals at ${slug} Shop.</p>
                </div>
                <div class="products">
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 1">
                        <h3>Fashionable Top</h3>
                        <p>$29.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 2">
                        <h3>Superb Jeans</h3>
                        <p>$49.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 3">
                        <h3>Trendy Jacket</h3>
                        <p>$69.99</p>
                    </div>
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Product 4">
                        <h3>Classy Dress</h3>
                        <p>$59.99</p>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; ${new Date().getFullYear()} ${slug} Shop. All rights reserved.</p>
            </footer>
        </body>
        </html>
            `;
            res.send(trojanHTML);
     console.log(`Served duddv3 Trojan (${slug})`);
});


// Middleware to pass on Jay's SubIDs SHEIN D2O
app.get('/jsheindir/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://spnccrzone.com/?es4v=FmyY4d6G0qOaPQMadpgCByOsBcl9sIUSvQJDRoz7h5U%3d&s1=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// Middleware to pass on Jay's SubIDs LULU D2O
app.get('/jluludir/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://spnccrzone.com/?eqi=WfzZhvInQ1FdcCTY6Obsf4Qdd3j8b0EuvQJDRoz7h5U%3d&s1=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// Middleware to pass on Tyler's SubIDs MY LANDER
app.get('/twshein/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twshein.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twshein Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs MY LANDER SHEIN GLITCHY
app.get('/twshein2/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twshein2.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twshein Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's Germany Shopify
app.get('/germany/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://shop-vivienna.myshopify.com/products/new-balance-9060-baskets-rose-cristal`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// Middleware to pass on Tyler's Debt lander
app.get('/jgw/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = 'https://advantageoasis.com/a7c2c0d53b94dfc6b117bf25c373b152d/?sid1=&sid2=&sid3=&sid4='
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twshein Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs SHEIN IMAGE LANDER
app.get('/twsheinimg/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twsheinimg.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twsheinimg Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs DIRECT TO MRR 
app.get('/twsheindir/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://sctrk.visit-24.com/4e06a3f4-32c3-5494-8c49-e059ad90b17e/?transaction_id=#clickid#&offer_id=#oid#&aff_id=#affid#&aff_sub=#traffic_source#&msisdn={mobile}&email={email}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twsheindir Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs SEPHORA
app.get('/twsephora/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twsephora.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twsheindir Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs SEPHORA IMAGE
app.get('/twsephoraimg/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twsephorauk.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twsheindir Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs MY LANDER
app.get('/twsheinuk/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twsheinuk.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twshein Trojan (tyler)(${slug})`);
});

// Middleware to cloak tyler Shopify
app.get('/alessi/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://alessiass.com/products/new-balance-9060-baskets-rose-cristal`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
});

// Middleware to pass on Tyler's SubIDs Cash Direct
app.get('/twcash/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://www.rewardslevel.com/aff_c?offer_id=74&aff_id=2612&source=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served twshein Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs Cash Direct Ryder
app.get('/twryddir/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://glitchy.go2cloud.org/aff_c?offer_id=295&aff_id=2612&source=ryder`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served ryddir Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs Brandy IMG 
app.get('/twbrandy/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/brandy.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served brandy Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs Lulu Camp
app.get('/twlulu/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twlulu.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served lulu Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs DIRECT TO MRR 
app.get('/twryd/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/twryd.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served ryd Trojan (tyler)(${slug})`);
});

// Middleware to pass on Tyler's SubIDs DIRECT TO MRR 
app.get('/rydsep/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://realrewardshub.com/rydsep.html?sub=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served ryd Trojan (tyler)(${slug})`);
});


// Middleware to pass on my slug values to MaxConv (SHEIN TR CAMP)
app.get('/shine', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    const hash = crypto.createHash('sha256').update(slug).digest('hex');
    const color = hash.substring(0, 5);
    const trojanHTML = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/cdn/preloader.js"></script>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #${color};
            color: #fff;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        header {
            background-color: #005f73;
            color: #ffffff;
            padding: 10px 20px;
            text-transform: uppercase;
        }
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 16px;
        }
        footer {
            background-color: #005f73;
            color: #ffffff;
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 10px 20px;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
    </style>
    <title>${slug} Online Store</title>
</head>
<body>
    <header>
        <h1>Welcome to ${slug}'s Online Store!</h1>
    </header>
    <div class="content">
        <p>Explore our exclusive products tailored just for you at ${slug} today.</p>
        <p>Also, enjoy a ${color}% discount on all goods today!</p>
    </div>
    <footer>
        <p>Contact us at info@${slug}.com</p>
    </footer>
</body>
</html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (SHEIN US CAMP)
app.get('/sheinus/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/1cc3f21b-9970-4cf1-98d6-2105066f060d?slug=${slug}`;
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
            <h1>Welcome to the ${slug} Store!</h1>
            <p>You are browsing ${slug}'s Web Shop.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (SHEIN CA CAMP)
app.get('/sheinca/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/90f05b7d-bdb1-4d1d-9a24-46227673017c?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (SHEIN AU CAMP)
app.get('/sheinuk/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/8584e0ec-eef7-4bd2-b0c3-f61d8cf8cf73?slug=${slug}`;
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
            <h1>Welcome to the new ${slug} Store!</h1>
            <p>We hope you enjoy ${slug}'s best products.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (SHEIN AU CAMP)
app.get('/sheinau/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/a967a674-626e-404d-8b17-96c3a7dcdcd2?slug=${slug}`;
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
            <h1>Welcome to the new ${slug} Store!</h1>
            <p>We hope you enjoy ${slug}'s best products.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (SEPHORA CAMP)
app.get('/sephora/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/d198df7c-4379-4818-9f7c-ea8e2a34cf6a?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (TARGET CAMP)
app.get('/target/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/af09135d-c73e-410f-addf-52b822c5351a?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (Zara CAMP)
app.get('/zara/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/a2dadc4f-b6d9-45d6-9838-317fb8c87e54?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (Amazon CAMP)
app.get('/amazon/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/53e2a32d-c43c-4b20-897f-dddab411b84c?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (FashionNova CAMP)
app.get('/fashionnova/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/7a95779d-bd9c-497c-ad4e-918f2078eded?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (H&M CAMP)
app.get('/hm/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/25001004-8d19-4e91-a62c-c8fd7d03c296?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (Lululemon CAMP)
app.get('/lululemon/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tok-reward.com/trlulu750.html?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served lulu Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (PrincessPolly CAMP)
app.get('/princesspolly/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/9487bda1-ab6d-4760-b3c1-9902dfe97936?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (Skims CAMP)
app.get('/skims/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/a7108b36-664a-4ea8-937b-49d9e287af7d?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (Stanley CAMP)
app.get('/stanley/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/25ad63e2-5e8f-4fd0-9e2f-f03bb7e2e357?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// Middleware to pass on my slug values to MaxConv (WhiteFOX CAMP)
app.get('/whitefox/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://klcxb6.mcgo2.com/visit/932425b2-032f-4aa2-b142-d942d2deb83d?slug=${slug}`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served shein Trojan (${slug})`);
});

// DUDDUS SPLIT TARGET GOOGLE FORM
app.get('/dudd/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://docs.google.com/forms/d/e/1FAIpQLSfNB9DEDsoFbAx-E8-GTl1aWdRn4iT_TQU3_8lqXSwkAqiErA/viewform?usp=sf_link`;
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
            <title>${slug}'s New Web Shop</title>
        </head>
        <body>
            <h1>Greetings, and welcome to ${slug}'s New Web Shop!</h1>
            <p>We hope you genuinely enjoy shopping here at ${slug} Web Shop and find everything you need.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served Duddus Trojan (${slug})`);
});

// DUDDUS SPLIT TARGET GOOGLE FORM AUSTRALIA 
app.get('/duddau/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tok-reward.com/target500.html`;
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
            <title>${slug}'s New Web Shop</title>
        </head>
        <body>
            <h1>Greetings, and welcome to ${slug}'s New Web Shop!</h1>
            <p>We hope you genuinely enjoy shopping here at ${slug} Web Shop and find everything you need.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served Duddus Trojan (${slug})`);
});

// TEAM1 SHEIN SPARK - 15% SPLIT UTM TAG
app.get('/team1/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://tok-reward.com/team1.html`;
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
            <h1>Welcome to ${slug} Shop!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served team1 Trojan (${slug})`);
});


// GLITCHY TEAM2 PATHS

// Abdullah SHEIN Campaign
app.get('/abdu/:slug', (req, res, next) => {
    const { slug } = req.params;
    const destinationLander = `https://rewards-for-all.com/shein13750.html?slug=${slug}`;
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
            <h1>Greetings from ${slug}'s Store!</h1>
            <p>We hope you enjoy our products at ${slug}.</p>
        </body>
        </html>
            `;
            res.send(trojanHTML);
            console.log(`Served abudllah Shein Trojan (${slug})`);
});

// CLAUDE MEGA BUILD

const layouts = [
    {
        name: 'minimal',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Minimal</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: ${backgroundColor}; color: #333; line-height: 1.6; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    header { text-align: center; margin-bottom: 40px; }
                    .product { display: flex; justify-content: space-between; align-items: center; }
                    .product img { max-width: 50%; }
                    .product-info { width: 45%; }
                    button { background-color: ${backgroundColor}; color: white; border: none; padding: 10px 20px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Minimal Design | ${hash.substr(0, 8)}</p>
                    </header>
                    <main>
                        <img src="/images/${banner}" alt="Banner" style="width: 100%; margin-bottom: 30px;">
                        <div class="product">
                            <img src="/images/${product.image}" alt="${product.name}">
                            <div class="product-info">
                                <h2>${product.name}</h2>
                                <p>Price: $${product.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </main>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'bold',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/preloader.js"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Bold</title>
                <style>
                    body { font-family: 'Helvetica', sans-serif; background-color: ${backgroundColor}; color: white; margin: 0; }
                    header { background-color: ${backgroundColor}; padding: 20px; text-align: center; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    .product { background-color: rgba(255,255,255,0.1); padding: 20px; margin-top: 40px; text-align: center; }
                    .product img { max-width: 100%; margin-bottom: 20px; }
                    button { background-color: #ff4500; color: white; border: none; padding: 15px 30px; font-size: 18px; cursor: pointer; }
                </style>
            </head>
            <body>
                <header>
                    <h1>${store}</h1>
                    <p>Bold & Beautiful | ${hash.substr(0, 8)}</p>
                </header>
                <div class="container">
                    <img src="/images/${banner}" alt="Banner" style="width: 100%;">
                    <div class="product">
                        <h2>${product.name}</h2>
                        <img src="/images/${product.image}" alt="${product.name}">
                        <p>Price: $${product.price}</p>
                        <button>Shop Now</button>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'elegant',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Elegant</title>
                <style>
                    body { font-family: 'Georgia', serif; background-color: #f8f8f8; color: ${backgroundColor}; line-height: 1.6; }
                    .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
                    header { border-bottom: 2px solid ${backgroundColor}; padding-bottom: 20px; margin-bottom: 40px; }
                    .product { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
                    .product img { max-width: 100%; }
                    button { background-color: ${backgroundColor}; color: white; border: none; padding: 10px 20px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Elegance Defined | ${hash.substr(0, 8)}</p>
                    </header>
                    <main>
                        <img src="/images/${banner}" alt="Banner" style="width: 100%; margin-bottom: 40px;">
                        <div class="product">
                            <img src="/images/${product.image}" alt="${product.name}">
                            <div>
                                <h2>${product.name}</h2>
                                <p>Price: $${product.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </main>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'modern',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Modern</title>
                <style>
                    body { font-family: 'Roboto', sans-serif; background-color: #fff; color: ${backgroundColor}; line-height: 1.6; margin: 0; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    header { background-color: ${backgroundColor}; color: white; padding: 20px; }
                    .product { display: flex; flex-direction: column; align-items: center; margin-top: 40px; }
                    .product img { max-width: 80%; margin-bottom: 20px; }
                    button { background-color: #333; color: white; border: none; padding: 15px 30px; cursor: pointer; }
                </style>
            </head>
            <body>
                <header>
                    <h1>${store}</h1>
                    <p>Modern Style ${hash.substr(0, 8)}</p>
                </header>
                <div class="container">
                    <img src="/images/${banner}" alt="Banner" style="width: 100%; margin-top: 20px;">
                    <div class="product">
                        <img src="/images/${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>Price: $${product.price}</p>
                        <button>Buy Now</button>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'retro',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Retro</title>
                <style>
                    body { font-family: 'Courier New', monospace; background-color: ${backgroundColor}; color: #333; }
                    .container { max-width: 800px; margin: 0 auto; padding: 20px; border: 4px solid ${backgroundColor}; }
                    header { text-align: center; margin-bottom: 40px; }
                    .product { background-color: #fff; padding: 20px; border: 2px dashed #333; }
                    .product img { max-width: 100%; border: 10px solid #fff; box-shadow: 0 0 0 2px #333; }
                    button { background-color: ${backgroundColor}; color: white; border: none; padding: 10px 20px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Retro Vibes ${hash.substr(0, 8)}</p>
                    </header>
                    <img src="/images/${banner}" alt="Banner" style="width: 100%; margin-bottom: 20px;">
                    <div class="product">
                        <h2>${product.name}</h2>
                        <img src="/images/${product.image}" alt="${product.name}">
                        <p>Price: $${product.price}</p>
                        <button>Groovy! Add to Cart</button>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'minimalist',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Minimalist</title>
                <style>
                    body { font-family: 'Helvetica Neue', sans-serif; background-color: ${backgroundColor}; color: #333; line-height: 1.6; }
                    .container { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
                    header { margin-bottom: 60px; }
                    h1, h2 { font-weight: 300; }
                    .product { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
                    .product img { width: 100%; }
                    button { background-color: ${backgroundColor}; color: white; border: none; padding: 10px 20px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Less is More ${hash.substr(0, 8)}</p>
                    </header>
                    <main>
                        <img src="/images/${banner}" alt="Banner" style="width: 100%; margin-bottom: 60px;">
                        <div class="product">
                            <img src="/images/${product.image}" alt="${product.name}">
                            <div>
                                <h2>${product.name}</h2>
                                <p>$${product.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                    </main>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'artsy',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Artsy</title>
                <style>
                    body { font-family: 'Garamond', serif; background-color: ${backgroundColor}; color: #333; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    header { text-align: center; margin-bottom: 40px; }
                    .banner { position: relative; margin-bottom: 40px; }
                    .banner::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, ${backgroundColor}80, transparent); }
                    .product { display: flex; justify-content: space-between; align-items: center; background-color: #fff; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                    .product img { max-width: 50%; }
                    button { background-color: ${backgroundColor}; color: white; border: none; padding: 10px 20px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Artistic Expression ${hash.substr(0, 8)}</p>
                    </header>
                    <div class="banner">
                        <img src="/images/${banner}" alt="Banner" style="width: 100%;">
                    </div>
                    <div class="product">
                        <img src="/images/${product.image}" alt="${product.name}">
                        <div>
                            <h2>${product.name}</h2>
                            <p>Price: $${product.price}</p>
                            <button>Add to Collection</button>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'vintage',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Vintage</title>
                <style>
                    body { font-family: 'Times New Roman', serif; background-color: ${backgroundColor}; color: #4a4a4a; }
                    .container { max-width: 900px; margin: 0 auto; padding: 20px; border: 10px solid ${backgroundColor}; }
                    header { text-align: center; margin-bottom: 30px; }
                    h1 { font-size: 3em; color: #2c2c2c; }
                    .banner { position: relative; margin-bottom: 30px; }
                    .banner img { width: 100%; filter: sepia(30%); }
                    .banner::after { content: '${hash.substr(0, 8)}'; position: absolute; bottom: 10px; right: 10px; background-color: rgba(255,255,255,0.7); padding: 5px; }
                    .product { background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                    .product img { max-width: 100%; margin-bottom: 20px; border: 5px solid #d3d3d3; }
                    button { background-color: ${backgroundColor}; color: #f9f3e6; border: none; padding: 10px 20px; cursor: pointer; font-family: inherit; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Timeless Elegance</p>
                    </header>
                    <div class="banner">
                        <img src="/images/${banner}" alt="Banner">
                    </div>
                    <div class="product">
                        <img src="/images/${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>Price: $${product.price}</p>
                        <button>Add to Your Collection</button>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'neon',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Neon</title>
                <style>
                    body { font-family: 'Arial', sans-serif; background-color: ${backgroundColor}; color: #fff; margin: 0; overflow-x: hidden; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    header { text-align: center; margin-bottom: 40px; }
                    h1 { font-size: 4em; color: ${backgroundColor}; text-shadow: 0 0 10px ${backgroundColor}, 0 0 20px ${backgroundColor}, 0 0 30px ${backgroundColor}; }
                    .banner { position: relative; margin-bottom: 40px; }
                    .banner img { width: 100%; filter: brightness(0.7) contrast(1.2); }
                    .banner::before { content: '${hash.substr(0, 8)}'; position: absolute; top: 10px; left: 10px; color: #fff; background-color: rgba(0,0,0,0.5); padding: 5px; }
                    .product { display: flex; justify-content: space-between; align-items: center; background-color: #222; padding: 20px; border: 2px solid ${backgroundColor}; box-shadow: 0 0 10px ${backgroundColor}; }
                    .product img { max-width: 50%; }
                    .product-info { width: 45%; }
                    button { background-color: ${backgroundColor}; color: #111; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; text-transform: uppercase; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                    </header>
                    <div class="banner">
                        <img src="/images/${banner}" alt="Banner">
                    </div>
                    <div class="product">
                        <img src="/images/${product.image}" alt="${product.name}">
                        <div class="product-info">
                            <h2>${product.name}</h2>
                            <p>Price: $${product.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    },
    {
        name: 'eco',
        generateHTML: (store, product, banner, backgroundColor, hash, preloader) => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <script src="/cdn/${preloader}"></script>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${store} - Eco-Friendly</title>
                <style>
                    body { font-family: 'Verdana', sans-serif; background-color: ${backgroundColor}; color: #2c3e50; line-height: 1.6; }
                    .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
                    header { text-align: center; margin-bottom: 40px; }
                    h1 { color: #1abc9c; }
                    .banner { position: relative; margin-bottom: 30px; }
                    .banner img { width: 100%; border-radius: 10px; }
                    .banner::after { content: '${hash.substr(0, 8)}'; position: absolute; bottom: 10px; right: 10px; background-color: rgba(255,255,255,0.8); padding: 5px; border-radius: 5px; }
                    .product { background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                    .product img { max-width: 100%; border-radius: 5px; }
                    button { background-color: ${backgroundColor}; color: #fff; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>${store}</h1>
                        <p>Sustainable Shopping</p>
                    </header>
                    <div class="banner">
                        <img src="/images/${banner}" alt="Banner">
                    </div>
                    <div class="product">
                        <img src="/images/${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>Price: $${product.price}</p>
                        <p>Made with eco-friendly materials</p>
                        <button>Add to Green Cart</button>
                    </div>
                </div>
            </body>
            </html>
        `
    }
  ];
const products = [
    { name: 'Elegant Watch', price: 199.99, image: 'watch.jpg' },
    { name: 'Leather Backpack', price: 89.99, image: 'backpack.jpg' },
    { name: 'Wireless Earbuds', price: 129.99, image: 'earbuds.jpg' },
    { name: 'Fitness Tracker', price: 79.99, image: 'tracker.jpg' },
    { name: 'Portable Charger', price: 49.99, image: 'charger.jpg' },
    { name: 'Sunglasses', price: 159.99, image: 'sunglasses.jpg' },
    { name: 'Yoga Mat', price: 39.99, image: 'yogamat.jpg' },
    { name: 'Bluetooth Speaker', price: 89.99, image: 'speaker.jpg' },
    { name: 'Coffee Maker', price: 129.99, image: 'coffeemaker.jpg' },
    { name: 'Digital Camera', price: 399.99, image: 'camera.jpg' }
];
const banners = [
    'summer_sale.jpg', 'new_arrivals.jpg', 'best_sellers.jpg', 'clearance.jpg', 'flash_deals.jpg',
    'free_shipping.jpg', 'customer_favorites.jpg', 'top_brands.jpg', 'trending_now.jpg', 'limited_time.jpg'
];
function generateHash(subdomain) {
    return crypto.createHash('sha256').update(subdomain).digest('hex');
}
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
function selectFromArray(array, seed) {
    const index = Math.floor(seededRandom(seed) * array.length);
    return array[index];
}
function generateColor(hash) {
    return '#' + hash.substr(0, 6);
}

// SHEIN
app.get('/shienc', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    const hash = generateHash(slug);
    const preloader = "preloader.js";
    let ttclid = req.query.ttclid || 'BOT';
    if (ttclid !== 'BOT') {
        ttclid = ttclid.slice(0, 5);
    }
    console.log(`Served SHEIN Claude Trojan (${slug})::(${ttclid})`);
    const layout = selectFromArray(layouts, parseInt(hash.substr(0, 8), 16));
    const product = selectFromArray(products, parseInt(hash.substr(8, 8), 16));
    const banner = selectFromArray(banners, parseInt(hash.substr(16, 8), 16));
    const backgroundColor = generateColor(hash);
    const html = layout.generateHTML(slug, product, banner, backgroundColor, hash, preloader);
    res.send(html);
});

// SHEIN ESPANOL
app.get('/esp', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    const hash = generateHash(slug);
    const preloader = "preloaderESP.js";
    let ttclid = req.query.ttclid || 'BOT';
    if (ttclid !== 'BOT') {
        ttclid = ttclid.slice(0, 5);
    }
    console.log(`Served CLAUDE Trojan (${slug})::(${ttclid})`);
    const layout = selectFromArray(layouts, parseInt(hash.substr(0, 8), 16));
    const product = selectFromArray(products, parseInt(hash.substr(8, 8), 16));
    const banner = selectFromArray(banners, parseInt(hash.substr(16, 8), 16));
    const backgroundColor = generateColor(hash);
    const html = layout.generateHTML(slug, product, banner, backgroundColor, hash, preloader);
    res.send(html);
});

// SEPHORA
app.get('/claude2', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    const hash = generateHash(slug);
    const preloader = "preloader2.js";
    let ttclid = req.query.ttclid || 'BOT';
    if (ttclid !== 'BOT') {
        ttclid = ttclid.slice(0, 5);
    }
    console.log(`Served CLAUDE2 Trojan (${slug})::(${ttclid})`);
    const layout = selectFromArray(layouts, parseInt(hash.substr(0, 8), 16));
    const product = selectFromArray(products, parseInt(hash.substr(8, 8), 16));
    const banner = selectFromArray(banners, parseInt(hash.substr(16, 8), 16));
    const backgroundColor = generateColor(hash);
    const html = layout.generateHTML(slug, product, banner, backgroundColor, hash, preloader);
    res.send(html);
});

// LULU
app.get('/claude3', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    const hash = generateHash(slug);
    const preloader = "preloader3.js";
    let ttclid = req.query.ttclid || 'BOT';
    if (ttclid !== 'BOT') {
        ttclid = ttclid.slice(0, 5);
    }
    console.log(`Served CLAUDE3 Trojan (${slug})::(${ttclid})`);
    const layout = selectFromArray(layouts, parseInt(hash.substr(0, 8), 16));
    const product = selectFromArray(products, parseInt(hash.substr(8, 8), 16));
    const banner = selectFromArray(banners, parseInt(hash.substr(16, 8), 16));
    const backgroundColor = generateColor(hash);
    const html = layout.generateHTML(slug, product, banner, backgroundColor, hash, preloader);
    res.send(html);
});

// SHEIN V4 SUB METHOD
//         const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent); && !isTok
app.get('/shop', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    console.log(`Served SHEINV4 Trojan (${slug})`);
    const trojanHTML = `
   		<html class="js" lang="en" style="--header-height: 65px;"><head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';">
    <link rel="canonical" href="https://bf9fa1-7d.myshopify.com/"><link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin=""><title>${slug}</title>
    <meta name="description" content="${slug}">
    <script src="/cdn/preloader.js"></script>
    <script type="text/javascript" async="" src="//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/constants.js?v=132983761750457495441719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/pubsub.js?v=158357773527763999511719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/global.js?v=88558128918567037191719145825" defer="defer"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/animations.js?v=88693664871331136111719145824" defer="defer"></script><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');</script><meta id="shopify-digital-wallet" name="shopify-digital-wallet" content="/88131174695/digital_wallets/dialog">
<meta name="shopify-checkout-api-token" content="5f633adca8c940044b923295b38e9d6f">
<meta id="in-context-paypal-metadata" data-shop-id="88131174695" data-venmo-supported="true" data-environment="production" data-locale="en_US" data-paypal-v4="true" data-currency="USD">
<script async="async" src="/checkouts/internal/preloads.js?locale=en-US"></script>
<script async="async" src="https://shop.app/checkouts/internal/preloads.js?locale=en-US&amp;shop_id=88131174695" crossorigin="anonymous"></script>
<script id="shopify-features" type="application/json">{"accessToken":"5f633adca8c940044b923295b38e9d6f","betas":["rich-media-storefront-analytics"],"domain":"bf9fa1-7d.myshopify.com","predictiveSearch":true,"shopId":88131174695,"smart_payment_buttons_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/spb.en.js","dynamic_checkout_cart_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/dynamic-checkout-cart.en.js","locale":"en"}</script>
<script>var Shopify = Shopify || {};
Shopify.shop = "bf9fa1-7d.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {"active":"USD","rate":"1.0"};
Shopify.country = "US";
Shopify.theme = {"name":"Dawn","id":168610332967,"theme_store_id":887,"role":"main"};
Shopify.theme.handle = "null";
Shopify.theme.style = {"id":null,"handle":null};
Shopify.cdnHost = "bf9fa1-7d.myshopify.com/cdn";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";</script>
<script type="module">!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);</script>
<script>!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);</script>
<script id="shop-js-features" type="application/json">{"compact":true,"defer_modal_on_autofill":true}</script>
<script id="shop-js-analytics" type="application/json">{"pageType":"index"}</script>
<script id="__st">var __st={"a":88131174695,"offset":-14400,"reqid":"9ef2e78c-2419-41be-ad33-ba2ee813cba0-1719168991","pageurl":"bf9fa1-7d.myshopify.com\/","u":"1870d9f961fb","p":"home"};</script>
<script>window.ShopifyPaypalV4VisibilityTracking = true;</script>
<script id="captcha-bootstrap">!function(){'use strict';const e='contact',t='account',n='new_comment',o=e=>e.map((([e,t])=>\`form[action*='/\${e}'] input[name='form_type'][value='\${t}']\`)).join(',');function c(e,t){try{const n=window.sessionStorage;for(const[o,c]of Object.entries(JSON.parse(n.getItem(t))))e.elements[o]&&(e.elements[o].value=c);n.removeItem(t)}catch{}}const r='form_type',s='cptcha';function a(e){e.dataset[s]=!0}((i,m,f,u,d,l,p)=>{if(0)return;let E=!1;const _=(e,t,n)=>{const o=i[f][u],c=o.bindForm,r='6LeHG2ApAAAAAO4rPaDW-qVpPKPOBfjbCpzJB9ey',s={infoText:'',privacyText:'',termsText:''};if(c)return c(e,r,t,s).then(n);o.q.push([[e,r,t,s],n]),E||(m.body.append(Object.assign(m.createElement('script'),{id:'captcha-provider',async:!0,src:'https://cdn.shopify.com/shopifycloud/storefront-forms-hcaptcha/ce_storefront_forms_captcha_recaptcha.v1.2.0.iife.js'})),E=!0)};i[f]=i[f]||{},i[f][u]=i[f][u]||{},i[f][u].q=[],i[f][d]=i[f][d]||{},i[f][d].protect=function(e,t){_(e,void 0,t),a(e)},Object.freeze(i[f][d]),function(i,m,f,u,d,l){const[p,E,_]=function(c,r,s){const a=r?[[e,e],['blogs',n],['comments',n],[e,'customer']]:[],i=c?[[t,'customer_login'],[t,'guest_login'],[t,'recover_customer_password'],[t,'create_customer']]:[],m=[...a,...i],f=o(m),u=o(a.slice(0,3)),d=s&&o(m.filter((([e,t])=>s.includes(t)))),l=e=>()=>e?[...document.querySelectorAll(e)].map((e=>e.form)):[];return[l(f),l(u),l(d)]}(!0,!0,['guest_login']),T=e=>{const t=e.target,n=t instanceof HTMLFormElement?t:t&&t.form;return n&&p().find((e=>n===e))};i.addEventListener('submit',(e=>{T(e)&&e.preventDefault()}));const h=(e,t)=>{e&&!e.dataset[s]&&(f(e,t.some((t=>t===e))),a(e))};for(const e of['focusin','change'])i.addEventListener(e,(e=>h(T(e),E())));const v=m.get('form_key'),g=m.get(r),y=v&&g;i.addEventListener('DOMContentLoaded',(()=>{const e=E();if(y)for(const t of e)t.elements[r].value===g&&c(t,v);[...new Set([..._(),...p().filter((e=>'true'===e.dataset.shopifyCaptcha))])].forEach((t=>h(t,e)))}))}(m,new URLSearchParams(i.location.search),_)})(window,document,'Shopify','ce_forms','captcha')}();</script>
<script integrity="sha256-n5Uet9jVOXPHGd4hH4B9Y6+BxkTluaaucmYaxAjUcvY=" data-source-attribution="shopify.loadfeatures" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/load_feature-9f951eb7d8d53973c719de211f807d63af81c644e5b9a6ae72661ac408d472f6.js" crossorigin="anonymous"></script>
<script integrity="sha256-HAs5a9TQVLlKuuHrahvWuke+s1UlxXohfHeoYv8G2D8=" data-source-attribution="shopify.dynamic-checkout" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/features-1c0b396bd4d054b94abae1eb6a1bd6ba47beb35525c57a217c77a862ff06d83f.js" crossorigin="anonymous"></script>
<script id="sections-script" data-sections="header" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/compiled_assets/scripts.js?9"></script>

<style id="shopify-dynamic-checkout-cart">@media screen and (min-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 50px;
  }
}

@media screen and (max-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 120px;
  }
}
</style><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');</script>


    <style data-shopify="">
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}

      @font-face {
  font-family: Assistant;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.3335c7bdaddf2501ddab87cdbd9be98f3870e10d.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=c87cc21930937be7b58be0734e244223473b6ace5523d0e7b06e828569a94f87") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.7c85f5c5cc1555de92cc7ef2790ee3cffe5237f5.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=ecf5788540c4284099475db4214e7a11fb203b27fde61807a6efab8d186b63d7") format("woff");
}

      
      
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}


      
        :root,
        .color-scheme-1 {
          --color-background: 255,255,255;
        
          --gradient-background: #FFFFFF;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 191,191,191;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 255,255,255;
        --color-secondary-button: 255,255,255;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 255,255,255;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(255 255 255);
      }
      
        
        .color-scheme-2 {
          --color-background: 243,243,243;
        
          --gradient-background: #F3F3F3;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 179,179,179;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 243,243,243;
        --color-secondary-button: 243,243,243;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 243,243,243;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(243 243 243);
      }
      
        
        .color-scheme-3 {
          --color-background: 36,40,51;
        
          --gradient-background: #242833;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 47,52,66;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 0,0,0;
        --color-secondary-button: 36,40,51;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 36,40,51;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(36 40 51);
      }
      
        
        .color-scheme-4 {
          --color-background: 18,18,18;
        
          --gradient-background: #121212;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 146,146,146;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 18,18,18;
        --color-secondary-button: 18,18,18;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 18,18,18;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(18 18 18);
      }
      
        
        .color-scheme-5 {
          --color-background: 51,79,180;
        
          --gradient-background: #334FB4;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 23,35,81;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 51,79,180;
        --color-secondary-button: 51,79,180;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 51,79,180;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(51 79 180);
      }
      

      body, .color-scheme-1, .color-scheme-2, .color-scheme-3, .color-scheme-4, .color-scheme-5 {
        color: rgba(var(--color-foreground), 0.75);
        background-color: rgb(var(--color-background));
      }

      :root {
        --font-body-family: Assistant, sans-serif;
        --font-body-style: normal;
        --font-body-weight: 400;
        --font-body-weight-bold: 700;

        --font-heading-family: Assistant, sans-serif;
        --font-heading-style: normal;
        --font-heading-weight: 400;

        --font-body-scale: 1.0;
        --font-heading-scale: 1.0;

        --media-padding: px;
        --media-border-opacity: 0.05;
        --media-border-width: 1px;
        --media-radius: 0px;
        --media-shadow-opacity: 0.0;
        --media-shadow-horizontal-offset: 0px;
        --media-shadow-vertical-offset: 4px;
        --media-shadow-blur-radius: 5px;
        --media-shadow-visible: 0;

        --page-width: 120rem;
        --page-width-margin: 0rem;

        --product-card-image-padding: 0.0rem;
        --product-card-corner-radius: 0.0rem;
        --product-card-text-alignment: left;
        --product-card-border-width: 0.0rem;
        --product-card-border-opacity: 0.1;
        --product-card-shadow-opacity: 0.0;
        --product-card-shadow-visible: 0;
        --product-card-shadow-horizontal-offset: 0.0rem;
        --product-card-shadow-vertical-offset: 0.4rem;
        --product-card-shadow-blur-radius: 0.5rem;

        --collection-card-image-padding: 0.0rem;
        --collection-card-corner-radius: 0.0rem;
        --collection-card-text-alignment: left;
        --collection-card-border-width: 0.0rem;
        --collection-card-border-opacity: 0.1;
        --collection-card-shadow-opacity: 0.0;
        --collection-card-shadow-visible: 0;
        --collection-card-shadow-horizontal-offset: 0.0rem;
        --collection-card-shadow-vertical-offset: 0.4rem;
        --collection-card-shadow-blur-radius: 0.5rem;

        --blog-card-image-padding: 0.0rem;
        --blog-card-corner-radius: 0.0rem;
        --blog-card-text-alignment: left;
        --blog-card-border-width: 0.0rem;
        --blog-card-border-opacity: 0.1;
        --blog-card-shadow-opacity: 0.0;
        --blog-card-shadow-visible: 0;
        --blog-card-shadow-horizontal-offset: 0.0rem;
        --blog-card-shadow-vertical-offset: 0.4rem;
        --blog-card-shadow-blur-radius: 0.5rem;

        --badge-corner-radius: 4.0rem;

        --popup-border-width: 1px;
        --popup-border-opacity: 0.1;
        --popup-corner-radius: 0px;
        --popup-shadow-opacity: 0.05;
        --popup-shadow-horizontal-offset: 0px;
        --popup-shadow-vertical-offset: 4px;
        --popup-shadow-blur-radius: 5px;

        --drawer-border-width: 1px;
        --drawer-border-opacity: 0.1;
        --drawer-shadow-opacity: 0.0;
        --drawer-shadow-horizontal-offset: 0px;
        --drawer-shadow-vertical-offset: 4px;
        --drawer-shadow-blur-radius: 5px;

        --spacing-sections-desktop: 0px;
        --spacing-sections-mobile: 0px;

        --grid-desktop-vertical-spacing: 8px;
        --grid-desktop-horizontal-spacing: 8px;
        --grid-mobile-vertical-spacing: 4px;
        --grid-mobile-horizontal-spacing: 4px;

        --text-boxes-border-opacity: 0.1;
        --text-boxes-border-width: 0px;
        --text-boxes-radius: 0px;
        --text-boxes-shadow-opacity: 0.0;
        --text-boxes-shadow-visible: 0;
        --text-boxes-shadow-horizontal-offset: 0px;
        --text-boxes-shadow-vertical-offset: 4px;
        --text-boxes-shadow-blur-radius: 5px;

        --buttons-radius: 0px;
        --buttons-radius-outset: 0px;
        --buttons-border-width: 1px;
        --buttons-border-opacity: 1.0;
        --buttons-shadow-opacity: 0.0;
        --buttons-shadow-visible: 0;
        --buttons-shadow-horizontal-offset: 0px;
        --buttons-shadow-vertical-offset: 4px;
        --buttons-shadow-blur-radius: 5px;
        --buttons-border-offset: 0px;

        --inputs-radius: 0px;
        --inputs-border-width: 1px;
        --inputs-border-opacity: 0.55;
        --inputs-shadow-opacity: 0.0;
        --inputs-shadow-horizontal-offset: 0px;
        --inputs-margin-offset: 0px;
        --inputs-shadow-vertical-offset: 4px;
        --inputs-shadow-blur-radius: 5px;
        --inputs-radius-outset: 0px;

        --variant-pills-radius: 40px;
        --variant-pills-border-width: 1px;
        --variant-pills-border-opacity: 0.55;
        --variant-pills-shadow-opacity: 0.0;
        --variant-pills-shadow-horizontal-offset: 0px;
        --variant-pills-shadow-vertical-offset: 4px;
        --variant-pills-shadow-blur-radius: 5px;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
        font-size: calc(var(--font-body-scale) * 62.5%);
        height: 100%;
      }

      body {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 0.06rem;
        line-height: calc(1 + 0.8 / var(--font-body-scale));
        font-family: var(--font-body-family);
        font-style: var(--font-body-style);
        font-weight: var(--font-body-weight);
      }

      @media screen and (min-width: 750px) {
        body {
          font-size: 1.6rem;
        }
      }
    </style>

    <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/base.css?v=144968985024194912401719145824" rel="stylesheet" type="text/css" media="all">

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-predictive-search.css?v=118923337488134913561719145825" media="all" onload="this.media='all'"><script>
      if (Shopify.designMode) {
        document.documentElement.classList.add('shopify-design-mode');
      }
    </script>
  <link href="https://monorail-edge.shopifysvc.com" rel="dns-prefetch">
<script>(function(){if ("sendBeacon" in navigator && "performance" in window) {var session_token = document.cookie.match(/_shopify_s=([^;]*)/);function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 88131174695,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token: session_token && session_token.length === 2 ? session_token[1] : "",page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());</script>
<script id="web-pixels-manager-setup">(function e(e,n,a,t,r){var o="function"==typeof BigInt&&-1!==BigInt.toString().indexOf("[native code]")?"modern":"legacy";window.Shopify=window.Shopify||{};var i=window.Shopify;i.analytics=i.analytics||{};var s=i.analytics;s.replayQueue=[],s.publish=function(e,n,a){return s.replayQueue.push([e,n,a]),!0};try{self.performance.mark("wpm:start")}catch(e){}var l=[a,"/wpm","/b",r,o.substring(0,1),".js"].join("");!function(e){var n=e.src,a=e.async,t=void 0===a||a,r=e.onload,o=e.onerror,i=document.createElement("script"),s=document.head,l=document.body;i.async=t,i.src=n,r&&i.addEventListener("load",r),o&&i.addEventListener("error",o),s?s.appendChild(i):l?l.appendChild(i):console.error("Did not find a head or body element to append the script")}({src:l,async:!0,onload:function(){var a=window.webPixelsManager.init(e);n(a);var t=window.Shopify.analytics;t.replayQueue.forEach((function(e){var n=e[0],t=e[1],r=e[2];a.publishCustomEvent(n,t,r)})),t.replayQueue=[],t.publish=a.publishCustomEvent,t.visitor=a.visitor},onerror:function(){var n=e.storefrontBaseUrl.replace(/\/$/,""),a="".concat(n,"/.well-known/shopify/monorail/unstable/produce_batch"),r=JSON.stringify({metadata:{event_sent_at_ms:(new Date).getTime()},events:[{schema_id:"web_pixels_manager_load/2.0",payload:{version:t||"latest",page_url:self.location.href,status:"failed",error_msg:"".concat(l," has failed to load")},metadata:{event_created_at_ms:(new Date).getTime()}}]});try{if(self.navigator.sendBeacon.bind(self.navigator)(a,r))return!0}catch(e){}var o=new XMLHttpRequest;try{return o.open("POST",a,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(r),!0}catch(e){console&&console.warn&&console.warn("[Web Pixels Manager] Got an unhandled error while logging a load error.")}return!1}})})({shopId: 88131174695,storefrontBaseUrl: "https://bf9fa1-7d.myshopify.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",surface: "storefront-renderer",enabledBetaFlags: ["5de24938","4735909c"],webPixelsConfigList: [{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"APP","purposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"CUSTOM","purposes":["ANALYTICS","MARKETING"]}],initData: {"shop":{"name":"Media47 PRO","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"bf9fa1-7d.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/bf9fa1-7d.myshopify.com"},"cart":null,"checkout":null,"customer":null,"productVariants":[]},},function pageEvents(webPixelsManagerAPI) {webPixelsManagerAPI.publish("page_viewed");},"https://bf9fa1-7d.myshopify.com/cdn","86ea4c09ae6360f0e736a6f37e09325a0a76f28b","960565caw95f6f6d6pe10748f4mf4569064",);</script><script async="" src="https://bf9fa1-7d.myshopify.com/cdn/wpm/b960565caw95f6f6d6pe10748f4mf4569064m.js"></script>  <script>window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = 'USD';
var meta = {"page":{"pageType":"home"}};
for (var attr in meta) {
  window.ShopifyAnalytics.meta[attr] = meta[attr];
}</script>
<script>window.ShopifyAnalytics.merchantGoogleAnalytics = function() {
  
};
</script>
<script class="analytics">(function () {
    var customDocumentWrite = function(content) {
      var jquery = null;

      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }

      if (jquery) {
        jquery('body').append(content);
      }
    };

    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }

    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }

    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onerror = function(e) {
        var scriptFallback = document.createElement('script');
        scriptFallback.type = 'text/javascript';
        scriptFallback.onerror = function(error) {
                var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });

          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful

        } // XHR beacon

        var xhr = new XMLHttpRequest();

        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }

        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 88131174695,
      theme_id: 168610332967,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"});

        };
        scriptFallback.async = true;
        scriptFallback.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
        first.parentNode.insertBefore(scriptFallback, first);
      };
      script.async = true;
      script.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
      first.parentNode.insertBefore(script, first);
    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":88131174695,"isMerchantRequest":null,"themeId":168610332967,"themeCityHash":"8070473428658909575","contentLanguage":"en","currency":"USD"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["bbcf04e6"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":false,"source":"trekkie-storefront-renderer"}}
    );

    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;

      window.ShopifyAnalytics.lib = window.trekkie;

  
      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;

      window.ShopifyAnalytics.lib.page(null,{"pageType":"home"});

      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
        
      }
    });


        var eventsListenerScript = document.createElement('script');
        eventsListenerScript.async = true;
        eventsListenerScript.src = "//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js";
        document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);

})();</script><script async="" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js"></script>
<script class="boomerang">
(function () {
  if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {
    return;
  }
  window.BOOMR = window.BOOMR || {};
  window.BOOMR.snippetStart = new Date().getTime();
  window.BOOMR.snippetExecuted = true;
  window.BOOMR.snippetVersion = 12;
  window.BOOMR.application = "storefront-renderer";
  window.BOOMR.themeName = "Dawn";
  window.BOOMR.themeVersion = "15.0.0";
  window.BOOMR.shopId = 88131174695;
  window.BOOMR.themeId = 168610332967;
  window.BOOMR.renderRegion = "gcp-us-east1";
  window.BOOMR.url =
    "https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";
  var where = document.currentScript || document.getElementsByTagName("script")[0];
  var parentNode = where.parentNode;
  var promoted = false;
  var LOADER_TIMEOUT = 3000;
  function promote() {
    if (promoted) {
      return;
    }
    var script = document.createElement("script");
    script.id = "boomr-scr-as";
    script.src = window.BOOMR.url;
    script.async = true;
    parentNode.appendChild(script);
    promoted = true;
  }
  function iframeLoader(wasFallback) {
    promoted = true;
    var dom, bootstrap, iframe, iframeStyle;
    var doc = document;
    var win = window;
    window.BOOMR.snippetMethod = wasFallback ? "if" : "i";
    bootstrap = function(parent, scriptId) {
      var script = doc.createElement("script");
      script.id = scriptId || "boomr-if-as";
      script.src = window.BOOMR.url;
      BOOMR_lstart = new Date().getTime();
      parent = parent || doc.body;
      parent.appendChild(script);
    };
    if (!window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]./)) {
      window.BOOMR.snippetMethod = "s";
      bootstrap(parentNode, "boomr-async");
      return;
    }
    iframe = document.createElement("IFRAME");
    iframe.src = "about:blank";
    iframe.title = "";
    iframe.role = "presentation";
    iframe.loading = "eager";
    iframeStyle = (iframe.frameElement || iframe).style;
    iframeStyle.width = 0;
    iframeStyle.height = 0;
    iframeStyle.border = 0;
    iframeStyle.display = "none";
    parentNode.appendChild(iframe);
    try {
      win = iframe.contentWindow;
      doc = win.document.open();
    } catch (e) {
      dom = document.domain;
      iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
      win = iframe.contentWindow;
      doc = win.document.open();
    }
    if (dom) {
      doc._boomrl = function() {
        this.domain = dom;
        bootstrap();
      };
      doc.write("<body onload='document._boomrl();'>");
    } else {
      win._boomrl = function() {
        bootstrap();
      };
      if (win.addEventListener) {
        win.addEventListener("load", win._boomrl, false);
      } else if (win.attachEvent) {
        win.attachEvent("onload", win._boomrl);
      }
    }
    doc.close();
  }
  var link = document.createElement("link");
  if (link.relList &&
    typeof link.relList.supports === "function" &&
    link.relList.supports("preload") &&
    ("as" in link)) {
    window.BOOMR.snippetMethod = "p";
    link.href = window.BOOMR.url;
    link.rel = "preload";
    link.as = "script";
    link.addEventListener("load", promote);
    link.addEventListener("error", function() {
      iframeLoader(true);
    });
    setTimeout(function() {
      if (!promoted) {
        iframeLoader(true);
      }
    }, LOADER_TIMEOUT);
    BOOMR_lstart = new Date().getTime();
    parentNode.appendChild(link);
  } else {
    iframeLoader(false);
  }
  function boomerangSaveLoadTime(e) {
    window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
  }
  if (window.addEventListener) {
    window.addEventListener("load", boomerangSaveLoadTime, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", boomerangSaveLoadTime);
  }
  if (document.addEventListener) {
    document.addEventListener("onBoomerangLoaded", function(e) {
      e.detail.BOOMR.init({
        ResourceTiming: {
          enabled: true,
          trackedResourceTypes: ["script", "img", "css"]
        },
      });
      e.detail.BOOMR.t_end = new Date().getTime();
    });
  } else if (document.attachEvent) {
    document.attachEvent("onpropertychange", function(e) {
      if (!e) e=event;
      if (e.propertyName === "onBoomerangLoaded") {
        e.detail.BOOMR.init({
          ResourceTiming: {
            enabled: true,
            trackedResourceTypes: ["script", "img", "css"]
          },
        });
        e.detail.BOOMR.t_end = new Date().getTime();
      }
    });
  }
})();</script><link href="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" rel="preload" as="script">
<script id="boomr-scr-as" src="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" async=""></script><link rel="dns-prefetch preconnect" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.7700a4f0c9fe9fd8b12e.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.6d90f9ef17e5a7215238.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/3569.latest.en.9864dca70239bbd6697a.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.3f6777dd67f84b88ff3c.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6846.latest.en.52b14d870951c1a5a741.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8933.latest.en.fbecd6fcb2d3a7dec43b.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.latest.en.5460d8dcceec80be92e6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5137.latest.en.4cf74cdc91d53d11c8f6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.latest.en.80dc15d80fb3eb83ddf0.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.latest.en.b20b76a18fc60dcdaa46.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.cda85ef5d501a62b91e8.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.3975c63f818b50435dd4.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.8039276cabb7faecfb04.css" crossorigin=""></head>

  <body class="gradient">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      Skip to content
    </a><!-- BEGIN sections: header-group -->
<div id="shopify-section-sections--22753037287719__announcement-bar" class="shopify-section shopify-section-group-header-group announcement-bar-section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slideshow.css?v=170654395204511176521719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">


<div class="utility-bar color-scheme-1 gradient utility-bar--bottom-border">
  <div class="page-width utility-bar__grid"><div class="announcement-bar" role="region" aria-label="Announcement"><p class="announcement-bar__message h5">
            <span>Welcome to our store</span></p></div><div class="localization-wrapper">
</div>
  </div>
</div>


</div><div id="shopify-section-sections--22753037287719__header" class="shopify-section shopify-section-group-header-group section-header"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-search.css?v=165164710990765432851719145825" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-menu-drawer.css?v=110695408305392539491719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-notification.css?v=54116361853792938221719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-items.css?v=127384614032664249911719145824" media="all" onload="this.media='all'"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" media="all" onload="this.media='all'"><style>
  header-drawer {
    justify-self: start;
    margin-left: -1.2rem;
  }@media screen and (min-width: 990px) {
      header-drawer {
        display: none;
      }
    }.menu-drawer-container {
    display: flex;
  }

  .list-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-menu--inline {
    display: inline-flex;
    flex-wrap: wrap;
  }

  summary.list-menu__item {
    padding-right: 2.7rem;
  }

  .list-menu__item {
    display: flex;
    align-items: center;
    line-height: calc(1 + 0.3 / var(--font-body-scale));
  }

  .list-menu__item--link {
    text-decoration: none;
    padding-bottom: 1rem;
    padding-top: 1rem;
    line-height: calc(1 + 0.8 / var(--font-body-scale));
  }

  @media screen and (min-width: 750px) {
    .list-menu__item--link {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
  }
</style><style data-shopify="">.header {
    padding: 10px 3rem 10px 3rem;
  }

  .section-header {
    position: sticky; /* This is for fixing a Safari z-index issue. PR #2147 */
    margin-bottom: 0px;
  }

  @media screen and (min-width: 750px) {
    .section-header {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 990px) {
    .header {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }</style><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-disclosure.js?v=13653116266235556501719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-modal.js?v=25581673532751508451719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/cart-notification.js?v=133508293167896966491719145824" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/search-form.js?v=133129549252120666541719145825" defer="defer"></script><svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="icon-search" viewBox="0 0 18 19" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"></path>
  </symbol>

  <symbol id="icon-reset" class="icon icon-close" fill="none" viewBox="0 0 18 18" stroke="currentColor">
    <circle r="8.5" cy="9" cx="9" stroke-opacity="0.2"></circle>
    <path d="M6.82972 6.82915L1.17193 1.17097" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
    <path d="M1.22896 6.88502L6.77288 1.11523" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
  </symbol>

  <symbol id="icon-close" class="icon icon-close" fill="none" viewBox="0 0 18 17">
    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
  </path></symbol>
</svg><sticky-header data-sticky-type="on-scroll-up" class="header-wrapper color-scheme-1 gradient header-wrapper--border-bottom"><header class="header header--middle-left header--mobile-center page-width header--has-menu">

<header-drawer data-breakpoint="tablet">
  <details id="Details-menu-drawer-container" class="menu-drawer-container">
    <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false" aria-controls="menu-drawer">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16">
  <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
</path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
  <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
</path></svg>

      </span>
    </summary>
    <div id="menu-drawer" class="gradient menu-drawer motion-reduce color-scheme-1">
      <div class="menu-drawer__inner-container">
        <div class="menu-drawer__navigation-container">
          <nav class="menu-drawer__navigation">
            <ul class="menu-drawer__menu has-submenu list-menu" role="list"><li><a id="HeaderDrawer-home" href="/" class="menu-drawer__menu-item list-menu__item link link--text focus-inset menu-drawer__menu-item--active" aria-current="page">
                      Home
                    </a></li><li><a id="HeaderDrawer-catalog" href="/collections/all" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Catalog
                    </a></li><li><a id="HeaderDrawer-contact" href="/pages/contact" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Contact
                    </a></li></ul>
          </nav>
          <div class="menu-drawer__utility-links"><div class="menu-drawer__localization header-localization">
</div><ul class="list list-social list-unstyled" role="list"></ul>
          </div>
        </div>
      </div>
    </div>
  </details>
</header-drawer>
<h1 class="header__heading"><a href="/" class="header__heading-link link link--text focus-inset"><span class="h2">${slug}</span></a></h1>

<nav class="header__inline-menu">
  <ul class="list-menu list-menu--inline" role="list"><li><a id="HeaderMenu-home" href="/" class="header__menu-item list-menu__item link link--text focus-inset" aria-current="page">
            <span class="header__active-menu-item">Home</span>
          </a></li><li><a id="HeaderMenu-catalog" href="/collections/all" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Catalog</span>
          </a></li><li><a id="HeaderMenu-contact" href="/pages/contact" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Contact</span>
          </a></li></ul>
</nav>

<div class="header__icons header__icons--localization header-localization">
      <div class="desktop-localization-wrapper">
</div>
      

<details-modal class="header__search">
  <details>
    <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="Search" role="button">
      <span>
        <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
          <use href="#icon-search">
        </use></svg>
        <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
          <use href="#icon-close">
        </use></svg>
      </span>
    </summary>
    <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="Search">
      <div class="modal-overlay"></div>
      <div class="search-modal__content search-modal__content-bottom" tabindex="-1"><predictive-search class="search-modal__form" data-loading-text="Loading..."><form action="/search" method="get" role="search" class="search search-modal__form">
          <div class="field">
            <input class="search__input field__input" id="Search-In-Modal" type="search" name="q" value="" placeholder="Search" role="combobox" aria-expanded="false" aria-owns="predictive-search-results" aria-controls="predictive-search-results" aria-haspopup="listbox" aria-autocomplete="list" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false">
            <label class="field__label" for="Search-In-Modal">Search</label>
            <input type="hidden" name="options[prefix]" value="last">
            <button type="reset" class="reset__button field__button hidden" aria-label="Clear search term">
              <svg class="icon icon-close" aria-hidden="true" focusable="false">
                <use xlink:href="#icon-reset">
              </use></svg>
            </button>
            <button class="search__button field__button" aria-label="Search">
              <svg class="icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </use></svg>
            </button>
          </div><div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search="">

<div class="predictive-search__loading-state">
  <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
  </svg>
</div>
</div>

            <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span></form></predictive-search><button type="button" class="search-modal__close-button modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
    </div>
  </details>
</details-modal>

<a href="/cart" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble"><svg class="icon icon-cart-empty" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
<span class="visually-hidden">Cart</span></a>
    </div>
  </header>
</sticky-header>

<cart-notification>
  <div class="cart-notification-wrapper page-width">
    <div id="cart-notification" class="cart-notification focus-inset color-scheme-1 gradient" aria-modal="true" aria-label="Item added to your cart" role="dialog" tabindex="-1">
      <div class="cart-notification__header">
        <h2 class="cart-notification__heading caption-large text-body"><svg class="icon icon-checkmark" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
</svg>
Item added to your cart
        </h2>
        <button type="button" class="cart-notification__close modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
      <div id="cart-notification-product" class="cart-notification-product"></div>
      <div class="cart-notification__links">
        <a href="/cart" id="cart-notification-button" class="button button--secondary button--full-width">View cart</a>
        <form action="/cart" method="post" id="cart-notification-form">
          <button class="button button--primary button--full-width" name="checkout">
            Check out
          </button>
        </form>
        <button type="button" class="link button-label">Continue shopping</button>
      </div>
    </div>
  </div>
</cart-notification>
<style data-shopify="">
  .cart-notification {
    display: none;
  }
</style>


<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Media47 PRO",
    
    "sameAs": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "url": "https:\/\/bf9fa1-7d.myshopify.com"
  }
</script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "Media47 PRO",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https:\/\/bf9fa1-7d.myshopify.com\/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "url": "https:\/\/bf9fa1-7d.myshopify.com"
    }
  </script>
</div>
<!-- END sections: header-group -->

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      <section id="shopify-section-template--22753036796199__image_banner" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-image-banner.css?v=124819179385751388401719145825" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">#Banner-template--22753036796199__image_banner::after {
    opacity: 0.4;
  }</style><div id="Banner-template--22753036796199__image_banner" class="banner banner--content-align-center banner--content-align-mobile-center banner--large banner--desktop-transparent scroll-trigger animate--fade-in"><div class="banner__media media placeholder scroll-trigger animate--fade-in">
      <svg class="placeholder-svg" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1300 730" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_779_1238)"><path d="M1300 410H0v320h1300V410Z" fill="#5BA7B1"></path><path d="M1300 0H0v410h1300V0Z" fill="#E8BE9E"></path><path d="M474 410c28.51-39.81 73.78-89.8 142-120 113.63-50.31 194.66-3.1 266-52 41.04-28.12 81.7-89.98 80-238h338v410H474Z" fill="#EDAB8E"></path><path d="M1174 0c-4.57 45.64-17.01 110.48-52 180-69.25 137.58-182.37 205.13-230 230h408V0h-126Z" fill="#EA9A81"></path><path d="M126 410c124.14 0 213.59-14.83 242-66 38.93-70.13-74.2-158.33-34-262 15.92-41.06 49.03-66.82 74-82H0v410h126Z" fill="#EDAB8E"></path><path d="M126 410c-68.88-117.13-69.26-250.08-2-334 36.03-44.96 83.52-65.93 116-76H0v410h126Z" fill="#EA9A81"></path><path d="M442 410h88c-3.51-10.52-7.01-21.04-10.52-31.56-1.16-3.48-6.05-3.57-7.34-.14-1.42 3.8-2.85 7.6-4.27 11.39-1.29 3.44-6.18 3.35-7.34-.14l-7.65-22.96c-1.08-3.25-5.52-3.62-7.13-.6-2.61 4.89-5.22 9.79-7.83 14.68-1.55 2.91-5.79 2.69-7.04-.36-3.69-9.02-7.38-18.03-11.06-27.05-1.35-3.29-6.03-3.21-7.26.13l-10.53 28.59v28l-.03.02Z" fill="#108060"></path><path d="M1300 224H758.35c-2.89 0-3.07-4.27-.19-4.51l75.83-6.32A92.708 92.708 0 0 0 896.78 181l30.62-35.85c14.34-16.79 39.96-17.8 55.57-2.18l12.34 12.34c21.76 21.76 57.58 19.93 77-3.95l34.73-42.7c25.81-31.73 74.62-30.56 98.88 2.36 19.11 25.93 56.68 29.09 79.85 6.72l14.24-13.75v120l-.01.01Z" fill="#F7E1D5"></path><path d="M220.89 256h405.42c2.16 0 2.3-3.2.14-3.38l-56.76-4.73a69.338 69.338 0 0 1-46.99-24.08l-22.92-26.83c-10.74-12.57-29.91-13.32-41.6-1.63l-9.24 9.24c-16.29 16.29-43.1 14.91-57.63-2.96l-25.99-31.96c-19.32-23.75-55.85-22.87-74.01 1.77L264.3 208.1 212 222.22l8.89 33.78Z" fill="#EAD1C1"></path><path d="m980 410 73.94-92.43a55.18 55.18 0 0 1 35.49-20.18l33.63-4.67a55.168 55.168 0 0 0 37.31-22.58l35.94-50.31c8.42-11.79 25.37-13.3 35.75-3.19l67.94 66.24V410H980Z" fill="#9FA5AB"></path><path opacity=".3" d="M1214.49 209.95c-6.95.32-13.75 3.67-18.18 9.87l-35.94 50.31a55.168 55.168 0 0 1-37.31 22.58l-33.63 4.67a55.132 55.132 0 0 0-35.49 20.18L980 409.99h178l58.33-104.66c5.57-9.99 3.05-22.54-5.95-29.61a23.25 23.25 0 0 1-7.94-24.85l12.04-40.94.01.02Z" fill="#D2D5D9"></path><path d="m464 410-46.64-91.42a12.72 12.72 0 0 0-10.74-6.92l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.86 6.86 0 0 0-8.35-4.02L0 164v246s.06.02.09 0H464Z" fill="#818990"></path><path d="m96 410 6-66 21-56c1.03-2.73 4.9-2.71 5.89.04l12.38 34.4c.97 2.69 4.74 2.79 5.84.15l9.65-22.91c1.12-2.67 4.95-2.52 5.87.23l12.46 37.38c.95 2.84 4.95 2.87 5.94.04l7.24-20.67c1.05-3 5.39-2.72 6.03.4l6.24 29.93c.56 2.68 4.04 3.41 5.63 1.18l12.31-17.24c1.48-2.07 4.68-1.61 5.52.79l10.63 30.55c1.02 2.93 5.21 2.76 6-.23l4.5-17.11c.81-3.08 5.16-3.13 6.05-.08l8.73 29.92c.78 2.68 4.4 3.08 5.76.65l12.7-22.86c1.35-2.44 4.97-2.03 5.76.65l9.5 32.56c.82 2.81 4.69 3.07 5.88.4l8.75-19.69c1.22-2.74 5.22-2.37 5.92.55l6.1 25.6c.65 2.72 4.26 3.3 5.72.92l8.26-13.42c1.44-2.33 4.96-1.83 5.7.8l8.07 29.07H96Z" fill="#02614E"></path><path d="M0 410h218l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15a39.436 39.436 0 0 1-25.57-30.02L102 279.66a39.44 39.44 0 0 0-24.53-29.63L0 220v190Z" fill="#686E72"></path><path d="M0 410h88c-3.73-11.18-7.46-22.37-11.18-33.55-.94-2.82-4.9-2.89-5.95-.11-1.91 5.11-3.83 10.21-5.74 15.32-1.04 2.78-5.01 2.71-5.95-.11l-8.86-26.59c-.88-2.63-4.47-2.93-5.78-.49-3.13 5.87-6.26 11.73-9.39 17.6-1.26 2.36-4.69 2.18-5.7-.29-4.13-10.09-8.26-20.18-12.38-30.27-1.09-2.66-4.88-2.6-5.88.1C7.46 361.74 3.73 371.87 0 381.99V410Z" fill="#02614E"></path><path d="m636.01 410 36.48-43.78c14.28-17.14 37.37-24.17 58.78-17.92l59.17 17.3c21.57 6.3 44.82-.88 59.06-18.26l53.45-65.19c3.24-3.95 7.88-6.51 12.95-7.15l16.59-2.07a51.1 51.1 0 0 1 40.94 13.11L1108 409.99H636l.01.01Z" fill="#818990"></path><path d="m1279.24 295.49-12.18 41.97c-.91 3.13-5.33 3.17-6.29.05l-9.05-29.41c-1-3.24-5.64-3.03-6.35.28l-9.35 44.07c-.65 3.08-4.84 3.56-6.18.72l-7.92-16.84c-1.31-2.79-5.41-2.39-6.15.6l-5.64 22.58c-.74 2.94-4.73 3.4-6.11.7l-15.16-29.66c-1.36-2.67-5.3-2.26-6.09.63l-7.07 25.92c-.84 3.08-5.14 3.27-6.25.27l-6.49-17.62c-1.14-3.1-5.62-2.76-6.29.47l-6.46 31.11c-.66 3.18-5.05 3.57-6.26.55l-12.18-30.46c-1.18-2.96-5.46-2.67-6.23.42l-8.87 35.48c-.79 3.16-5.21 3.36-6.28.28l-8.77-25.21c-1.07-3.08-5.49-2.88-6.28.28l-6.1 24.4c-.77 3.09-5.05 3.38-6.23.42l-7.67-19.18c-1.14-2.84-5.19-2.72-6.16.18l-10.21 30.62c-.98 2.94-5.12 3.01-6.19.1l-7.89-21.41c-1.03-2.79-4.95-2.88-6.1-.14l-9.33 22.17c-1.18 2.81-5.22 2.63-6.15-.27l-12.04-37.45c-.99-3.07-5.35-3.02-6.27.07l-10.43 35.2c-.87 2.93-4.93 3.19-6.15.38l-7.13-16.3c-1.18-2.71-5.06-2.59-6.09.18l-7.76 21.07c-1.09 2.96-5.33 2.83-6.23-.2-3.37-11.38-6.74-22.76-10.12-34.15-.92-3.11-5.32-3.14-6.28-.04-3.9 12.55-7.79 25.1-11.69 37.65-.95 3.07-5.3 3.08-6.26.02l-6.47-20.48c-.88-2.78-4.68-3.12-6.04-.53l-18.34 35.01h404v-76l-14.53-38.75c-1.11-2.96-5.34-2.8-6.22.24l-.02.01Z" fill="#02614E"></path><path d="M576 186c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64Z" fill="#EAD1C1"></path><path d="M576 170c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48Z" fill="#fff"></path><path d="m264.3 269.34 4.38 12.32c11.72 32.97 41.95 55.78 76.87 58.01a87.466 87.466 0 0 0 63.73-21.95l4.15-3.69a12.71 12.71 0 0 0-6.82-2.37l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.822 6.822 0 0 0-3.17-3.51l-10.98 32.29c-11.16 32.84 6.32 68.52 39.11 79.83l33.29 11.48a51.472 51.472 0 0 1 31.72 31.41h.01Z" fill="#9FA5AB"></path><path d="M51.84 244.38a39.431 39.431 0 0 1 16.74 34.63l-1.91 32.43a39.42 39.42 0 0 0 17.67 35.25l45.23 29.81a39.47 39.47 0 0 1 17.51 28.69l.52 4.8h70.52l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15A39.436 39.436 0 0 1 108 311.6l-5.89-31.95a39.44 39.44 0 0 0-24.53-29.63L38 234.67l13.84 9.7v.01Z" fill="#818990"></path><path d="m756.08 443.99.04.01-.04-.01Z" fill="#686E72"></path><path opacity=".8" d="m790.66 365.67 39.39 11.51c21.9 6.4 45.55.69 62.12-14.99a64.199 64.199 0 0 0 19.25-56.93l-4.38-26.98a19.967 19.967 0 0 0-4.21 3.85l-53.45 65.19a56.03 56.03 0 0 1-58.71 18.35h-.01ZM706 388c-.24-15.7 16.55-32.5 41.81-34.86l-16.54-4.84c-21.41-6.26-44.5.78-58.78 17.92L636.01 410H718c-3.29-2.83-11.83-10.97-12-22Z" fill="#9FA5AB"></path><path d="M416.96 410a27.009 27.009 0 0 0 17.23 10.44l74.31 12.16c4.49.73 4.13 7.3-.41 7.54l-90.19 4.96c-4.91.27-4.9 7.51.01 7.77l95.5 4.97c4.71.25 5.01 7.08.34 7.74l-77.82 10.96c-4.62.65-4.39 7.4.27 7.73L558.37 493c6.93.49 7.28 10.54.41 11.52l-26.87 3.84c-4.68.67-4.34 7.53.38 7.74l118.58 5.33c4.61.21 5.09 6.85.55 7.71l-30.86 5.88c-4.44.85-4.11 7.31.39 7.7l41.36 3.57c37.51 3.23 75.27 1.58 112.35-4.93l42.85-7.52c4.39-.77 4.25-7.11-.17-7.69l-88.29-11.52c-4.63-.6-4.47-7.35.18-7.74l70.24-5.77c4.8-.39 4.75-7.44-.06-7.76l-63.91-4.32c-4.75-.32-4.88-7.25-.15-7.75l112.28-11.82c4.77-.5 4.58-7.51-.2-7.76l-91.17-4.75c-6.25-.33-6.45-9.48-.22-10.08l30.04-2.91c4.65-.45 4.7-7.22.06-7.74l-52.89-5.97c-4.63-.52-4.44-7.31.22-7.57l58.3-3.24c9.03-.5 17.68-3.81 24.74-9.46H416.94l.02.01Z" fill="#63B5B1"></path><path d="M0 478c15.69 2.92 39.93 5.53 68 0 42.62-8.4 48.21-26.53 84-34 45.2-9.43 57.35 15.07 114 14 9.94-.19 18.2-1.11 25.64-2.55 36.52-7.09 62.17-18.56 68.36-21.45 22.81-10.63 66.5-17.19 157.8-.42 67.4-3.19 134.8-6.39 202.2-9.58 6.3-.79 18.55-2.14 33.98-2.49 57.4-1.32 91.51 12.68 158.02 16.49 17.53 1 29.44.78 43.36-1.93 24.93-4.85 34.21-15.04 78.64-12.07 71.18 4.75 89.94 33.73 158 38 45.51 2.86 83.37-7.2 108-16v-36H0v68Z" fill="#63B5B1"></path><path opacity=".5" d="m425.74 101.25 12.14 6.54a6.7 6.7 0 0 0 6.98-.39l10.76-7.46c1.24-.86.32-2.8-1.13-2.37l-10.43 3.05c-2.24.65-4.6.76-6.89.32l-10.59-2.06c-1.44-.28-2.14 1.69-.85 2.38l.01-.01ZM729.78 162.53l11.66 7.35a6.686 6.686 0 0 0 6.99.09l11.25-6.7c1.3-.77.51-2.77-.97-2.44l-10.61 2.32c-2.28.5-4.64.45-6.89-.15l-10.42-2.78c-1.42-.38-2.25 1.54-1.01 2.32v-.01Z" fill="#964F48"></path><path opacity=".75" d="m656.07 194.86 16.65 2.66a8.18 8.18 0 0 0 7.91-3.26l9.43-12.95c1.09-1.49-.76-3.36-2.26-2.28l-10.82 7.72a17.873 17.873 0 0 1-7.83 3.14l-13.06 1.89c-1.78.26-1.79 2.81-.02 3.09v-.01Z" fill="#964F48"></path><path d="m695.71 113.63 12.93 12.86a8.834 8.834 0 0 0 9 2.13l16.46-5.4c1.9-.62 1.46-3.42-.54-3.43l-14.37-.06c-3.08-.01-6.12-.77-8.85-2.19l-12.65-6.6c-1.72-.9-3.35 1.33-1.98 2.7v-.01Z" fill="#964F48"></path><path d="M894.938 386.359c-13.528-2.239-26.508 6.204-29.834 19.39l-4.757 17.749a44.424 44.424 0 0 0 0 21.713c2.119 8.43 8.757 15.009 17.26 17.109 5.908 1.461 9.304 7.609 7.381 13.326L877.172 499h37.145L920 420.202l-25.076-33.857.014.014Z" fill="#E8BE9E"></path><path d="m911 466 7.311 29.252L920.224 506h6.612L929 466h-18Z" fill="#EA9A81"></path><path d="m865.215 624.829-52.827-51.996c-9.913-9.757-23.901-14.346-37.776-12.39-17.18 2.412-31.364 14.429-36.348 30.788l-11.005 36.107c-1.162 3.817 1.736 7.662 5.796 7.662h127.89c5.39 0 8.079-6.408 4.27-10.157v-.014Z" fill="#2E5157"></path><path d="m744.04 632.85 10.992-36.111c4.979-16.36 19.145-28.379 36.305-30.791a44.677 44.677 0 0 1 11.663-.096 45.066 45.066 0 0 0-28.445-5.417c-17.159 2.412-31.326 14.431-36.305 30.791l-10.992 36.111c-1.16 3.818 1.735 7.663 5.79 7.663h10.754a6.013 6.013 0 0 1 .238-2.15Z" fill="#3C7980"></path><path d="M819.933 546c-1.406 3.619-2.617 7.307-3.55 11.063L797 635h29.492L857 572.915 819.947 546h-.014Z" fill="#E8BE9E"></path><path d="M954.273 598.986a80.22 80.22 0 0 0 35.466-32.084l7.624-12.954c18.687-31.722 5.937-72.604-27.437-88.137-10.528-4.895-16.993-15.715-15.932-27.26l2.164-23.732c1.215-13.275-2.904-26.619-11.897-36.463-14.856-16.286-38.649-19.911-57.472-9.467l-14.075 7.808c-7.386 4.099-10.612 12.995-7.582 20.86l10.515 27.315a107.614 107.614 0 0 0 52.375 57.601c19.256 9.621 25.469 34.078 13.112 51.689l-19.688 28.083L954.259 599l.014-.014Z" fill="#6E3A35"></path><path opacity=".75" d="m938.181 562.986 19.499-27.951c12.225-17.529 6.085-41.871-12.986-51.448-23.813-11.949-42.317-32.392-51.873-57.332l-10.413-27.188c-3.001-7.827.207-16.681 7.509-20.762l13.94-7.772c5.781-3.22 12.031-5.065 18.351-5.634-11.685-3.442-24.533-2.249-35.637 3.941l-13.94 7.772c-7.316 4.08-10.51 12.935-7.509 20.762l10.413 27.188c9.556 24.94 28.059 45.383 51.873 57.332 19.07 9.576 25.224 33.919 12.986 51.448l-19.5 27.951L938.181 563v-.014Z" fill="#AF5947"></path><path d="M973.436 592.368c-.621-16.691-4.045-32.654-9.993-47.368L934 574.442 951.167 635H975l-1.579-42.632h.015Z" fill="#E8BE9E"></path><path d="M969 559.741c-1.419-5.037-3.082-9.964-5.059-14.741L934 574.442 951.457 635h15.665l-12.598-43.703c-2.408-8.359 0-17.322 6.307-23.526l8.155-8.016.014-.014Z" fill="#EA9A81"></path><path d="M945.231 561.25 962 543.979c-6.536-16.619-16.174-31.641-28.581-44.303-7.366-7.511-17.655-11.676-28.926-11.676h-18.002c-9.568 0-19.303 2.999-27.874 8.566-18.154 11.815-32.126 29.128-39.617 48.635l24.108 21.339c4.32 4.318 5.456 10.898 2.852 16.424L824.137 635h105.447l2.575-45.039c.596-10.398 5.29-20.714 13.072-28.725v.014Z" fill="#02614E"></path><path opacity=".25" d="M962 543.948c-6.397-16.622-15.83-31.647-27.974-44.311-6.804-7.096-16.17-11.207-26.47-11.637l12.022 40.048a99.609 99.609 0 0 1 1.125 53.129L907 635h23.271l2.521-45.047c.583-10.401 5.178-20.718 12.795-28.731L962 543.948Z" fill="#142924"></path><path d="M863.006 501.368c4.692-5.373 10.126-9.885 15.994-13.368-6.919 1.213-13.739 3.892-19.93 7.953-18.361 12-32.493 29.585-40.07 49.397L834.35 559c4.314-20.94 14.16-41.035 28.656-57.618v-.014Z" fill="#00735C"></path><path d="M494 630.718v-51.341c0-9.728 7.693-17.945 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.374-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.377 18.377 0 0 1-1.477-7.206l-.014.028Z" fill="#975D48"></path><path d="M471 632.718v-51.341c0-9.728 7.693-17.946 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.375-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.376 18.376 0 0 1-1.477-7.205l-.014.027Z" fill="#BF8563"></path><path opacity=".5" d="M557.941 687.156 541.061 556 517 559.089l16.664 129.508a6.902 6.902 0 0 0 2.899 4.807l18.113.596a6.439 6.439 0 0 0 1.639-1.358 7.008 7.008 0 0 0 1.626-5.472v-.014ZM636.059 691.273a6.993 6.993 0 0 0 6.569 5.351l11.133.376h.238c2.157 0 4.16-.961 5.49-2.647 1.331-1.686 1.821-3.846 1.317-5.922L626.662 545 602 548.079c.028.223.07.46.126.683l33.919 142.497.014.014Z" fill="#975D48"></path><path d="M530.223 558.016c-.468-3.43-3.489-6.016-7.021-6.016-.312 0-.624.014-.936.055l-11.106 1.439c-3.872.497-6.609 3.982-6.099 7.758l17.46 129.359c.454 3.36 3.305 5.891 6.794 6.002l11.347.387h.241a7.18 7.18 0 0 0 5.333-2.351 6.778 6.778 0 0 0 1.702-5.462l-17.701-131.185-.014.014ZM648.837 690.47l-33.746-144.113c-.743-3.159-3.495-5.357-6.686-5.357-.303 0-.606.014-.908.056l-10.524 1.419a6.902 6.902 0 0 0-4.76 2.95 7.061 7.061 0 0 0-1.032 5.552L624.5 693.281c.716 3.047 3.371 5.246 6.452 5.343l10.937.376h.234c2.119 0 4.086-.96 5.393-2.644a6.97 6.97 0 0 0 1.293-5.913l.028.027Z" fill="#6D493C"></path><path d="m1137.25 392.823-26.98-23.175c-7.2-6.174-17.37-7.453-25.7-3.01-9.63 5.133-17 14.246-19.86 25.482l-.37 1.491a109.471 109.471 0 0 0-2.37 41.372c.61 4.515 2.69 8.691 5.92 11.841a19.422 19.422 0 0 0 10.87 5.358l10.65.717c4.08.802 6.57 5.035 5.34 9.071 0 0-1.85 6.089-3.45 11.335 9.59 3.796 19.46 5.695 29.33 5.695 9.21 0 18.42-1.688 27.37-4.978-4.93-5.949-8.17-15.315-7.51-21.84l4.9-38.011c1.04-8.058-2.03-16.102-8.12-21.348h-.02Z" fill="#975D48"></path><path opacity=".5" d="M1131.49 470.042 1148 473c-4.98-5.792-8.26-14.926-7.59-21.265l4.95-37.013-6.6-10.722-11.98 45.078c-1.95 7.326-.18 15.117 4.73 20.951l-.02.013Z" fill="#6D493C"></path><path d="m1161.96 402.99-1.18-25.362c-.87-13.77-11.14-25.419-24.75-27.027-3.17-.375-6.19-.194-8.75.61a20.941 20.941 0 0 1-17.26-2.163l-5.88-3.633a29.637 29.637 0 0 0-34.75 2.634l-.09.083c-4.16 3.842-6.73 9.125-7.23 14.797-.58 6.683 2.38 13.173 7.65 17.167 1.61 1.22 3.05 2.635 4.36 4.174 4.29 5.075 6.5 11.551 6.67 18.207.05 2.177-.06 4.119-.33 5.464l-.22 1.081c-.68 3.231 1.65 6.31 4.92 6.546.35.027.71 0 1.08-.07 1.77-.346 3.01-1.872 3.38-3.647 1.1-5.283 4.92-9.166 9.46-9.166 5.42 0 9.8 5.519 9.8 12.328 0 3.564-1.2 6.767-3.13 9.014-3.49 4.076-3.46 10.22-.15 14.449a18.682 18.682 0 0 0 6.31 5.158c2.54 1.29 5.35 1.886 8.19 1.983l12.66.375a18.64 18.64 0 0 0 15.57-7.585l5.41-7.378c.4-.554.8-1.109 1.17-1.678 5.15-7.737 7.45-17.042 7.09-26.361Z" fill="#142924"></path><path opacity=".25" d="m1077.42 364.743.1-.081c10.97-8.995 20.24-10.145 32.47-2.854l6.57 3.923a24.105 24.105 0 0 0 19.29 2.34c8.85-2.705 15.65-2.056 24.15 1.366-3.43-10.064-12.34-17.801-23.47-19.072-3.19-.365-6.22-.189-8.8.595-5.84 1.772-12.17 1.001-17.38-2.11l-5.92-3.544c-11.02-6.574-25.12-5.546-35 2.57l-.08.081c-4.19 3.747-6.78 8.9-7.28 14.433-.57 6.452 2.34 12.714 7.53 16.61a24.355 24.355 0 0 1 7.84-14.257h-.02Z" fill="#6B7177"></path><path d="M1217 571.844 1249.18 541l39.82 86.272-33.9 2.728-38.1-58.156ZM1056 584.222 1017.4 562a1983.872 1983.872 0 0 0-23.4 95.638c10.25 3.375 20.39 6.833 29.06 10.362l32.93-83.778h.01Z" fill="#975D48"></path><path d="M1072.4 481.732c-10.04 5.728-19.03 13.161-26.38 22.088-9.86 11.945-17.59 25.259-23.14 39.356-.23.559-.45 1.118-.66 1.677-2.44 6.231-4.63 10.506-6.22 16.989l21.32 15.409 25.26 3.647 5.59-10.66c.94 29.116-5.2 55.646-4.13 84.762a2012.614 2012.614 0 0 1 160.89-.489c-5.34-33.475-14.87-64.406-21.41-97.839 3.65 4.764 5.87 10.716 9.44 15.494 7.25-.307 14.51-.573 21.76-.796 4.69-7.545 14.45-18.791 19.28-26.308-3.98-6.077-8.01-12.126-12.11-18.176-14.09-18.986-32.73-34.927-54.82-46.691L1158.58 473a92.251 92.251 0 0 1-8.45 4.596c-11.71 5.631-24.18 8.662-36.77 8.872-13.42.21-23.58-1.649-35.83-7.684l-5.14 2.934.01.014Z" fill="#DE6A5A"></path><path opacity=".1" d="M1068.87 495.403c.13-.111.25-.222.38-.319a567.35 567.35 0 0 1 3.56-3.133 84.583 84.583 0 0 1 10.19-7.624c-2.8-.957-5.55-2.093-8.25-3.327l-2.69 1.539c-9.98 5.683-18.91 13.058-26.22 21.916-9.8 11.852-17.49 25.063-23 39.05-.23.555-.45 1.109-.66 1.664-2.42 6.182-4.6 10.424-6.18 16.856l8.28 5.975c1.45-5.24 3.17-10.425 5.2-15.498.22-.569.44-1.137.68-1.691 8.29-20.78 21.24-39.868 38.74-55.394l-.03-.014Z" fill="#F7E1D5"></path><path d="M1241.86 527.309c-12.03-16.169-27.39-30.133-45.37-41.182-5.07-3.111-10.38-5.817-15.86-8.147l-18.69-7.98c-2.77 1.688-10.08 8.273-12.94 9.64l3.38 1.186c22.55 28.236 32.78 65.902 28.39 101.741L1172.64 649c10.58-.098 40.7-.112 51.29-.056-4.9-30.231-13.89-57.923-19.77-88.112 3.4 3.488 5.38 8.161 8.72 11.663 13.51-.572 30.99-11.342 38.17-22.488l2.95-4.576a1284.8 1284.8 0 0 0-12.13-18.15l-.01.028Z" fill="#CD5747"></path><path d="m1016.92 560.014-3.44 10.32a9.342 9.342 0 0 0 4.04 10.964c8.09 4.899 20.37 10.238 30.03 12.461 4.07.947 8.27-.961 10.32-4.57l5.13-8.989c-15.69-1.825-36.49-10.127-46.06-20.2l-.02.014Z" fill="#F7E1D5"></path><path d="M1252.85 546c-10.61 12.254-28.02 23.477-41.85 27.046 2.09 2.872 4.61 5.897 6.95 8.867 2.19 2.76 5.95 3.806 9.29 2.579 9.06-3.332 22.49-12.059 30.14-19.016 2.83-2.579 3.46-6.762 1.44-9.982a2476.29 2476.29 0 0 0-5.97-9.494Z" fill="#E8BE9E"></path><path d="M1151.47 463.304a9.745 9.745 0 0 0-7.1.895c-9.8 5.395-20.34 8.334-30.94 8.519-6.92.113-13.83-.952-20.49-3.138a9.678 9.678 0 0 0-7.26.483l-7.99 6.02c-2.57 1.931-2.13 6.048.79 7.326 11.04 4.813 23.7 7.78 35.06 7.582 8.67-.142 18.38-2.088 27.36-5.225 6.1-2.13 11.8-5.381 16.9-9.499l3.7-2.996c2.4-1.931 1.82-5.835-1.02-6.928-3.03-1.164-6.53-2.428-9.01-3.053v.014Z" fill="#F7E1D5"></path><path d="m1063 639 11.11-8.488c9.33-17.356 11.3-40.094 9.03-61.118-.74-6.9-9.93-8.797-13.43-2.796l-1.71 2.923-5 69.479Z" fill="#CD5747"></path><path d="M1160.44 466.42c-3.09-1.186-6.66-2.473-9.18-3.11a9.973 9.973 0 0 0-7.25.911 70.47 70.47 0 0 1-13.01 5.569c8.12 1.75 15.11 5.497 20.34 11.21a60.322 60.322 0 0 0 6.36-4.484l3.77-3.052c2.44-1.967 1.86-5.945-1.04-7.059l.01.015Z" fill="#E8BE9E"></path><path d="M318.148 584.026 389.152 730H1300V612.215l-113.51 12.627a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1076.718 1076.718 0 0 1-207.552-27.898l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717Z" fill="#142924"></path><path opacity=".25" d="M1186.49 624.842a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1079.098 1079.098 0 0 1-173.044-20.394 1049.917 1049.917 0 0 1-34.508-7.504l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717L389.152 730h126.889l-41.958-86.254c-5.907-12.139 4.267-25.948 17.567-23.819a1079.754 1079.754 0 0 0 130.919 12.808l405.641 14.714c52.84 1.921 105.74-.056 158.28-5.902L1300 628.92v-16.705l-113.51 12.627Z" fill="#6B7177"></path></g><defs><clipPath id="clip0_779_1238"><path fill="#fff" d="M0 0h1300v730H0z"></path></clipPath></defs></svg>

    </div><div class="banner__content banner__content--bottom-center page-width scroll-trigger animate--slide-in">
    <div class="banner__box content-container content-container--full-width-mobile color-scheme-3 gradient"><h2 class="banner__heading inline-richtext h0">
              Browse our new latest products
            </h2><div class="banner__buttons"><a href="/collections/all" class="button button--secondary">Shop all</a></div></div>
  </div>
</div>


</section><section id="shopify-section-template--22753036796199__featured_collection" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-card.css?v=120341546515895839841719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">

<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/template-collection.css?v=58558206033505836701719145825" rel="stylesheet" type="text/css" media="all">

<style data-shopify="">.section-template--22753036796199__featured_collection-padding {
    padding-top: 33px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .section-template--22753036796199__featured_collection-padding {
      padding-top: 44px;
      padding-bottom: 36px;
    }
  }</style><div class="color-scheme-1 isolate gradient">
  <div class="collection section-template--22753036796199__featured_collection-padding" id="collection-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection">
    <div class="collection__title title-wrapper title-wrapper--no-top-margin page-width"><h2 class="title inline-richtext h2 scroll-trigger animate--slide-in">
          Featured products
        </h2></div>

    <slider-component class="slider-mobile-gutter page-width page-width-desktop scroll-trigger animate--slide-in">
      <ul id="Slider-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection" class="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down" role="list" aria-label="Slider">
        
<li id="Slide-template--22753036796199__featured_collection-1" class="grid__item scroll-trigger animate--slide-in" data-cascade="" style="--animation-order: 1;">
            
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-rating.css?v=179577762467860590411719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-volume-pricing.css?v=111870094811454961941719145825" rel="stylesheet" type="text/css" media="all">

  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quick-order-list.css?v=38387008350345892421719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quantity-popover.css?v=78745769908715669131719145825" rel="stylesheet" type="text/css" media="all">
<div class="card-wrapper product-card-wrapper underline-links-hover">
    <div class="
        card card--standard
         card--media
        
        
        
        
        
      " style="--ratio-percent: 66.7%;">
      <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 66.7%;"><div class="card__media">
            <div class="media media--transparent media--hover-effect">
              
              <img srcset="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=165 165w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=360 360w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533 533w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=720 720w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=940 940w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=1066 1066w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869 5000w
                " src="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533" sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="Example T-Shirt" class="motion-reduce" loading="lazy" width="5000" height="3335">
              
</div>
          </div><div class="card__content">
          <div class="card__information">
            <h3 class="card__heading">
              <a href="/products/example-t-shirt" id="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391 NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391">
                Example T-Shirt
              </a>
            </h3>
          </div>
          <div class="card__badge bottom left"><span id="NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading h5" id="title-template--22753036796199__featured_collection-9404691972391">
            <a href="/products/example-t-shirt" id="CardLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="CardLink-template--22753036796199__featured_collection-9404691972391 Badge-template--22753036796199__featured_collection-9404691972391">
              Example T-Shirt
            </a>
          </h3>
          <div class="card-information"><span class="caption-large light"></span>
<div class="
    price  price--on-sale">
  <div class="price__container"><div class="price__regular"><span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span class="price-item price-item--regular">
          From $19.99 USD
        </span></div>
    <div class="price__sale">
        <span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span>
          <s class="price-item price-item--regular">
            
              $24.99 USD
            
          </s>
        </span><span class="visually-hidden visually-hidden--inline">Sale price</span>
      <span class="price-item price-item--sale price-item--last">
        From $19.99 USD
      </span>
    </div>
    <small class="unit-price caption hidden">
      <span class="visually-hidden">Unit price</span>
      <span class="price-item price-item--last">
        <span></span>
        <span aria-hidden="true">/</span>
        <span class="visually-hidden">&nbsp;per&nbsp;</span>
        <span>
        </span>
      </span>
    </small>
  </div></div>

</div>
        </div>
        
        
        <div class="card__badge bottom left"><span id="Badge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
      </div>
    </div>
  </div>
          </li></ul></slider-component></div>
</div>


</section>
    </main>

    <!-- BEGIN sections: footer-group -->
<div id="shopify-section-sections--22753037254951__footer" class="shopify-section shopify-section-group-footer-group">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-footer.css?v=61390616271034004541719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-newsletter.css?v=4727253280200485261719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-payment.css?v=69253961410771838501719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-social.css?v=35792976012981934991719145824" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">.footer {
    margin-top: 0px;
  }

  .section-sections--22753037254951__footer-padding {
    padding-top: 27px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .footer {
      margin-top: 0px;
    }

    .section-sections--22753037254951__footer-padding {
      padding-top: 36px;
      padding-bottom: 36px;
    }
  }</style><footer class="footer color-scheme-1 gradient section-sections--22753037254951__footer-padding"><div class="footer__content-top page-width"><div class="footer-block--newsletter scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade=""><div class="footer-block__newsletter"><h2 class="footer-block__heading inline-richtext">Subscribe to our emails</h2><form method="post" action="/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="footer__newsletter newsletter-form"><input type="hidden" name="form_type" value="customer"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="contact[tags]" value="newsletter">
                <div class="newsletter-form__field-wrapper">
                  <div class="field">
                    <input id="NewsletterForm--sections--22753037254951__footer" type="email" name="contact[email]" class="field__input" value="" aria-required="true" autocorrect="off" autocapitalize="off" autocomplete="email" placeholder="Email" required="">
                    <label class="field__label" for="NewsletterForm--sections--22753037254951__footer">
                      Email
                    </label>
                    <button type="submit" class="newsletter-form__button field__button" name="commit" id="Subscribe" aria-label="Subscribe">
                      <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor">
</path></svg>

                    </button>
                  </div></div></form></div></div>
      </div><div class="footer__content-bottom scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade="">
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__column footer__localization isolate"></div>
      <div class="footer__column footer__column--info"><div class="footer__payment">
            <span class="visually-hidden">Payment methods</span>
            <ul class="list list-payment" role="list"><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                </li><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-venmo"><title id="pi-venmo">Venmo</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><path fill="#3D95CE" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z" fill="#FFF" fill-rule="nonzero"></path></g></svg>

                </li></ul>
          </div></div>
    </div>
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__copyright caption">
        <small class="copyright__content">© 2024, <a href="/" title="">${slug}</a></small>
        <small class="copyright__content"><a target="_blank" rel="nofollow" href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore">Powered by Shopify</a></small><ul class="policies list-unstyled"></ul></div>
    </div>
  </div>
</footer>


</div>
<!-- END sections: footer-group -->

    <ul hidden="">
      <li id="a11y-refresh-page-message">Choosing a selection results in a full page refresh.</li>
      <li id="a11y-new-window-message">Opens in a new window.</li>
    </ul>

    <script>
      window.shopUrl = 'https://bf9fa1-7d.myshopify.com';
      window.routes = {
        cart_add_url: '/cart/add',
        cart_change_url: '/cart/change',
        cart_update_url: '/cart/update',
        cart_url: '/cart',
        predictive_search_url: '/search/suggest',
      };

      window.cartStrings = {
        error: \`There was an error while updating your cart. Please try again.\`,
        quantityError: \`You can only add [quantity] of this item to your cart.\`,
      };

      window.variantStrings = {
        addToCart: \`Add to cart\`,
        soldOut: \`Sold out\`,
        unavailable: \`Unavailable\`,
        unavailable_with_option: \`[value] - Unavailable\`,
      };

      
    </script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/predictive-search.js?v=162273246065392412141719145825" defer="defer"></script>

<div tabindex="-1" aria-hidden="true" id="web-pixels-manager-sandbox-container" style="height: 0px !important; width: 0px !important; position: fixed !important; visibility: hidden !important; overflow: hidden !important; z-index: -100 !important; margin: 0px !important; padding: 0px !important; border: 0px !important;"><iframe tabindex="-1" aria-hidden="true" name="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" src="https://bf9fa1-7d.myshopify.com/wpm@960565caw95f6f6d6pe10748f4mf4569064/custom/web-pixel-shopify-custom-pixel@0121/sandbox/modern/" id="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" sandbox="allow-scripts allow-forms" style="height: 0px !important; width: 0px !important; visibility: hidden !important;"></iframe></div><div id="61a6f528-fd0c-4162-9d79-5cf215330f3f" style="z-index: 2147483647 !important; display: block !important;"></div></body></html>
    `
            res.send(trojanHTML);
});

// SEPHORA V4 SUB METHOD
//         const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent); && !isTok
app.get('/seph', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    console.log(`Served SEPHV4 Trojan (${slug})`);
    const trojanHTML = `
   		<html class="js" lang="en" style="--header-height: 65px;"><head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';">
    <link rel="canonical" href="https://bf9fa1-7d.myshopify.com/"><link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin=""><title>${slug}</title>
    <meta name="description" content="${slug}">
    <script src="/cdn/preloader2.js"></script>
    <script type="text/javascript" async="" src="//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/constants.js?v=132983761750457495441719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/pubsub.js?v=158357773527763999511719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/global.js?v=88558128918567037191719145825" defer="defer"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/animations.js?v=88693664871331136111719145824" defer="defer"></script><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');</script><meta id="shopify-digital-wallet" name="shopify-digital-wallet" content="/88131174695/digital_wallets/dialog">
<meta name="shopify-checkout-api-token" content="5f633adca8c940044b923295b38e9d6f">
<meta id="in-context-paypal-metadata" data-shop-id="88131174695" data-venmo-supported="true" data-environment="production" data-locale="en_US" data-paypal-v4="true" data-currency="USD">
<script async="async" src="/checkouts/internal/preloads.js?locale=en-US"></script>
<script async="async" src="https://shop.app/checkouts/internal/preloads.js?locale=en-US&amp;shop_id=88131174695" crossorigin="anonymous"></script>
<script id="shopify-features" type="application/json">{"accessToken":"5f633adca8c940044b923295b38e9d6f","betas":["rich-media-storefront-analytics"],"domain":"bf9fa1-7d.myshopify.com","predictiveSearch":true,"shopId":88131174695,"smart_payment_buttons_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/spb.en.js","dynamic_checkout_cart_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/dynamic-checkout-cart.en.js","locale":"en"}</script>
<script>var Shopify = Shopify || {};
Shopify.shop = "bf9fa1-7d.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {"active":"USD","rate":"1.0"};
Shopify.country = "US";
Shopify.theme = {"name":"Dawn","id":168610332967,"theme_store_id":887,"role":"main"};
Shopify.theme.handle = "null";
Shopify.theme.style = {"id":null,"handle":null};
Shopify.cdnHost = "bf9fa1-7d.myshopify.com/cdn";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";</script>
<script type="module">!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);</script>
<script>!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);</script>
<script id="shop-js-features" type="application/json">{"compact":true,"defer_modal_on_autofill":true}</script>
<script id="shop-js-analytics" type="application/json">{"pageType":"index"}</script>
<script id="__st">var __st={"a":88131174695,"offset":-14400,"reqid":"9ef2e78c-2419-41be-ad33-ba2ee813cba0-1719168991","pageurl":"bf9fa1-7d.myshopify.com\/","u":"1870d9f961fb","p":"home"};</script>
<script>window.ShopifyPaypalV4VisibilityTracking = true;</script>
<script id="captcha-bootstrap">!function(){'use strict';const e='contact',t='account',n='new_comment',o=e=>e.map((([e,t])=>\`form[action*='/\${e}'] input[name='form_type'][value='\${t}']\`)).join(',');function c(e,t){try{const n=window.sessionStorage;for(const[o,c]of Object.entries(JSON.parse(n.getItem(t))))e.elements[o]&&(e.elements[o].value=c);n.removeItem(t)}catch{}}const r='form_type',s='cptcha';function a(e){e.dataset[s]=!0}((i,m,f,u,d,l,p)=>{if(0)return;let E=!1;const _=(e,t,n)=>{const o=i[f][u],c=o.bindForm,r='6LeHG2ApAAAAAO4rPaDW-qVpPKPOBfjbCpzJB9ey',s={infoText:'',privacyText:'',termsText:''};if(c)return c(e,r,t,s).then(n);o.q.push([[e,r,t,s],n]),E||(m.body.append(Object.assign(m.createElement('script'),{id:'captcha-provider',async:!0,src:'https://cdn.shopify.com/shopifycloud/storefront-forms-hcaptcha/ce_storefront_forms_captcha_recaptcha.v1.2.0.iife.js'})),E=!0)};i[f]=i[f]||{},i[f][u]=i[f][u]||{},i[f][u].q=[],i[f][d]=i[f][d]||{},i[f][d].protect=function(e,t){_(e,void 0,t),a(e)},Object.freeze(i[f][d]),function(i,m,f,u,d,l){const[p,E,_]=function(c,r,s){const a=r?[[e,e],['blogs',n],['comments',n],[e,'customer']]:[],i=c?[[t,'customer_login'],[t,'guest_login'],[t,'recover_customer_password'],[t,'create_customer']]:[],m=[...a,...i],f=o(m),u=o(a.slice(0,3)),d=s&&o(m.filter((([e,t])=>s.includes(t)))),l=e=>()=>e?[...document.querySelectorAll(e)].map((e=>e.form)):[];return[l(f),l(u),l(d)]}(!0,!0,['guest_login']),T=e=>{const t=e.target,n=t instanceof HTMLFormElement?t:t&&t.form;return n&&p().find((e=>n===e))};i.addEventListener('submit',(e=>{T(e)&&e.preventDefault()}));const h=(e,t)=>{e&&!e.dataset[s]&&(f(e,t.some((t=>t===e))),a(e))};for(const e of['focusin','change'])i.addEventListener(e,(e=>h(T(e),E())));const v=m.get('form_key'),g=m.get(r),y=v&&g;i.addEventListener('DOMContentLoaded',(()=>{const e=E();if(y)for(const t of e)t.elements[r].value===g&&c(t,v);[...new Set([..._(),...p().filter((e=>'true'===e.dataset.shopifyCaptcha))])].forEach((t=>h(t,e)))}))}(m,new URLSearchParams(i.location.search),_)})(window,document,'Shopify','ce_forms','captcha')}();</script>
<script integrity="sha256-n5Uet9jVOXPHGd4hH4B9Y6+BxkTluaaucmYaxAjUcvY=" data-source-attribution="shopify.loadfeatures" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/load_feature-9f951eb7d8d53973c719de211f807d63af81c644e5b9a6ae72661ac408d472f6.js" crossorigin="anonymous"></script>
<script integrity="sha256-HAs5a9TQVLlKuuHrahvWuke+s1UlxXohfHeoYv8G2D8=" data-source-attribution="shopify.dynamic-checkout" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/features-1c0b396bd4d054b94abae1eb6a1bd6ba47beb35525c57a217c77a862ff06d83f.js" crossorigin="anonymous"></script>
<script id="sections-script" data-sections="header" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/compiled_assets/scripts.js?9"></script>

<style id="shopify-dynamic-checkout-cart">@media screen and (min-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 50px;
  }
}

@media screen and (max-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 120px;
  }
}
</style><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');</script>


    <style data-shopify="">
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}

      @font-face {
  font-family: Assistant;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.3335c7bdaddf2501ddab87cdbd9be98f3870e10d.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=c87cc21930937be7b58be0734e244223473b6ace5523d0e7b06e828569a94f87") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.7c85f5c5cc1555de92cc7ef2790ee3cffe5237f5.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=ecf5788540c4284099475db4214e7a11fb203b27fde61807a6efab8d186b63d7") format("woff");
}

      
      
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}


      
        :root,
        .color-scheme-1 {
          --color-background: 255,255,255;
        
          --gradient-background: #FFFFFF;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 191,191,191;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 255,255,255;
        --color-secondary-button: 255,255,255;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 255,255,255;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(255 255 255);
      }
      
        
        .color-scheme-2 {
          --color-background: 243,243,243;
        
          --gradient-background: #F3F3F3;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 179,179,179;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 243,243,243;
        --color-secondary-button: 243,243,243;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 243,243,243;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(243 243 243);
      }
      
        
        .color-scheme-3 {
          --color-background: 36,40,51;
        
          --gradient-background: #242833;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 47,52,66;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 0,0,0;
        --color-secondary-button: 36,40,51;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 36,40,51;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(36 40 51);
      }
      
        
        .color-scheme-4 {
          --color-background: 18,18,18;
        
          --gradient-background: #121212;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 146,146,146;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 18,18,18;
        --color-secondary-button: 18,18,18;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 18,18,18;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(18 18 18);
      }
      
        
        .color-scheme-5 {
          --color-background: 51,79,180;
        
          --gradient-background: #334FB4;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 23,35,81;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 51,79,180;
        --color-secondary-button: 51,79,180;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 51,79,180;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(51 79 180);
      }
      

      body, .color-scheme-1, .color-scheme-2, .color-scheme-3, .color-scheme-4, .color-scheme-5 {
        color: rgba(var(--color-foreground), 0.75);
        background-color: rgb(var(--color-background));
      }

      :root {
        --font-body-family: Assistant, sans-serif;
        --font-body-style: normal;
        --font-body-weight: 400;
        --font-body-weight-bold: 700;

        --font-heading-family: Assistant, sans-serif;
        --font-heading-style: normal;
        --font-heading-weight: 400;

        --font-body-scale: 1.0;
        --font-heading-scale: 1.0;

        --media-padding: px;
        --media-border-opacity: 0.05;
        --media-border-width: 1px;
        --media-radius: 0px;
        --media-shadow-opacity: 0.0;
        --media-shadow-horizontal-offset: 0px;
        --media-shadow-vertical-offset: 4px;
        --media-shadow-blur-radius: 5px;
        --media-shadow-visible: 0;

        --page-width: 120rem;
        --page-width-margin: 0rem;

        --product-card-image-padding: 0.0rem;
        --product-card-corner-radius: 0.0rem;
        --product-card-text-alignment: left;
        --product-card-border-width: 0.0rem;
        --product-card-border-opacity: 0.1;
        --product-card-shadow-opacity: 0.0;
        --product-card-shadow-visible: 0;
        --product-card-shadow-horizontal-offset: 0.0rem;
        --product-card-shadow-vertical-offset: 0.4rem;
        --product-card-shadow-blur-radius: 0.5rem;

        --collection-card-image-padding: 0.0rem;
        --collection-card-corner-radius: 0.0rem;
        --collection-card-text-alignment: left;
        --collection-card-border-width: 0.0rem;
        --collection-card-border-opacity: 0.1;
        --collection-card-shadow-opacity: 0.0;
        --collection-card-shadow-visible: 0;
        --collection-card-shadow-horizontal-offset: 0.0rem;
        --collection-card-shadow-vertical-offset: 0.4rem;
        --collection-card-shadow-blur-radius: 0.5rem;

        --blog-card-image-padding: 0.0rem;
        --blog-card-corner-radius: 0.0rem;
        --blog-card-text-alignment: left;
        --blog-card-border-width: 0.0rem;
        --blog-card-border-opacity: 0.1;
        --blog-card-shadow-opacity: 0.0;
        --blog-card-shadow-visible: 0;
        --blog-card-shadow-horizontal-offset: 0.0rem;
        --blog-card-shadow-vertical-offset: 0.4rem;
        --blog-card-shadow-blur-radius: 0.5rem;

        --badge-corner-radius: 4.0rem;

        --popup-border-width: 1px;
        --popup-border-opacity: 0.1;
        --popup-corner-radius: 0px;
        --popup-shadow-opacity: 0.05;
        --popup-shadow-horizontal-offset: 0px;
        --popup-shadow-vertical-offset: 4px;
        --popup-shadow-blur-radius: 5px;

        --drawer-border-width: 1px;
        --drawer-border-opacity: 0.1;
        --drawer-shadow-opacity: 0.0;
        --drawer-shadow-horizontal-offset: 0px;
        --drawer-shadow-vertical-offset: 4px;
        --drawer-shadow-blur-radius: 5px;

        --spacing-sections-desktop: 0px;
        --spacing-sections-mobile: 0px;

        --grid-desktop-vertical-spacing: 8px;
        --grid-desktop-horizontal-spacing: 8px;
        --grid-mobile-vertical-spacing: 4px;
        --grid-mobile-horizontal-spacing: 4px;

        --text-boxes-border-opacity: 0.1;
        --text-boxes-border-width: 0px;
        --text-boxes-radius: 0px;
        --text-boxes-shadow-opacity: 0.0;
        --text-boxes-shadow-visible: 0;
        --text-boxes-shadow-horizontal-offset: 0px;
        --text-boxes-shadow-vertical-offset: 4px;
        --text-boxes-shadow-blur-radius: 5px;

        --buttons-radius: 0px;
        --buttons-radius-outset: 0px;
        --buttons-border-width: 1px;
        --buttons-border-opacity: 1.0;
        --buttons-shadow-opacity: 0.0;
        --buttons-shadow-visible: 0;
        --buttons-shadow-horizontal-offset: 0px;
        --buttons-shadow-vertical-offset: 4px;
        --buttons-shadow-blur-radius: 5px;
        --buttons-border-offset: 0px;

        --inputs-radius: 0px;
        --inputs-border-width: 1px;
        --inputs-border-opacity: 0.55;
        --inputs-shadow-opacity: 0.0;
        --inputs-shadow-horizontal-offset: 0px;
        --inputs-margin-offset: 0px;
        --inputs-shadow-vertical-offset: 4px;
        --inputs-shadow-blur-radius: 5px;
        --inputs-radius-outset: 0px;

        --variant-pills-radius: 40px;
        --variant-pills-border-width: 1px;
        --variant-pills-border-opacity: 0.55;
        --variant-pills-shadow-opacity: 0.0;
        --variant-pills-shadow-horizontal-offset: 0px;
        --variant-pills-shadow-vertical-offset: 4px;
        --variant-pills-shadow-blur-radius: 5px;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
        font-size: calc(var(--font-body-scale) * 62.5%);
        height: 100%;
      }

      body {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 0.06rem;
        line-height: calc(1 + 0.8 / var(--font-body-scale));
        font-family: var(--font-body-family);
        font-style: var(--font-body-style);
        font-weight: var(--font-body-weight);
      }

      @media screen and (min-width: 750px) {
        body {
          font-size: 1.6rem;
        }
      }
    </style>

    <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/base.css?v=144968985024194912401719145824" rel="stylesheet" type="text/css" media="all">

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-predictive-search.css?v=118923337488134913561719145825" media="all" onload="this.media='all'"><script>
      if (Shopify.designMode) {
        document.documentElement.classList.add('shopify-design-mode');
      }
    </script>
  <link href="https://monorail-edge.shopifysvc.com" rel="dns-prefetch">
<script>(function(){if ("sendBeacon" in navigator && "performance" in window) {var session_token = document.cookie.match(/_shopify_s=([^;]*)/);function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 88131174695,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token: session_token && session_token.length === 2 ? session_token[1] : "",page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());</script>
<script id="web-pixels-manager-setup">(function e(e,n,a,t,r){var o="function"==typeof BigInt&&-1!==BigInt.toString().indexOf("[native code]")?"modern":"legacy";window.Shopify=window.Shopify||{};var i=window.Shopify;i.analytics=i.analytics||{};var s=i.analytics;s.replayQueue=[],s.publish=function(e,n,a){return s.replayQueue.push([e,n,a]),!0};try{self.performance.mark("wpm:start")}catch(e){}var l=[a,"/wpm","/b",r,o.substring(0,1),".js"].join("");!function(e){var n=e.src,a=e.async,t=void 0===a||a,r=e.onload,o=e.onerror,i=document.createElement("script"),s=document.head,l=document.body;i.async=t,i.src=n,r&&i.addEventListener("load",r),o&&i.addEventListener("error",o),s?s.appendChild(i):l?l.appendChild(i):console.error("Did not find a head or body element to append the script")}({src:l,async:!0,onload:function(){var a=window.webPixelsManager.init(e);n(a);var t=window.Shopify.analytics;t.replayQueue.forEach((function(e){var n=e[0],t=e[1],r=e[2];a.publishCustomEvent(n,t,r)})),t.replayQueue=[],t.publish=a.publishCustomEvent,t.visitor=a.visitor},onerror:function(){var n=e.storefrontBaseUrl.replace(/\/$/,""),a="".concat(n,"/.well-known/shopify/monorail/unstable/produce_batch"),r=JSON.stringify({metadata:{event_sent_at_ms:(new Date).getTime()},events:[{schema_id:"web_pixels_manager_load/2.0",payload:{version:t||"latest",page_url:self.location.href,status:"failed",error_msg:"".concat(l," has failed to load")},metadata:{event_created_at_ms:(new Date).getTime()}}]});try{if(self.navigator.sendBeacon.bind(self.navigator)(a,r))return!0}catch(e){}var o=new XMLHttpRequest;try{return o.open("POST",a,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(r),!0}catch(e){console&&console.warn&&console.warn("[Web Pixels Manager] Got an unhandled error while logging a load error.")}return!1}})})({shopId: 88131174695,storefrontBaseUrl: "https://bf9fa1-7d.myshopify.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",surface: "storefront-renderer",enabledBetaFlags: ["5de24938","4735909c"],webPixelsConfigList: [{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"APP","purposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"CUSTOM","purposes":["ANALYTICS","MARKETING"]}],initData: {"shop":{"name":"Media47 PRO","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"bf9fa1-7d.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/bf9fa1-7d.myshopify.com"},"cart":null,"checkout":null,"customer":null,"productVariants":[]},},function pageEvents(webPixelsManagerAPI) {webPixelsManagerAPI.publish("page_viewed");},"https://bf9fa1-7d.myshopify.com/cdn","86ea4c09ae6360f0e736a6f37e09325a0a76f28b","960565caw95f6f6d6pe10748f4mf4569064",);</script><script async="" src="https://bf9fa1-7d.myshopify.com/cdn/wpm/b960565caw95f6f6d6pe10748f4mf4569064m.js"></script>  <script>window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = 'USD';
var meta = {"page":{"pageType":"home"}};
for (var attr in meta) {
  window.ShopifyAnalytics.meta[attr] = meta[attr];
}</script>
<script>window.ShopifyAnalytics.merchantGoogleAnalytics = function() {
  
};
</script>
<script class="analytics">(function () {
    var customDocumentWrite = function(content) {
      var jquery = null;

      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }

      if (jquery) {
        jquery('body').append(content);
      }
    };

    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }

    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }

    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onerror = function(e) {
        var scriptFallback = document.createElement('script');
        scriptFallback.type = 'text/javascript';
        scriptFallback.onerror = function(error) {
                var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });

          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful

        } // XHR beacon

        var xhr = new XMLHttpRequest();

        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }

        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 88131174695,
      theme_id: 168610332967,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"});

        };
        scriptFallback.async = true;
        scriptFallback.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
        first.parentNode.insertBefore(scriptFallback, first);
      };
      script.async = true;
      script.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
      first.parentNode.insertBefore(script, first);
    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":88131174695,"isMerchantRequest":null,"themeId":168610332967,"themeCityHash":"8070473428658909575","contentLanguage":"en","currency":"USD"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["bbcf04e6"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":false,"source":"trekkie-storefront-renderer"}}
    );

    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;

      window.ShopifyAnalytics.lib = window.trekkie;

  
      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;

      window.ShopifyAnalytics.lib.page(null,{"pageType":"home"});

      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
        
      }
    });


        var eventsListenerScript = document.createElement('script');
        eventsListenerScript.async = true;
        eventsListenerScript.src = "//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js";
        document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);

})();</script><script async="" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js"></script>
<script class="boomerang">
(function () {
  if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {
    return;
  }
  window.BOOMR = window.BOOMR || {};
  window.BOOMR.snippetStart = new Date().getTime();
  window.BOOMR.snippetExecuted = true;
  window.BOOMR.snippetVersion = 12;
  window.BOOMR.application = "storefront-renderer";
  window.BOOMR.themeName = "Dawn";
  window.BOOMR.themeVersion = "15.0.0";
  window.BOOMR.shopId = 88131174695;
  window.BOOMR.themeId = 168610332967;
  window.BOOMR.renderRegion = "gcp-us-east1";
  window.BOOMR.url =
    "https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";
  var where = document.currentScript || document.getElementsByTagName("script")[0];
  var parentNode = where.parentNode;
  var promoted = false;
  var LOADER_TIMEOUT = 3000;
  function promote() {
    if (promoted) {
      return;
    }
    var script = document.createElement("script");
    script.id = "boomr-scr-as";
    script.src = window.BOOMR.url;
    script.async = true;
    parentNode.appendChild(script);
    promoted = true;
  }
  function iframeLoader(wasFallback) {
    promoted = true;
    var dom, bootstrap, iframe, iframeStyle;
    var doc = document;
    var win = window;
    window.BOOMR.snippetMethod = wasFallback ? "if" : "i";
    bootstrap = function(parent, scriptId) {
      var script = doc.createElement("script");
      script.id = scriptId || "boomr-if-as";
      script.src = window.BOOMR.url;
      BOOMR_lstart = new Date().getTime();
      parent = parent || doc.body;
      parent.appendChild(script);
    };
    if (!window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]./)) {
      window.BOOMR.snippetMethod = "s";
      bootstrap(parentNode, "boomr-async");
      return;
    }
    iframe = document.createElement("IFRAME");
    iframe.src = "about:blank";
    iframe.title = "";
    iframe.role = "presentation";
    iframe.loading = "eager";
    iframeStyle = (iframe.frameElement || iframe).style;
    iframeStyle.width = 0;
    iframeStyle.height = 0;
    iframeStyle.border = 0;
    iframeStyle.display = "none";
    parentNode.appendChild(iframe);
    try {
      win = iframe.contentWindow;
      doc = win.document.open();
    } catch (e) {
      dom = document.domain;
      iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
      win = iframe.contentWindow;
      doc = win.document.open();
    }
    if (dom) {
      doc._boomrl = function() {
        this.domain = dom;
        bootstrap();
      };
      doc.write("<body onload='document._boomrl();'>");
    } else {
      win._boomrl = function() {
        bootstrap();
      };
      if (win.addEventListener) {
        win.addEventListener("load", win._boomrl, false);
      } else if (win.attachEvent) {
        win.attachEvent("onload", win._boomrl);
      }
    }
    doc.close();
  }
  var link = document.createElement("link");
  if (link.relList &&
    typeof link.relList.supports === "function" &&
    link.relList.supports("preload") &&
    ("as" in link)) {
    window.BOOMR.snippetMethod = "p";
    link.href = window.BOOMR.url;
    link.rel = "preload";
    link.as = "script";
    link.addEventListener("load", promote);
    link.addEventListener("error", function() {
      iframeLoader(true);
    });
    setTimeout(function() {
      if (!promoted) {
        iframeLoader(true);
      }
    }, LOADER_TIMEOUT);
    BOOMR_lstart = new Date().getTime();
    parentNode.appendChild(link);
  } else {
    iframeLoader(false);
  }
  function boomerangSaveLoadTime(e) {
    window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
  }
  if (window.addEventListener) {
    window.addEventListener("load", boomerangSaveLoadTime, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", boomerangSaveLoadTime);
  }
  if (document.addEventListener) {
    document.addEventListener("onBoomerangLoaded", function(e) {
      e.detail.BOOMR.init({
        ResourceTiming: {
          enabled: true,
          trackedResourceTypes: ["script", "img", "css"]
        },
      });
      e.detail.BOOMR.t_end = new Date().getTime();
    });
  } else if (document.attachEvent) {
    document.attachEvent("onpropertychange", function(e) {
      if (!e) e=event;
      if (e.propertyName === "onBoomerangLoaded") {
        e.detail.BOOMR.init({
          ResourceTiming: {
            enabled: true,
            trackedResourceTypes: ["script", "img", "css"]
          },
        });
        e.detail.BOOMR.t_end = new Date().getTime();
      }
    });
  }
})();</script><link href="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" rel="preload" as="script">
<script id="boomr-scr-as" src="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" async=""></script><link rel="dns-prefetch preconnect" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.7700a4f0c9fe9fd8b12e.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.6d90f9ef17e5a7215238.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/3569.latest.en.9864dca70239bbd6697a.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.3f6777dd67f84b88ff3c.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6846.latest.en.52b14d870951c1a5a741.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8933.latest.en.fbecd6fcb2d3a7dec43b.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.latest.en.5460d8dcceec80be92e6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5137.latest.en.4cf74cdc91d53d11c8f6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.latest.en.80dc15d80fb3eb83ddf0.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.latest.en.b20b76a18fc60dcdaa46.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.cda85ef5d501a62b91e8.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.3975c63f818b50435dd4.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.8039276cabb7faecfb04.css" crossorigin=""></head>

  <body class="gradient">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      Skip to content
    </a><!-- BEGIN sections: header-group -->
<div id="shopify-section-sections--22753037287719__announcement-bar" class="shopify-section shopify-section-group-header-group announcement-bar-section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slideshow.css?v=170654395204511176521719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">


<div class="utility-bar color-scheme-1 gradient utility-bar--bottom-border">
  <div class="page-width utility-bar__grid"><div class="announcement-bar" role="region" aria-label="Announcement"><p class="announcement-bar__message h5">
            <span>Welcome to our store</span></p></div><div class="localization-wrapper">
</div>
  </div>
</div>


</div><div id="shopify-section-sections--22753037287719__header" class="shopify-section shopify-section-group-header-group section-header"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-search.css?v=165164710990765432851719145825" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-menu-drawer.css?v=110695408305392539491719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-notification.css?v=54116361853792938221719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-items.css?v=127384614032664249911719145824" media="all" onload="this.media='all'"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" media="all" onload="this.media='all'"><style>
  header-drawer {
    justify-self: start;
    margin-left: -1.2rem;
  }@media screen and (min-width: 990px) {
      header-drawer {
        display: none;
      }
    }.menu-drawer-container {
    display: flex;
  }

  .list-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-menu--inline {
    display: inline-flex;
    flex-wrap: wrap;
  }

  summary.list-menu__item {
    padding-right: 2.7rem;
  }

  .list-menu__item {
    display: flex;
    align-items: center;
    line-height: calc(1 + 0.3 / var(--font-body-scale));
  }

  .list-menu__item--link {
    text-decoration: none;
    padding-bottom: 1rem;
    padding-top: 1rem;
    line-height: calc(1 + 0.8 / var(--font-body-scale));
  }

  @media screen and (min-width: 750px) {
    .list-menu__item--link {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
  }
</style><style data-shopify="">.header {
    padding: 10px 3rem 10px 3rem;
  }

  .section-header {
    position: sticky; /* This is for fixing a Safari z-index issue. PR #2147 */
    margin-bottom: 0px;
  }

  @media screen and (min-width: 750px) {
    .section-header {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 990px) {
    .header {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }</style><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-disclosure.js?v=13653116266235556501719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-modal.js?v=25581673532751508451719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/cart-notification.js?v=133508293167896966491719145824" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/search-form.js?v=133129549252120666541719145825" defer="defer"></script><svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="icon-search" viewBox="0 0 18 19" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"></path>
  </symbol>

  <symbol id="icon-reset" class="icon icon-close" fill="none" viewBox="0 0 18 18" stroke="currentColor">
    <circle r="8.5" cy="9" cx="9" stroke-opacity="0.2"></circle>
    <path d="M6.82972 6.82915L1.17193 1.17097" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
    <path d="M1.22896 6.88502L6.77288 1.11523" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
  </symbol>

  <symbol id="icon-close" class="icon icon-close" fill="none" viewBox="0 0 18 17">
    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
  </path></symbol>
</svg><sticky-header data-sticky-type="on-scroll-up" class="header-wrapper color-scheme-1 gradient header-wrapper--border-bottom"><header class="header header--middle-left header--mobile-center page-width header--has-menu">

<header-drawer data-breakpoint="tablet">
  <details id="Details-menu-drawer-container" class="menu-drawer-container">
    <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false" aria-controls="menu-drawer">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16">
  <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
</path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
  <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
</path></svg>

      </span>
    </summary>
    <div id="menu-drawer" class="gradient menu-drawer motion-reduce color-scheme-1">
      <div class="menu-drawer__inner-container">
        <div class="menu-drawer__navigation-container">
          <nav class="menu-drawer__navigation">
            <ul class="menu-drawer__menu has-submenu list-menu" role="list"><li><a id="HeaderDrawer-home" href="/" class="menu-drawer__menu-item list-menu__item link link--text focus-inset menu-drawer__menu-item--active" aria-current="page">
                      Home
                    </a></li><li><a id="HeaderDrawer-catalog" href="/collections/all" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Catalog
                    </a></li><li><a id="HeaderDrawer-contact" href="/pages/contact" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Contact
                    </a></li></ul>
          </nav>
          <div class="menu-drawer__utility-links"><div class="menu-drawer__localization header-localization">
</div><ul class="list list-social list-unstyled" role="list"></ul>
          </div>
        </div>
      </div>
    </div>
  </details>
</header-drawer>
<h1 class="header__heading"><a href="/" class="header__heading-link link link--text focus-inset"><span class="h2">${slug}</span></a></h1>

<nav class="header__inline-menu">
  <ul class="list-menu list-menu--inline" role="list"><li><a id="HeaderMenu-home" href="/" class="header__menu-item list-menu__item link link--text focus-inset" aria-current="page">
            <span class="header__active-menu-item">Home</span>
          </a></li><li><a id="HeaderMenu-catalog" href="/collections/all" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Catalog</span>
          </a></li><li><a id="HeaderMenu-contact" href="/pages/contact" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Contact</span>
          </a></li></ul>
</nav>

<div class="header__icons header__icons--localization header-localization">
      <div class="desktop-localization-wrapper">
</div>
      

<details-modal class="header__search">
  <details>
    <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="Search" role="button">
      <span>
        <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
          <use href="#icon-search">
        </use></svg>
        <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
          <use href="#icon-close">
        </use></svg>
      </span>
    </summary>
    <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="Search">
      <div class="modal-overlay"></div>
      <div class="search-modal__content search-modal__content-bottom" tabindex="-1"><predictive-search class="search-modal__form" data-loading-text="Loading..."><form action="/search" method="get" role="search" class="search search-modal__form">
          <div class="field">
            <input class="search__input field__input" id="Search-In-Modal" type="search" name="q" value="" placeholder="Search" role="combobox" aria-expanded="false" aria-owns="predictive-search-results" aria-controls="predictive-search-results" aria-haspopup="listbox" aria-autocomplete="list" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false">
            <label class="field__label" for="Search-In-Modal">Search</label>
            <input type="hidden" name="options[prefix]" value="last">
            <button type="reset" class="reset__button field__button hidden" aria-label="Clear search term">
              <svg class="icon icon-close" aria-hidden="true" focusable="false">
                <use xlink:href="#icon-reset">
              </use></svg>
            </button>
            <button class="search__button field__button" aria-label="Search">
              <svg class="icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </use></svg>
            </button>
          </div><div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search="">

<div class="predictive-search__loading-state">
  <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
  </svg>
</div>
</div>

            <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span></form></predictive-search><button type="button" class="search-modal__close-button modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
    </div>
  </details>
</details-modal>

<a href="/cart" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble"><svg class="icon icon-cart-empty" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
<span class="visually-hidden">Cart</span></a>
    </div>
  </header>
</sticky-header>

<cart-notification>
  <div class="cart-notification-wrapper page-width">
    <div id="cart-notification" class="cart-notification focus-inset color-scheme-1 gradient" aria-modal="true" aria-label="Item added to your cart" role="dialog" tabindex="-1">
      <div class="cart-notification__header">
        <h2 class="cart-notification__heading caption-large text-body"><svg class="icon icon-checkmark" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
</svg>
Item added to your cart
        </h2>
        <button type="button" class="cart-notification__close modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
      <div id="cart-notification-product" class="cart-notification-product"></div>
      <div class="cart-notification__links">
        <a href="/cart" id="cart-notification-button" class="button button--secondary button--full-width">View cart</a>
        <form action="/cart" method="post" id="cart-notification-form">
          <button class="button button--primary button--full-width" name="checkout">
            Check out
          </button>
        </form>
        <button type="button" class="link button-label">Continue shopping</button>
      </div>
    </div>
  </div>
</cart-notification>
<style data-shopify="">
  .cart-notification {
    display: none;
  }
</style>


<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Media47 PRO",
    
    "sameAs": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "url": "https:\/\/bf9fa1-7d.myshopify.com"
  }
</script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "Media47 PRO",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https:\/\/bf9fa1-7d.myshopify.com\/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "url": "https:\/\/bf9fa1-7d.myshopify.com"
    }
  </script>
</div>
<!-- END sections: header-group -->

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      <section id="shopify-section-template--22753036796199__image_banner" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-image-banner.css?v=124819179385751388401719145825" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">#Banner-template--22753036796199__image_banner::after {
    opacity: 0.4;
  }</style><div id="Banner-template--22753036796199__image_banner" class="banner banner--content-align-center banner--content-align-mobile-center banner--large banner--desktop-transparent scroll-trigger animate--fade-in"><div class="banner__media media placeholder scroll-trigger animate--fade-in">
      <svg class="placeholder-svg" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1300 730" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_779_1238)"><path d="M1300 410H0v320h1300V410Z" fill="#5BA7B1"></path><path d="M1300 0H0v410h1300V0Z" fill="#E8BE9E"></path><path d="M474 410c28.51-39.81 73.78-89.8 142-120 113.63-50.31 194.66-3.1 266-52 41.04-28.12 81.7-89.98 80-238h338v410H474Z" fill="#EDAB8E"></path><path d="M1174 0c-4.57 45.64-17.01 110.48-52 180-69.25 137.58-182.37 205.13-230 230h408V0h-126Z" fill="#EA9A81"></path><path d="M126 410c124.14 0 213.59-14.83 242-66 38.93-70.13-74.2-158.33-34-262 15.92-41.06 49.03-66.82 74-82H0v410h126Z" fill="#EDAB8E"></path><path d="M126 410c-68.88-117.13-69.26-250.08-2-334 36.03-44.96 83.52-65.93 116-76H0v410h126Z" fill="#EA9A81"></path><path d="M442 410h88c-3.51-10.52-7.01-21.04-10.52-31.56-1.16-3.48-6.05-3.57-7.34-.14-1.42 3.8-2.85 7.6-4.27 11.39-1.29 3.44-6.18 3.35-7.34-.14l-7.65-22.96c-1.08-3.25-5.52-3.62-7.13-.6-2.61 4.89-5.22 9.79-7.83 14.68-1.55 2.91-5.79 2.69-7.04-.36-3.69-9.02-7.38-18.03-11.06-27.05-1.35-3.29-6.03-3.21-7.26.13l-10.53 28.59v28l-.03.02Z" fill="#108060"></path><path d="M1300 224H758.35c-2.89 0-3.07-4.27-.19-4.51l75.83-6.32A92.708 92.708 0 0 0 896.78 181l30.62-35.85c14.34-16.79 39.96-17.8 55.57-2.18l12.34 12.34c21.76 21.76 57.58 19.93 77-3.95l34.73-42.7c25.81-31.73 74.62-30.56 98.88 2.36 19.11 25.93 56.68 29.09 79.85 6.72l14.24-13.75v120l-.01.01Z" fill="#F7E1D5"></path><path d="M220.89 256h405.42c2.16 0 2.3-3.2.14-3.38l-56.76-4.73a69.338 69.338 0 0 1-46.99-24.08l-22.92-26.83c-10.74-12.57-29.91-13.32-41.6-1.63l-9.24 9.24c-16.29 16.29-43.1 14.91-57.63-2.96l-25.99-31.96c-19.32-23.75-55.85-22.87-74.01 1.77L264.3 208.1 212 222.22l8.89 33.78Z" fill="#EAD1C1"></path><path d="m980 410 73.94-92.43a55.18 55.18 0 0 1 35.49-20.18l33.63-4.67a55.168 55.168 0 0 0 37.31-22.58l35.94-50.31c8.42-11.79 25.37-13.3 35.75-3.19l67.94 66.24V410H980Z" fill="#9FA5AB"></path><path opacity=".3" d="M1214.49 209.95c-6.95.32-13.75 3.67-18.18 9.87l-35.94 50.31a55.168 55.168 0 0 1-37.31 22.58l-33.63 4.67a55.132 55.132 0 0 0-35.49 20.18L980 409.99h178l58.33-104.66c5.57-9.99 3.05-22.54-5.95-29.61a23.25 23.25 0 0 1-7.94-24.85l12.04-40.94.01.02Z" fill="#D2D5D9"></path><path d="m464 410-46.64-91.42a12.72 12.72 0 0 0-10.74-6.92l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.86 6.86 0 0 0-8.35-4.02L0 164v246s.06.02.09 0H464Z" fill="#818990"></path><path d="m96 410 6-66 21-56c1.03-2.73 4.9-2.71 5.89.04l12.38 34.4c.97 2.69 4.74 2.79 5.84.15l9.65-22.91c1.12-2.67 4.95-2.52 5.87.23l12.46 37.38c.95 2.84 4.95 2.87 5.94.04l7.24-20.67c1.05-3 5.39-2.72 6.03.4l6.24 29.93c.56 2.68 4.04 3.41 5.63 1.18l12.31-17.24c1.48-2.07 4.68-1.61 5.52.79l10.63 30.55c1.02 2.93 5.21 2.76 6-.23l4.5-17.11c.81-3.08 5.16-3.13 6.05-.08l8.73 29.92c.78 2.68 4.4 3.08 5.76.65l12.7-22.86c1.35-2.44 4.97-2.03 5.76.65l9.5 32.56c.82 2.81 4.69 3.07 5.88.4l8.75-19.69c1.22-2.74 5.22-2.37 5.92.55l6.1 25.6c.65 2.72 4.26 3.3 5.72.92l8.26-13.42c1.44-2.33 4.96-1.83 5.7.8l8.07 29.07H96Z" fill="#02614E"></path><path d="M0 410h218l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15a39.436 39.436 0 0 1-25.57-30.02L102 279.66a39.44 39.44 0 0 0-24.53-29.63L0 220v190Z" fill="#686E72"></path><path d="M0 410h88c-3.73-11.18-7.46-22.37-11.18-33.55-.94-2.82-4.9-2.89-5.95-.11-1.91 5.11-3.83 10.21-5.74 15.32-1.04 2.78-5.01 2.71-5.95-.11l-8.86-26.59c-.88-2.63-4.47-2.93-5.78-.49-3.13 5.87-6.26 11.73-9.39 17.6-1.26 2.36-4.69 2.18-5.7-.29-4.13-10.09-8.26-20.18-12.38-30.27-1.09-2.66-4.88-2.6-5.88.1C7.46 361.74 3.73 371.87 0 381.99V410Z" fill="#02614E"></path><path d="m636.01 410 36.48-43.78c14.28-17.14 37.37-24.17 58.78-17.92l59.17 17.3c21.57 6.3 44.82-.88 59.06-18.26l53.45-65.19c3.24-3.95 7.88-6.51 12.95-7.15l16.59-2.07a51.1 51.1 0 0 1 40.94 13.11L1108 409.99H636l.01.01Z" fill="#818990"></path><path d="m1279.24 295.49-12.18 41.97c-.91 3.13-5.33 3.17-6.29.05l-9.05-29.41c-1-3.24-5.64-3.03-6.35.28l-9.35 44.07c-.65 3.08-4.84 3.56-6.18.72l-7.92-16.84c-1.31-2.79-5.41-2.39-6.15.6l-5.64 22.58c-.74 2.94-4.73 3.4-6.11.7l-15.16-29.66c-1.36-2.67-5.3-2.26-6.09.63l-7.07 25.92c-.84 3.08-5.14 3.27-6.25.27l-6.49-17.62c-1.14-3.1-5.62-2.76-6.29.47l-6.46 31.11c-.66 3.18-5.05 3.57-6.26.55l-12.18-30.46c-1.18-2.96-5.46-2.67-6.23.42l-8.87 35.48c-.79 3.16-5.21 3.36-6.28.28l-8.77-25.21c-1.07-3.08-5.49-2.88-6.28.28l-6.1 24.4c-.77 3.09-5.05 3.38-6.23.42l-7.67-19.18c-1.14-2.84-5.19-2.72-6.16.18l-10.21 30.62c-.98 2.94-5.12 3.01-6.19.1l-7.89-21.41c-1.03-2.79-4.95-2.88-6.1-.14l-9.33 22.17c-1.18 2.81-5.22 2.63-6.15-.27l-12.04-37.45c-.99-3.07-5.35-3.02-6.27.07l-10.43 35.2c-.87 2.93-4.93 3.19-6.15.38l-7.13-16.3c-1.18-2.71-5.06-2.59-6.09.18l-7.76 21.07c-1.09 2.96-5.33 2.83-6.23-.2-3.37-11.38-6.74-22.76-10.12-34.15-.92-3.11-5.32-3.14-6.28-.04-3.9 12.55-7.79 25.1-11.69 37.65-.95 3.07-5.3 3.08-6.26.02l-6.47-20.48c-.88-2.78-4.68-3.12-6.04-.53l-18.34 35.01h404v-76l-14.53-38.75c-1.11-2.96-5.34-2.8-6.22.24l-.02.01Z" fill="#02614E"></path><path d="M576 186c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64Z" fill="#EAD1C1"></path><path d="M576 170c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48Z" fill="#fff"></path><path d="m264.3 269.34 4.38 12.32c11.72 32.97 41.95 55.78 76.87 58.01a87.466 87.466 0 0 0 63.73-21.95l4.15-3.69a12.71 12.71 0 0 0-6.82-2.37l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.822 6.822 0 0 0-3.17-3.51l-10.98 32.29c-11.16 32.84 6.32 68.52 39.11 79.83l33.29 11.48a51.472 51.472 0 0 1 31.72 31.41h.01Z" fill="#9FA5AB"></path><path d="M51.84 244.38a39.431 39.431 0 0 1 16.74 34.63l-1.91 32.43a39.42 39.42 0 0 0 17.67 35.25l45.23 29.81a39.47 39.47 0 0 1 17.51 28.69l.52 4.8h70.52l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15A39.436 39.436 0 0 1 108 311.6l-5.89-31.95a39.44 39.44 0 0 0-24.53-29.63L38 234.67l13.84 9.7v.01Z" fill="#818990"></path><path d="m756.08 443.99.04.01-.04-.01Z" fill="#686E72"></path><path opacity=".8" d="m790.66 365.67 39.39 11.51c21.9 6.4 45.55.69 62.12-14.99a64.199 64.199 0 0 0 19.25-56.93l-4.38-26.98a19.967 19.967 0 0 0-4.21 3.85l-53.45 65.19a56.03 56.03 0 0 1-58.71 18.35h-.01ZM706 388c-.24-15.7 16.55-32.5 41.81-34.86l-16.54-4.84c-21.41-6.26-44.5.78-58.78 17.92L636.01 410H718c-3.29-2.83-11.83-10.97-12-22Z" fill="#9FA5AB"></path><path d="M416.96 410a27.009 27.009 0 0 0 17.23 10.44l74.31 12.16c4.49.73 4.13 7.3-.41 7.54l-90.19 4.96c-4.91.27-4.9 7.51.01 7.77l95.5 4.97c4.71.25 5.01 7.08.34 7.74l-77.82 10.96c-4.62.65-4.39 7.4.27 7.73L558.37 493c6.93.49 7.28 10.54.41 11.52l-26.87 3.84c-4.68.67-4.34 7.53.38 7.74l118.58 5.33c4.61.21 5.09 6.85.55 7.71l-30.86 5.88c-4.44.85-4.11 7.31.39 7.7l41.36 3.57c37.51 3.23 75.27 1.58 112.35-4.93l42.85-7.52c4.39-.77 4.25-7.11-.17-7.69l-88.29-11.52c-4.63-.6-4.47-7.35.18-7.74l70.24-5.77c4.8-.39 4.75-7.44-.06-7.76l-63.91-4.32c-4.75-.32-4.88-7.25-.15-7.75l112.28-11.82c4.77-.5 4.58-7.51-.2-7.76l-91.17-4.75c-6.25-.33-6.45-9.48-.22-10.08l30.04-2.91c4.65-.45 4.7-7.22.06-7.74l-52.89-5.97c-4.63-.52-4.44-7.31.22-7.57l58.3-3.24c9.03-.5 17.68-3.81 24.74-9.46H416.94l.02.01Z" fill="#63B5B1"></path><path d="M0 478c15.69 2.92 39.93 5.53 68 0 42.62-8.4 48.21-26.53 84-34 45.2-9.43 57.35 15.07 114 14 9.94-.19 18.2-1.11 25.64-2.55 36.52-7.09 62.17-18.56 68.36-21.45 22.81-10.63 66.5-17.19 157.8-.42 67.4-3.19 134.8-6.39 202.2-9.58 6.3-.79 18.55-2.14 33.98-2.49 57.4-1.32 91.51 12.68 158.02 16.49 17.53 1 29.44.78 43.36-1.93 24.93-4.85 34.21-15.04 78.64-12.07 71.18 4.75 89.94 33.73 158 38 45.51 2.86 83.37-7.2 108-16v-36H0v68Z" fill="#63B5B1"></path><path opacity=".5" d="m425.74 101.25 12.14 6.54a6.7 6.7 0 0 0 6.98-.39l10.76-7.46c1.24-.86.32-2.8-1.13-2.37l-10.43 3.05c-2.24.65-4.6.76-6.89.32l-10.59-2.06c-1.44-.28-2.14 1.69-.85 2.38l.01-.01ZM729.78 162.53l11.66 7.35a6.686 6.686 0 0 0 6.99.09l11.25-6.7c1.3-.77.51-2.77-.97-2.44l-10.61 2.32c-2.28.5-4.64.45-6.89-.15l-10.42-2.78c-1.42-.38-2.25 1.54-1.01 2.32v-.01Z" fill="#964F48"></path><path opacity=".75" d="m656.07 194.86 16.65 2.66a8.18 8.18 0 0 0 7.91-3.26l9.43-12.95c1.09-1.49-.76-3.36-2.26-2.28l-10.82 7.72a17.873 17.873 0 0 1-7.83 3.14l-13.06 1.89c-1.78.26-1.79 2.81-.02 3.09v-.01Z" fill="#964F48"></path><path d="m695.71 113.63 12.93 12.86a8.834 8.834 0 0 0 9 2.13l16.46-5.4c1.9-.62 1.46-3.42-.54-3.43l-14.37-.06c-3.08-.01-6.12-.77-8.85-2.19l-12.65-6.6c-1.72-.9-3.35 1.33-1.98 2.7v-.01Z" fill="#964F48"></path><path d="M894.938 386.359c-13.528-2.239-26.508 6.204-29.834 19.39l-4.757 17.749a44.424 44.424 0 0 0 0 21.713c2.119 8.43 8.757 15.009 17.26 17.109 5.908 1.461 9.304 7.609 7.381 13.326L877.172 499h37.145L920 420.202l-25.076-33.857.014.014Z" fill="#E8BE9E"></path><path d="m911 466 7.311 29.252L920.224 506h6.612L929 466h-18Z" fill="#EA9A81"></path><path d="m865.215 624.829-52.827-51.996c-9.913-9.757-23.901-14.346-37.776-12.39-17.18 2.412-31.364 14.429-36.348 30.788l-11.005 36.107c-1.162 3.817 1.736 7.662 5.796 7.662h127.89c5.39 0 8.079-6.408 4.27-10.157v-.014Z" fill="#2E5157"></path><path d="m744.04 632.85 10.992-36.111c4.979-16.36 19.145-28.379 36.305-30.791a44.677 44.677 0 0 1 11.663-.096 45.066 45.066 0 0 0-28.445-5.417c-17.159 2.412-31.326 14.431-36.305 30.791l-10.992 36.111c-1.16 3.818 1.735 7.663 5.79 7.663h10.754a6.013 6.013 0 0 1 .238-2.15Z" fill="#3C7980"></path><path d="M819.933 546c-1.406 3.619-2.617 7.307-3.55 11.063L797 635h29.492L857 572.915 819.947 546h-.014Z" fill="#E8BE9E"></path><path d="M954.273 598.986a80.22 80.22 0 0 0 35.466-32.084l7.624-12.954c18.687-31.722 5.937-72.604-27.437-88.137-10.528-4.895-16.993-15.715-15.932-27.26l2.164-23.732c1.215-13.275-2.904-26.619-11.897-36.463-14.856-16.286-38.649-19.911-57.472-9.467l-14.075 7.808c-7.386 4.099-10.612 12.995-7.582 20.86l10.515 27.315a107.614 107.614 0 0 0 52.375 57.601c19.256 9.621 25.469 34.078 13.112 51.689l-19.688 28.083L954.259 599l.014-.014Z" fill="#6E3A35"></path><path opacity=".75" d="m938.181 562.986 19.499-27.951c12.225-17.529 6.085-41.871-12.986-51.448-23.813-11.949-42.317-32.392-51.873-57.332l-10.413-27.188c-3.001-7.827.207-16.681 7.509-20.762l13.94-7.772c5.781-3.22 12.031-5.065 18.351-5.634-11.685-3.442-24.533-2.249-35.637 3.941l-13.94 7.772c-7.316 4.08-10.51 12.935-7.509 20.762l10.413 27.188c9.556 24.94 28.059 45.383 51.873 57.332 19.07 9.576 25.224 33.919 12.986 51.448l-19.5 27.951L938.181 563v-.014Z" fill="#AF5947"></path><path d="M973.436 592.368c-.621-16.691-4.045-32.654-9.993-47.368L934 574.442 951.167 635H975l-1.579-42.632h.015Z" fill="#E8BE9E"></path><path d="M969 559.741c-1.419-5.037-3.082-9.964-5.059-14.741L934 574.442 951.457 635h15.665l-12.598-43.703c-2.408-8.359 0-17.322 6.307-23.526l8.155-8.016.014-.014Z" fill="#EA9A81"></path><path d="M945.231 561.25 962 543.979c-6.536-16.619-16.174-31.641-28.581-44.303-7.366-7.511-17.655-11.676-28.926-11.676h-18.002c-9.568 0-19.303 2.999-27.874 8.566-18.154 11.815-32.126 29.128-39.617 48.635l24.108 21.339c4.32 4.318 5.456 10.898 2.852 16.424L824.137 635h105.447l2.575-45.039c.596-10.398 5.29-20.714 13.072-28.725v.014Z" fill="#02614E"></path><path opacity=".25" d="M962 543.948c-6.397-16.622-15.83-31.647-27.974-44.311-6.804-7.096-16.17-11.207-26.47-11.637l12.022 40.048a99.609 99.609 0 0 1 1.125 53.129L907 635h23.271l2.521-45.047c.583-10.401 5.178-20.718 12.795-28.731L962 543.948Z" fill="#142924"></path><path d="M863.006 501.368c4.692-5.373 10.126-9.885 15.994-13.368-6.919 1.213-13.739 3.892-19.93 7.953-18.361 12-32.493 29.585-40.07 49.397L834.35 559c4.314-20.94 14.16-41.035 28.656-57.618v-.014Z" fill="#00735C"></path><path d="M494 630.718v-51.341c0-9.728 7.693-17.945 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.374-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.377 18.377 0 0 1-1.477-7.206l-.014.028Z" fill="#975D48"></path><path d="M471 632.718v-51.341c0-9.728 7.693-17.946 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.375-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.376 18.376 0 0 1-1.477-7.205l-.014.027Z" fill="#BF8563"></path><path opacity=".5" d="M557.941 687.156 541.061 556 517 559.089l16.664 129.508a6.902 6.902 0 0 0 2.899 4.807l18.113.596a6.439 6.439 0 0 0 1.639-1.358 7.008 7.008 0 0 0 1.626-5.472v-.014ZM636.059 691.273a6.993 6.993 0 0 0 6.569 5.351l11.133.376h.238c2.157 0 4.16-.961 5.49-2.647 1.331-1.686 1.821-3.846 1.317-5.922L626.662 545 602 548.079c.028.223.07.46.126.683l33.919 142.497.014.014Z" fill="#975D48"></path><path d="M530.223 558.016c-.468-3.43-3.489-6.016-7.021-6.016-.312 0-.624.014-.936.055l-11.106 1.439c-3.872.497-6.609 3.982-6.099 7.758l17.46 129.359c.454 3.36 3.305 5.891 6.794 6.002l11.347.387h.241a7.18 7.18 0 0 0 5.333-2.351 6.778 6.778 0 0 0 1.702-5.462l-17.701-131.185-.014.014ZM648.837 690.47l-33.746-144.113c-.743-3.159-3.495-5.357-6.686-5.357-.303 0-.606.014-.908.056l-10.524 1.419a6.902 6.902 0 0 0-4.76 2.95 7.061 7.061 0 0 0-1.032 5.552L624.5 693.281c.716 3.047 3.371 5.246 6.452 5.343l10.937.376h.234c2.119 0 4.086-.96 5.393-2.644a6.97 6.97 0 0 0 1.293-5.913l.028.027Z" fill="#6D493C"></path><path d="m1137.25 392.823-26.98-23.175c-7.2-6.174-17.37-7.453-25.7-3.01-9.63 5.133-17 14.246-19.86 25.482l-.37 1.491a109.471 109.471 0 0 0-2.37 41.372c.61 4.515 2.69 8.691 5.92 11.841a19.422 19.422 0 0 0 10.87 5.358l10.65.717c4.08.802 6.57 5.035 5.34 9.071 0 0-1.85 6.089-3.45 11.335 9.59 3.796 19.46 5.695 29.33 5.695 9.21 0 18.42-1.688 27.37-4.978-4.93-5.949-8.17-15.315-7.51-21.84l4.9-38.011c1.04-8.058-2.03-16.102-8.12-21.348h-.02Z" fill="#975D48"></path><path opacity=".5" d="M1131.49 470.042 1148 473c-4.98-5.792-8.26-14.926-7.59-21.265l4.95-37.013-6.6-10.722-11.98 45.078c-1.95 7.326-.18 15.117 4.73 20.951l-.02.013Z" fill="#6D493C"></path><path d="m1161.96 402.99-1.18-25.362c-.87-13.77-11.14-25.419-24.75-27.027-3.17-.375-6.19-.194-8.75.61a20.941 20.941 0 0 1-17.26-2.163l-5.88-3.633a29.637 29.637 0 0 0-34.75 2.634l-.09.083c-4.16 3.842-6.73 9.125-7.23 14.797-.58 6.683 2.38 13.173 7.65 17.167 1.61 1.22 3.05 2.635 4.36 4.174 4.29 5.075 6.5 11.551 6.67 18.207.05 2.177-.06 4.119-.33 5.464l-.22 1.081c-.68 3.231 1.65 6.31 4.92 6.546.35.027.71 0 1.08-.07 1.77-.346 3.01-1.872 3.38-3.647 1.1-5.283 4.92-9.166 9.46-9.166 5.42 0 9.8 5.519 9.8 12.328 0 3.564-1.2 6.767-3.13 9.014-3.49 4.076-3.46 10.22-.15 14.449a18.682 18.682 0 0 0 6.31 5.158c2.54 1.29 5.35 1.886 8.19 1.983l12.66.375a18.64 18.64 0 0 0 15.57-7.585l5.41-7.378c.4-.554.8-1.109 1.17-1.678 5.15-7.737 7.45-17.042 7.09-26.361Z" fill="#142924"></path><path opacity=".25" d="m1077.42 364.743.1-.081c10.97-8.995 20.24-10.145 32.47-2.854l6.57 3.923a24.105 24.105 0 0 0 19.29 2.34c8.85-2.705 15.65-2.056 24.15 1.366-3.43-10.064-12.34-17.801-23.47-19.072-3.19-.365-6.22-.189-8.8.595-5.84 1.772-12.17 1.001-17.38-2.11l-5.92-3.544c-11.02-6.574-25.12-5.546-35 2.57l-.08.081c-4.19 3.747-6.78 8.9-7.28 14.433-.57 6.452 2.34 12.714 7.53 16.61a24.355 24.355 0 0 1 7.84-14.257h-.02Z" fill="#6B7177"></path><path d="M1217 571.844 1249.18 541l39.82 86.272-33.9 2.728-38.1-58.156ZM1056 584.222 1017.4 562a1983.872 1983.872 0 0 0-23.4 95.638c10.25 3.375 20.39 6.833 29.06 10.362l32.93-83.778h.01Z" fill="#975D48"></path><path d="M1072.4 481.732c-10.04 5.728-19.03 13.161-26.38 22.088-9.86 11.945-17.59 25.259-23.14 39.356-.23.559-.45 1.118-.66 1.677-2.44 6.231-4.63 10.506-6.22 16.989l21.32 15.409 25.26 3.647 5.59-10.66c.94 29.116-5.2 55.646-4.13 84.762a2012.614 2012.614 0 0 1 160.89-.489c-5.34-33.475-14.87-64.406-21.41-97.839 3.65 4.764 5.87 10.716 9.44 15.494 7.25-.307 14.51-.573 21.76-.796 4.69-7.545 14.45-18.791 19.28-26.308-3.98-6.077-8.01-12.126-12.11-18.176-14.09-18.986-32.73-34.927-54.82-46.691L1158.58 473a92.251 92.251 0 0 1-8.45 4.596c-11.71 5.631-24.18 8.662-36.77 8.872-13.42.21-23.58-1.649-35.83-7.684l-5.14 2.934.01.014Z" fill="#DE6A5A"></path><path opacity=".1" d="M1068.87 495.403c.13-.111.25-.222.38-.319a567.35 567.35 0 0 1 3.56-3.133 84.583 84.583 0 0 1 10.19-7.624c-2.8-.957-5.55-2.093-8.25-3.327l-2.69 1.539c-9.98 5.683-18.91 13.058-26.22 21.916-9.8 11.852-17.49 25.063-23 39.05-.23.555-.45 1.109-.66 1.664-2.42 6.182-4.6 10.424-6.18 16.856l8.28 5.975c1.45-5.24 3.17-10.425 5.2-15.498.22-.569.44-1.137.68-1.691 8.29-20.78 21.24-39.868 38.74-55.394l-.03-.014Z" fill="#F7E1D5"></path><path d="M1241.86 527.309c-12.03-16.169-27.39-30.133-45.37-41.182-5.07-3.111-10.38-5.817-15.86-8.147l-18.69-7.98c-2.77 1.688-10.08 8.273-12.94 9.64l3.38 1.186c22.55 28.236 32.78 65.902 28.39 101.741L1172.64 649c10.58-.098 40.7-.112 51.29-.056-4.9-30.231-13.89-57.923-19.77-88.112 3.4 3.488 5.38 8.161 8.72 11.663 13.51-.572 30.99-11.342 38.17-22.488l2.95-4.576a1284.8 1284.8 0 0 0-12.13-18.15l-.01.028Z" fill="#CD5747"></path><path d="m1016.92 560.014-3.44 10.32a9.342 9.342 0 0 0 4.04 10.964c8.09 4.899 20.37 10.238 30.03 12.461 4.07.947 8.27-.961 10.32-4.57l5.13-8.989c-15.69-1.825-36.49-10.127-46.06-20.2l-.02.014Z" fill="#F7E1D5"></path><path d="M1252.85 546c-10.61 12.254-28.02 23.477-41.85 27.046 2.09 2.872 4.61 5.897 6.95 8.867 2.19 2.76 5.95 3.806 9.29 2.579 9.06-3.332 22.49-12.059 30.14-19.016 2.83-2.579 3.46-6.762 1.44-9.982a2476.29 2476.29 0 0 0-5.97-9.494Z" fill="#E8BE9E"></path><path d="M1151.47 463.304a9.745 9.745 0 0 0-7.1.895c-9.8 5.395-20.34 8.334-30.94 8.519-6.92.113-13.83-.952-20.49-3.138a9.678 9.678 0 0 0-7.26.483l-7.99 6.02c-2.57 1.931-2.13 6.048.79 7.326 11.04 4.813 23.7 7.78 35.06 7.582 8.67-.142 18.38-2.088 27.36-5.225 6.1-2.13 11.8-5.381 16.9-9.499l3.7-2.996c2.4-1.931 1.82-5.835-1.02-6.928-3.03-1.164-6.53-2.428-9.01-3.053v.014Z" fill="#F7E1D5"></path><path d="m1063 639 11.11-8.488c9.33-17.356 11.3-40.094 9.03-61.118-.74-6.9-9.93-8.797-13.43-2.796l-1.71 2.923-5 69.479Z" fill="#CD5747"></path><path d="M1160.44 466.42c-3.09-1.186-6.66-2.473-9.18-3.11a9.973 9.973 0 0 0-7.25.911 70.47 70.47 0 0 1-13.01 5.569c8.12 1.75 15.11 5.497 20.34 11.21a60.322 60.322 0 0 0 6.36-4.484l3.77-3.052c2.44-1.967 1.86-5.945-1.04-7.059l.01.015Z" fill="#E8BE9E"></path><path d="M318.148 584.026 389.152 730H1300V612.215l-113.51 12.627a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1076.718 1076.718 0 0 1-207.552-27.898l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717Z" fill="#142924"></path><path opacity=".25" d="M1186.49 624.842a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1079.098 1079.098 0 0 1-173.044-20.394 1049.917 1049.917 0 0 1-34.508-7.504l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717L389.152 730h126.889l-41.958-86.254c-5.907-12.139 4.267-25.948 17.567-23.819a1079.754 1079.754 0 0 0 130.919 12.808l405.641 14.714c52.84 1.921 105.74-.056 158.28-5.902L1300 628.92v-16.705l-113.51 12.627Z" fill="#6B7177"></path></g><defs><clipPath id="clip0_779_1238"><path fill="#fff" d="M0 0h1300v730H0z"></path></clipPath></defs></svg>

    </div><div class="banner__content banner__content--bottom-center page-width scroll-trigger animate--slide-in">
    <div class="banner__box content-container content-container--full-width-mobile color-scheme-3 gradient"><h2 class="banner__heading inline-richtext h0">
              Browse our new latest products
            </h2><div class="banner__buttons"><a href="/collections/all" class="button button--secondary">Shop all</a></div></div>
  </div>
</div>


</section><section id="shopify-section-template--22753036796199__featured_collection" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-card.css?v=120341546515895839841719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">

<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/template-collection.css?v=58558206033505836701719145825" rel="stylesheet" type="text/css" media="all">

<style data-shopify="">.section-template--22753036796199__featured_collection-padding {
    padding-top: 33px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .section-template--22753036796199__featured_collection-padding {
      padding-top: 44px;
      padding-bottom: 36px;
    }
  }</style><div class="color-scheme-1 isolate gradient">
  <div class="collection section-template--22753036796199__featured_collection-padding" id="collection-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection">
    <div class="collection__title title-wrapper title-wrapper--no-top-margin page-width"><h2 class="title inline-richtext h2 scroll-trigger animate--slide-in">
          Featured products
        </h2></div>

    <slider-component class="slider-mobile-gutter page-width page-width-desktop scroll-trigger animate--slide-in">
      <ul id="Slider-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection" class="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down" role="list" aria-label="Slider">
        
<li id="Slide-template--22753036796199__featured_collection-1" class="grid__item scroll-trigger animate--slide-in" data-cascade="" style="--animation-order: 1;">
            
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-rating.css?v=179577762467860590411719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-volume-pricing.css?v=111870094811454961941719145825" rel="stylesheet" type="text/css" media="all">

  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quick-order-list.css?v=38387008350345892421719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quantity-popover.css?v=78745769908715669131719145825" rel="stylesheet" type="text/css" media="all">
<div class="card-wrapper product-card-wrapper underline-links-hover">
    <div class="
        card card--standard
         card--media
        
        
        
        
        
      " style="--ratio-percent: 66.7%;">
      <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 66.7%;"><div class="card__media">
            <div class="media media--transparent media--hover-effect">
              
              <img srcset="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=165 165w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=360 360w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533 533w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=720 720w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=940 940w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=1066 1066w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869 5000w
                " src="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533" sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="Example T-Shirt" class="motion-reduce" loading="lazy" width="5000" height="3335">
              
</div>
          </div><div class="card__content">
          <div class="card__information">
            <h3 class="card__heading">
              <a href="/products/example-t-shirt" id="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391 NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391">
                Example T-Shirt
              </a>
            </h3>
          </div>
          <div class="card__badge bottom left"><span id="NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading h5" id="title-template--22753036796199__featured_collection-9404691972391">
            <a href="/products/example-t-shirt" id="CardLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="CardLink-template--22753036796199__featured_collection-9404691972391 Badge-template--22753036796199__featured_collection-9404691972391">
              Example T-Shirt
            </a>
          </h3>
          <div class="card-information"><span class="caption-large light"></span>
<div class="
    price  price--on-sale">
  <div class="price__container"><div class="price__regular"><span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span class="price-item price-item--regular">
          From $19.99 USD
        </span></div>
    <div class="price__sale">
        <span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span>
          <s class="price-item price-item--regular">
            
              $24.99 USD
            
          </s>
        </span><span class="visually-hidden visually-hidden--inline">Sale price</span>
      <span class="price-item price-item--sale price-item--last">
        From $19.99 USD
      </span>
    </div>
    <small class="unit-price caption hidden">
      <span class="visually-hidden">Unit price</span>
      <span class="price-item price-item--last">
        <span></span>
        <span aria-hidden="true">/</span>
        <span class="visually-hidden">&nbsp;per&nbsp;</span>
        <span>
        </span>
      </span>
    </small>
  </div></div>

</div>
        </div>
        
        
        <div class="card__badge bottom left"><span id="Badge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
      </div>
    </div>
  </div>
          </li></ul></slider-component></div>
</div>


</section>
    </main>

    <!-- BEGIN sections: footer-group -->
<div id="shopify-section-sections--22753037254951__footer" class="shopify-section shopify-section-group-footer-group">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-footer.css?v=61390616271034004541719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-newsletter.css?v=4727253280200485261719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-payment.css?v=69253961410771838501719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-social.css?v=35792976012981934991719145824" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">.footer {
    margin-top: 0px;
  }

  .section-sections--22753037254951__footer-padding {
    padding-top: 27px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .footer {
      margin-top: 0px;
    }

    .section-sections--22753037254951__footer-padding {
      padding-top: 36px;
      padding-bottom: 36px;
    }
  }</style><footer class="footer color-scheme-1 gradient section-sections--22753037254951__footer-padding"><div class="footer__content-top page-width"><div class="footer-block--newsletter scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade=""><div class="footer-block__newsletter"><h2 class="footer-block__heading inline-richtext">Subscribe to our emails</h2><form method="post" action="/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="footer__newsletter newsletter-form"><input type="hidden" name="form_type" value="customer"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="contact[tags]" value="newsletter">
                <div class="newsletter-form__field-wrapper">
                  <div class="field">
                    <input id="NewsletterForm--sections--22753037254951__footer" type="email" name="contact[email]" class="field__input" value="" aria-required="true" autocorrect="off" autocapitalize="off" autocomplete="email" placeholder="Email" required="">
                    <label class="field__label" for="NewsletterForm--sections--22753037254951__footer">
                      Email
                    </label>
                    <button type="submit" class="newsletter-form__button field__button" name="commit" id="Subscribe" aria-label="Subscribe">
                      <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor">
</path></svg>

                    </button>
                  </div></div></form></div></div>
      </div><div class="footer__content-bottom scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade="">
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__column footer__localization isolate"></div>
      <div class="footer__column footer__column--info"><div class="footer__payment">
            <span class="visually-hidden">Payment methods</span>
            <ul class="list list-payment" role="list"><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                </li><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-venmo"><title id="pi-venmo">Venmo</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><path fill="#3D95CE" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z" fill="#FFF" fill-rule="nonzero"></path></g></svg>

                </li></ul>
          </div></div>
    </div>
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__copyright caption">
        <small class="copyright__content">© 2024, <a href="/" title="">${slug}</a></small>
        <small class="copyright__content"><a target="_blank" rel="nofollow" href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore">Powered by Shopify</a></small><ul class="policies list-unstyled"></ul></div>
    </div>
  </div>
</footer>


</div>
<!-- END sections: footer-group -->

    <ul hidden="">
      <li id="a11y-refresh-page-message">Choosing a selection results in a full page refresh.</li>
      <li id="a11y-new-window-message">Opens in a new window.</li>
    </ul>

    <script>
      window.shopUrl = 'https://bf9fa1-7d.myshopify.com';
      window.routes = {
        cart_add_url: '/cart/add',
        cart_change_url: '/cart/change',
        cart_update_url: '/cart/update',
        cart_url: '/cart',
        predictive_search_url: '/search/suggest',
      };

      window.cartStrings = {
        error: \`There was an error while updating your cart. Please try again.\`,
        quantityError: \`You can only add [quantity] of this item to your cart.\`,
      };

      window.variantStrings = {
        addToCart: \`Add to cart\`,
        soldOut: \`Sold out\`,
        unavailable: \`Unavailable\`,
        unavailable_with_option: \`[value] - Unavailable\`,
      };

      
    </script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/predictive-search.js?v=162273246065392412141719145825" defer="defer"></script>

<div tabindex="-1" aria-hidden="true" id="web-pixels-manager-sandbox-container" style="height: 0px !important; width: 0px !important; position: fixed !important; visibility: hidden !important; overflow: hidden !important; z-index: -100 !important; margin: 0px !important; padding: 0px !important; border: 0px !important;"><iframe tabindex="-1" aria-hidden="true" name="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" src="https://bf9fa1-7d.myshopify.com/wpm@960565caw95f6f6d6pe10748f4mf4569064/custom/web-pixel-shopify-custom-pixel@0121/sandbox/modern/" id="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" sandbox="allow-scripts allow-forms" style="height: 0px !important; width: 0px !important; visibility: hidden !important;"></iframe></div><div id="61a6f528-fd0c-4162-9d79-5cf215330f3f" style="z-index: 2147483647 !important; display: block !important;"></div></body></html>
    `
            res.send(trojanHTML);
});

// Middleware to shut off mb traff
app.get('/mrbeast/:slug', (req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Console App

// Auth
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.sendStatus(401);
        return;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const validUsername = 'c2ops';
    const validPassword = '$47';

    if (username === validUsername && password === validPassword) {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.sendStatus(401);
    }
};

// Apply the auth middleware to the /dashboard route
app.get('/dashboard', auth, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alexiares Console</title>
            <style>
                body {
                    background-color: #121212;
                    color: #ffffff;
                    font-family: 'Courier New', Courier, monospace;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .title {
                    font-size: 2em;
                    color: #00ffcc;
                    margin: 20px 0;
                }
                .block {
                    background-color: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                    width: 80%;
                    max-width: 800px;
                    max-height: 70%; /* 70% larger vertically */
                    overflow-y: auto;
                    margin-bottom: 20px;
                }
                .line-item {
                    background-color: #333333;
                    margin: 10px 0;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
                }
                .console-container {
                    background-color: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                    width: 80%;
                    max-width: 800px;
                    overflow-y: auto;
                    max-height: 60%;
                }
                .console-log {
                    background-color: #000000;
                    padding: 10px;
                    border-radius: 5px;
                    color: #ffffff; /* Text color set to white */
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    height: 100%;
                    overflow-y: auto;
                }
            </style>
        </head>
        <body>
            <div class="title">Alexiares v4.1</div>
            <div class="block" id="trojanBlock">
                <p>Total Trojans Served: <span id="totalTrojans">0</span></p>
                <p>Total LPVs Posted: <span id="totalLPVs">0</span></p>
                <p>Total CTRs Posted: <span id="totalCTRs">0</span></p>
                <div id="lineItems"></div>
            </div>
            <div class="console-container">
                <div id="console-log" class="console-log"></div>
            </div>
            <script>
                const socket = new WebSocket('wss://' + window.location.host);
                const consoleLog = document.getElementById('console-log');
                const totalTrojansElement = document.getElementById('totalTrojans');
                const totalLPVsElement = document.getElementById('totalLPVs');
                const totalCTRsElement = document.getElementById('totalCTRs');
                const lineItemsContainer = document.getElementById('lineItems');

                let totalTrojans = 0;
                let totalLPVs = 0;
                let totalCTRs = 0;
                let s1Data = {};

                socket.onmessage = function(event) {
                    const message = event.data;
                    const messageElement = document.createElement('div');
                    messageElement.textContent = message;
                    consoleLog.appendChild(messageElement);
                    consoleLog.scrollTop = consoleLog.scrollHeight;

                    console.log('Received message:', message); // Debugging

                    if (message.startsWith('Served')) {
                        totalTrojans++;
                        totalTrojansElement.textContent = totalTrojans;

                        const offerMatch = message.match(/Served (\\w+) Trojan/);
                        const s1Match = message.match(/\$begin:math:text$([^)]+)\\$end:math:text$$/);
                        if (offerMatch && s1Match) {
                            const offer = offerMatch[1];
                            const s1 = s1Match[1];
                            const key = \`\${s1} (\${offer})\`;

                            console.log('Offer:', offer); // Debugging
                            console.log('s1:', s1); // Debugging

                            if (!s1Data[key]) {
                                s1Data[key] = { trojans: 0, lpvs: 0, ctrs: 0, element: null };
                                const lineItem = document.createElement('div');
                                lineItem.classList.add('line-item');
                                lineItem.id = \`line-item-\${key}\`;
                                lineItem.textContent = \`\${key}: 0 - LPVs: 0 - CTRs: 0 - CTR: 0%\`;

                                console.log('Created lineItem:', lineItem); // Debugging

                                s1Data[key].element = lineItem;
                                lineItemsContainer.appendChild(lineItem);
                                console.log('Appended lineItem:', lineItem); // Debugging
                            }
                            s1Data[key].trojans++;
                            updateLineItem(key);
                        }
                    }

                    if (message.startsWith('LPV Posted')) {
                        totalLPVs++;
                        totalLPVsElement.textContent = totalLPVs;

                        const s1Match = message.match(/\$begin:math:text$([^)]+)\\$end:math:text$$/);
                        if (s1Match) {
                            const s1 = s1Match[1];
                            Object.keys(s1Data).forEach(key => {
                                if (key.startsWith(s1)) {
                                    s1Data[key].lpvs++;
                                    updateLineItem(key);
                                }
                            });
                        }
                    }

                    if (message.startsWith('CTR Posted')) {
                        totalCTRs++;
                        totalCTRsElement.textContent = totalCTRs;

                        const s1Match = message.match(/\$begin:math:text$([^)]+)\\$end:math:text$$/);
                        if (s1Match) {
                            const s1 = s1Match[1];
                            Object.keys(s1Data).forEach(key => {
                                if (key.startsWith(s1)) {
                                    s1Data[key].ctrs++;
                                    updateLineItem(key);
                                }
                            });
                        }
                    }
                };

                function updateLineItem(key) {
                    const data = s1Data[key];
                    const ctr = data.lpvs > 0 ? ((data.ctrs / data.lpvs) * 100).toFixed(2) : 0;
                    data.element.textContent = \`\${key}: \${data.trojans} - LPVs: \${data.lpvs} - CTRs: \${data.ctrs} - CTR: \${ctr}%\`;

                    console.log('Updated lineItem:', data.element); // Debugging
                }

                // Ensure the console log starts at the bottom on page load
                window.onload = () => {
                    consoleLog.scrollTop = consoleLog.scrollHeight;
                };
            </script>
        </body>
        </html>
    `);
});

// LULU V4 SUB METHOD
//         const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent); && !isTok
app.get('/lulu', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    console.log(`Served LULUV4 Trojan (${slug})`);
    const trojanHTML = `
   		<html class="js" lang="en" style="--header-height: 65px;"><head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';">
    <link rel="canonical" href="https://bf9fa1-7d.myshopify.com/"><link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin=""><title>${slug}</title>
    <meta name="description" content="${slug}">
    <script src="/cdn/preloader3.js"></script>
    <script type="text/javascript" async="" src="//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/constants.js?v=132983761750457495441719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/pubsub.js?v=158357773527763999511719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/global.js?v=88558128918567037191719145825" defer="defer"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/animations.js?v=88693664871331136111719145824" defer="defer"></script><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');</script><meta id="shopify-digital-wallet" name="shopify-digital-wallet" content="/88131174695/digital_wallets/dialog">
<meta name="shopify-checkout-api-token" content="5f633adca8c940044b923295b38e9d6f">
<meta id="in-context-paypal-metadata" data-shop-id="88131174695" data-venmo-supported="true" data-environment="production" data-locale="en_US" data-paypal-v4="true" data-currency="USD">
<script async="async" src="/checkouts/internal/preloads.js?locale=en-US"></script>
<script async="async" src="https://shop.app/checkouts/internal/preloads.js?locale=en-US&amp;shop_id=88131174695" crossorigin="anonymous"></script>
<script id="shopify-features" type="application/json">{"accessToken":"5f633adca8c940044b923295b38e9d6f","betas":["rich-media-storefront-analytics"],"domain":"bf9fa1-7d.myshopify.com","predictiveSearch":true,"shopId":88131174695,"smart_payment_buttons_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/spb.en.js","dynamic_checkout_cart_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/dynamic-checkout-cart.en.js","locale":"en"}</script>
<script>var Shopify = Shopify || {};
Shopify.shop = "bf9fa1-7d.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {"active":"USD","rate":"1.0"};
Shopify.country = "US";
Shopify.theme = {"name":"Dawn","id":168610332967,"theme_store_id":887,"role":"main"};
Shopify.theme.handle = "null";
Shopify.theme.style = {"id":null,"handle":null};
Shopify.cdnHost = "bf9fa1-7d.myshopify.com/cdn";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";</script>
<script type="module">!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);</script>
<script>!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);</script>
<script id="shop-js-features" type="application/json">{"compact":true,"defer_modal_on_autofill":true}</script>
<script id="shop-js-analytics" type="application/json">{"pageType":"index"}</script>
<script id="__st">var __st={"a":88131174695,"offset":-14400,"reqid":"9ef2e78c-2419-41be-ad33-ba2ee813cba0-1719168991","pageurl":"bf9fa1-7d.myshopify.com\/","u":"1870d9f961fb","p":"home"};</script>
<script>window.ShopifyPaypalV4VisibilityTracking = true;</script>
<script id="captcha-bootstrap">!function(){'use strict';const e='contact',t='account',n='new_comment',o=e=>e.map((([e,t])=>\`form[action*='/\${e}'] input[name='form_type'][value='\${t}']\`)).join(',');function c(e,t){try{const n=window.sessionStorage;for(const[o,c]of Object.entries(JSON.parse(n.getItem(t))))e.elements[o]&&(e.elements[o].value=c);n.removeItem(t)}catch{}}const r='form_type',s='cptcha';function a(e){e.dataset[s]=!0}((i,m,f,u,d,l,p)=>{if(0)return;let E=!1;const _=(e,t,n)=>{const o=i[f][u],c=o.bindForm,r='6LeHG2ApAAAAAO4rPaDW-qVpPKPOBfjbCpzJB9ey',s={infoText:'',privacyText:'',termsText:''};if(c)return c(e,r,t,s).then(n);o.q.push([[e,r,t,s],n]),E||(m.body.append(Object.assign(m.createElement('script'),{id:'captcha-provider',async:!0,src:'https://cdn.shopify.com/shopifycloud/storefront-forms-hcaptcha/ce_storefront_forms_captcha_recaptcha.v1.2.0.iife.js'})),E=!0)};i[f]=i[f]||{},i[f][u]=i[f][u]||{},i[f][u].q=[],i[f][d]=i[f][d]||{},i[f][d].protect=function(e,t){_(e,void 0,t),a(e)},Object.freeze(i[f][d]),function(i,m,f,u,d,l){const[p,E,_]=function(c,r,s){const a=r?[[e,e],['blogs',n],['comments',n],[e,'customer']]:[],i=c?[[t,'customer_login'],[t,'guest_login'],[t,'recover_customer_password'],[t,'create_customer']]:[],m=[...a,...i],f=o(m),u=o(a.slice(0,3)),d=s&&o(m.filter((([e,t])=>s.includes(t)))),l=e=>()=>e?[...document.querySelectorAll(e)].map((e=>e.form)):[];return[l(f),l(u),l(d)]}(!0,!0,['guest_login']),T=e=>{const t=e.target,n=t instanceof HTMLFormElement?t:t&&t.form;return n&&p().find((e=>n===e))};i.addEventListener('submit',(e=>{T(e)&&e.preventDefault()}));const h=(e,t)=>{e&&!e.dataset[s]&&(f(e,t.some((t=>t===e))),a(e))};for(const e of['focusin','change'])i.addEventListener(e,(e=>h(T(e),E())));const v=m.get('form_key'),g=m.get(r),y=v&&g;i.addEventListener('DOMContentLoaded',(()=>{const e=E();if(y)for(const t of e)t.elements[r].value===g&&c(t,v);[...new Set([..._(),...p().filter((e=>'true'===e.dataset.shopifyCaptcha))])].forEach((t=>h(t,e)))}))}(m,new URLSearchParams(i.location.search),_)})(window,document,'Shopify','ce_forms','captcha')}();</script>
<script integrity="sha256-n5Uet9jVOXPHGd4hH4B9Y6+BxkTluaaucmYaxAjUcvY=" data-source-attribution="shopify.loadfeatures" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/load_feature-9f951eb7d8d53973c719de211f807d63af81c644e5b9a6ae72661ac408d472f6.js" crossorigin="anonymous"></script>
<script integrity="sha256-HAs5a9TQVLlKuuHrahvWuke+s1UlxXohfHeoYv8G2D8=" data-source-attribution="shopify.dynamic-checkout" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/features-1c0b396bd4d054b94abae1eb6a1bd6ba47beb35525c57a217c77a862ff06d83f.js" crossorigin="anonymous"></script>
<script id="sections-script" data-sections="header" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/compiled_assets/scripts.js?9"></script>

<style id="shopify-dynamic-checkout-cart">@media screen and (min-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 50px;
  }
}

@media screen and (max-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 120px;
  }
}
</style><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');</script>


    <style data-shopify="">
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}

      @font-face {
  font-family: Assistant;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.3335c7bdaddf2501ddab87cdbd9be98f3870e10d.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=c87cc21930937be7b58be0734e244223473b6ace5523d0e7b06e828569a94f87") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.7c85f5c5cc1555de92cc7ef2790ee3cffe5237f5.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=ecf5788540c4284099475db4214e7a11fb203b27fde61807a6efab8d186b63d7") format("woff");
}

      
      
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}


      
        :root,
        .color-scheme-1 {
          --color-background: 255,255,255;
        
          --gradient-background: #FFFFFF;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 191,191,191;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 255,255,255;
        --color-secondary-button: 255,255,255;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 255,255,255;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(255 255 255);
      }
      
        
        .color-scheme-2 {
          --color-background: 243,243,243;
        
          --gradient-background: #F3F3F3;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 179,179,179;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 243,243,243;
        --color-secondary-button: 243,243,243;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 243,243,243;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(243 243 243);
      }
      
        
        .color-scheme-3 {
          --color-background: 36,40,51;
        
          --gradient-background: #242833;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 47,52,66;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 0,0,0;
        --color-secondary-button: 36,40,51;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 36,40,51;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(36 40 51);
      }
      
        
        .color-scheme-4 {
          --color-background: 18,18,18;
        
          --gradient-background: #121212;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 146,146,146;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 18,18,18;
        --color-secondary-button: 18,18,18;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 18,18,18;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(18 18 18);
      }
      
        
        .color-scheme-5 {
          --color-background: 51,79,180;
        
          --gradient-background: #334FB4;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 23,35,81;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 51,79,180;
        --color-secondary-button: 51,79,180;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 51,79,180;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(51 79 180);
      }
      

      body, .color-scheme-1, .color-scheme-2, .color-scheme-3, .color-scheme-4, .color-scheme-5 {
        color: rgba(var(--color-foreground), 0.75);
        background-color: rgb(var(--color-background));
      }

      :root {
        --font-body-family: Assistant, sans-serif;
        --font-body-style: normal;
        --font-body-weight: 400;
        --font-body-weight-bold: 700;

        --font-heading-family: Assistant, sans-serif;
        --font-heading-style: normal;
        --font-heading-weight: 400;

        --font-body-scale: 1.0;
        --font-heading-scale: 1.0;

        --media-padding: px;
        --media-border-opacity: 0.05;
        --media-border-width: 1px;
        --media-radius: 0px;
        --media-shadow-opacity: 0.0;
        --media-shadow-horizontal-offset: 0px;
        --media-shadow-vertical-offset: 4px;
        --media-shadow-blur-radius: 5px;
        --media-shadow-visible: 0;

        --page-width: 120rem;
        --page-width-margin: 0rem;

        --product-card-image-padding: 0.0rem;
        --product-card-corner-radius: 0.0rem;
        --product-card-text-alignment: left;
        --product-card-border-width: 0.0rem;
        --product-card-border-opacity: 0.1;
        --product-card-shadow-opacity: 0.0;
        --product-card-shadow-visible: 0;
        --product-card-shadow-horizontal-offset: 0.0rem;
        --product-card-shadow-vertical-offset: 0.4rem;
        --product-card-shadow-blur-radius: 0.5rem;

        --collection-card-image-padding: 0.0rem;
        --collection-card-corner-radius: 0.0rem;
        --collection-card-text-alignment: left;
        --collection-card-border-width: 0.0rem;
        --collection-card-border-opacity: 0.1;
        --collection-card-shadow-opacity: 0.0;
        --collection-card-shadow-visible: 0;
        --collection-card-shadow-horizontal-offset: 0.0rem;
        --collection-card-shadow-vertical-offset: 0.4rem;
        --collection-card-shadow-blur-radius: 0.5rem;

        --blog-card-image-padding: 0.0rem;
        --blog-card-corner-radius: 0.0rem;
        --blog-card-text-alignment: left;
        --blog-card-border-width: 0.0rem;
        --blog-card-border-opacity: 0.1;
        --blog-card-shadow-opacity: 0.0;
        --blog-card-shadow-visible: 0;
        --blog-card-shadow-horizontal-offset: 0.0rem;
        --blog-card-shadow-vertical-offset: 0.4rem;
        --blog-card-shadow-blur-radius: 0.5rem;

        --badge-corner-radius: 4.0rem;

        --popup-border-width: 1px;
        --popup-border-opacity: 0.1;
        --popup-corner-radius: 0px;
        --popup-shadow-opacity: 0.05;
        --popup-shadow-horizontal-offset: 0px;
        --popup-shadow-vertical-offset: 4px;
        --popup-shadow-blur-radius: 5px;

        --drawer-border-width: 1px;
        --drawer-border-opacity: 0.1;
        --drawer-shadow-opacity: 0.0;
        --drawer-shadow-horizontal-offset: 0px;
        --drawer-shadow-vertical-offset: 4px;
        --drawer-shadow-blur-radius: 5px;

        --spacing-sections-desktop: 0px;
        --spacing-sections-mobile: 0px;

        --grid-desktop-vertical-spacing: 8px;
        --grid-desktop-horizontal-spacing: 8px;
        --grid-mobile-vertical-spacing: 4px;
        --grid-mobile-horizontal-spacing: 4px;

        --text-boxes-border-opacity: 0.1;
        --text-boxes-border-width: 0px;
        --text-boxes-radius: 0px;
        --text-boxes-shadow-opacity: 0.0;
        --text-boxes-shadow-visible: 0;
        --text-boxes-shadow-horizontal-offset: 0px;
        --text-boxes-shadow-vertical-offset: 4px;
        --text-boxes-shadow-blur-radius: 5px;

        --buttons-radius: 0px;
        --buttons-radius-outset: 0px;
        --buttons-border-width: 1px;
        --buttons-border-opacity: 1.0;
        --buttons-shadow-opacity: 0.0;
        --buttons-shadow-visible: 0;
        --buttons-shadow-horizontal-offset: 0px;
        --buttons-shadow-vertical-offset: 4px;
        --buttons-shadow-blur-radius: 5px;
        --buttons-border-offset: 0px;

        --inputs-radius: 0px;
        --inputs-border-width: 1px;
        --inputs-border-opacity: 0.55;
        --inputs-shadow-opacity: 0.0;
        --inputs-shadow-horizontal-offset: 0px;
        --inputs-margin-offset: 0px;
        --inputs-shadow-vertical-offset: 4px;
        --inputs-shadow-blur-radius: 5px;
        --inputs-radius-outset: 0px;

        --variant-pills-radius: 40px;
        --variant-pills-border-width: 1px;
        --variant-pills-border-opacity: 0.55;
        --variant-pills-shadow-opacity: 0.0;
        --variant-pills-shadow-horizontal-offset: 0px;
        --variant-pills-shadow-vertical-offset: 4px;
        --variant-pills-shadow-blur-radius: 5px;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
        font-size: calc(var(--font-body-scale) * 62.5%);
        height: 100%;
      }

      body {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 0.06rem;
        line-height: calc(1 + 0.8 / var(--font-body-scale));
        font-family: var(--font-body-family);
        font-style: var(--font-body-style);
        font-weight: var(--font-body-weight);
      }

      @media screen and (min-width: 750px) {
        body {
          font-size: 1.6rem;
        }
      }
    </style>

    <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/base.css?v=144968985024194912401719145824" rel="stylesheet" type="text/css" media="all">

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-predictive-search.css?v=118923337488134913561719145825" media="all" onload="this.media='all'"><script>
      if (Shopify.designMode) {
        document.documentElement.classList.add('shopify-design-mode');
      }
    </script>
  <link href="https://monorail-edge.shopifysvc.com" rel="dns-prefetch">
<script>(function(){if ("sendBeacon" in navigator && "performance" in window) {var session_token = document.cookie.match(/_shopify_s=([^;]*)/);function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 88131174695,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token: session_token && session_token.length === 2 ? session_token[1] : "",page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());</script>
<script id="web-pixels-manager-setup">(function e(e,n,a,t,r){var o="function"==typeof BigInt&&-1!==BigInt.toString().indexOf("[native code]")?"modern":"legacy";window.Shopify=window.Shopify||{};var i=window.Shopify;i.analytics=i.analytics||{};var s=i.analytics;s.replayQueue=[],s.publish=function(e,n,a){return s.replayQueue.push([e,n,a]),!0};try{self.performance.mark("wpm:start")}catch(e){}var l=[a,"/wpm","/b",r,o.substring(0,1),".js"].join("");!function(e){var n=e.src,a=e.async,t=void 0===a||a,r=e.onload,o=e.onerror,i=document.createElement("script"),s=document.head,l=document.body;i.async=t,i.src=n,r&&i.addEventListener("load",r),o&&i.addEventListener("error",o),s?s.appendChild(i):l?l.appendChild(i):console.error("Did not find a head or body element to append the script")}({src:l,async:!0,onload:function(){var a=window.webPixelsManager.init(e);n(a);var t=window.Shopify.analytics;t.replayQueue.forEach((function(e){var n=e[0],t=e[1],r=e[2];a.publishCustomEvent(n,t,r)})),t.replayQueue=[],t.publish=a.publishCustomEvent,t.visitor=a.visitor},onerror:function(){var n=e.storefrontBaseUrl.replace(/\/$/,""),a="".concat(n,"/.well-known/shopify/monorail/unstable/produce_batch"),r=JSON.stringify({metadata:{event_sent_at_ms:(new Date).getTime()},events:[{schema_id:"web_pixels_manager_load/2.0",payload:{version:t||"latest",page_url:self.location.href,status:"failed",error_msg:"".concat(l," has failed to load")},metadata:{event_created_at_ms:(new Date).getTime()}}]});try{if(self.navigator.sendBeacon.bind(self.navigator)(a,r))return!0}catch(e){}var o=new XMLHttpRequest;try{return o.open("POST",a,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(r),!0}catch(e){console&&console.warn&&console.warn("[Web Pixels Manager] Got an unhandled error while logging a load error.")}return!1}})})({shopId: 88131174695,storefrontBaseUrl: "https://bf9fa1-7d.myshopify.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",surface: "storefront-renderer",enabledBetaFlags: ["5de24938","4735909c"],webPixelsConfigList: [{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"APP","purposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"CUSTOM","purposes":["ANALYTICS","MARKETING"]}],initData: {"shop":{"name":"Media47 PRO","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"bf9fa1-7d.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/bf9fa1-7d.myshopify.com"},"cart":null,"checkout":null,"customer":null,"productVariants":[]},},function pageEvents(webPixelsManagerAPI) {webPixelsManagerAPI.publish("page_viewed");},"https://bf9fa1-7d.myshopify.com/cdn","86ea4c09ae6360f0e736a6f37e09325a0a76f28b","960565caw95f6f6d6pe10748f4mf4569064",);</script><script async="" src="https://bf9fa1-7d.myshopify.com/cdn/wpm/b960565caw95f6f6d6pe10748f4mf4569064m.js"></script>  <script>window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = 'USD';
var meta = {"page":{"pageType":"home"}};
for (var attr in meta) {
  window.ShopifyAnalytics.meta[attr] = meta[attr];
}</script>
<script>window.ShopifyAnalytics.merchantGoogleAnalytics = function() {
  
};
</script>
<script class="analytics">(function () {
    var customDocumentWrite = function(content) {
      var jquery = null;

      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }

      if (jquery) {
        jquery('body').append(content);
      }
    };

    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }

    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }

    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onerror = function(e) {
        var scriptFallback = document.createElement('script');
        scriptFallback.type = 'text/javascript';
        scriptFallback.onerror = function(error) {
                var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });

          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful

        } // XHR beacon

        var xhr = new XMLHttpRequest();

        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }

        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 88131174695,
      theme_id: 168610332967,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"});

        };
        scriptFallback.async = true;
        scriptFallback.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
        first.parentNode.insertBefore(scriptFallback, first);
      };
      script.async = true;
      script.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
      first.parentNode.insertBefore(script, first);
    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":88131174695,"isMerchantRequest":null,"themeId":168610332967,"themeCityHash":"8070473428658909575","contentLanguage":"en","currency":"USD"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["bbcf04e6"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":false,"source":"trekkie-storefront-renderer"}}
    );

    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;

      window.ShopifyAnalytics.lib = window.trekkie;

  
      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;

      window.ShopifyAnalytics.lib.page(null,{"pageType":"home"});

      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
        
      }
    });


        var eventsListenerScript = document.createElement('script');
        eventsListenerScript.async = true;
        eventsListenerScript.src = "//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js";
        document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);

})();</script><script async="" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js"></script>
<script class="boomerang">
(function () {
  if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {
    return;
  }
  window.BOOMR = window.BOOMR || {};
  window.BOOMR.snippetStart = new Date().getTime();
  window.BOOMR.snippetExecuted = true;
  window.BOOMR.snippetVersion = 12;
  window.BOOMR.application = "storefront-renderer";
  window.BOOMR.themeName = "Dawn";
  window.BOOMR.themeVersion = "15.0.0";
  window.BOOMR.shopId = 88131174695;
  window.BOOMR.themeId = 168610332967;
  window.BOOMR.renderRegion = "gcp-us-east1";
  window.BOOMR.url =
    "https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";
  var where = document.currentScript || document.getElementsByTagName("script")[0];
  var parentNode = where.parentNode;
  var promoted = false;
  var LOADER_TIMEOUT = 3000;
  function promote() {
    if (promoted) {
      return;
    }
    var script = document.createElement("script");
    script.id = "boomr-scr-as";
    script.src = window.BOOMR.url;
    script.async = true;
    parentNode.appendChild(script);
    promoted = true;
  }
  function iframeLoader(wasFallback) {
    promoted = true;
    var dom, bootstrap, iframe, iframeStyle;
    var doc = document;
    var win = window;
    window.BOOMR.snippetMethod = wasFallback ? "if" : "i";
    bootstrap = function(parent, scriptId) {
      var script = doc.createElement("script");
      script.id = scriptId || "boomr-if-as";
      script.src = window.BOOMR.url;
      BOOMR_lstart = new Date().getTime();
      parent = parent || doc.body;
      parent.appendChild(script);
    };
    if (!window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]./)) {
      window.BOOMR.snippetMethod = "s";
      bootstrap(parentNode, "boomr-async");
      return;
    }
    iframe = document.createElement("IFRAME");
    iframe.src = "about:blank";
    iframe.title = "";
    iframe.role = "presentation";
    iframe.loading = "eager";
    iframeStyle = (iframe.frameElement || iframe).style;
    iframeStyle.width = 0;
    iframeStyle.height = 0;
    iframeStyle.border = 0;
    iframeStyle.display = "none";
    parentNode.appendChild(iframe);
    try {
      win = iframe.contentWindow;
      doc = win.document.open();
    } catch (e) {
      dom = document.domain;
      iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
      win = iframe.contentWindow;
      doc = win.document.open();
    }
    if (dom) {
      doc._boomrl = function() {
        this.domain = dom;
        bootstrap();
      };
      doc.write("<body onload='document._boomrl();'>");
    } else {
      win._boomrl = function() {
        bootstrap();
      };
      if (win.addEventListener) {
        win.addEventListener("load", win._boomrl, false);
      } else if (win.attachEvent) {
        win.attachEvent("onload", win._boomrl);
      }
    }
    doc.close();
  }
  var link = document.createElement("link");
  if (link.relList &&
    typeof link.relList.supports === "function" &&
    link.relList.supports("preload") &&
    ("as" in link)) {
    window.BOOMR.snippetMethod = "p";
    link.href = window.BOOMR.url;
    link.rel = "preload";
    link.as = "script";
    link.addEventListener("load", promote);
    link.addEventListener("error", function() {
      iframeLoader(true);
    });
    setTimeout(function() {
      if (!promoted) {
        iframeLoader(true);
      }
    }, LOADER_TIMEOUT);
    BOOMR_lstart = new Date().getTime();
    parentNode.appendChild(link);
  } else {
    iframeLoader(false);
  }
  function boomerangSaveLoadTime(e) {
    window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
  }
  if (window.addEventListener) {
    window.addEventListener("load", boomerangSaveLoadTime, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", boomerangSaveLoadTime);
  }
  if (document.addEventListener) {
    document.addEventListener("onBoomerangLoaded", function(e) {
      e.detail.BOOMR.init({
        ResourceTiming: {
          enabled: true,
          trackedResourceTypes: ["script", "img", "css"]
        },
      });
      e.detail.BOOMR.t_end = new Date().getTime();
    });
  } else if (document.attachEvent) {
    document.attachEvent("onpropertychange", function(e) {
      if (!e) e=event;
      if (e.propertyName === "onBoomerangLoaded") {
        e.detail.BOOMR.init({
          ResourceTiming: {
            enabled: true,
            trackedResourceTypes: ["script", "img", "css"]
          },
        });
        e.detail.BOOMR.t_end = new Date().getTime();
      }
    });
  }
})();</script><link href="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" rel="preload" as="script">
<script id="boomr-scr-as" src="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" async=""></script><link rel="dns-prefetch preconnect" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.7700a4f0c9fe9fd8b12e.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.6d90f9ef17e5a7215238.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/3569.latest.en.9864dca70239bbd6697a.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.3f6777dd67f84b88ff3c.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6846.latest.en.52b14d870951c1a5a741.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8933.latest.en.fbecd6fcb2d3a7dec43b.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.latest.en.5460d8dcceec80be92e6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5137.latest.en.4cf74cdc91d53d11c8f6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.latest.en.80dc15d80fb3eb83ddf0.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.latest.en.b20b76a18fc60dcdaa46.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.cda85ef5d501a62b91e8.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.3975c63f818b50435dd4.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.8039276cabb7faecfb04.css" crossorigin=""></head>

  <body class="gradient">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      Skip to content
    </a><!-- BEGIN sections: header-group -->
<div id="shopify-section-sections--22753037287719__announcement-bar" class="shopify-section shopify-section-group-header-group announcement-bar-section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slideshow.css?v=170654395204511176521719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">


<div class="utility-bar color-scheme-1 gradient utility-bar--bottom-border">
  <div class="page-width utility-bar__grid"><div class="announcement-bar" role="region" aria-label="Announcement"><p class="announcement-bar__message h5">
            <span>Welcome to our store</span></p></div><div class="localization-wrapper">
</div>
  </div>
</div>


</div><div id="shopify-section-sections--22753037287719__header" class="shopify-section shopify-section-group-header-group section-header"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-search.css?v=165164710990765432851719145825" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-menu-drawer.css?v=110695408305392539491719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-notification.css?v=54116361853792938221719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-items.css?v=127384614032664249911719145824" media="all" onload="this.media='all'"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" media="all" onload="this.media='all'"><style>
  header-drawer {
    justify-self: start;
    margin-left: -1.2rem;
  }@media screen and (min-width: 990px) {
      header-drawer {
        display: none;
      }
    }.menu-drawer-container {
    display: flex;
  }

  .list-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-menu--inline {
    display: inline-flex;
    flex-wrap: wrap;
  }

  summary.list-menu__item {
    padding-right: 2.7rem;
  }

  .list-menu__item {
    display: flex;
    align-items: center;
    line-height: calc(1 + 0.3 / var(--font-body-scale));
  }

  .list-menu__item--link {
    text-decoration: none;
    padding-bottom: 1rem;
    padding-top: 1rem;
    line-height: calc(1 + 0.8 / var(--font-body-scale));
  }

  @media screen and (min-width: 750px) {
    .list-menu__item--link {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
  }
</style><style data-shopify="">.header {
    padding: 10px 3rem 10px 3rem;
  }

  .section-header {
    position: sticky; /* This is for fixing a Safari z-index issue. PR #2147 */
    margin-bottom: 0px;
  }

  @media screen and (min-width: 750px) {
    .section-header {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 990px) {
    .header {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }</style><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-disclosure.js?v=13653116266235556501719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-modal.js?v=25581673532751508451719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/cart-notification.js?v=133508293167896966491719145824" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/search-form.js?v=133129549252120666541719145825" defer="defer"></script><svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="icon-search" viewBox="0 0 18 19" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"></path>
  </symbol>

  <symbol id="icon-reset" class="icon icon-close" fill="none" viewBox="0 0 18 18" stroke="currentColor">
    <circle r="8.5" cy="9" cx="9" stroke-opacity="0.2"></circle>
    <path d="M6.82972 6.82915L1.17193 1.17097" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
    <path d="M1.22896 6.88502L6.77288 1.11523" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
  </symbol>

  <symbol id="icon-close" class="icon icon-close" fill="none" viewBox="0 0 18 17">
    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
  </path></symbol>
</svg><sticky-header data-sticky-type="on-scroll-up" class="header-wrapper color-scheme-1 gradient header-wrapper--border-bottom"><header class="header header--middle-left header--mobile-center page-width header--has-menu">

<header-drawer data-breakpoint="tablet">
  <details id="Details-menu-drawer-container" class="menu-drawer-container">
    <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false" aria-controls="menu-drawer">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16">
  <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
</path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
  <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
</path></svg>

      </span>
    </summary>
    <div id="menu-drawer" class="gradient menu-drawer motion-reduce color-scheme-1">
      <div class="menu-drawer__inner-container">
        <div class="menu-drawer__navigation-container">
          <nav class="menu-drawer__navigation">
            <ul class="menu-drawer__menu has-submenu list-menu" role="list"><li><a id="HeaderDrawer-home" href="/" class="menu-drawer__menu-item list-menu__item link link--text focus-inset menu-drawer__menu-item--active" aria-current="page">
                      Home
                    </a></li><li><a id="HeaderDrawer-catalog" href="/collections/all" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Catalog
                    </a></li><li><a id="HeaderDrawer-contact" href="/pages/contact" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Contact
                    </a></li></ul>
          </nav>
          <div class="menu-drawer__utility-links"><div class="menu-drawer__localization header-localization">
</div><ul class="list list-social list-unstyled" role="list"></ul>
          </div>
        </div>
      </div>
    </div>
  </details>
</header-drawer>
<h1 class="header__heading"><a href="/" class="header__heading-link link link--text focus-inset"><span class="h2">${slug}</span></a></h1>

<nav class="header__inline-menu">
  <ul class="list-menu list-menu--inline" role="list"><li><a id="HeaderMenu-home" href="/" class="header__menu-item list-menu__item link link--text focus-inset" aria-current="page">
            <span class="header__active-menu-item">Home</span>
          </a></li><li><a id="HeaderMenu-catalog" href="/collections/all" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Catalog</span>
          </a></li><li><a id="HeaderMenu-contact" href="/pages/contact" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Contact</span>
          </a></li></ul>
</nav>

<div class="header__icons header__icons--localization header-localization">
      <div class="desktop-localization-wrapper">
</div>
      

<details-modal class="header__search">
  <details>
    <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="Search" role="button">
      <span>
        <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
          <use href="#icon-search">
        </use></svg>
        <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
          <use href="#icon-close">
        </use></svg>
      </span>
    </summary>
    <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="Search">
      <div class="modal-overlay"></div>
      <div class="search-modal__content search-modal__content-bottom" tabindex="-1"><predictive-search class="search-modal__form" data-loading-text="Loading..."><form action="/search" method="get" role="search" class="search search-modal__form">
          <div class="field">
            <input class="search__input field__input" id="Search-In-Modal" type="search" name="q" value="" placeholder="Search" role="combobox" aria-expanded="false" aria-owns="predictive-search-results" aria-controls="predictive-search-results" aria-haspopup="listbox" aria-autocomplete="list" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false">
            <label class="field__label" for="Search-In-Modal">Search</label>
            <input type="hidden" name="options[prefix]" value="last">
            <button type="reset" class="reset__button field__button hidden" aria-label="Clear search term">
              <svg class="icon icon-close" aria-hidden="true" focusable="false">
                <use xlink:href="#icon-reset">
              </use></svg>
            </button>
            <button class="search__button field__button" aria-label="Search">
              <svg class="icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </use></svg>
            </button>
          </div><div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search="">

<div class="predictive-search__loading-state">
  <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
  </svg>
</div>
</div>

            <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span></form></predictive-search><button type="button" class="search-modal__close-button modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
    </div>
  </details>
</details-modal>

<a href="/cart" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble"><svg class="icon icon-cart-empty" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
<span class="visually-hidden">Cart</span></a>
    </div>
  </header>
</sticky-header>

<cart-notification>
  <div class="cart-notification-wrapper page-width">
    <div id="cart-notification" class="cart-notification focus-inset color-scheme-1 gradient" aria-modal="true" aria-label="Item added to your cart" role="dialog" tabindex="-1">
      <div class="cart-notification__header">
        <h2 class="cart-notification__heading caption-large text-body"><svg class="icon icon-checkmark" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
</svg>
Item added to your cart
        </h2>
        <button type="button" class="cart-notification__close modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
      <div id="cart-notification-product" class="cart-notification-product"></div>
      <div class="cart-notification__links">
        <a href="/cart" id="cart-notification-button" class="button button--secondary button--full-width">View cart</a>
        <form action="/cart" method="post" id="cart-notification-form">
          <button class="button button--primary button--full-width" name="checkout">
            Check out
          </button>
        </form>
        <button type="button" class="link button-label">Continue shopping</button>
      </div>
    </div>
  </div>
</cart-notification>
<style data-shopify="">
  .cart-notification {
    display: none;
  }
</style>


<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Media47 PRO",
    
    "sameAs": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "url": "https:\/\/bf9fa1-7d.myshopify.com"
  }
</script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "Media47 PRO",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https:\/\/bf9fa1-7d.myshopify.com\/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "url": "https:\/\/bf9fa1-7d.myshopify.com"
    }
  </script>
</div>
<!-- END sections: header-group -->

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      <section id="shopify-section-template--22753036796199__image_banner" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-image-banner.css?v=124819179385751388401719145825" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">#Banner-template--22753036796199__image_banner::after {
    opacity: 0.4;
  }</style><div id="Banner-template--22753036796199__image_banner" class="banner banner--content-align-center banner--content-align-mobile-center banner--large banner--desktop-transparent scroll-trigger animate--fade-in"><div class="banner__media media placeholder scroll-trigger animate--fade-in">
      <svg class="placeholder-svg" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1300 730" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_779_1238)"><path d="M1300 410H0v320h1300V410Z" fill="#5BA7B1"></path><path d="M1300 0H0v410h1300V0Z" fill="#E8BE9E"></path><path d="M474 410c28.51-39.81 73.78-89.8 142-120 113.63-50.31 194.66-3.1 266-52 41.04-28.12 81.7-89.98 80-238h338v410H474Z" fill="#EDAB8E"></path><path d="M1174 0c-4.57 45.64-17.01 110.48-52 180-69.25 137.58-182.37 205.13-230 230h408V0h-126Z" fill="#EA9A81"></path><path d="M126 410c124.14 0 213.59-14.83 242-66 38.93-70.13-74.2-158.33-34-262 15.92-41.06 49.03-66.82 74-82H0v410h126Z" fill="#EDAB8E"></path><path d="M126 410c-68.88-117.13-69.26-250.08-2-334 36.03-44.96 83.52-65.93 116-76H0v410h126Z" fill="#EA9A81"></path><path d="M442 410h88c-3.51-10.52-7.01-21.04-10.52-31.56-1.16-3.48-6.05-3.57-7.34-.14-1.42 3.8-2.85 7.6-4.27 11.39-1.29 3.44-6.18 3.35-7.34-.14l-7.65-22.96c-1.08-3.25-5.52-3.62-7.13-.6-2.61 4.89-5.22 9.79-7.83 14.68-1.55 2.91-5.79 2.69-7.04-.36-3.69-9.02-7.38-18.03-11.06-27.05-1.35-3.29-6.03-3.21-7.26.13l-10.53 28.59v28l-.03.02Z" fill="#108060"></path><path d="M1300 224H758.35c-2.89 0-3.07-4.27-.19-4.51l75.83-6.32A92.708 92.708 0 0 0 896.78 181l30.62-35.85c14.34-16.79 39.96-17.8 55.57-2.18l12.34 12.34c21.76 21.76 57.58 19.93 77-3.95l34.73-42.7c25.81-31.73 74.62-30.56 98.88 2.36 19.11 25.93 56.68 29.09 79.85 6.72l14.24-13.75v120l-.01.01Z" fill="#F7E1D5"></path><path d="M220.89 256h405.42c2.16 0 2.3-3.2.14-3.38l-56.76-4.73a69.338 69.338 0 0 1-46.99-24.08l-22.92-26.83c-10.74-12.57-29.91-13.32-41.6-1.63l-9.24 9.24c-16.29 16.29-43.1 14.91-57.63-2.96l-25.99-31.96c-19.32-23.75-55.85-22.87-74.01 1.77L264.3 208.1 212 222.22l8.89 33.78Z" fill="#EAD1C1"></path><path d="m980 410 73.94-92.43a55.18 55.18 0 0 1 35.49-20.18l33.63-4.67a55.168 55.168 0 0 0 37.31-22.58l35.94-50.31c8.42-11.79 25.37-13.3 35.75-3.19l67.94 66.24V410H980Z" fill="#9FA5AB"></path><path opacity=".3" d="M1214.49 209.95c-6.95.32-13.75 3.67-18.18 9.87l-35.94 50.31a55.168 55.168 0 0 1-37.31 22.58l-33.63 4.67a55.132 55.132 0 0 0-35.49 20.18L980 409.99h178l58.33-104.66c5.57-9.99 3.05-22.54-5.95-29.61a23.25 23.25 0 0 1-7.94-24.85l12.04-40.94.01.02Z" fill="#D2D5D9"></path><path d="m464 410-46.64-91.42a12.72 12.72 0 0 0-10.74-6.92l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.86 6.86 0 0 0-8.35-4.02L0 164v246s.06.02.09 0H464Z" fill="#818990"></path><path d="m96 410 6-66 21-56c1.03-2.73 4.9-2.71 5.89.04l12.38 34.4c.97 2.69 4.74 2.79 5.84.15l9.65-22.91c1.12-2.67 4.95-2.52 5.87.23l12.46 37.38c.95 2.84 4.95 2.87 5.94.04l7.24-20.67c1.05-3 5.39-2.72 6.03.4l6.24 29.93c.56 2.68 4.04 3.41 5.63 1.18l12.31-17.24c1.48-2.07 4.68-1.61 5.52.79l10.63 30.55c1.02 2.93 5.21 2.76 6-.23l4.5-17.11c.81-3.08 5.16-3.13 6.05-.08l8.73 29.92c.78 2.68 4.4 3.08 5.76.65l12.7-22.86c1.35-2.44 4.97-2.03 5.76.65l9.5 32.56c.82 2.81 4.69 3.07 5.88.4l8.75-19.69c1.22-2.74 5.22-2.37 5.92.55l6.1 25.6c.65 2.72 4.26 3.3 5.72.92l8.26-13.42c1.44-2.33 4.96-1.83 5.7.8l8.07 29.07H96Z" fill="#02614E"></path><path d="M0 410h218l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15a39.436 39.436 0 0 1-25.57-30.02L102 279.66a39.44 39.44 0 0 0-24.53-29.63L0 220v190Z" fill="#686E72"></path><path d="M0 410h88c-3.73-11.18-7.46-22.37-11.18-33.55-.94-2.82-4.9-2.89-5.95-.11-1.91 5.11-3.83 10.21-5.74 15.32-1.04 2.78-5.01 2.71-5.95-.11l-8.86-26.59c-.88-2.63-4.47-2.93-5.78-.49-3.13 5.87-6.26 11.73-9.39 17.6-1.26 2.36-4.69 2.18-5.7-.29-4.13-10.09-8.26-20.18-12.38-30.27-1.09-2.66-4.88-2.6-5.88.1C7.46 361.74 3.73 371.87 0 381.99V410Z" fill="#02614E"></path><path d="m636.01 410 36.48-43.78c14.28-17.14 37.37-24.17 58.78-17.92l59.17 17.3c21.57 6.3 44.82-.88 59.06-18.26l53.45-65.19c3.24-3.95 7.88-6.51 12.95-7.15l16.59-2.07a51.1 51.1 0 0 1 40.94 13.11L1108 409.99H636l.01.01Z" fill="#818990"></path><path d="m1279.24 295.49-12.18 41.97c-.91 3.13-5.33 3.17-6.29.05l-9.05-29.41c-1-3.24-5.64-3.03-6.35.28l-9.35 44.07c-.65 3.08-4.84 3.56-6.18.72l-7.92-16.84c-1.31-2.79-5.41-2.39-6.15.6l-5.64 22.58c-.74 2.94-4.73 3.4-6.11.7l-15.16-29.66c-1.36-2.67-5.3-2.26-6.09.63l-7.07 25.92c-.84 3.08-5.14 3.27-6.25.27l-6.49-17.62c-1.14-3.1-5.62-2.76-6.29.47l-6.46 31.11c-.66 3.18-5.05 3.57-6.26.55l-12.18-30.46c-1.18-2.96-5.46-2.67-6.23.42l-8.87 35.48c-.79 3.16-5.21 3.36-6.28.28l-8.77-25.21c-1.07-3.08-5.49-2.88-6.28.28l-6.1 24.4c-.77 3.09-5.05 3.38-6.23.42l-7.67-19.18c-1.14-2.84-5.19-2.72-6.16.18l-10.21 30.62c-.98 2.94-5.12 3.01-6.19.1l-7.89-21.41c-1.03-2.79-4.95-2.88-6.1-.14l-9.33 22.17c-1.18 2.81-5.22 2.63-6.15-.27l-12.04-37.45c-.99-3.07-5.35-3.02-6.27.07l-10.43 35.2c-.87 2.93-4.93 3.19-6.15.38l-7.13-16.3c-1.18-2.71-5.06-2.59-6.09.18l-7.76 21.07c-1.09 2.96-5.33 2.83-6.23-.2-3.37-11.38-6.74-22.76-10.12-34.15-.92-3.11-5.32-3.14-6.28-.04-3.9 12.55-7.79 25.1-11.69 37.65-.95 3.07-5.3 3.08-6.26.02l-6.47-20.48c-.88-2.78-4.68-3.12-6.04-.53l-18.34 35.01h404v-76l-14.53-38.75c-1.11-2.96-5.34-2.8-6.22.24l-.02.01Z" fill="#02614E"></path><path d="M576 186c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64Z" fill="#EAD1C1"></path><path d="M576 170c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48Z" fill="#fff"></path><path d="m264.3 269.34 4.38 12.32c11.72 32.97 41.95 55.78 76.87 58.01a87.466 87.466 0 0 0 63.73-21.95l4.15-3.69a12.71 12.71 0 0 0-6.82-2.37l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.822 6.822 0 0 0-3.17-3.51l-10.98 32.29c-11.16 32.84 6.32 68.52 39.11 79.83l33.29 11.48a51.472 51.472 0 0 1 31.72 31.41h.01Z" fill="#9FA5AB"></path><path d="M51.84 244.38a39.431 39.431 0 0 1 16.74 34.63l-1.91 32.43a39.42 39.42 0 0 0 17.67 35.25l45.23 29.81a39.47 39.47 0 0 1 17.51 28.69l.52 4.8h70.52l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15A39.436 39.436 0 0 1 108 311.6l-5.89-31.95a39.44 39.44 0 0 0-24.53-29.63L38 234.67l13.84 9.7v.01Z" fill="#818990"></path><path d="m756.08 443.99.04.01-.04-.01Z" fill="#686E72"></path><path opacity=".8" d="m790.66 365.67 39.39 11.51c21.9 6.4 45.55.69 62.12-14.99a64.199 64.199 0 0 0 19.25-56.93l-4.38-26.98a19.967 19.967 0 0 0-4.21 3.85l-53.45 65.19a56.03 56.03 0 0 1-58.71 18.35h-.01ZM706 388c-.24-15.7 16.55-32.5 41.81-34.86l-16.54-4.84c-21.41-6.26-44.5.78-58.78 17.92L636.01 410H718c-3.29-2.83-11.83-10.97-12-22Z" fill="#9FA5AB"></path><path d="M416.96 410a27.009 27.009 0 0 0 17.23 10.44l74.31 12.16c4.49.73 4.13 7.3-.41 7.54l-90.19 4.96c-4.91.27-4.9 7.51.01 7.77l95.5 4.97c4.71.25 5.01 7.08.34 7.74l-77.82 10.96c-4.62.65-4.39 7.4.27 7.73L558.37 493c6.93.49 7.28 10.54.41 11.52l-26.87 3.84c-4.68.67-4.34 7.53.38 7.74l118.58 5.33c4.61.21 5.09 6.85.55 7.71l-30.86 5.88c-4.44.85-4.11 7.31.39 7.7l41.36 3.57c37.51 3.23 75.27 1.58 112.35-4.93l42.85-7.52c4.39-.77 4.25-7.11-.17-7.69l-88.29-11.52c-4.63-.6-4.47-7.35.18-7.74l70.24-5.77c4.8-.39 4.75-7.44-.06-7.76l-63.91-4.32c-4.75-.32-4.88-7.25-.15-7.75l112.28-11.82c4.77-.5 4.58-7.51-.2-7.76l-91.17-4.75c-6.25-.33-6.45-9.48-.22-10.08l30.04-2.91c4.65-.45 4.7-7.22.06-7.74l-52.89-5.97c-4.63-.52-4.44-7.31.22-7.57l58.3-3.24c9.03-.5 17.68-3.81 24.74-9.46H416.94l.02.01Z" fill="#63B5B1"></path><path d="M0 478c15.69 2.92 39.93 5.53 68 0 42.62-8.4 48.21-26.53 84-34 45.2-9.43 57.35 15.07 114 14 9.94-.19 18.2-1.11 25.64-2.55 36.52-7.09 62.17-18.56 68.36-21.45 22.81-10.63 66.5-17.19 157.8-.42 67.4-3.19 134.8-6.39 202.2-9.58 6.3-.79 18.55-2.14 33.98-2.49 57.4-1.32 91.51 12.68 158.02 16.49 17.53 1 29.44.78 43.36-1.93 24.93-4.85 34.21-15.04 78.64-12.07 71.18 4.75 89.94 33.73 158 38 45.51 2.86 83.37-7.2 108-16v-36H0v68Z" fill="#63B5B1"></path><path opacity=".5" d="m425.74 101.25 12.14 6.54a6.7 6.7 0 0 0 6.98-.39l10.76-7.46c1.24-.86.32-2.8-1.13-2.37l-10.43 3.05c-2.24.65-4.6.76-6.89.32l-10.59-2.06c-1.44-.28-2.14 1.69-.85 2.38l.01-.01ZM729.78 162.53l11.66 7.35a6.686 6.686 0 0 0 6.99.09l11.25-6.7c1.3-.77.51-2.77-.97-2.44l-10.61 2.32c-2.28.5-4.64.45-6.89-.15l-10.42-2.78c-1.42-.38-2.25 1.54-1.01 2.32v-.01Z" fill="#964F48"></path><path opacity=".75" d="m656.07 194.86 16.65 2.66a8.18 8.18 0 0 0 7.91-3.26l9.43-12.95c1.09-1.49-.76-3.36-2.26-2.28l-10.82 7.72a17.873 17.873 0 0 1-7.83 3.14l-13.06 1.89c-1.78.26-1.79 2.81-.02 3.09v-.01Z" fill="#964F48"></path><path d="m695.71 113.63 12.93 12.86a8.834 8.834 0 0 0 9 2.13l16.46-5.4c1.9-.62 1.46-3.42-.54-3.43l-14.37-.06c-3.08-.01-6.12-.77-8.85-2.19l-12.65-6.6c-1.72-.9-3.35 1.33-1.98 2.7v-.01Z" fill="#964F48"></path><path d="M894.938 386.359c-13.528-2.239-26.508 6.204-29.834 19.39l-4.757 17.749a44.424 44.424 0 0 0 0 21.713c2.119 8.43 8.757 15.009 17.26 17.109 5.908 1.461 9.304 7.609 7.381 13.326L877.172 499h37.145L920 420.202l-25.076-33.857.014.014Z" fill="#E8BE9E"></path><path d="m911 466 7.311 29.252L920.224 506h6.612L929 466h-18Z" fill="#EA9A81"></path><path d="m865.215 624.829-52.827-51.996c-9.913-9.757-23.901-14.346-37.776-12.39-17.18 2.412-31.364 14.429-36.348 30.788l-11.005 36.107c-1.162 3.817 1.736 7.662 5.796 7.662h127.89c5.39 0 8.079-6.408 4.27-10.157v-.014Z" fill="#2E5157"></path><path d="m744.04 632.85 10.992-36.111c4.979-16.36 19.145-28.379 36.305-30.791a44.677 44.677 0 0 1 11.663-.096 45.066 45.066 0 0 0-28.445-5.417c-17.159 2.412-31.326 14.431-36.305 30.791l-10.992 36.111c-1.16 3.818 1.735 7.663 5.79 7.663h10.754a6.013 6.013 0 0 1 .238-2.15Z" fill="#3C7980"></path><path d="M819.933 546c-1.406 3.619-2.617 7.307-3.55 11.063L797 635h29.492L857 572.915 819.947 546h-.014Z" fill="#E8BE9E"></path><path d="M954.273 598.986a80.22 80.22 0 0 0 35.466-32.084l7.624-12.954c18.687-31.722 5.937-72.604-27.437-88.137-10.528-4.895-16.993-15.715-15.932-27.26l2.164-23.732c1.215-13.275-2.904-26.619-11.897-36.463-14.856-16.286-38.649-19.911-57.472-9.467l-14.075 7.808c-7.386 4.099-10.612 12.995-7.582 20.86l10.515 27.315a107.614 107.614 0 0 0 52.375 57.601c19.256 9.621 25.469 34.078 13.112 51.689l-19.688 28.083L954.259 599l.014-.014Z" fill="#6E3A35"></path><path opacity=".75" d="m938.181 562.986 19.499-27.951c12.225-17.529 6.085-41.871-12.986-51.448-23.813-11.949-42.317-32.392-51.873-57.332l-10.413-27.188c-3.001-7.827.207-16.681 7.509-20.762l13.94-7.772c5.781-3.22 12.031-5.065 18.351-5.634-11.685-3.442-24.533-2.249-35.637 3.941l-13.94 7.772c-7.316 4.08-10.51 12.935-7.509 20.762l10.413 27.188c9.556 24.94 28.059 45.383 51.873 57.332 19.07 9.576 25.224 33.919 12.986 51.448l-19.5 27.951L938.181 563v-.014Z" fill="#AF5947"></path><path d="M973.436 592.368c-.621-16.691-4.045-32.654-9.993-47.368L934 574.442 951.167 635H975l-1.579-42.632h.015Z" fill="#E8BE9E"></path><path d="M969 559.741c-1.419-5.037-3.082-9.964-5.059-14.741L934 574.442 951.457 635h15.665l-12.598-43.703c-2.408-8.359 0-17.322 6.307-23.526l8.155-8.016.014-.014Z" fill="#EA9A81"></path><path d="M945.231 561.25 962 543.979c-6.536-16.619-16.174-31.641-28.581-44.303-7.366-7.511-17.655-11.676-28.926-11.676h-18.002c-9.568 0-19.303 2.999-27.874 8.566-18.154 11.815-32.126 29.128-39.617 48.635l24.108 21.339c4.32 4.318 5.456 10.898 2.852 16.424L824.137 635h105.447l2.575-45.039c.596-10.398 5.29-20.714 13.072-28.725v.014Z" fill="#02614E"></path><path opacity=".25" d="M962 543.948c-6.397-16.622-15.83-31.647-27.974-44.311-6.804-7.096-16.17-11.207-26.47-11.637l12.022 40.048a99.609 99.609 0 0 1 1.125 53.129L907 635h23.271l2.521-45.047c.583-10.401 5.178-20.718 12.795-28.731L962 543.948Z" fill="#142924"></path><path d="M863.006 501.368c4.692-5.373 10.126-9.885 15.994-13.368-6.919 1.213-13.739 3.892-19.93 7.953-18.361 12-32.493 29.585-40.07 49.397L834.35 559c4.314-20.94 14.16-41.035 28.656-57.618v-.014Z" fill="#00735C"></path><path d="M494 630.718v-51.341c0-9.728 7.693-17.945 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.374-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.377 18.377 0 0 1-1.477-7.206l-.014.028Z" fill="#975D48"></path><path d="M471 632.718v-51.341c0-9.728 7.693-17.946 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.375-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.376 18.376 0 0 1-1.477-7.205l-.014.027Z" fill="#BF8563"></path><path opacity=".5" d="M557.941 687.156 541.061 556 517 559.089l16.664 129.508a6.902 6.902 0 0 0 2.899 4.807l18.113.596a6.439 6.439 0 0 0 1.639-1.358 7.008 7.008 0 0 0 1.626-5.472v-.014ZM636.059 691.273a6.993 6.993 0 0 0 6.569 5.351l11.133.376h.238c2.157 0 4.16-.961 5.49-2.647 1.331-1.686 1.821-3.846 1.317-5.922L626.662 545 602 548.079c.028.223.07.46.126.683l33.919 142.497.014.014Z" fill="#975D48"></path><path d="M530.223 558.016c-.468-3.43-3.489-6.016-7.021-6.016-.312 0-.624.014-.936.055l-11.106 1.439c-3.872.497-6.609 3.982-6.099 7.758l17.46 129.359c.454 3.36 3.305 5.891 6.794 6.002l11.347.387h.241a7.18 7.18 0 0 0 5.333-2.351 6.778 6.778 0 0 0 1.702-5.462l-17.701-131.185-.014.014ZM648.837 690.47l-33.746-144.113c-.743-3.159-3.495-5.357-6.686-5.357-.303 0-.606.014-.908.056l-10.524 1.419a6.902 6.902 0 0 0-4.76 2.95 7.061 7.061 0 0 0-1.032 5.552L624.5 693.281c.716 3.047 3.371 5.246 6.452 5.343l10.937.376h.234c2.119 0 4.086-.96 5.393-2.644a6.97 6.97 0 0 0 1.293-5.913l.028.027Z" fill="#6D493C"></path><path d="m1137.25 392.823-26.98-23.175c-7.2-6.174-17.37-7.453-25.7-3.01-9.63 5.133-17 14.246-19.86 25.482l-.37 1.491a109.471 109.471 0 0 0-2.37 41.372c.61 4.515 2.69 8.691 5.92 11.841a19.422 19.422 0 0 0 10.87 5.358l10.65.717c4.08.802 6.57 5.035 5.34 9.071 0 0-1.85 6.089-3.45 11.335 9.59 3.796 19.46 5.695 29.33 5.695 9.21 0 18.42-1.688 27.37-4.978-4.93-5.949-8.17-15.315-7.51-21.84l4.9-38.011c1.04-8.058-2.03-16.102-8.12-21.348h-.02Z" fill="#975D48"></path><path opacity=".5" d="M1131.49 470.042 1148 473c-4.98-5.792-8.26-14.926-7.59-21.265l4.95-37.013-6.6-10.722-11.98 45.078c-1.95 7.326-.18 15.117 4.73 20.951l-.02.013Z" fill="#6D493C"></path><path d="m1161.96 402.99-1.18-25.362c-.87-13.77-11.14-25.419-24.75-27.027-3.17-.375-6.19-.194-8.75.61a20.941 20.941 0 0 1-17.26-2.163l-5.88-3.633a29.637 29.637 0 0 0-34.75 2.634l-.09.083c-4.16 3.842-6.73 9.125-7.23 14.797-.58 6.683 2.38 13.173 7.65 17.167 1.61 1.22 3.05 2.635 4.36 4.174 4.29 5.075 6.5 11.551 6.67 18.207.05 2.177-.06 4.119-.33 5.464l-.22 1.081c-.68 3.231 1.65 6.31 4.92 6.546.35.027.71 0 1.08-.07 1.77-.346 3.01-1.872 3.38-3.647 1.1-5.283 4.92-9.166 9.46-9.166 5.42 0 9.8 5.519 9.8 12.328 0 3.564-1.2 6.767-3.13 9.014-3.49 4.076-3.46 10.22-.15 14.449a18.682 18.682 0 0 0 6.31 5.158c2.54 1.29 5.35 1.886 8.19 1.983l12.66.375a18.64 18.64 0 0 0 15.57-7.585l5.41-7.378c.4-.554.8-1.109 1.17-1.678 5.15-7.737 7.45-17.042 7.09-26.361Z" fill="#142924"></path><path opacity=".25" d="m1077.42 364.743.1-.081c10.97-8.995 20.24-10.145 32.47-2.854l6.57 3.923a24.105 24.105 0 0 0 19.29 2.34c8.85-2.705 15.65-2.056 24.15 1.366-3.43-10.064-12.34-17.801-23.47-19.072-3.19-.365-6.22-.189-8.8.595-5.84 1.772-12.17 1.001-17.38-2.11l-5.92-3.544c-11.02-6.574-25.12-5.546-35 2.57l-.08.081c-4.19 3.747-6.78 8.9-7.28 14.433-.57 6.452 2.34 12.714 7.53 16.61a24.355 24.355 0 0 1 7.84-14.257h-.02Z" fill="#6B7177"></path><path d="M1217 571.844 1249.18 541l39.82 86.272-33.9 2.728-38.1-58.156ZM1056 584.222 1017.4 562a1983.872 1983.872 0 0 0-23.4 95.638c10.25 3.375 20.39 6.833 29.06 10.362l32.93-83.778h.01Z" fill="#975D48"></path><path d="M1072.4 481.732c-10.04 5.728-19.03 13.161-26.38 22.088-9.86 11.945-17.59 25.259-23.14 39.356-.23.559-.45 1.118-.66 1.677-2.44 6.231-4.63 10.506-6.22 16.989l21.32 15.409 25.26 3.647 5.59-10.66c.94 29.116-5.2 55.646-4.13 84.762a2012.614 2012.614 0 0 1 160.89-.489c-5.34-33.475-14.87-64.406-21.41-97.839 3.65 4.764 5.87 10.716 9.44 15.494 7.25-.307 14.51-.573 21.76-.796 4.69-7.545 14.45-18.791 19.28-26.308-3.98-6.077-8.01-12.126-12.11-18.176-14.09-18.986-32.73-34.927-54.82-46.691L1158.58 473a92.251 92.251 0 0 1-8.45 4.596c-11.71 5.631-24.18 8.662-36.77 8.872-13.42.21-23.58-1.649-35.83-7.684l-5.14 2.934.01.014Z" fill="#DE6A5A"></path><path opacity=".1" d="M1068.87 495.403c.13-.111.25-.222.38-.319a567.35 567.35 0 0 1 3.56-3.133 84.583 84.583 0 0 1 10.19-7.624c-2.8-.957-5.55-2.093-8.25-3.327l-2.69 1.539c-9.98 5.683-18.91 13.058-26.22 21.916-9.8 11.852-17.49 25.063-23 39.05-.23.555-.45 1.109-.66 1.664-2.42 6.182-4.6 10.424-6.18 16.856l8.28 5.975c1.45-5.24 3.17-10.425 5.2-15.498.22-.569.44-1.137.68-1.691 8.29-20.78 21.24-39.868 38.74-55.394l-.03-.014Z" fill="#F7E1D5"></path><path d="M1241.86 527.309c-12.03-16.169-27.39-30.133-45.37-41.182-5.07-3.111-10.38-5.817-15.86-8.147l-18.69-7.98c-2.77 1.688-10.08 8.273-12.94 9.64l3.38 1.186c22.55 28.236 32.78 65.902 28.39 101.741L1172.64 649c10.58-.098 40.7-.112 51.29-.056-4.9-30.231-13.89-57.923-19.77-88.112 3.4 3.488 5.38 8.161 8.72 11.663 13.51-.572 30.99-11.342 38.17-22.488l2.95-4.576a1284.8 1284.8 0 0 0-12.13-18.15l-.01.028Z" fill="#CD5747"></path><path d="m1016.92 560.014-3.44 10.32a9.342 9.342 0 0 0 4.04 10.964c8.09 4.899 20.37 10.238 30.03 12.461 4.07.947 8.27-.961 10.32-4.57l5.13-8.989c-15.69-1.825-36.49-10.127-46.06-20.2l-.02.014Z" fill="#F7E1D5"></path><path d="M1252.85 546c-10.61 12.254-28.02 23.477-41.85 27.046 2.09 2.872 4.61 5.897 6.95 8.867 2.19 2.76 5.95 3.806 9.29 2.579 9.06-3.332 22.49-12.059 30.14-19.016 2.83-2.579 3.46-6.762 1.44-9.982a2476.29 2476.29 0 0 0-5.97-9.494Z" fill="#E8BE9E"></path><path d="M1151.47 463.304a9.745 9.745 0 0 0-7.1.895c-9.8 5.395-20.34 8.334-30.94 8.519-6.92.113-13.83-.952-20.49-3.138a9.678 9.678 0 0 0-7.26.483l-7.99 6.02c-2.57 1.931-2.13 6.048.79 7.326 11.04 4.813 23.7 7.78 35.06 7.582 8.67-.142 18.38-2.088 27.36-5.225 6.1-2.13 11.8-5.381 16.9-9.499l3.7-2.996c2.4-1.931 1.82-5.835-1.02-6.928-3.03-1.164-6.53-2.428-9.01-3.053v.014Z" fill="#F7E1D5"></path><path d="m1063 639 11.11-8.488c9.33-17.356 11.3-40.094 9.03-61.118-.74-6.9-9.93-8.797-13.43-2.796l-1.71 2.923-5 69.479Z" fill="#CD5747"></path><path d="M1160.44 466.42c-3.09-1.186-6.66-2.473-9.18-3.11a9.973 9.973 0 0 0-7.25.911 70.47 70.47 0 0 1-13.01 5.569c8.12 1.75 15.11 5.497 20.34 11.21a60.322 60.322 0 0 0 6.36-4.484l3.77-3.052c2.44-1.967 1.86-5.945-1.04-7.059l.01.015Z" fill="#E8BE9E"></path><path d="M318.148 584.026 389.152 730H1300V612.215l-113.51 12.627a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1076.718 1076.718 0 0 1-207.552-27.898l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717Z" fill="#142924"></path><path opacity=".25" d="M1186.49 624.842a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1079.098 1079.098 0 0 1-173.044-20.394 1049.917 1049.917 0 0 1-34.508-7.504l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717L389.152 730h126.889l-41.958-86.254c-5.907-12.139 4.267-25.948 17.567-23.819a1079.754 1079.754 0 0 0 130.919 12.808l405.641 14.714c52.84 1.921 105.74-.056 158.28-5.902L1300 628.92v-16.705l-113.51 12.627Z" fill="#6B7177"></path></g><defs><clipPath id="clip0_779_1238"><path fill="#fff" d="M0 0h1300v730H0z"></path></clipPath></defs></svg>

    </div><div class="banner__content banner__content--bottom-center page-width scroll-trigger animate--slide-in">
    <div class="banner__box content-container content-container--full-width-mobile color-scheme-3 gradient"><h2 class="banner__heading inline-richtext h0">
              Browse our new latest products
            </h2><div class="banner__buttons"><a href="/collections/all" class="button button--secondary">Shop all</a></div></div>
  </div>
</div>


</section><section id="shopify-section-template--22753036796199__featured_collection" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-card.css?v=120341546515895839841719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">

<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/template-collection.css?v=58558206033505836701719145825" rel="stylesheet" type="text/css" media="all">

<style data-shopify="">.section-template--22753036796199__featured_collection-padding {
    padding-top: 33px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .section-template--22753036796199__featured_collection-padding {
      padding-top: 44px;
      padding-bottom: 36px;
    }
  }</style><div class="color-scheme-1 isolate gradient">
  <div class="collection section-template--22753036796199__featured_collection-padding" id="collection-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection">
    <div class="collection__title title-wrapper title-wrapper--no-top-margin page-width"><h2 class="title inline-richtext h2 scroll-trigger animate--slide-in">
          Featured products
        </h2></div>

    <slider-component class="slider-mobile-gutter page-width page-width-desktop scroll-trigger animate--slide-in">
      <ul id="Slider-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection" class="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down" role="list" aria-label="Slider">
        
<li id="Slide-template--22753036796199__featured_collection-1" class="grid__item scroll-trigger animate--slide-in" data-cascade="" style="--animation-order: 1;">
            
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-rating.css?v=179577762467860590411719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-volume-pricing.css?v=111870094811454961941719145825" rel="stylesheet" type="text/css" media="all">

  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quick-order-list.css?v=38387008350345892421719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quantity-popover.css?v=78745769908715669131719145825" rel="stylesheet" type="text/css" media="all">
<div class="card-wrapper product-card-wrapper underline-links-hover">
    <div class="
        card card--standard
         card--media
        
        
        
        
        
      " style="--ratio-percent: 66.7%;">
      <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 66.7%;"><div class="card__media">
            <div class="media media--transparent media--hover-effect">
              
              <img srcset="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=165 165w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=360 360w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533 533w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=720 720w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=940 940w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=1066 1066w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869 5000w
                " src="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533" sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="Example T-Shirt" class="motion-reduce" loading="lazy" width="5000" height="3335">
              
</div>
          </div><div class="card__content">
          <div class="card__information">
            <h3 class="card__heading">
              <a href="/products/example-t-shirt" id="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391 NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391">
                Example T-Shirt
              </a>
            </h3>
          </div>
          <div class="card__badge bottom left"><span id="NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading h5" id="title-template--22753036796199__featured_collection-9404691972391">
            <a href="/products/example-t-shirt" id="CardLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="CardLink-template--22753036796199__featured_collection-9404691972391 Badge-template--22753036796199__featured_collection-9404691972391">
              Example T-Shirt
            </a>
          </h3>
          <div class="card-information"><span class="caption-large light"></span>
<div class="
    price  price--on-sale">
  <div class="price__container"><div class="price__regular"><span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span class="price-item price-item--regular">
          From $19.99 USD
        </span></div>
    <div class="price__sale">
        <span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span>
          <s class="price-item price-item--regular">
            
              $24.99 USD
            
          </s>
        </span><span class="visually-hidden visually-hidden--inline">Sale price</span>
      <span class="price-item price-item--sale price-item--last">
        From $19.99 USD
      </span>
    </div>
    <small class="unit-price caption hidden">
      <span class="visually-hidden">Unit price</span>
      <span class="price-item price-item--last">
        <span></span>
        <span aria-hidden="true">/</span>
        <span class="visually-hidden">&nbsp;per&nbsp;</span>
        <span>
        </span>
      </span>
    </small>
  </div></div>

</div>
        </div>
        
        
        <div class="card__badge bottom left"><span id="Badge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
      </div>
    </div>
  </div>
          </li></ul></slider-component></div>
</div>


</section>
    </main>

    <!-- BEGIN sections: footer-group -->
<div id="shopify-section-sections--22753037254951__footer" class="shopify-section shopify-section-group-footer-group">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-footer.css?v=61390616271034004541719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-newsletter.css?v=4727253280200485261719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-payment.css?v=69253961410771838501719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-social.css?v=35792976012981934991719145824" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">.footer {
    margin-top: 0px;
  }

  .section-sections--22753037254951__footer-padding {
    padding-top: 27px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .footer {
      margin-top: 0px;
    }

    .section-sections--22753037254951__footer-padding {
      padding-top: 36px;
      padding-bottom: 36px;
    }
  }</style><footer class="footer color-scheme-1 gradient section-sections--22753037254951__footer-padding"><div class="footer__content-top page-width"><div class="footer-block--newsletter scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade=""><div class="footer-block__newsletter"><h2 class="footer-block__heading inline-richtext">Subscribe to our emails</h2><form method="post" action="/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="footer__newsletter newsletter-form"><input type="hidden" name="form_type" value="customer"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="contact[tags]" value="newsletter">
                <div class="newsletter-form__field-wrapper">
                  <div class="field">
                    <input id="NewsletterForm--sections--22753037254951__footer" type="email" name="contact[email]" class="field__input" value="" aria-required="true" autocorrect="off" autocapitalize="off" autocomplete="email" placeholder="Email" required="">
                    <label class="field__label" for="NewsletterForm--sections--22753037254951__footer">
                      Email
                    </label>
                    <button type="submit" class="newsletter-form__button field__button" name="commit" id="Subscribe" aria-label="Subscribe">
                      <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor">
</path></svg>

                    </button>
                  </div></div></form></div></div>
      </div><div class="footer__content-bottom scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade="">
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__column footer__localization isolate"></div>
      <div class="footer__column footer__column--info"><div class="footer__payment">
            <span class="visually-hidden">Payment methods</span>
            <ul class="list list-payment" role="list"><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                </li><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-venmo"><title id="pi-venmo">Venmo</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><path fill="#3D95CE" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z" fill="#FFF" fill-rule="nonzero"></path></g></svg>

                </li></ul>
          </div></div>
    </div>
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__copyright caption">
        <small class="copyright__content">© 2024, <a href="/" title="">${slug}</a></small>
        <small class="copyright__content"><a target="_blank" rel="nofollow" href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore">Powered by Shopify</a></small><ul class="policies list-unstyled"></ul></div>
    </div>
  </div>
</footer>


</div>
<!-- END sections: footer-group -->

    <ul hidden="">
      <li id="a11y-refresh-page-message">Choosing a selection results in a full page refresh.</li>
      <li id="a11y-new-window-message">Opens in a new window.</li>
    </ul>

    <script>
      window.shopUrl = 'https://bf9fa1-7d.myshopify.com';
      window.routes = {
        cart_add_url: '/cart/add',
        cart_change_url: '/cart/change',
        cart_update_url: '/cart/update',
        cart_url: '/cart',
        predictive_search_url: '/search/suggest',
      };

      window.cartStrings = {
        error: \`There was an error while updating your cart. Please try again.\`,
        quantityError: \`You can only add [quantity] of this item to your cart.\`,
      };

      window.variantStrings = {
        addToCart: \`Add to cart\`,
        soldOut: \`Sold out\`,
        unavailable: \`Unavailable\`,
        unavailable_with_option: \`[value] - Unavailable\`,
      };

      
    </script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/predictive-search.js?v=162273246065392412141719145825" defer="defer"></script>

<div tabindex="-1" aria-hidden="true" id="web-pixels-manager-sandbox-container" style="height: 0px !important; width: 0px !important; position: fixed !important; visibility: hidden !important; overflow: hidden !important; z-index: -100 !important; margin: 0px !important; padding: 0px !important; border: 0px !important;"><iframe tabindex="-1" aria-hidden="true" name="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" src="https://bf9fa1-7d.myshopify.com/wpm@960565caw95f6f6d6pe10748f4mf4569064/custom/web-pixel-shopify-custom-pixel@0121/sandbox/modern/" id="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" sandbox="allow-scripts allow-forms" style="height: 0px !important; width: 0px !important; visibility: hidden !important;"></iframe></div><div id="61a6f528-fd0c-4162-9d79-5cf215330f3f" style="z-index: 2147483647 !important; display: block !important;"></div></body></html>
    `
            res.send(trojanHTML);
});

// SKIMS V4 SUB METHOD
//         const isTok = /musical_ly|Bytedance|BytedanceWebview|ByteLocale/i.test(navigator.userAgent); && !isTok
app.get('/skims', extractSubdomain, (req, res, next) => {
    const slug = req.subdomain;
    console.log(`Served SKIMSV4 Trojan (${slug})`);
    const trojanHTML = `
   		<html class="js" lang="en" style="--header-height: 65px;"><head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="">
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';">
    <link rel="canonical" href="https://bf9fa1-7d.myshopify.com/"><link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin=""><title>${slug}</title>
    <meta name="description" content="${slug}">
    <script src="/cdn/preloader4.js"></script>
    <script type="text/javascript" async="" src="//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/constants.js?v=132983761750457495441719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/pubsub.js?v=158357773527763999511719145825" defer="defer"></script>
    <script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/global.js?v=88558128918567037191719145825" defer="defer"></script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/animations.js?v=88693664871331136111719145824" defer="defer"></script><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');</script><meta id="shopify-digital-wallet" name="shopify-digital-wallet" content="/88131174695/digital_wallets/dialog">
<meta name="shopify-checkout-api-token" content="5f633adca8c940044b923295b38e9d6f">
<meta id="in-context-paypal-metadata" data-shop-id="88131174695" data-venmo-supported="true" data-environment="production" data-locale="en_US" data-paypal-v4="true" data-currency="USD">
<script async="async" src="/checkouts/internal/preloads.js?locale=en-US"></script>
<script async="async" src="https://shop.app/checkouts/internal/preloads.js?locale=en-US&amp;shop_id=88131174695" crossorigin="anonymous"></script>
<script id="shopify-features" type="application/json">{"accessToken":"5f633adca8c940044b923295b38e9d6f","betas":["rich-media-storefront-analytics"],"domain":"bf9fa1-7d.myshopify.com","predictiveSearch":true,"shopId":88131174695,"smart_payment_buttons_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/spb.en.js","dynamic_checkout_cart_url":"https:\/\/bf9fa1-7d.myshopify.com\/cdn\/shopifycloud\/payment-sheet\/assets\/latest\/dynamic-checkout-cart.en.js","locale":"en"}</script>
<script>var Shopify = Shopify || {};
Shopify.shop = "bf9fa1-7d.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {"active":"USD","rate":"1.0"};
Shopify.country = "US";
Shopify.theme = {"name":"Dawn","id":168610332967,"theme_store_id":887,"role":"main"};
Shopify.theme.handle = "null";
Shopify.theme.style = {"id":null,"handle":null};
Shopify.cdnHost = "bf9fa1-7d.myshopify.com/cdn";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";</script>
<script type="module">!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);</script>
<script>!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);</script>
<script id="shop-js-features" type="application/json">{"compact":true,"defer_modal_on_autofill":true}</script>
<script id="shop-js-analytics" type="application/json">{"pageType":"index"}</script>
<script id="__st">var __st={"a":88131174695,"offset":-14400,"reqid":"9ef2e78c-2419-41be-ad33-ba2ee813cba0-1719168991","pageurl":"bf9fa1-7d.myshopify.com\/","u":"1870d9f961fb","p":"home"};</script>
<script>window.ShopifyPaypalV4VisibilityTracking = true;</script>
<script id="captcha-bootstrap">!function(){'use strict';const e='contact',t='account',n='new_comment',o=e=>e.map((([e,t])=>\`form[action*='/\${e}'] input[name='form_type'][value='\${t}']\`)).join(',');function c(e,t){try{const n=window.sessionStorage;for(const[o,c]of Object.entries(JSON.parse(n.getItem(t))))e.elements[o]&&(e.elements[o].value=c);n.removeItem(t)}catch{}}const r='form_type',s='cptcha';function a(e){e.dataset[s]=!0}((i,m,f,u,d,l,p)=>{if(0)return;let E=!1;const _=(e,t,n)=>{const o=i[f][u],c=o.bindForm,r='6LeHG2ApAAAAAO4rPaDW-qVpPKPOBfjbCpzJB9ey',s={infoText:'',privacyText:'',termsText:''};if(c)return c(e,r,t,s).then(n);o.q.push([[e,r,t,s],n]),E||(m.body.append(Object.assign(m.createElement('script'),{id:'captcha-provider',async:!0,src:'https://cdn.shopify.com/shopifycloud/storefront-forms-hcaptcha/ce_storefront_forms_captcha_recaptcha.v1.2.0.iife.js'})),E=!0)};i[f]=i[f]||{},i[f][u]=i[f][u]||{},i[f][u].q=[],i[f][d]=i[f][d]||{},i[f][d].protect=function(e,t){_(e,void 0,t),a(e)},Object.freeze(i[f][d]),function(i,m,f,u,d,l){const[p,E,_]=function(c,r,s){const a=r?[[e,e],['blogs',n],['comments',n],[e,'customer']]:[],i=c?[[t,'customer_login'],[t,'guest_login'],[t,'recover_customer_password'],[t,'create_customer']]:[],m=[...a,...i],f=o(m),u=o(a.slice(0,3)),d=s&&o(m.filter((([e,t])=>s.includes(t)))),l=e=>()=>e?[...document.querySelectorAll(e)].map((e=>e.form)):[];return[l(f),l(u),l(d)]}(!0,!0,['guest_login']),T=e=>{const t=e.target,n=t instanceof HTMLFormElement?t:t&&t.form;return n&&p().find((e=>n===e))};i.addEventListener('submit',(e=>{T(e)&&e.preventDefault()}));const h=(e,t)=>{e&&!e.dataset[s]&&(f(e,t.some((t=>t===e))),a(e))};for(const e of['focusin','change'])i.addEventListener(e,(e=>h(T(e),E())));const v=m.get('form_key'),g=m.get(r),y=v&&g;i.addEventListener('DOMContentLoaded',(()=>{const e=E();if(y)for(const t of e)t.elements[r].value===g&&c(t,v);[...new Set([..._(),...p().filter((e=>'true'===e.dataset.shopifyCaptcha))])].forEach((t=>h(t,e)))}))}(m,new URLSearchParams(i.location.search),_)})(window,document,'Shopify','ce_forms','captcha')}();</script>
<script integrity="sha256-n5Uet9jVOXPHGd4hH4B9Y6+BxkTluaaucmYaxAjUcvY=" data-source-attribution="shopify.loadfeatures" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/load_feature-9f951eb7d8d53973c719de211f807d63af81c644e5b9a6ae72661ac408d472f6.js" crossorigin="anonymous"></script>
<script integrity="sha256-HAs5a9TQVLlKuuHrahvWuke+s1UlxXohfHeoYv8G2D8=" data-source-attribution="shopify.dynamic-checkout" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/storefront/features-1c0b396bd4d054b94abae1eb6a1bd6ba47beb35525c57a217c77a862ff06d83f.js" crossorigin="anonymous"></script>
<script id="sections-script" data-sections="header" defer="defer" src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/compiled_assets/scripts.js?9"></script>

<style id="shopify-dynamic-checkout-cart">@media screen and (min-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 50px;
  }
}

@media screen and (max-width: 750px) {
  #dynamic-checkout-cart {
    min-height: 120px;
  }
}
</style><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');</script>


    <style data-shopify="">
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}

      @font-face {
  font-family: Assistant;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.3335c7bdaddf2501ddab87cdbd9be98f3870e10d.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=c87cc21930937be7b58be0734e244223473b6ace5523d0e7b06e828569a94f87") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n7.7c85f5c5cc1555de92cc7ef2790ee3cffe5237f5.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=ecf5788540c4284099475db4214e7a11fb203b27fde61807a6efab8d186b63d7") format("woff");
}

      
      
      @font-face {
  font-family: Assistant;
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d") format("woff2"),
       url("//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.a2d012304becc2a26f1ded1acc136fcab85c9afd.woff?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&hmac=824db7a0de18ed7c294176459c8b821ac9aca156aff61ac7a254001181bfb1fd") format("woff");
}


      
        :root,
        .color-scheme-1 {
          --color-background: 255,255,255;
        
          --gradient-background: #FFFFFF;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 191,191,191;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 255,255,255;
        --color-secondary-button: 255,255,255;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 255,255,255;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(255 255 255);
      }
      
        
        .color-scheme-2 {
          --color-background: 243,243,243;
        
          --gradient-background: #F3F3F3;
        

        

        --color-foreground: 18,18,18;
        --color-background-contrast: 179,179,179;
        --color-shadow: 18,18,18;
        --color-button: 18,18,18;
        --color-button-text: 243,243,243;
        --color-secondary-button: 243,243,243;
        --color-secondary-button-text: 18,18,18;
        --color-link: 18,18,18;
        --color-badge-foreground: 18,18,18;
        --color-badge-background: 243,243,243;
        --color-badge-border: 18,18,18;
        --payment-terms-background-color: rgb(243 243 243);
      }
      
        
        .color-scheme-3 {
          --color-background: 36,40,51;
        
          --gradient-background: #242833;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 47,52,66;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 0,0,0;
        --color-secondary-button: 36,40,51;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 36,40,51;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(36 40 51);
      }
      
        
        .color-scheme-4 {
          --color-background: 18,18,18;
        
          --gradient-background: #121212;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 146,146,146;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 18,18,18;
        --color-secondary-button: 18,18,18;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 18,18,18;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(18 18 18);
      }
      
        
        .color-scheme-5 {
          --color-background: 51,79,180;
        
          --gradient-background: #334FB4;
        

        

        --color-foreground: 255,255,255;
        --color-background-contrast: 23,35,81;
        --color-shadow: 18,18,18;
        --color-button: 255,255,255;
        --color-button-text: 51,79,180;
        --color-secondary-button: 51,79,180;
        --color-secondary-button-text: 255,255,255;
        --color-link: 255,255,255;
        --color-badge-foreground: 255,255,255;
        --color-badge-background: 51,79,180;
        --color-badge-border: 255,255,255;
        --payment-terms-background-color: rgb(51 79 180);
      }
      

      body, .color-scheme-1, .color-scheme-2, .color-scheme-3, .color-scheme-4, .color-scheme-5 {
        color: rgba(var(--color-foreground), 0.75);
        background-color: rgb(var(--color-background));
      }

      :root {
        --font-body-family: Assistant, sans-serif;
        --font-body-style: normal;
        --font-body-weight: 400;
        --font-body-weight-bold: 700;

        --font-heading-family: Assistant, sans-serif;
        --font-heading-style: normal;
        --font-heading-weight: 400;

        --font-body-scale: 1.0;
        --font-heading-scale: 1.0;

        --media-padding: px;
        --media-border-opacity: 0.05;
        --media-border-width: 1px;
        --media-radius: 0px;
        --media-shadow-opacity: 0.0;
        --media-shadow-horizontal-offset: 0px;
        --media-shadow-vertical-offset: 4px;
        --media-shadow-blur-radius: 5px;
        --media-shadow-visible: 0;

        --page-width: 120rem;
        --page-width-margin: 0rem;

        --product-card-image-padding: 0.0rem;
        --product-card-corner-radius: 0.0rem;
        --product-card-text-alignment: left;
        --product-card-border-width: 0.0rem;
        --product-card-border-opacity: 0.1;
        --product-card-shadow-opacity: 0.0;
        --product-card-shadow-visible: 0;
        --product-card-shadow-horizontal-offset: 0.0rem;
        --product-card-shadow-vertical-offset: 0.4rem;
        --product-card-shadow-blur-radius: 0.5rem;

        --collection-card-image-padding: 0.0rem;
        --collection-card-corner-radius: 0.0rem;
        --collection-card-text-alignment: left;
        --collection-card-border-width: 0.0rem;
        --collection-card-border-opacity: 0.1;
        --collection-card-shadow-opacity: 0.0;
        --collection-card-shadow-visible: 0;
        --collection-card-shadow-horizontal-offset: 0.0rem;
        --collection-card-shadow-vertical-offset: 0.4rem;
        --collection-card-shadow-blur-radius: 0.5rem;

        --blog-card-image-padding: 0.0rem;
        --blog-card-corner-radius: 0.0rem;
        --blog-card-text-alignment: left;
        --blog-card-border-width: 0.0rem;
        --blog-card-border-opacity: 0.1;
        --blog-card-shadow-opacity: 0.0;
        --blog-card-shadow-visible: 0;
        --blog-card-shadow-horizontal-offset: 0.0rem;
        --blog-card-shadow-vertical-offset: 0.4rem;
        --blog-card-shadow-blur-radius: 0.5rem;

        --badge-corner-radius: 4.0rem;

        --popup-border-width: 1px;
        --popup-border-opacity: 0.1;
        --popup-corner-radius: 0px;
        --popup-shadow-opacity: 0.05;
        --popup-shadow-horizontal-offset: 0px;
        --popup-shadow-vertical-offset: 4px;
        --popup-shadow-blur-radius: 5px;

        --drawer-border-width: 1px;
        --drawer-border-opacity: 0.1;
        --drawer-shadow-opacity: 0.0;
        --drawer-shadow-horizontal-offset: 0px;
        --drawer-shadow-vertical-offset: 4px;
        --drawer-shadow-blur-radius: 5px;

        --spacing-sections-desktop: 0px;
        --spacing-sections-mobile: 0px;

        --grid-desktop-vertical-spacing: 8px;
        --grid-desktop-horizontal-spacing: 8px;
        --grid-mobile-vertical-spacing: 4px;
        --grid-mobile-horizontal-spacing: 4px;

        --text-boxes-border-opacity: 0.1;
        --text-boxes-border-width: 0px;
        --text-boxes-radius: 0px;
        --text-boxes-shadow-opacity: 0.0;
        --text-boxes-shadow-visible: 0;
        --text-boxes-shadow-horizontal-offset: 0px;
        --text-boxes-shadow-vertical-offset: 4px;
        --text-boxes-shadow-blur-radius: 5px;

        --buttons-radius: 0px;
        --buttons-radius-outset: 0px;
        --buttons-border-width: 1px;
        --buttons-border-opacity: 1.0;
        --buttons-shadow-opacity: 0.0;
        --buttons-shadow-visible: 0;
        --buttons-shadow-horizontal-offset: 0px;
        --buttons-shadow-vertical-offset: 4px;
        --buttons-shadow-blur-radius: 5px;
        --buttons-border-offset: 0px;

        --inputs-radius: 0px;
        --inputs-border-width: 1px;
        --inputs-border-opacity: 0.55;
        --inputs-shadow-opacity: 0.0;
        --inputs-shadow-horizontal-offset: 0px;
        --inputs-margin-offset: 0px;
        --inputs-shadow-vertical-offset: 4px;
        --inputs-shadow-blur-radius: 5px;
        --inputs-radius-outset: 0px;

        --variant-pills-radius: 40px;
        --variant-pills-border-width: 1px;
        --variant-pills-border-opacity: 0.55;
        --variant-pills-shadow-opacity: 0.0;
        --variant-pills-shadow-horizontal-offset: 0px;
        --variant-pills-shadow-vertical-offset: 4px;
        --variant-pills-shadow-blur-radius: 5px;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
        font-size: calc(var(--font-body-scale) * 62.5%);
        height: 100%;
      }

      body {
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        grid-template-columns: 100%;
        min-height: 100%;
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 0.06rem;
        line-height: calc(1 + 0.8 / var(--font-body-scale));
        font-family: var(--font-body-family);
        font-style: var(--font-body-style);
        font-weight: var(--font-body-weight);
      }

      @media screen and (min-width: 750px) {
        body {
          font-size: 1.6rem;
        }
      }
    </style>

    <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/base.css?v=144968985024194912401719145824" rel="stylesheet" type="text/css" media="all">

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      

      <link rel="preload" as="font" href="//bf9fa1-7d.myshopify.com/cdn/fonts/assistant/assistant_n4.bcd3d09dcb631dec5544b8fb7b154ff234a44630.woff2?h1=YmY5ZmExLTdkLmFjY291bnQubXlzaG9waWZ5LmNvbQ&amp;hmac=486e2b259c0a73863a6ff63bcf5d2c79159ef00f3aee8bf063af13854c39e46d" type="font/woff2" crossorigin="">
      
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-predictive-search.css?v=118923337488134913561719145825" media="all" onload="this.media='all'"><script>
      if (Shopify.designMode) {
        document.documentElement.classList.add('shopify-design-mode');
      }
    </script>
  <link href="https://monorail-edge.shopifysvc.com" rel="dns-prefetch">
<script>(function(){if ("sendBeacon" in navigator && "performance" in window) {var session_token = document.cookie.match(/_shopify_s=([^;]*)/);function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 88131174695,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token: session_token && session_token.length === 2 ? session_token[1] : "",page_type: "index"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());</script>
<script id="web-pixels-manager-setup">(function e(e,n,a,t,r){var o="function"==typeof BigInt&&-1!==BigInt.toString().indexOf("[native code]")?"modern":"legacy";window.Shopify=window.Shopify||{};var i=window.Shopify;i.analytics=i.analytics||{};var s=i.analytics;s.replayQueue=[],s.publish=function(e,n,a){return s.replayQueue.push([e,n,a]),!0};try{self.performance.mark("wpm:start")}catch(e){}var l=[a,"/wpm","/b",r,o.substring(0,1),".js"].join("");!function(e){var n=e.src,a=e.async,t=void 0===a||a,r=e.onload,o=e.onerror,i=document.createElement("script"),s=document.head,l=document.body;i.async=t,i.src=n,r&&i.addEventListener("load",r),o&&i.addEventListener("error",o),s?s.appendChild(i):l?l.appendChild(i):console.error("Did not find a head or body element to append the script")}({src:l,async:!0,onload:function(){var a=window.webPixelsManager.init(e);n(a);var t=window.Shopify.analytics;t.replayQueue.forEach((function(e){var n=e[0],t=e[1],r=e[2];a.publishCustomEvent(n,t,r)})),t.replayQueue=[],t.publish=a.publishCustomEvent,t.visitor=a.visitor},onerror:function(){var n=e.storefrontBaseUrl.replace(/\/$/,""),a="".concat(n,"/.well-known/shopify/monorail/unstable/produce_batch"),r=JSON.stringify({metadata:{event_sent_at_ms:(new Date).getTime()},events:[{schema_id:"web_pixels_manager_load/2.0",payload:{version:t||"latest",page_url:self.location.href,status:"failed",error_msg:"".concat(l," has failed to load")},metadata:{event_created_at_ms:(new Date).getTime()}}]});try{if(self.navigator.sendBeacon.bind(self.navigator)(a,r))return!0}catch(e){}var o=new XMLHttpRequest;try{return o.open("POST",a,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(r),!0}catch(e){console&&console.warn&&console.warn("[Web Pixels Manager] Got an unhandled error while logging a load error.")}return!1}})})({shopId: 88131174695,storefrontBaseUrl: "https://bf9fa1-7d.myshopify.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",surface: "storefront-renderer",enabledBetaFlags: ["5de24938","4735909c"],webPixelsConfigList: [{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"APP","purposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0121","apiClientId":"shopify-pixel","type":"CUSTOM","purposes":["ANALYTICS","MARKETING"]}],initData: {"shop":{"name":"Media47 PRO","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"bf9fa1-7d.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/bf9fa1-7d.myshopify.com"},"cart":null,"checkout":null,"customer":null,"productVariants":[]},},function pageEvents(webPixelsManagerAPI) {webPixelsManagerAPI.publish("page_viewed");},"https://bf9fa1-7d.myshopify.com/cdn","86ea4c09ae6360f0e736a6f37e09325a0a76f28b","960565caw95f6f6d6pe10748f4mf4569064",);</script><script async="" src="https://bf9fa1-7d.myshopify.com/cdn/wpm/b960565caw95f6f6d6pe10748f4mf4569064m.js"></script>  <script>window.ShopifyAnalytics = window.ShopifyAnalytics || {};
window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
window.ShopifyAnalytics.meta.currency = 'USD';
var meta = {"page":{"pageType":"home"}};
for (var attr in meta) {
  window.ShopifyAnalytics.meta[attr] = meta[attr];
}</script>
<script>window.ShopifyAnalytics.merchantGoogleAnalytics = function() {
  
};
</script>
<script class="analytics">(function () {
    var customDocumentWrite = function(content) {
      var jquery = null;

      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }

      if (jquery) {
        jquery('body').append(content);
      }
    };

    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }

    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }

    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onerror = function(e) {
        var scriptFallback = document.createElement('script');
        scriptFallback.type = 'text/javascript';
        scriptFallback.onerror = function(error) {
                var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });

          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful

        } // XHR beacon

        var xhr = new XMLHttpRequest();

        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }

        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 88131174695,
      theme_id: 168610332967,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js"});

        };
        scriptFallback.async = true;
        scriptFallback.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
        first.parentNode.insertBefore(scriptFallback, first);
      };
      script.async = true;
      script.src = '//bf9fa1-7d.myshopify.com/cdn/s/trekkie.storefront.6feac1db1e2c7d84269967dcaefdee0618af51f6.min.js';
      first.parentNode.insertBefore(script, first);
    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":88131174695,"isMerchantRequest":null,"themeId":168610332967,"themeCityHash":"8070473428658909575","contentLanguage":"en","currency":"USD"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["bbcf04e6"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":false,"source":"trekkie-storefront-renderer"}}
    );

    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;

      window.ShopifyAnalytics.lib = window.trekkie;

  
      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;

      window.ShopifyAnalytics.lib.page(null,{"pageType":"home"});

      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
        
      }
    });


        var eventsListenerScript = document.createElement('script');
        eventsListenerScript.async = true;
        eventsListenerScript.src = "//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js";
        document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);

})();</script><script async="" src="//bf9fa1-7d.myshopify.com/cdn/shopifycloud/shopify/assets/shop_events_listener-61fa9e0a912c675e178777d2b27f6cbd482f8912a6b0aa31fa3515985a8cd626.js"></script>
<script class="boomerang">
(function () {
  if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {
    return;
  }
  window.BOOMR = window.BOOMR || {};
  window.BOOMR.snippetStart = new Date().getTime();
  window.BOOMR.snippetExecuted = true;
  window.BOOMR.snippetVersion = 12;
  window.BOOMR.application = "storefront-renderer";
  window.BOOMR.themeName = "Dawn";
  window.BOOMR.themeVersion = "15.0.0";
  window.BOOMR.shopId = 88131174695;
  window.BOOMR.themeId = 168610332967;
  window.BOOMR.renderRegion = "gcp-us-east1";
  window.BOOMR.url =
    "https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";
  var where = document.currentScript || document.getElementsByTagName("script")[0];
  var parentNode = where.parentNode;
  var promoted = false;
  var LOADER_TIMEOUT = 3000;
  function promote() {
    if (promoted) {
      return;
    }
    var script = document.createElement("script");
    script.id = "boomr-scr-as";
    script.src = window.BOOMR.url;
    script.async = true;
    parentNode.appendChild(script);
    promoted = true;
  }
  function iframeLoader(wasFallback) {
    promoted = true;
    var dom, bootstrap, iframe, iframeStyle;
    var doc = document;
    var win = window;
    window.BOOMR.snippetMethod = wasFallback ? "if" : "i";
    bootstrap = function(parent, scriptId) {
      var script = doc.createElement("script");
      script.id = scriptId || "boomr-if-as";
      script.src = window.BOOMR.url;
      BOOMR_lstart = new Date().getTime();
      parent = parent || doc.body;
      parent.appendChild(script);
    };
    if (!window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]./)) {
      window.BOOMR.snippetMethod = "s";
      bootstrap(parentNode, "boomr-async");
      return;
    }
    iframe = document.createElement("IFRAME");
    iframe.src = "about:blank";
    iframe.title = "";
    iframe.role = "presentation";
    iframe.loading = "eager";
    iframeStyle = (iframe.frameElement || iframe).style;
    iframeStyle.width = 0;
    iframeStyle.height = 0;
    iframeStyle.border = 0;
    iframeStyle.display = "none";
    parentNode.appendChild(iframe);
    try {
      win = iframe.contentWindow;
      doc = win.document.open();
    } catch (e) {
      dom = document.domain;
      iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
      win = iframe.contentWindow;
      doc = win.document.open();
    }
    if (dom) {
      doc._boomrl = function() {
        this.domain = dom;
        bootstrap();
      };
      doc.write("<body onload='document._boomrl();'>");
    } else {
      win._boomrl = function() {
        bootstrap();
      };
      if (win.addEventListener) {
        win.addEventListener("load", win._boomrl, false);
      } else if (win.attachEvent) {
        win.attachEvent("onload", win._boomrl);
      }
    }
    doc.close();
  }
  var link = document.createElement("link");
  if (link.relList &&
    typeof link.relList.supports === "function" &&
    link.relList.supports("preload") &&
    ("as" in link)) {
    window.BOOMR.snippetMethod = "p";
    link.href = window.BOOMR.url;
    link.rel = "preload";
    link.as = "script";
    link.addEventListener("load", promote);
    link.addEventListener("error", function() {
      iframeLoader(true);
    });
    setTimeout(function() {
      if (!promoted) {
        iframeLoader(true);
      }
    }, LOADER_TIMEOUT);
    BOOMR_lstart = new Date().getTime();
    parentNode.appendChild(link);
  } else {
    iframeLoader(false);
  }
  function boomerangSaveLoadTime(e) {
    window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
  }
  if (window.addEventListener) {
    window.addEventListener("load", boomerangSaveLoadTime, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", boomerangSaveLoadTime);
  }
  if (document.addEventListener) {
    document.addEventListener("onBoomerangLoaded", function(e) {
      e.detail.BOOMR.init({
        ResourceTiming: {
          enabled: true,
          trackedResourceTypes: ["script", "img", "css"]
        },
      });
      e.detail.BOOMR.t_end = new Date().getTime();
    });
  } else if (document.attachEvent) {
    document.attachEvent("onpropertychange", function(e) {
      if (!e) e=event;
      if (e.propertyName === "onBoomerangLoaded") {
        e.detail.BOOMR.init({
          ResourceTiming: {
            enabled: true,
            trackedResourceTypes: ["script", "img", "css"]
          },
        });
        e.detail.BOOMR.t_end = new Date().getTime();
      }
    });
  }
})();</script><link href="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" rel="preload" as="script">
<script id="boomr-scr-as" src="https://bf9fa1-7d.myshopify.com/cdn/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js" async=""></script><link rel="dns-prefetch preconnect" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.7700a4f0c9fe9fd8b12e.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.6d90f9ef17e5a7215238.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/3569.latest.en.9864dca70239bbd6697a.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.d3bc65d7a91c6d71a13d.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.3f6777dd67f84b88ff3c.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6846.latest.en.52b14d870951c1a5a741.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/8933.latest.en.fbecd6fcb2d3a7dec43b.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.latest.en.5460d8dcceec80be92e6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5137.latest.en.4cf74cdc91d53d11c8f6.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.latest.en.80dc15d80fb3eb83ddf0.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.latest.en.b20b76a18fc60dcdaa46.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="script" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.cda85ef5d501a62b91e8.js" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5835.latest.en.3975c63f818b50435dd4.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css" crossorigin=""><link rel="prefetch" fetchpriority="low" as="style" href="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.8039276cabb7faecfb04.css" crossorigin=""></head>

  <body class="gradient">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      Skip to content
    </a><!-- BEGIN sections: header-group -->
<div id="shopify-section-sections--22753037287719__announcement-bar" class="shopify-section shopify-section-group-header-group announcement-bar-section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slideshow.css?v=170654395204511176521719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">


<div class="utility-bar color-scheme-1 gradient utility-bar--bottom-border">
  <div class="page-width utility-bar__grid"><div class="announcement-bar" role="region" aria-label="Announcement"><p class="announcement-bar__message h5">
            <span>Welcome to our store</span></p></div><div class="localization-wrapper">
</div>
  </div>
</div>


</div><div id="shopify-section-sections--22753037287719__header" class="shopify-section shopify-section-group-header-group section-header"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-search.css?v=165164710990765432851719145825" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-menu-drawer.css?v=110695408305392539491719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-notification.css?v=54116361853792938221719145824" media="all" onload="this.media='all'">
<link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-cart-items.css?v=127384614032664249911719145824" media="all" onload="this.media='all'"><link rel="stylesheet" href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" media="all" onload="this.media='all'"><style>
  header-drawer {
    justify-self: start;
    margin-left: -1.2rem;
  }@media screen and (min-width: 990px) {
      header-drawer {
        display: none;
      }
    }.menu-drawer-container {
    display: flex;
  }

  .list-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-menu--inline {
    display: inline-flex;
    flex-wrap: wrap;
  }

  summary.list-menu__item {
    padding-right: 2.7rem;
  }

  .list-menu__item {
    display: flex;
    align-items: center;
    line-height: calc(1 + 0.3 / var(--font-body-scale));
  }

  .list-menu__item--link {
    text-decoration: none;
    padding-bottom: 1rem;
    padding-top: 1rem;
    line-height: calc(1 + 0.8 / var(--font-body-scale));
  }

  @media screen and (min-width: 750px) {
    .list-menu__item--link {
      padding-bottom: 0.5rem;
      padding-top: 0.5rem;
    }
  }
</style><style data-shopify="">.header {
    padding: 10px 3rem 10px 3rem;
  }

  .section-header {
    position: sticky; /* This is for fixing a Safari z-index issue. PR #2147 */
    margin-bottom: 0px;
  }

  @media screen and (min-width: 750px) {
    .section-header {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 990px) {
    .header {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }</style><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-disclosure.js?v=13653116266235556501719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/details-modal.js?v=25581673532751508451719145825" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/cart-notification.js?v=133508293167896966491719145824" defer="defer"></script>
<script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/search-form.js?v=133129549252120666541719145825" defer="defer"></script><svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <symbol id="icon-search" viewBox="0 0 18 19" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z" fill="currentColor"></path>
  </symbol>

  <symbol id="icon-reset" class="icon icon-close" fill="none" viewBox="0 0 18 18" stroke="currentColor">
    <circle r="8.5" cy="9" cx="9" stroke-opacity="0.2"></circle>
    <path d="M6.82972 6.82915L1.17193 1.17097" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
    <path d="M1.22896 6.88502L6.77288 1.11523" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 5)"></path>
  </symbol>

  <symbol id="icon-close" class="icon icon-close" fill="none" viewBox="0 0 18 17">
    <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
  </path></symbol>
</svg><sticky-header data-sticky-type="on-scroll-up" class="header-wrapper color-scheme-1 gradient header-wrapper--border-bottom"><header class="header header--middle-left header--mobile-center page-width header--has-menu">

<header-drawer data-breakpoint="tablet">
  <details id="Details-menu-drawer-container" class="menu-drawer-container">
    <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false" aria-controls="menu-drawer">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16">
  <path d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" fill="currentColor">
</path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
  <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
</path></svg>

      </span>
    </summary>
    <div id="menu-drawer" class="gradient menu-drawer motion-reduce color-scheme-1">
      <div class="menu-drawer__inner-container">
        <div class="menu-drawer__navigation-container">
          <nav class="menu-drawer__navigation">
            <ul class="menu-drawer__menu has-submenu list-menu" role="list"><li><a id="HeaderDrawer-home" href="/" class="menu-drawer__menu-item list-menu__item link link--text focus-inset menu-drawer__menu-item--active" aria-current="page">
                      Home
                    </a></li><li><a id="HeaderDrawer-catalog" href="/collections/all" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Catalog
                    </a></li><li><a id="HeaderDrawer-contact" href="/pages/contact" class="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      Contact
                    </a></li></ul>
          </nav>
          <div class="menu-drawer__utility-links"><div class="menu-drawer__localization header-localization">
</div><ul class="list list-social list-unstyled" role="list"></ul>
          </div>
        </div>
      </div>
    </div>
  </details>
</header-drawer>
<h1 class="header__heading"><a href="/" class="header__heading-link link link--text focus-inset"><span class="h2">${slug}</span></a></h1>

<nav class="header__inline-menu">
  <ul class="list-menu list-menu--inline" role="list"><li><a id="HeaderMenu-home" href="/" class="header__menu-item list-menu__item link link--text focus-inset" aria-current="page">
            <span class="header__active-menu-item">Home</span>
          </a></li><li><a id="HeaderMenu-catalog" href="/collections/all" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Catalog</span>
          </a></li><li><a id="HeaderMenu-contact" href="/pages/contact" class="header__menu-item list-menu__item link link--text focus-inset">
            <span>Contact</span>
          </a></li></ul>
</nav>

<div class="header__icons header__icons--localization header-localization">
      <div class="desktop-localization-wrapper">
</div>
      

<details-modal class="header__search">
  <details>
    <summary class="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-haspopup="dialog" aria-label="Search" role="button">
      <span>
        <svg class="modal__toggle-open icon icon-search" aria-hidden="true" focusable="false">
          <use href="#icon-search">
        </use></svg>
        <svg class="modal__toggle-close icon icon-close" aria-hidden="true" focusable="false">
          <use href="#icon-close">
        </use></svg>
      </span>
    </summary>
    <div class="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="Search">
      <div class="modal-overlay"></div>
      <div class="search-modal__content search-modal__content-bottom" tabindex="-1"><predictive-search class="search-modal__form" data-loading-text="Loading..."><form action="/search" method="get" role="search" class="search search-modal__form">
          <div class="field">
            <input class="search__input field__input" id="Search-In-Modal" type="search" name="q" value="" placeholder="Search" role="combobox" aria-expanded="false" aria-owns="predictive-search-results" aria-controls="predictive-search-results" aria-haspopup="listbox" aria-autocomplete="list" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false">
            <label class="field__label" for="Search-In-Modal">Search</label>
            <input type="hidden" name="options[prefix]" value="last">
            <button type="reset" class="reset__button field__button hidden" aria-label="Clear search term">
              <svg class="icon icon-close" aria-hidden="true" focusable="false">
                <use xlink:href="#icon-reset">
              </use></svg>
            </button>
            <button class="search__button field__button" aria-label="Search">
              <svg class="icon icon-search" aria-hidden="true" focusable="false">
                <use href="#icon-search">
              </use></svg>
            </button>
          </div><div class="predictive-search predictive-search--header" tabindex="-1" data-predictive-search="">

<div class="predictive-search__loading-state">
  <svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
  </svg>
</div>
</div>

            <span class="predictive-search-status visually-hidden" role="status" aria-hidden="true"></span></form></predictive-search><button type="button" class="search-modal__close-button modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
    </div>
  </details>
</details-modal>

<a href="/cart" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble"><svg class="icon icon-cart-empty" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <path d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
<span class="visually-hidden">Cart</span></a>
    </div>
  </header>
</sticky-header>

<cart-notification>
  <div class="cart-notification-wrapper page-width">
    <div id="cart-notification" class="cart-notification focus-inset color-scheme-1 gradient" aria-modal="true" aria-label="Item added to your cart" role="dialog" tabindex="-1">
      <div class="cart-notification__header">
        <h2 class="cart-notification__heading caption-large text-body"><svg class="icon icon-checkmark" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 9" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
</svg>
Item added to your cart
        </h2>
        <button type="button" class="cart-notification__close modal__close-button link link--text focus-inset" aria-label="Close">
          <svg class="icon icon-close" aria-hidden="true" focusable="false">
            <use href="#icon-close">
          </use></svg>
        </button>
      </div>
      <div id="cart-notification-product" class="cart-notification-product"></div>
      <div class="cart-notification__links">
        <a href="/cart" id="cart-notification-button" class="button button--secondary button--full-width">View cart</a>
        <form action="/cart" method="post" id="cart-notification-form">
          <button class="button button--primary button--full-width" name="checkout">
            Check out
          </button>
        </form>
        <button type="button" class="link button-label">Continue shopping</button>
      </div>
    </div>
  </div>
</cart-notification>
<style data-shopify="">
  .cart-notification {
    display: none;
  }
</style>


<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "Media47 PRO",
    
    "sameAs": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "url": "https:\/\/bf9fa1-7d.myshopify.com"
  }
</script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "Media47 PRO",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https:\/\/bf9fa1-7d.myshopify.com\/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "url": "https:\/\/bf9fa1-7d.myshopify.com"
    }
  </script>
</div>
<!-- END sections: header-group -->

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      <section id="shopify-section-template--22753036796199__image_banner" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-image-banner.css?v=124819179385751388401719145825" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">#Banner-template--22753036796199__image_banner::after {
    opacity: 0.4;
  }</style><div id="Banner-template--22753036796199__image_banner" class="banner banner--content-align-center banner--content-align-mobile-center banner--large banner--desktop-transparent scroll-trigger animate--fade-in"><div class="banner__media media placeholder scroll-trigger animate--fade-in">
      <svg class="placeholder-svg" preserveAspectRatio="xMaxYMid slice" viewBox="0 0 1300 730" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_779_1238)"><path d="M1300 410H0v320h1300V410Z" fill="#5BA7B1"></path><path d="M1300 0H0v410h1300V0Z" fill="#E8BE9E"></path><path d="M474 410c28.51-39.81 73.78-89.8 142-120 113.63-50.31 194.66-3.1 266-52 41.04-28.12 81.7-89.98 80-238h338v410H474Z" fill="#EDAB8E"></path><path d="M1174 0c-4.57 45.64-17.01 110.48-52 180-69.25 137.58-182.37 205.13-230 230h408V0h-126Z" fill="#EA9A81"></path><path d="M126 410c124.14 0 213.59-14.83 242-66 38.93-70.13-74.2-158.33-34-262 15.92-41.06 49.03-66.82 74-82H0v410h126Z" fill="#EDAB8E"></path><path d="M126 410c-68.88-117.13-69.26-250.08-2-334 36.03-44.96 83.52-65.93 116-76H0v410h126Z" fill="#EA9A81"></path><path d="M442 410h88c-3.51-10.52-7.01-21.04-10.52-31.56-1.16-3.48-6.05-3.57-7.34-.14-1.42 3.8-2.85 7.6-4.27 11.39-1.29 3.44-6.18 3.35-7.34-.14l-7.65-22.96c-1.08-3.25-5.52-3.62-7.13-.6-2.61 4.89-5.22 9.79-7.83 14.68-1.55 2.91-5.79 2.69-7.04-.36-3.69-9.02-7.38-18.03-11.06-27.05-1.35-3.29-6.03-3.21-7.26.13l-10.53 28.59v28l-.03.02Z" fill="#108060"></path><path d="M1300 224H758.35c-2.89 0-3.07-4.27-.19-4.51l75.83-6.32A92.708 92.708 0 0 0 896.78 181l30.62-35.85c14.34-16.79 39.96-17.8 55.57-2.18l12.34 12.34c21.76 21.76 57.58 19.93 77-3.95l34.73-42.7c25.81-31.73 74.62-30.56 98.88 2.36 19.11 25.93 56.68 29.09 79.85 6.72l14.24-13.75v120l-.01.01Z" fill="#F7E1D5"></path><path d="M220.89 256h405.42c2.16 0 2.3-3.2.14-3.38l-56.76-4.73a69.338 69.338 0 0 1-46.99-24.08l-22.92-26.83c-10.74-12.57-29.91-13.32-41.6-1.63l-9.24 9.24c-16.29 16.29-43.1 14.91-57.63-2.96l-25.99-31.96c-19.32-23.75-55.85-22.87-74.01 1.77L264.3 208.1 212 222.22l8.89 33.78Z" fill="#EAD1C1"></path><path d="m980 410 73.94-92.43a55.18 55.18 0 0 1 35.49-20.18l33.63-4.67a55.168 55.168 0 0 0 37.31-22.58l35.94-50.31c8.42-11.79 25.37-13.3 35.75-3.19l67.94 66.24V410H980Z" fill="#9FA5AB"></path><path opacity=".3" d="M1214.49 209.95c-6.95.32-13.75 3.67-18.18 9.87l-35.94 50.31a55.168 55.168 0 0 1-37.31 22.58l-33.63 4.67a55.132 55.132 0 0 0-35.49 20.18L980 409.99h178l58.33-104.66c5.57-9.99 3.05-22.54-5.95-29.61a23.25 23.25 0 0 1-7.94-24.85l12.04-40.94.01.02Z" fill="#D2D5D9"></path><path d="m464 410-46.64-91.42a12.72 12.72 0 0 0-10.74-6.92l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.86 6.86 0 0 0-8.35-4.02L0 164v246s.06.02.09 0H464Z" fill="#818990"></path><path d="m96 410 6-66 21-56c1.03-2.73 4.9-2.71 5.89.04l12.38 34.4c.97 2.69 4.74 2.79 5.84.15l9.65-22.91c1.12-2.67 4.95-2.52 5.87.23l12.46 37.38c.95 2.84 4.95 2.87 5.94.04l7.24-20.67c1.05-3 5.39-2.72 6.03.4l6.24 29.93c.56 2.68 4.04 3.41 5.63 1.18l12.31-17.24c1.48-2.07 4.68-1.61 5.52.79l10.63 30.55c1.02 2.93 5.21 2.76 6-.23l4.5-17.11c.81-3.08 5.16-3.13 6.05-.08l8.73 29.92c.78 2.68 4.4 3.08 5.76.65l12.7-22.86c1.35-2.44 4.97-2.03 5.76.65l9.5 32.56c.82 2.81 4.69 3.07 5.88.4l8.75-19.69c1.22-2.74 5.22-2.37 5.92.55l6.1 25.6c.65 2.72 4.26 3.3 5.72.92l8.26-13.42c1.44-2.33 4.96-1.83 5.7.8l8.07 29.07H96Z" fill="#02614E"></path><path d="M0 410h218l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15a39.436 39.436 0 0 1-25.57-30.02L102 279.66a39.44 39.44 0 0 0-24.53-29.63L0 220v190Z" fill="#686E72"></path><path d="M0 410h88c-3.73-11.18-7.46-22.37-11.18-33.55-.94-2.82-4.9-2.89-5.95-.11-1.91 5.11-3.83 10.21-5.74 15.32-1.04 2.78-5.01 2.71-5.95-.11l-8.86-26.59c-.88-2.63-4.47-2.93-5.78-.49-3.13 5.87-6.26 11.73-9.39 17.6-1.26 2.36-4.69 2.18-5.7-.29-4.13-10.09-8.26-20.18-12.38-30.27-1.09-2.66-4.88-2.6-5.88.1C7.46 361.74 3.73 371.87 0 381.99V410Z" fill="#02614E"></path><path d="m636.01 410 36.48-43.78c14.28-17.14 37.37-24.17 58.78-17.92l59.17 17.3c21.57 6.3 44.82-.88 59.06-18.26l53.45-65.19c3.24-3.95 7.88-6.51 12.95-7.15l16.59-2.07a51.1 51.1 0 0 1 40.94 13.11L1108 409.99H636l.01.01Z" fill="#818990"></path><path d="m1279.24 295.49-12.18 41.97c-.91 3.13-5.33 3.17-6.29.05l-9.05-29.41c-1-3.24-5.64-3.03-6.35.28l-9.35 44.07c-.65 3.08-4.84 3.56-6.18.72l-7.92-16.84c-1.31-2.79-5.41-2.39-6.15.6l-5.64 22.58c-.74 2.94-4.73 3.4-6.11.7l-15.16-29.66c-1.36-2.67-5.3-2.26-6.09.63l-7.07 25.92c-.84 3.08-5.14 3.27-6.25.27l-6.49-17.62c-1.14-3.1-5.62-2.76-6.29.47l-6.46 31.11c-.66 3.18-5.05 3.57-6.26.55l-12.18-30.46c-1.18-2.96-5.46-2.67-6.23.42l-8.87 35.48c-.79 3.16-5.21 3.36-6.28.28l-8.77-25.21c-1.07-3.08-5.49-2.88-6.28.28l-6.1 24.4c-.77 3.09-5.05 3.38-6.23.42l-7.67-19.18c-1.14-2.84-5.19-2.72-6.16.18l-10.21 30.62c-.98 2.94-5.12 3.01-6.19.1l-7.89-21.41c-1.03-2.79-4.95-2.88-6.1-.14l-9.33 22.17c-1.18 2.81-5.22 2.63-6.15-.27l-12.04-37.45c-.99-3.07-5.35-3.02-6.27.07l-10.43 35.2c-.87 2.93-4.93 3.19-6.15.38l-7.13-16.3c-1.18-2.71-5.06-2.59-6.09.18l-7.76 21.07c-1.09 2.96-5.33 2.83-6.23-.2-3.37-11.38-6.74-22.76-10.12-34.15-.92-3.11-5.32-3.14-6.28-.04-3.9 12.55-7.79 25.1-11.69 37.65-.95 3.07-5.3 3.08-6.26.02l-6.47-20.48c-.88-2.78-4.68-3.12-6.04-.53l-18.34 35.01h404v-76l-14.53-38.75c-1.11-2.96-5.34-2.8-6.22.24l-.02.01Z" fill="#02614E"></path><path d="M576 186c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64Z" fill="#EAD1C1"></path><path d="M576 170c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48Z" fill="#fff"></path><path d="m264.3 269.34 4.38 12.32c11.72 32.97 41.95 55.78 76.87 58.01a87.466 87.466 0 0 0 63.73-21.95l4.15-3.69a12.71 12.71 0 0 0-6.82-2.37l-55.29-2.51c-15.35-.7-28.79-10.52-34.11-24.93l-30.7-83.14c-5.19-14.05-18.11-23.78-33.05-24.87l-33.65-2.46a38.223 38.223 0 0 1-32.69-23.92l-12.8-31.99a6.822 6.822 0 0 0-3.17-3.51l-10.98 32.29c-11.16 32.84 6.32 68.52 39.11 79.83l33.29 11.48a51.472 51.472 0 0 1 31.72 31.41h.01Z" fill="#9FA5AB"></path><path d="M51.84 244.38a39.431 39.431 0 0 1 16.74 34.63l-1.91 32.43a39.42 39.42 0 0 0 17.67 35.25l45.23 29.81a39.47 39.47 0 0 1 17.51 28.69l.52 4.8h70.52l-9.65-26.54a39.431 39.431 0 0 0-23.85-23.68l-51.05-18.15A39.436 39.436 0 0 1 108 311.6l-5.89-31.95a39.44 39.44 0 0 0-24.53-29.63L38 234.67l13.84 9.7v.01Z" fill="#818990"></path><path d="m756.08 443.99.04.01-.04-.01Z" fill="#686E72"></path><path opacity=".8" d="m790.66 365.67 39.39 11.51c21.9 6.4 45.55.69 62.12-14.99a64.199 64.199 0 0 0 19.25-56.93l-4.38-26.98a19.967 19.967 0 0 0-4.21 3.85l-53.45 65.19a56.03 56.03 0 0 1-58.71 18.35h-.01ZM706 388c-.24-15.7 16.55-32.5 41.81-34.86l-16.54-4.84c-21.41-6.26-44.5.78-58.78 17.92L636.01 410H718c-3.29-2.83-11.83-10.97-12-22Z" fill="#9FA5AB"></path><path d="M416.96 410a27.009 27.009 0 0 0 17.23 10.44l74.31 12.16c4.49.73 4.13 7.3-.41 7.54l-90.19 4.96c-4.91.27-4.9 7.51.01 7.77l95.5 4.97c4.71.25 5.01 7.08.34 7.74l-77.82 10.96c-4.62.65-4.39 7.4.27 7.73L558.37 493c6.93.49 7.28 10.54.41 11.52l-26.87 3.84c-4.68.67-4.34 7.53.38 7.74l118.58 5.33c4.61.21 5.09 6.85.55 7.71l-30.86 5.88c-4.44.85-4.11 7.31.39 7.7l41.36 3.57c37.51 3.23 75.27 1.58 112.35-4.93l42.85-7.52c4.39-.77 4.25-7.11-.17-7.69l-88.29-11.52c-4.63-.6-4.47-7.35.18-7.74l70.24-5.77c4.8-.39 4.75-7.44-.06-7.76l-63.91-4.32c-4.75-.32-4.88-7.25-.15-7.75l112.28-11.82c4.77-.5 4.58-7.51-.2-7.76l-91.17-4.75c-6.25-.33-6.45-9.48-.22-10.08l30.04-2.91c4.65-.45 4.7-7.22.06-7.74l-52.89-5.97c-4.63-.52-4.44-7.31.22-7.57l58.3-3.24c9.03-.5 17.68-3.81 24.74-9.46H416.94l.02.01Z" fill="#63B5B1"></path><path d="M0 478c15.69 2.92 39.93 5.53 68 0 42.62-8.4 48.21-26.53 84-34 45.2-9.43 57.35 15.07 114 14 9.94-.19 18.2-1.11 25.64-2.55 36.52-7.09 62.17-18.56 68.36-21.45 22.81-10.63 66.5-17.19 157.8-.42 67.4-3.19 134.8-6.39 202.2-9.58 6.3-.79 18.55-2.14 33.98-2.49 57.4-1.32 91.51 12.68 158.02 16.49 17.53 1 29.44.78 43.36-1.93 24.93-4.85 34.21-15.04 78.64-12.07 71.18 4.75 89.94 33.73 158 38 45.51 2.86 83.37-7.2 108-16v-36H0v68Z" fill="#63B5B1"></path><path opacity=".5" d="m425.74 101.25 12.14 6.54a6.7 6.7 0 0 0 6.98-.39l10.76-7.46c1.24-.86.32-2.8-1.13-2.37l-10.43 3.05c-2.24.65-4.6.76-6.89.32l-10.59-2.06c-1.44-.28-2.14 1.69-.85 2.38l.01-.01ZM729.78 162.53l11.66 7.35a6.686 6.686 0 0 0 6.99.09l11.25-6.7c1.3-.77.51-2.77-.97-2.44l-10.61 2.32c-2.28.5-4.64.45-6.89-.15l-10.42-2.78c-1.42-.38-2.25 1.54-1.01 2.32v-.01Z" fill="#964F48"></path><path opacity=".75" d="m656.07 194.86 16.65 2.66a8.18 8.18 0 0 0 7.91-3.26l9.43-12.95c1.09-1.49-.76-3.36-2.26-2.28l-10.82 7.72a17.873 17.873 0 0 1-7.83 3.14l-13.06 1.89c-1.78.26-1.79 2.81-.02 3.09v-.01Z" fill="#964F48"></path><path d="m695.71 113.63 12.93 12.86a8.834 8.834 0 0 0 9 2.13l16.46-5.4c1.9-.62 1.46-3.42-.54-3.43l-14.37-.06c-3.08-.01-6.12-.77-8.85-2.19l-12.65-6.6c-1.72-.9-3.35 1.33-1.98 2.7v-.01Z" fill="#964F48"></path><path d="M894.938 386.359c-13.528-2.239-26.508 6.204-29.834 19.39l-4.757 17.749a44.424 44.424 0 0 0 0 21.713c2.119 8.43 8.757 15.009 17.26 17.109 5.908 1.461 9.304 7.609 7.381 13.326L877.172 499h37.145L920 420.202l-25.076-33.857.014.014Z" fill="#E8BE9E"></path><path d="m911 466 7.311 29.252L920.224 506h6.612L929 466h-18Z" fill="#EA9A81"></path><path d="m865.215 624.829-52.827-51.996c-9.913-9.757-23.901-14.346-37.776-12.39-17.18 2.412-31.364 14.429-36.348 30.788l-11.005 36.107c-1.162 3.817 1.736 7.662 5.796 7.662h127.89c5.39 0 8.079-6.408 4.27-10.157v-.014Z" fill="#2E5157"></path><path d="m744.04 632.85 10.992-36.111c4.979-16.36 19.145-28.379 36.305-30.791a44.677 44.677 0 0 1 11.663-.096 45.066 45.066 0 0 0-28.445-5.417c-17.159 2.412-31.326 14.431-36.305 30.791l-10.992 36.111c-1.16 3.818 1.735 7.663 5.79 7.663h10.754a6.013 6.013 0 0 1 .238-2.15Z" fill="#3C7980"></path><path d="M819.933 546c-1.406 3.619-2.617 7.307-3.55 11.063L797 635h29.492L857 572.915 819.947 546h-.014Z" fill="#E8BE9E"></path><path d="M954.273 598.986a80.22 80.22 0 0 0 35.466-32.084l7.624-12.954c18.687-31.722 5.937-72.604-27.437-88.137-10.528-4.895-16.993-15.715-15.932-27.26l2.164-23.732c1.215-13.275-2.904-26.619-11.897-36.463-14.856-16.286-38.649-19.911-57.472-9.467l-14.075 7.808c-7.386 4.099-10.612 12.995-7.582 20.86l10.515 27.315a107.614 107.614 0 0 0 52.375 57.601c19.256 9.621 25.469 34.078 13.112 51.689l-19.688 28.083L954.259 599l.014-.014Z" fill="#6E3A35"></path><path opacity=".75" d="m938.181 562.986 19.499-27.951c12.225-17.529 6.085-41.871-12.986-51.448-23.813-11.949-42.317-32.392-51.873-57.332l-10.413-27.188c-3.001-7.827.207-16.681 7.509-20.762l13.94-7.772c5.781-3.22 12.031-5.065 18.351-5.634-11.685-3.442-24.533-2.249-35.637 3.941l-13.94 7.772c-7.316 4.08-10.51 12.935-7.509 20.762l10.413 27.188c9.556 24.94 28.059 45.383 51.873 57.332 19.07 9.576 25.224 33.919 12.986 51.448l-19.5 27.951L938.181 563v-.014Z" fill="#AF5947"></path><path d="M973.436 592.368c-.621-16.691-4.045-32.654-9.993-47.368L934 574.442 951.167 635H975l-1.579-42.632h.015Z" fill="#E8BE9E"></path><path d="M969 559.741c-1.419-5.037-3.082-9.964-5.059-14.741L934 574.442 951.457 635h15.665l-12.598-43.703c-2.408-8.359 0-17.322 6.307-23.526l8.155-8.016.014-.014Z" fill="#EA9A81"></path><path d="M945.231 561.25 962 543.979c-6.536-16.619-16.174-31.641-28.581-44.303-7.366-7.511-17.655-11.676-28.926-11.676h-18.002c-9.568 0-19.303 2.999-27.874 8.566-18.154 11.815-32.126 29.128-39.617 48.635l24.108 21.339c4.32 4.318 5.456 10.898 2.852 16.424L824.137 635h105.447l2.575-45.039c.596-10.398 5.29-20.714 13.072-28.725v.014Z" fill="#02614E"></path><path opacity=".25" d="M962 543.948c-6.397-16.622-15.83-31.647-27.974-44.311-6.804-7.096-16.17-11.207-26.47-11.637l12.022 40.048a99.609 99.609 0 0 1 1.125 53.129L907 635h23.271l2.521-45.047c.583-10.401 5.178-20.718 12.795-28.731L962 543.948Z" fill="#142924"></path><path d="M863.006 501.368c4.692-5.373 10.126-9.885 15.994-13.368-6.919 1.213-13.739 3.892-19.93 7.953-18.361 12-32.493 29.585-40.07 49.397L834.35 559c4.314-20.94 14.16-41.035 28.656-57.618v-.014Z" fill="#00735C"></path><path d="M494 630.718v-51.341c0-9.728 7.693-17.945 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.374-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.377 18.377 0 0 1-1.477-7.206l-.014.028Z" fill="#975D48"></path><path d="M471 632.718v-51.341c0-9.728 7.693-17.946 18.007-19.234l144.139-17.973c9.282-1.15 18.229 3.63 21.867 11.695l37.366 82.95c2.467 5.488 2.104 11.738-.99 16.948l-18.578 31.262c-3.791 6.375-11.066 10.213-18.857 9.964l-145.714-4.698c-8.223-.263-15.498-5.044-18.55-12.181l-17.199-40.214a18.376 18.376 0 0 1-1.477-7.205l-.014.027Z" fill="#BF8563"></path><path opacity=".5" d="M557.941 687.156 541.061 556 517 559.089l16.664 129.508a6.902 6.902 0 0 0 2.899 4.807l18.113.596a6.439 6.439 0 0 0 1.639-1.358 7.008 7.008 0 0 0 1.626-5.472v-.014ZM636.059 691.273a6.993 6.993 0 0 0 6.569 5.351l11.133.376h.238c2.157 0 4.16-.961 5.49-2.647 1.331-1.686 1.821-3.846 1.317-5.922L626.662 545 602 548.079c.028.223.07.46.126.683l33.919 142.497.014.014Z" fill="#975D48"></path><path d="M530.223 558.016c-.468-3.43-3.489-6.016-7.021-6.016-.312 0-.624.014-.936.055l-11.106 1.439c-3.872.497-6.609 3.982-6.099 7.758l17.46 129.359c.454 3.36 3.305 5.891 6.794 6.002l11.347.387h.241a7.18 7.18 0 0 0 5.333-2.351 6.778 6.778 0 0 0 1.702-5.462l-17.701-131.185-.014.014ZM648.837 690.47l-33.746-144.113c-.743-3.159-3.495-5.357-6.686-5.357-.303 0-.606.014-.908.056l-10.524 1.419a6.902 6.902 0 0 0-4.76 2.95 7.061 7.061 0 0 0-1.032 5.552L624.5 693.281c.716 3.047 3.371 5.246 6.452 5.343l10.937.376h.234c2.119 0 4.086-.96 5.393-2.644a6.97 6.97 0 0 0 1.293-5.913l.028.027Z" fill="#6D493C"></path><path d="m1137.25 392.823-26.98-23.175c-7.2-6.174-17.37-7.453-25.7-3.01-9.63 5.133-17 14.246-19.86 25.482l-.37 1.491a109.471 109.471 0 0 0-2.37 41.372c.61 4.515 2.69 8.691 5.92 11.841a19.422 19.422 0 0 0 10.87 5.358l10.65.717c4.08.802 6.57 5.035 5.34 9.071 0 0-1.85 6.089-3.45 11.335 9.59 3.796 19.46 5.695 29.33 5.695 9.21 0 18.42-1.688 27.37-4.978-4.93-5.949-8.17-15.315-7.51-21.84l4.9-38.011c1.04-8.058-2.03-16.102-8.12-21.348h-.02Z" fill="#975D48"></path><path opacity=".5" d="M1131.49 470.042 1148 473c-4.98-5.792-8.26-14.926-7.59-21.265l4.95-37.013-6.6-10.722-11.98 45.078c-1.95 7.326-.18 15.117 4.73 20.951l-.02.013Z" fill="#6D493C"></path><path d="m1161.96 402.99-1.18-25.362c-.87-13.77-11.14-25.419-24.75-27.027-3.17-.375-6.19-.194-8.75.61a20.941 20.941 0 0 1-17.26-2.163l-5.88-3.633a29.637 29.637 0 0 0-34.75 2.634l-.09.083c-4.16 3.842-6.73 9.125-7.23 14.797-.58 6.683 2.38 13.173 7.65 17.167 1.61 1.22 3.05 2.635 4.36 4.174 4.29 5.075 6.5 11.551 6.67 18.207.05 2.177-.06 4.119-.33 5.464l-.22 1.081c-.68 3.231 1.65 6.31 4.92 6.546.35.027.71 0 1.08-.07 1.77-.346 3.01-1.872 3.38-3.647 1.1-5.283 4.92-9.166 9.46-9.166 5.42 0 9.8 5.519 9.8 12.328 0 3.564-1.2 6.767-3.13 9.014-3.49 4.076-3.46 10.22-.15 14.449a18.682 18.682 0 0 0 6.31 5.158c2.54 1.29 5.35 1.886 8.19 1.983l12.66.375a18.64 18.64 0 0 0 15.57-7.585l5.41-7.378c.4-.554.8-1.109 1.17-1.678 5.15-7.737 7.45-17.042 7.09-26.361Z" fill="#142924"></path><path opacity=".25" d="m1077.42 364.743.1-.081c10.97-8.995 20.24-10.145 32.47-2.854l6.57 3.923a24.105 24.105 0 0 0 19.29 2.34c8.85-2.705 15.65-2.056 24.15 1.366-3.43-10.064-12.34-17.801-23.47-19.072-3.19-.365-6.22-.189-8.8.595-5.84 1.772-12.17 1.001-17.38-2.11l-5.92-3.544c-11.02-6.574-25.12-5.546-35 2.57l-.08.081c-4.19 3.747-6.78 8.9-7.28 14.433-.57 6.452 2.34 12.714 7.53 16.61a24.355 24.355 0 0 1 7.84-14.257h-.02Z" fill="#6B7177"></path><path d="M1217 571.844 1249.18 541l39.82 86.272-33.9 2.728-38.1-58.156ZM1056 584.222 1017.4 562a1983.872 1983.872 0 0 0-23.4 95.638c10.25 3.375 20.39 6.833 29.06 10.362l32.93-83.778h.01Z" fill="#975D48"></path><path d="M1072.4 481.732c-10.04 5.728-19.03 13.161-26.38 22.088-9.86 11.945-17.59 25.259-23.14 39.356-.23.559-.45 1.118-.66 1.677-2.44 6.231-4.63 10.506-6.22 16.989l21.32 15.409 25.26 3.647 5.59-10.66c.94 29.116-5.2 55.646-4.13 84.762a2012.614 2012.614 0 0 1 160.89-.489c-5.34-33.475-14.87-64.406-21.41-97.839 3.65 4.764 5.87 10.716 9.44 15.494 7.25-.307 14.51-.573 21.76-.796 4.69-7.545 14.45-18.791 19.28-26.308-3.98-6.077-8.01-12.126-12.11-18.176-14.09-18.986-32.73-34.927-54.82-46.691L1158.58 473a92.251 92.251 0 0 1-8.45 4.596c-11.71 5.631-24.18 8.662-36.77 8.872-13.42.21-23.58-1.649-35.83-7.684l-5.14 2.934.01.014Z" fill="#DE6A5A"></path><path opacity=".1" d="M1068.87 495.403c.13-.111.25-.222.38-.319a567.35 567.35 0 0 1 3.56-3.133 84.583 84.583 0 0 1 10.19-7.624c-2.8-.957-5.55-2.093-8.25-3.327l-2.69 1.539c-9.98 5.683-18.91 13.058-26.22 21.916-9.8 11.852-17.49 25.063-23 39.05-.23.555-.45 1.109-.66 1.664-2.42 6.182-4.6 10.424-6.18 16.856l8.28 5.975c1.45-5.24 3.17-10.425 5.2-15.498.22-.569.44-1.137.68-1.691 8.29-20.78 21.24-39.868 38.74-55.394l-.03-.014Z" fill="#F7E1D5"></path><path d="M1241.86 527.309c-12.03-16.169-27.39-30.133-45.37-41.182-5.07-3.111-10.38-5.817-15.86-8.147l-18.69-7.98c-2.77 1.688-10.08 8.273-12.94 9.64l3.38 1.186c22.55 28.236 32.78 65.902 28.39 101.741L1172.64 649c10.58-.098 40.7-.112 51.29-.056-4.9-30.231-13.89-57.923-19.77-88.112 3.4 3.488 5.38 8.161 8.72 11.663 13.51-.572 30.99-11.342 38.17-22.488l2.95-4.576a1284.8 1284.8 0 0 0-12.13-18.15l-.01.028Z" fill="#CD5747"></path><path d="m1016.92 560.014-3.44 10.32a9.342 9.342 0 0 0 4.04 10.964c8.09 4.899 20.37 10.238 30.03 12.461 4.07.947 8.27-.961 10.32-4.57l5.13-8.989c-15.69-1.825-36.49-10.127-46.06-20.2l-.02.014Z" fill="#F7E1D5"></path><path d="M1252.85 546c-10.61 12.254-28.02 23.477-41.85 27.046 2.09 2.872 4.61 5.897 6.95 8.867 2.19 2.76 5.95 3.806 9.29 2.579 9.06-3.332 22.49-12.059 30.14-19.016 2.83-2.579 3.46-6.762 1.44-9.982a2476.29 2476.29 0 0 0-5.97-9.494Z" fill="#E8BE9E"></path><path d="M1151.47 463.304a9.745 9.745 0 0 0-7.1.895c-9.8 5.395-20.34 8.334-30.94 8.519-6.92.113-13.83-.952-20.49-3.138a9.678 9.678 0 0 0-7.26.483l-7.99 6.02c-2.57 1.931-2.13 6.048.79 7.326 11.04 4.813 23.7 7.78 35.06 7.582 8.67-.142 18.38-2.088 27.36-5.225 6.1-2.13 11.8-5.381 16.9-9.499l3.7-2.996c2.4-1.931 1.82-5.835-1.02-6.928-3.03-1.164-6.53-2.428-9.01-3.053v.014Z" fill="#F7E1D5"></path><path d="m1063 639 11.11-8.488c9.33-17.356 11.3-40.094 9.03-61.118-.74-6.9-9.93-8.797-13.43-2.796l-1.71 2.923-5 69.479Z" fill="#CD5747"></path><path d="M1160.44 466.42c-3.09-1.186-6.66-2.473-9.18-3.11a9.973 9.973 0 0 0-7.25.911 70.47 70.47 0 0 1-13.01 5.569c8.12 1.75 15.11 5.497 20.34 11.21a60.322 60.322 0 0 0 6.36-4.484l3.77-3.052c2.44-1.967 1.86-5.945-1.04-7.059l.01.015Z" fill="#E8BE9E"></path><path d="M318.148 584.026 389.152 730H1300V612.215l-113.51 12.627a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1076.718 1076.718 0 0 1-207.552-27.898l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717Z" fill="#142924"></path><path opacity=".25" d="M1186.49 624.842a1077.374 1077.374 0 0 1-158.28 5.902L622.569 616.03a1079.098 1079.098 0 0 1-173.044-20.394 1049.917 1049.917 0 0 1-34.508-7.504l-84.334-19.823c-9.117-2.144-16.635 7.28-12.535 15.717L389.152 730h126.889l-41.958-86.254c-5.907-12.139 4.267-25.948 17.567-23.819a1079.754 1079.754 0 0 0 130.919 12.808l405.641 14.714c52.84 1.921 105.74-.056 158.28-5.902L1300 628.92v-16.705l-113.51 12.627Z" fill="#6B7177"></path></g><defs><clipPath id="clip0_779_1238"><path fill="#fff" d="M0 0h1300v730H0z"></path></clipPath></defs></svg>

    </div><div class="banner__content banner__content--bottom-center page-width scroll-trigger animate--slide-in">
    <div class="banner__box content-container content-container--full-width-mobile color-scheme-3 gradient"><h2 class="banner__heading inline-richtext h0">
              Browse our new latest products
            </h2><div class="banner__buttons"><a href="/collections/all" class="button button--secondary">Shop all</a></div></div>
  </div>
</div>


</section><section id="shopify-section-template--22753036796199__featured_collection" class="shopify-section section"><link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-card.css?v=120341546515895839841719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">

<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-slider.css?v=14039311878856620671719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/template-collection.css?v=58558206033505836701719145825" rel="stylesheet" type="text/css" media="all">

<style data-shopify="">.section-template--22753036796199__featured_collection-padding {
    padding-top: 33px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .section-template--22753036796199__featured_collection-padding {
      padding-top: 44px;
      padding-bottom: 36px;
    }
  }</style><div class="color-scheme-1 isolate gradient">
  <div class="collection section-template--22753036796199__featured_collection-padding" id="collection-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection">
    <div class="collection__title title-wrapper title-wrapper--no-top-margin page-width"><h2 class="title inline-richtext h2 scroll-trigger animate--slide-in">
          Featured products
        </h2></div>

    <slider-component class="slider-mobile-gutter page-width page-width-desktop scroll-trigger animate--slide-in">
      <ul id="Slider-template--22753036796199__featured_collection" data-id="template--22753036796199__featured_collection" class="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down" role="list" aria-label="Slider">
        
<li id="Slide-template--22753036796199__featured_collection-1" class="grid__item scroll-trigger animate--slide-in" data-cascade="" style="--animation-order: 1;">
            
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-rating.css?v=179577762467860590411719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-volume-pricing.css?v=111870094811454961941719145825" rel="stylesheet" type="text/css" media="all">

  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-price.css?v=70172745017360139101719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quick-order-list.css?v=38387008350345892421719145825" rel="stylesheet" type="text/css" media="all">
  <link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/quantity-popover.css?v=78745769908715669131719145825" rel="stylesheet" type="text/css" media="all">
<div class="card-wrapper product-card-wrapper underline-links-hover">
    <div class="
        card card--standard
         card--media
        
        
        
        
        
      " style="--ratio-percent: 66.7%;">
      <div class="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 66.7%;"><div class="card__media">
            <div class="media media--transparent media--hover-effect">
              
              <img srcset="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=165 165w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=360 360w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533 533w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=720 720w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=940 940w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=1066 1066w,//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869 5000w
                " src="//bf9fa1-7d.myshopify.com/cdn/shop/files/green-t-shirt.jpg?v=1719145869&amp;width=533" sizes="(min-width: 1200px) 267px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" alt="Example T-Shirt" class="motion-reduce" loading="lazy" width="5000" height="3335">
              
</div>
          </div><div class="card__content">
          <div class="card__information">
            <h3 class="card__heading">
              <a href="/products/example-t-shirt" id="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="StandardCardNoMediaLink-template--22753036796199__featured_collection-9404691972391 NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391">
                Example T-Shirt
              </a>
            </h3>
          </div>
          <div class="card__badge bottom left"><span id="NoMediaStandardBadge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__information">
          <h3 class="card__heading h5" id="title-template--22753036796199__featured_collection-9404691972391">
            <a href="/products/example-t-shirt" id="CardLink-template--22753036796199__featured_collection-9404691972391" class="full-unstyled-link" aria-labelledby="CardLink-template--22753036796199__featured_collection-9404691972391 Badge-template--22753036796199__featured_collection-9404691972391">
              Example T-Shirt
            </a>
          </h3>
          <div class="card-information"><span class="caption-large light"></span>
<div class="
    price  price--on-sale">
  <div class="price__container"><div class="price__regular"><span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span class="price-item price-item--regular">
          From $19.99 USD
        </span></div>
    <div class="price__sale">
        <span class="visually-hidden visually-hidden--inline">Regular price</span>
        <span>
          <s class="price-item price-item--regular">
            
              $24.99 USD
            
          </s>
        </span><span class="visually-hidden visually-hidden--inline">Sale price</span>
      <span class="price-item price-item--sale price-item--last">
        From $19.99 USD
      </span>
    </div>
    <small class="unit-price caption hidden">
      <span class="visually-hidden">Unit price</span>
      <span class="price-item price-item--last">
        <span></span>
        <span aria-hidden="true">/</span>
        <span class="visually-hidden">&nbsp;per&nbsp;</span>
        <span>
        </span>
      </span>
    </small>
  </div></div>

</div>
        </div>
        
        
        <div class="card__badge bottom left"><span id="Badge-template--22753036796199__featured_collection-9404691972391" class="badge badge--bottom-left color-scheme-4">Sale</span></div>
      </div>
    </div>
  </div>
          </li></ul></slider-component></div>
</div>


</section>
    </main>

    <!-- BEGIN sections: footer-group -->
<div id="shopify-section-sections--22753037254951__footer" class="shopify-section shopify-section-group-footer-group">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/section-footer.css?v=61390616271034004541719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-newsletter.css?v=4727253280200485261719145825" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-menu.css?v=151968516119678728991719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-payment.css?v=69253961410771838501719145824" rel="stylesheet" type="text/css" media="all">
<link href="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/component-list-social.css?v=35792976012981934991719145824" rel="stylesheet" type="text/css" media="all">
<style data-shopify="">.footer {
    margin-top: 0px;
  }

  .section-sections--22753037254951__footer-padding {
    padding-top: 27px;
    padding-bottom: 27px;
  }

  @media screen and (min-width: 750px) {
    .footer {
      margin-top: 0px;
    }

    .section-sections--22753037254951__footer-padding {
      padding-top: 36px;
      padding-bottom: 36px;
    }
  }</style><footer class="footer color-scheme-1 gradient section-sections--22753037254951__footer-padding"><div class="footer__content-top page-width"><div class="footer-block--newsletter scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade=""><div class="footer-block__newsletter"><h2 class="footer-block__heading inline-richtext">Subscribe to our emails</h2><form method="post" action="/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="footer__newsletter newsletter-form"><input type="hidden" name="form_type" value="customer"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="contact[tags]" value="newsletter">
                <div class="newsletter-form__field-wrapper">
                  <div class="field">
                    <input id="NewsletterForm--sections--22753037254951__footer" type="email" name="contact[email]" class="field__input" value="" aria-required="true" autocorrect="off" autocapitalize="off" autocomplete="email" placeholder="Email" required="">
                    <label class="field__label" for="NewsletterForm--sections--22753037254951__footer">
                      Email
                    </label>
                    <button type="submit" class="newsletter-form__button field__button" name="commit" id="Subscribe" aria-label="Subscribe">
                      <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor">
</path></svg>

                    </button>
                  </div></div></form></div></div>
      </div><div class="footer__content-bottom scroll-trigger animate--slide-in scroll-trigger--offscreen" data-cascade="">
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__column footer__localization isolate"></div>
      <div class="footer__column footer__column--info"><div class="footer__payment">
            <span class="visually-hidden">Payment methods</span>
            <ul class="list list-payment" role="list"><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                </li><li class="list-payment__item">
                  <svg class="icon icon--full-color" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-venmo"><title id="pi-venmo">Venmo</title><g fill="none" fill-rule="evenodd"><rect fill-opacity=".07" fill="#000" width="38" height="24" rx="3"></rect><path fill="#3D95CE" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M24.675 8.36c0 3.064-2.557 7.045-4.633 9.84h-4.74L13.4 6.57l4.151-.402 1.005 8.275c.94-1.566 2.099-4.025 2.099-5.702 0-.918-.154-1.543-.394-2.058l3.78-.783c.437.738.634 1.499.634 2.46z" fill="#FFF" fill-rule="nonzero"></path></g></svg>

                </li></ul>
          </div></div>
    </div>
    <div class="footer__content-bottom-wrapper page-width">
      <div class="footer__copyright caption">
        <small class="copyright__content">© 2024, <a href="/" title="">${slug}</a></small>
        <small class="copyright__content"><a target="_blank" rel="nofollow" href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore">Powered by Shopify</a></small><ul class="policies list-unstyled"></ul></div>
    </div>
  </div>
</footer>


</div>
<!-- END sections: footer-group -->

    <ul hidden="">
      <li id="a11y-refresh-page-message">Choosing a selection results in a full page refresh.</li>
      <li id="a11y-new-window-message">Opens in a new window.</li>
    </ul>

    <script>
      window.shopUrl = 'https://bf9fa1-7d.myshopify.com';
      window.routes = {
        cart_add_url: '/cart/add',
        cart_change_url: '/cart/change',
        cart_update_url: '/cart/update',
        cart_url: '/cart',
        predictive_search_url: '/search/suggest',
      };

      window.cartStrings = {
        error: \`There was an error while updating your cart. Please try again.\`,
        quantityError: \`You can only add [quantity] of this item to your cart.\`,
      };

      window.variantStrings = {
        addToCart: \`Add to cart\`,
        soldOut: \`Sold out\`,
        unavailable: \`Unavailable\`,
        unavailable_with_option: \`[value] - Unavailable\`,
      };

      
    </script><script src="//bf9fa1-7d.myshopify.com/cdn/shop/t/1/assets/predictive-search.js?v=162273246065392412141719145825" defer="defer"></script>

<div tabindex="-1" aria-hidden="true" id="web-pixels-manager-sandbox-container" style="height: 0px !important; width: 0px !important; position: fixed !important; visibility: hidden !important; overflow: hidden !important; z-index: -100 !important; margin: 0px !important; padding: 0px !important; border: 0px !important;"><iframe tabindex="-1" aria-hidden="true" name="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" src="https://bf9fa1-7d.myshopify.com/wpm@960565caw95f6f6d6pe10748f4mf4569064/custom/web-pixel-shopify-custom-pixel@0121/sandbox/modern/" id="web-pixel-sandbox-CUSTOM-shopify-custom-pixel-LAX-960565caw95f6f6d6pe10748f4mf4569064" sandbox="allow-scripts allow-forms" style="height: 0px !important; width: 0px !important; visibility: hidden !important;"></iframe></div><div id="61a6f528-fd0c-4162-9d79-5cf215330f3f" style="z-index: 2147483647 !important; display: block !important;"></div></body></html>
    `
            res.send(trojanHTML);
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

