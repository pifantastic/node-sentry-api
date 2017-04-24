var fs = require('fs');
var util = require('util');

var winston = require('winston');
var lodash = require('lodash');
var request = require('request');
var Promise = require('promise');
var parseLinkHeader = require('parse-link-header');

var DSN = require('./dsn').DSN;
var Projects = require('./projects');
var Organizations = require('./organizations');
var Releases = require('./releases');
var Teams = require('./teams');
var Events = require('./events');

/**
 * Client for the Sentry API.
 *
 * @example
 *   var Client = require('sentry-api').Client;
 *
 *   var sentry = new Client('https://abc123:@app.getsentry.com/1234', {
 *     logging: true
 *   });
 *
 *   sentry.projects.get('my-organization-slug', 'my-project-slug').then(function(error, project) {
 *     console.log(project.name);
 *   });
 *
 * @class Client
 * @constructor
 * @param {String}  dsn    Sentry DSN.
 * @param {Options} config Config
 * @param {Number}  config.version Sentry API version number.
 */
var Client = function(dsn, config) {
  this.dsn = new DSN(dsn);

  this.config = lodash.defaults(config || {}, {
    version: 0,
    logging: false,
    requestOptions: {}
  });

  this.logger = new(winston.Logger)({
    transports: this.config.logging ? [
      new (winston.transports.Console)({
        colorize: true,
        label: 'SentryAPI'
      })
    ] : []
  });

  this.projects = new Projects(this);
  this.organizations = new Organizations(this);
  this.releases = new Releases(this);
  this.teams = new Teams(this);
  this.events = new Events(this);
};

/**
 * Contains methods related to Sentry Projects.
 *
 * @property {Projects} projects
 */
Client.prototype.projects = null;

/**
 * Contains methods related to Sentry Organizations.
 *
 * @property {Organizations} organizations
 */
Client.prototype.organizations = null;

/**
 * Contains methods related to Sentry Releases.
 *
 * @property {Releases} releases
 */
Client.prototype.releases = null;

/**
 * Contains methods related to Sentry Teams.
 *
 * @property {Teams} teams
 */
Client.prototype.teams = null;

/**
 * Contains methods related to Sentry Events.
 *
 * @property {Events} events
 */
Client.prototype.events = null;

Client.prototype._merge = function(page, pages) {
  if (lodash.isArray(pages)) {
    return pages.concat(page);
  } else {
    return lodash.merge(pages, page);
  }
};

Client.prototype._request = function(uri, options) {
  this.logger.info(options.method, uri);

  return new Promise(function(resolve, reject) {
    request(lodash.extend({
      uri: uri,
      json: true,
      auth: {
        user: this.dsn.publicKey,
      },
    }, options, this.config.requestOptions), function(error, response, body) {
      if (error) {
        this.logger.error(error);
        reject(error);
      }
      else if (response.statusCode >= 200 && response.statusCode < 300) {
        this.logger.info(response.statusCode, response.statusMessage);
        resolve([response, body]);
      }
      else {
        this.logger.warn(response.statusCode, response.statusMessage);
        if (body && body.detail) {
          error = new Error(body.detail);
        }
        else if (response.statusMessage) {
          error = new Error(util.format('%d: %s', response.statusCode, response.statusMessage));
        }
        else {
          error = new Error(response.statusCode);
        }
        reject(error)
      }
    }.bind(this));
  }.bind(this));
};

/**
 * Make a request to the Sentry API.
 *
 * @method request
 * @param  {String}   path     The request path.
 * @param  {Object}   options  Request options. These are the same as the request module's options.
 * @param  {Function} callback Function to execute when the request completes.
 * @return {Promise}
 */
Client.prototype.request = function(path, options, callback) {
  var uri = util.format('%s/api/%d/%s', this.dsn.uri, this.config.version, path);

  if (lodash.isUndefined(callback)) {
    callback = function() {};
  }

  var self = this;
  function load(uri) {
    return self._request(uri, options)
      .then(function(result) {
        var response = result[0];
        var body = result[1];

        if (response.headers.link) {
          var next = parseLinkHeader(response.headers.link).next;
          if (next && next.results === 'true' && next.url) {
            return load(next.url, options)
              .then(function (tailResult) {
                return self._merge(tailResult, body);
              });
          }
        }

        return body;
      });
  }

  return load(uri)
    .catch(function(error) {
      callback(error, null);
      throw error;
    })
    .then(function(result) {
      callback(null, result);
      return result;
    });
};

/**
 * Convenience method for making GET requests.
 *
 * @method get
 * @param  {String}   path     Request path.
 * @param  {Object}   params   Request query string parameters.
 * @param  {Function} callback Request callback.
 * @return {Promise}
 */
Client.prototype.get = function(path, params, callback) {
  return this.request(path, {method: 'GET', qs: params}, callback);
};

/**
 * Convenience method for making POST requests.
 *
 * @method post
 * @param  {String}   path     Request path.
 * @param  {Object}   body     Request body.
 * @param  {Function} callback Request callback.
 * @return {Promise}
 */
Client.prototype.post = function(path, body, callback) {
  return this.request(path, {method: 'POST', body: body}, callback);
};

/**
 * Convenience method for making DELETE requests.
 *
 * @method delete
 * @param  {String}   path     Request path.
 * @param  {Function} callback Request callback.
 * @return {Promise}
 */
Client.prototype.delete = function(path, callback) {
  return this.request(path, {method: 'DELETE'}, callback);
};

/**
 * Convenience method for making PUT requests.
 *
 * @method put
 * @param  {String}   path     Request path.
 * @param  {Object}   body     Request body.
 * @param  {Function} callback Request callback.
 * @return {Promise}
 */
Client.prototype.put = function(path, body, callback) {
  return this.request(path, {method: 'PUT', body: body}, callback);
};

exports.Client = Client;
