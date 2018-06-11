'use strict';

// 1st Party library
const http = require('http');
const cowsay = require('cowsay');
// Local Libraries
const parser = require('./lib/parser');
const requestHandler = (req,res) => {
  parser(req)
    .then( req => {
      if ( req.method === 'GET' && req.url.pathname === '/' ) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write('<h1>home</h1>');
        res.end();
        return;
      }
      if ( req.method === 'GET' && req.url.pathname === '/cowsay'  ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        if(!req.url.query.text){
          res.write(cowsay.say({text: 'I need something good to say!'}));
        } else {
          res.write(cowsay.say({text: req.url.query.text}));
        };
        res.end();
        return;
     }
  
      if ( req.method === 'POST' && req.url.pathname === '/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        console.log();
        res.write( JSON.stringify(req.body));
        res.end();
        return;
     }
      else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
        return;
      }
    })
    .catch(err => {
      res.writeHead(500);
      res.write(err);
      res.end();
      return;
    });
};
// Server callback
const app = http.createServer(requestHandler);
// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};