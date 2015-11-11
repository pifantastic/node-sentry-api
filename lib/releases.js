var util = require('util');

/**
 * Provides methods for interacting with Releases in the Sentry API.
 *
 * @class Releases
 * @constructor
 * @param {Client} client
 */
var Releases = function(client) {
  this.client = client;
}

/**
 * Retrieve a release.
 *
 * @method get
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.get = function(orgSlug, projectSlug, version, callback) {
  var path = util.format('projects/%s/%s/releases/%s/', orgSlug, projectSlug, version);
  return this.client.get(path, {}, callback);
}

/**
 * Create a new release.
 *
 * @method create
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {Object}   body
 * @param  {String}   body.version A version identifier for this release. Can be a version number, a commit hash etc.
 * @param  {String}   body.ref Aan optional commit reference. This is useful if a tagged version has been provided.
 * @param  {String}   body.url A URL that points to the release. This can be the path to an online interface to the sourcecode for instance.
 * @param  {Date}     body.dateStarted An optional date that indicates when the release process started.
 * @param  {Date}     body.dateReleased An optional date that indicates when the release went live. If not provided the current time is assumed.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.create = function(orgSlug, projectSlug, body, callback) {
  var path = util.format('projects/%s/%s/releases/', orgSlug, projectSlug);
  return this.client.post(path, body, callback);
}

/**
 * Delete a release.
 *
 * @method delete
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.delete = function(orgSlug, projectSlug, version, callback) {
  var path = util.format('projects/%s/%s/releases/%s/', orgSlug, projectSlug, version);
  return this.client.delete(path, callback);
}

/**
 * Update a release.
 *
 * @method update
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {Object}   body
 * @param  {String}   body.ref Aan optional commit reference. This is useful if a tagged version has been provided.
 * @param  {String}   body.url A URL that points to the release. This can be the path to an online interface to the sourcecode for instance.
 * @param  {Date}     body.dateStarted An optional date that indicates when the release process started.
 * @param  {Date}     body.dateReleased An optional date that indicates when the release went live. If not provided the current time is assumed.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.update = function(orgSlug, projectSlug, version, body, callback) {
  var path = util.format('projects/%s/%s/releases/%s/', orgSlug, projectSlug, version);
  return this.client.put(path, body, callback);
}

/**
 * Retrieve a file.
 *
 * @method getFile
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {String}   fileID      File ID.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.getFile = function(orgSlug, projectSlug, version, fileId, callback) {
  var path = util.format('projects/%s/%s/releases/%s/files/%s/', orgSlug, projectSlug, version, fileId);
  return this.client.get(path, {}, callback);
}

/**
 * Upload a new file.
 *
 * @method createFile
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {Object}   formData
 * @param  {String}   formData.name The name (full path) of the file.
 * @param  {File}     formData.file The multipart encoded file.
 * @param  {String}   formData.header This parameter can be supplied multiple times to attach headers to the file. Each header is a string in the format key:value. For instance it can be used to define a content type.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.createFile = function(orgSlug, projectSlug, version, formData, callback) {
  var path = util.format('projects/%s/%s/releases/%s/files/', orgSlug, projectSlug, version);
  return this.client.request(path, {
    method: 'POST',
    formData: formData,
  }, callback);
}

/**
 * Delete a file.
 *
 * @method deleteFile
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {String}   fileId      The ID of the file to delete.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.deleteFile = function(orgSlug, projectSlug, version, fileId, callback) {
  var path = util.format('projects/%s/%s/releases/%s/files/%s/', orgSlug, projectSlug, version, fileId);
  return this.client.delete(path, callback);
}

/**
 * Update a file.
 *
 * @method updateFile
 * @param  {String}   orgSlug     Organization slug.
 * @param  {String}   projectSlug Project slug.
 * @param  {String}   version     Release version.
 * @param  {String}   fileId      The ID of the file to update.
 * @param  {Object}   body
 * @param  {String}   body.name The new name of the file.
 * @param  {Function} callback
 * @return {Promise}
 */
Releases.prototype.updateFile = function(orgSlug, projectSlug, version, fileId, body, callback) {
  var path = util.format('projects/%s/%s/releases/%s/files/%s/', orgSlug, projectSlug, version, fileId);
  return this.client.put(path, body, callback);
}

module.exports = Releases;
