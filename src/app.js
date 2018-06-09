

/* NOT EXPRESS SERVER */


'use strict';

// 1st Party library
const http = require('http');
const cowsay = require('cowsay');
// Local Libraries
// parser will tear the URL apart and give us back an object with things like path, query params, etc.
// it will also deal with POST data and append JSON to req.body if sent
const parser = require('./lib/parser');

const requestHandler = (req,res) => {

  // Take a look here if you're interested to see what some parts of the request object are.
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.url);

  // In all cases, parse the URL
  parser(req)
    .then( req => {

      /* The "if" statements below are our "routes" and do the same things that express does (below) but 100% manually
           app.get('/', (req,res) => res.send('Hello From the Gutter'));
           app.get('/foo/bar/baz', (req,res) => res.send('Hello From the Gutter'));
      */
      if ( req.method === 'GET' && req.url.pathname === '/' ) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write('home');
        res.end();
      }
      if ( req.method === 'GET' && req.url.pathname === '/cowsay'  ) {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        let bill = cowsay.say('things');
        res.write(cowsay.say({
          text : req.url.query.text,
          e : "oO",
          T : "U"
        }));
        res.end();
     }
  
      // Here, we have a "POST" request which will always return a JSON object.  That object will either be
      // the JSON that you posted in (just spitting it back out), or an error object, formatted to look like JSON
      if ( req.method === 'POST' && req.url.pathname === '/data' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write( JSON.stringify(req.body) );
        res.end();
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
     // closes the "then" of the parser promise
    .catch(err => {
      res.writeHead(500);
      res.write(err);
      res.end();
    });
};

// Server callback
const app = http.createServer(requestHandler);

// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};