var util = require('util');

/**
 * Provides methods for interacting with Events in the Sentry API.
 *
 * @class Events
 * @constructor
 * @param {Client} client
 */
var Events = function(client) {
  this.client = client;
}

module.exports = Events;
