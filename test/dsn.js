var DSN = require('../lib/dsn').DSN;

exports.testConstructor = function(test) {
  test.expect(4);
  var dsn = new DSN('https://PUBLIC:SECRET@host.com/123')
  test.equal(dsn.uri, 'https://host.com', 'Should correctly parse URI.');
  test.equal(dsn.publicKey, 'PUBLIC', 'Should correctly parse the public key.');
  test.equal(dsn.secretKey, 'SECRET', 'Should correctly parse the secret key.');
  test.equal(dsn.project, 123, 'Should correctly parse the project.');
  test.done();
};
