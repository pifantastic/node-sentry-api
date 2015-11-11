var util = require('util');

/**
 * Provides methods for interacting with Organizations in the Sentry API.
 *
 * @class Organizations
 * @constructor
 * @param {Client} client
 */
var Organizations = function(client) {
  this.client = client;
}

/**
 * Retrieve an organization.
 *
 * @method get
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Organizations.prototype.get = function(orgSlug, callback) {
  var path = util.format('organizations/%s/', orgSlug);
  return this.client.get(path, callback);
}

/**
 * Create a new organization.
 *
 * @method create
 * @param  {Object}   body
 * @param  {String}   body.name The human readable name for the new organization.
 * @param  {String}   body.slug The unique URL slug for this organization. If this is not provided a slug is automatically generated based on the name.
 * @param  {Function} callback
 * @return {Promise}
 */
Organizations.prototype.create = function(body, callback) {
  return this.client.post('organizations/', body, callback);
}

/**
 * Delete an organization.
 *
 * @method delete
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Organizations.prototype.delete = function(orgSlug, callback) {
  var path = util.format('organizations/%s/', orgSlug);
  return this.client.delete(path, callback);
}

/**
 * Update an organization.
 *
 * @method update
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Object}   body
 * @param  {String}   body.name An optional new name for the organization.
 * @param  {String}   body.slug An optional new slug for the organization. Needs to be available and unique.
 * @param  {Function} callback
 * @return {Promise}
 */
Organizations.prototype.update = function(orgSlug, body, callback) {
  var path = util.format('organizations/%s/', orgSlug);
  return this.client.put(path, callback);
}

/**
 * Retrieve an organization's projects.
 *
 * @method projects
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Organizations.prototype.projects = function(orgSlug, callback) {
  var path = util.format('organizations/%s/projects/', orgSlug);
  return this.client.get(path, callback);
}

module.exports = Organizations;
