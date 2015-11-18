var util = require('util');

/**
 * Provides methods for interacting with Projects in the Sentry API.
 *
 * @class Projects
 * @constructor
 * @param {Client} client
 */
var Projects = function(client) {
  this.client = client;
}

/**
 * Retrieve a project.
 *
 * @method get
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.get = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/', orgSlug, projectSlug);
  return this.client.get(path, callback);
}

/**
 * Delete a project.
 *
 * @method delete
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.delete = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/', orgSlug, projectSlug);
  return this.client.delete(path, callback);
}

/**
 * Update a project.
 *
 * @method update
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Object}   body
 * @param  {String}   body.name The new name for the project.
 * @param  {String}   body.slug The new slug for the project.
 * @param  {Object}   body.options  Optional options to override in the project settings.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.update = function(orgSlug, projectSlug, body, callback) {
  var path = util.format('projects/%s/%s/', orgSlug, projectSlug);
  return this.client.put(path, body, callback);
}

/**
 * Retrieve event counts for a project.
 *
 * @method stats
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.stats = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/stats/', orgSlug, projectSlug);
  return this.client.get(path, callback);
}

/**
 * List a project's client keys.
 *
 * @method keys
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.keys = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/keys/', orgSlug, projectSlug);
  return this.client.get(path, callback);
}

/**
 * Create a new client key.
 *
 * @method createKey
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Object}   body
 * @param  {String}   body.name   The name for the new key.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.createKey = function(orgSlug, projectSlug, body, callback) {
  var path = util.format('projects/%s/%s/keys/', orgSlug, projectSlug);
  return this.client.post(path, body, callback);
}

/**
 * Delete a client key.
 *
 * @method deleteKey
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   keyId       The ID of the key to delete.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.deleteKey = function(orgSlug, projectSlug, keyId, callback) {
  var path = util.format('projects/%s/%s/keys/%s/', orgSlug, projectSlug, keyId);
  return this.client.delete(path, callback);
}

/**
 * Update a client key.
 *
 * @method updateKey
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {[type]}   key         [description]
 * @param  {Object}   body
 * @param  {String}   body.name   The new name for the key.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.updateKey = function(orgSlug, projectSlug, key, body, callback) {
  var path = util.format('projects/%s/%s/keys/%s/', orgSlug, projectSlug, key);
  return this.client.put(path, body, callback);
}

/**
 * List a project's users.
 *
 * @method users
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.users = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/users/', orgSlug, projectSlug);
  return this.client.get(path, callback);
}

/**
 * List a tag's values.
 *
 * @method tag
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   key         The tag to lookup.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.tag = function(orgSlug, projectSlug, key, callback) {
  var path = util.format('projects/%s/%s/tags/%s/values/', orgSlug, projectSlug, key);
  return this.client.get(path, callback);
}

/**
 * List a project's releases.
 *
 * @method users
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Function} callback
 * @return {Promise}
 */
Projects.prototype.releases = function(orgSlug, projectSlug, callback) {
  var path = util.format('projects/%s/%s/releases/', orgSlug, projectSlug);
  return this.client.get(path, callback);
}

module.exports = Projects;
