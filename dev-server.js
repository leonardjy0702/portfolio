// Minimal static server for local preview: node dev-server.js
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 4321;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const file = path.resolve(ROOT, relative);

    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    fs.readFile(file, (err, body) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
      res.end(body);
    });
  })
  .listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
  });
