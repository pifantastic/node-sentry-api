var request = require('request');
var nock = require('nock');

var Client = require('../lib/client').Client;

exports.testConstructor = function(test) {
  test.expect(2);

  var client = new Client('https://PUBLIC:SECRET@test.com/123');
  test.equal(client.config.version, 0, 'Should default version to 0.');
  test.equal(client.config.logging, false, 'Should default logging to false.');

  test.done();
};

exports.testRequest = function(test) {
  test.expect(7);

  var reqheaders = {
    'authorization': 'Basic ' + new Buffer('PUBLIC:').toString('base64'),
    'accept': 'application/json'
  };

  var request1 = nock('https://test.com', {reqheaders: reqheaders})
    .get('/api/0/path')
    .reply(200, {foo: 'FOO'}, {
      'Link': '<https://test.com/api/0/path/?&cursor=0>; rel="previous"; results="false", <https://test.com/api/0/path/?&cursor=2>; rel="next"; results="true"', 
    });

  var request2 = nock('https://test.com', {reqheaders: reqheaders})
    .get('/api/0/path/?&cursor=2')
    .reply(200, {bar: 'BAR'}, {
      'Link': '<https://test.com/api/0/path/?&cursor=1>; rel="previous"; results="true", <https://test.com/api/0/path/?&cursor=3>; rel="next"; results="true"', 
    });

  var request3 = nock('https://test.com', {reqheaders: reqheaders})
    .get('/api/0/path/?&cursor=3')
    .reply(200, {baz: 'BAZ'}, {
      'Link': '<https://test.com/api/0/path/?&cursor=2>; rel="previous"; results="true", <https://test.com/api/0/path/?&cursor=4>; rel="next"; results="false"', 
    });

  var request4 = nock('https://test.com', {reqheaders: reqheaders})
    .get('/api/0/path/?&cursor=3')
    .reply(404);

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.request('path', {}, function(error, response) {
    test.ok(request1.isDone(), 'Should make the correct request.');
    test.ok(request2.isDone(), 'Should request all pages.');
    test.ok(request3.isDone(), 'Should request all pages.');
    test.ok(!request4.isDone(), 'Should not request pages without results.');
    test.equal(response.foo, 'FOO', 'Should return the response as an object.');
    test.equal(response.bar, 'BAR', 'Should merge second page.');
    test.equal(response.baz, 'BAZ', 'Should merge third page.');
    test.done();
  });
};

exports.testError = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .get('/api/0/path')
    .reply(400);

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.request('path', {}, function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(error.message, '400', 'Should return the error.');
    test.done();
  });
};

exports.testJsonError = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .get('/api/0/path')
    .reply(400, {detail: 'bar'});

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.request('path', {}, function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(error.message, 'bar', 'Should parse the error json.');
    test.done();
  });
};

exports.testGet = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .get('/api/0/path')
    .query({foo: 'bar'})
    .reply(200, {foo: 'bar'});

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.get('path', {foo: 'bar'}, function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(response.foo, 'bar', 'Should return the response as an object.');
    test.done();
  });
};

exports.testPost = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .post('/api/0/path', {foo: 'bar'})
    .reply(200, {foo: 'bar'});

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.post('path', {foo: 'bar'}, function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(response.foo, 'bar', 'Should return the response as an object.');
    test.done();
  });
};

exports.testPut = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .put('/api/0/path', {foo: 'bar'})
    .reply(200, {foo: 'bar'});

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.put('path', {foo: 'bar'}, function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(response.foo, 'bar', 'Should return the response as an object.');
    test.done();
  });
};

exports.testDelete = function(test) {
  test.expect(2);

  var request = nock('https://test.com')
    .delete('/api/0/path')
    .reply(200, {foo: 'bar'});

  var client = new Client('https://PUBLIC:SECRET@test.com/123');

  client.delete('path', function(error, response) {
    test.ok(request.isDone(), 'Should make the correct request.');
    test.equal(response.foo, 'bar', 'Should return the response as an object.');
    test.done();
  });
};
