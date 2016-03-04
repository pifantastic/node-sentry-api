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

/**
 * Retrieves the details of the latest sample for an aggregate.
 *
 * @method latest
 * @param  {String}   groupId  The ID of the group to get the latest sample of.
 * @param  {Function} callback
 * @return {Promise}
 */
Events.prototype.latest = function(groupId, callback) {
  var path = util.format('groups/%s/events/latest/', groupId);
  return this.client.get(path, callback);
}

module.exports = Events;
