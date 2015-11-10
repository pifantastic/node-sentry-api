var util = require('util');
var url = require('url');

/**
 * Represents a parsed Sentry DSN.
 *
 * @class DSN
 * @constructor
 * @param {String} dsn A Sentry DSN.
 */
var DSN = function(dsn) {
  var parsed = url.parse(dsn);

  if (parsed.auth) {
    var auth = parsed.auth.split(':');
    this.publicKey = auth[0];
    this.secretKey = auth[1];
  }

  this.uri = util.format('%s//%s', parsed.protocol, parsed.host);
  this.project = parseInt(parsed.pathname.substring(1), 10);
};

/**
 * Sentry public key.
 *
 * @property {String} publicKey
 */
DSN.prototype.publicKey = null;

/**
 * Sentry secret key.
 *
 * @property {String} secretKey
 */
DSN.prototype.secretKey = null;

/**
 * Sentry API uri.
 *
 * @property {String} uri
 */
DSN.prototype.uri = 'https://app.getsentry.com';

/**
 * Sentry project ID.
 *
 * @property {Number} project
 */
DSN.prototype.project = null;

exports.DSN = DSN;
