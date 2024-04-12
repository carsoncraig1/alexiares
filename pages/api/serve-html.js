// pages/api/serve-html.js

const fs = require('fs');
const path = require('path');
const subdomainToHTMLFile = require('utilities/subdomainMapping'); // Import the JavaScript object

export default function handler(req, res) {
    console.log("Incoming request:", req.url);
    console.log("Request headers:", req.headers);

    const subdomain = req.headers.host.split('.')[0]; // Extract subdomain
    console.log("Extracted subdomain:", subdomain);

    const htmlFile = subdomainToHTMLFile[subdomain]; // Get HTML file name based on subdomain
    console.log("Mapped HTML file:", htmlFile);

  if (htmlFile) {
    const htmlFilePath = path.join(process.cwd(), 'public', htmlFile); // Path to HTML file

    if (fs.existsSync(htmlFilePath)) {
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8'); // Read HTML file content
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(htmlContent); // Serve HTML file
    } else {
      res.status(404).end(); // HTML file not found
    }
  } else {
    res.status(404).end(); // Subdomain not mapped to any HTML file
  }
}
