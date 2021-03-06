![cf](https://i.imgur.com/7v5ASc8.png) Lab 07: Vanilla HTTP Server
======
#links
PR: https://github.com/icathaid/07-http-server/pull/7
Master: https://github.com/icathaid/07-http-server
Travis: https://travis-ci.com/icathaid/07-http-server.svg?branch=master

## Submission Instructions
[x]  Create a PR to your master from your working branch.
[x] check for travis integration

* Submit on canvas:
  * a question and observation
  [x]  Question:
      How can I introduce an error that I can test the .catch for?  
  [x]  Observation:
      I need to force myself to take breaks, even on the rare occasions when I don't want to, because if I concentrate on one thing for too long, I start to get really, really irritable.  
  [x] how long you spent
        It's hard to say, because I've been working on stuff on and off.  I'd roughly guess about 8 hours.  It took a long time to figure out where to get started and I needed a lot of help from the starter code, most of the time was spent just tracking down weird bugs.
  [x]  link to your pull request
  [x]  link to your build at travis-ci URL
  

## Feature Tasks  
Build a vanilla http server using the [Cowsay](https://www.npmjs.com/package/cowsay) module.

The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stoping the server. It should export an object with `start` and `stop` methods. The start and stop methods should each return a promise that resolves on success and rejects on error. 
###### GET /

  [x] When a client makes a GET request to / the server should send back html with a project description and a anchor to /cowsay.

###### GET /cowsay?text={message}

  [x]  When a client makes a GET request to /cowsay?text={message} the server should parse the querystring for a text key. It should then send a rendered HTML page with a cowsay cow speaking the value of the text query. If their is no text query the cow message should say `'I need something good to say!'`. 
###### POST /api/cowsay
 
  [x] When a client makes a POST request to /api/cowsay it should send JSON that includes `{"text": "<message>"}`. The server should respond with a JSON body `{"content": "<cowsay cow>"}`.  

  [x] A response for a valid Requests should have a status code of 200 and the JSON body   
``` json 
{
  "content": "<cowsay cow text>" 
}
```

  []  A response for a invalid Requests should have a status code of 400 and the JSON body...
```
{
  "error": "invalid request: text query required"
}
```

I'm stuck on this bug but I need to to get caught up.  Whenever I try to test the bad POST route, I get an async callback error that crashes nodemon.  Also, the coverage is all red and complainy because I have no idea how to test the .catch part.  