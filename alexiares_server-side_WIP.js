const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define Landing Page File Paths for each offer
const sephoraLander = path.join(__dirname, 'public', 'sephora.html');
const sheinLander = path.join(__dirname, 'public', 'shein.html');

// Define White Page Generator
const generateWhitePageContent = (slug) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${slug}</title>
        </head>
        <body>
            <h1>Welcome to our Store!</h1>
            <p>You are shopping at: ${slug}</p>
        </body>
        </html>
    `;
};

// SEPHORA: Middleware to handle requests to /sephora/[slug]
app.get('/sephora/:slug', (req, res, next) => {
    const slug = req.params.slug;
    const utmXXX = req.query.xxx;
    const isRealUser = utmXXX !== '__PLACEMENT__' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const destinationLander = sephoraLander;

    // Define Lander Presentation
    const servePage = (isRealUser, res, slug, destinationLander) => {
        if (isRealUser) {
            res.sendFile(destinationLander);
        } else {
            const htmlContent = generateWhitePageContent(slug);
            res.send(htmlContent);
        }
    };

    servePage(isRealUser, res, slug, destinationLander);
});

// SHEIN: Middleware to handle requests to /shein/[slug]
app.get('/shein/:slug', (req, res, next) => {
    const slug = req.params.slug;
    const utmXXX = req.query.xxx;
    const isRealUser = utmXXX !== '__PLACEMENT__' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const destinationLander = sheinLander;

    // Define Lander Presentation
    const servePage = (isRealUser, res, slug, destinationLander) => {
        if (isRealUser) {
            res.sendFile(destinationLander);
        } else {
            const htmlContent = generateWhitePageContent(slug);
            res.send(htmlContent);
        }
    };

    servePage(isRealUser, res, slug, destinationLander);
});

// Read SSL certificate and key files
const privateKey = fs.readFileSync('/utils/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('/utils/certificate.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

// Start the HTTPS server
const PORT = process.env.PORT || 443;
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
