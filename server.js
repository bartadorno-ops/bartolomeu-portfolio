const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

const server = http.createServer((request, response) => {
  const requested = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(root, requested.split('?')[0]);
  const extension = path.extname(filePath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Página não encontrada.');
      return;
    }
    response.writeHead(200, { 'Content-Type': types[extension] || 'text/plain; charset=utf-8' });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Portfólio disponível em http://localhost:${port}`);
});
