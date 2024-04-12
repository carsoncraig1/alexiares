const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Extract subdomain from host header
    const subdomain = req.headers.host.split('.')[0];

    // Handle requests for specific subdomains
    if (subdomain === 'sephora') {
      // Serve static file from the public directory
      const filePath = path.join(__dirname, 'public', 'html', 'sephora', 'sephora.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading sephora.html');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (subdomain === 'example') {
      return app.render(req, res, '/example', parsedUrl.query);
    } else {
      // Fallback to Next.js default request handler for other routes
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
