'use strict';

const app = require('../../src/app.js');
const superagent = require('superagent');

describe('Simple Web Server', () => {

  beforeAll( () => {
    app.start(process.env.PORT);
  });
  afterAll( () => {
    app.stop();
  });

  it('handles an invalid get request with a 404', () => {
    return superagent.get('http://localhost:3000/foo')
      .then(response => true)
      .catch(response => expect(response.status).toEqual(404));

  });

  it('handles a valid get request', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('h1'));
      })
      .catch(console.err);
  });

  it('handles a get request with a query string', () => {
    return superagent.get('http://localhost:3000/cowsay?text=A quick brown fox jumped over the lazy dogs.')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('A quick brown fox jumped over the lazy dogs.'));
      })
      .catch(console.err);
  });

  it('handles a good post request', () => {
    let obj = {text:'James'};
    let expected = JSON.stringify(obj);
    return superagent.post('http://localhost:3000/cowsay')
      .send(obj)
      .then(response => {
        expect(response.text).toEqual(expected);
      })
      .catch(console.err);
  });
  xit('handles a bad post request', () => {
    let obj = {text: null};
    let expectedObj = {"error": "invalid request: text query required"}
    return superagent.post('http://localhost:3000/cowsay')
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(400);
        expect(response.text).toEqual(expectedObj);
      })
      .catch(console.err);
  });
});