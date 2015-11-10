var util = require('util');

/**
 * Provides methods for interacting with Teams in the Sentry API.
 *
 * @class Teams
 * @constructor
 * @param {Client} client [description]
 */
var Teams = function(client) {
  this.client = client;
}

/**
 * Retrieve a team.
 *
 * @method get
 * @param  {String}   orgSlug  Organization slug.
 * @param  {String}   teamSlug  Team slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.get = function(orgSlug, teamSlug, callback) {
  var path = util.format('teams/%s/%s/', orgSlug, teamSlug);
  return this.client.get(path, callback);
}

/**
 * Create a new team bound to an organization.
 *
 * @method create
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Object}   body
 * @param  {String}   body.name The human readable name for the new team.
 * @param  {String}   body.slug The unique URL slug for this team. If this is not provided a slug is automatically generated based on the name.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.create = function(orgSlug, body, callback) {
  var path = util.format('organizations/%s/teams/', orgSlug);
  return this.client.post(path, body, callback);
}

/**
 * Delete a team.
 *
 * @method delete
 * @param  {String}   orgSlug  Organization slug.
 * @param  {String}   teamSlug  Team slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.delete = function(orgSlug, teamSlug, callback) {
  var path = util.format('teams/%s/%s/', orgSlug, teamSlug);
  return this.client.delete(path, callback);
}

/**
 * Update a team.
 *
 * @method update
 * @param  {String}   orgSlug  Organization slug.
 * @param  {String}   teamSlug  Team slug.
 * @param  {Object}   body
 * @param  {String}   body.name The new name for the team.
 * @param  {String}   body.slug A new slug for the team. It has to be unique and available.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.update = function(orgSlug, teamSlug, body, callback) {
  var path = util.format('teams/%s/%s/', orgSlug, teamSlug);
  return this.client.put(path, callback);
}

/**
 * Retrieve event counts for a team.
 *
 * @method stats
 * @param  {String}   orgSlug  Organization slug.
 * @param  {String}   teamSlug  Team slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.stats = function(orgSlug, teamSlug, callback) {
  var path = util.format('teams/%s/%s/stats/', orgSlug, teamSlug);
  return this.client.get(path, callback);
}

/**
 * List an organization's teams.
 *
 * @method list
 * @param  {String}   orgSlug  Organization slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.list = function(orgSlug, callback) {
  var path = util.format('organizations/%s/teams/', orgSlug);
  return this.client.get(path, callback);
}

/**
 * List a team's projects.
 *
 * @method projects
 * @param  {String}   orgSlug  Organization slug.
 * @param  {String}   teamSlug  Team slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Teams.prototype.projects = function(orgSlug, teamSlug, callback) {
  var path = util.format('teams/%s/%s/projects/', orgSlug, teamSlug);
  return this.client.get(path, callback);
}

module.exports = Teams;
