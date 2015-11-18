# sentry-api

![Build Status](https://travis-ci.org/pifantastic/node-sentry-api.svg?branch=master)
![Dependency Status](https://david-dm.org/pifantastic/node-sentry-api.svg)

A node client for the [Sentry](https://getsentry.com/welcome/) web API.

More information about the Sentry web API can be found [here](https://docs.getsentry.com/hosted/api/).

## Installation

```bash
npm install sentry-api
```

## Documentation

[http://pifantastic.github.io/node-sentry-api/](http://pifantastic.github.io/node-sentry-api/)

## Example

```javascript
var Sentry = require('sentry-api').Client;

// Create a new client using your Sentry DSN.
var sentry = new Sentry('https://abc123:@app.getsentry.com');

// Retrieve a project using the callback style.
sentry.projects.get('org-slug', 'project-slug', function(error, project) {
  console.log(project.name);
});

// Retrieve a project using the promise style.
sentry.projects.get('org-slug', 'project-slug').then(function(project) {
  console.log(project.name);
})
```

A more complete example:

```javascript
const fs = require('fs');
const Promise = require('promise');
const Sentry = require('sentry-api').Client;

const sentry = new Sentry('https://abc123:@app.getsentry.com');
const organization = 'acme-org';
const project = 'top-secret';
const version = '1.0.0';

// Check that a release hasn't already been created.
sentry.releases.get(organization, project, version).then(function(release) {
  console.log('Release', version, 'already exists!');
}).catch(function() {
  // Create a new release.
  sentry.releases.create(organization, project, {
    version: version,
    ref: version,
  }).then(function(release) {
    console.log('Created release:', release);

    var files = ['app.min.js', 'app.min.js.map'];

    // Add files to the release.
    var uploads = files.map(function(file) {
      return sentry.releases.createFile(organization, project, version, {
        name: file,
        file: fs.createReadStream(file)
      }).then(function(newFile) {
        console.log('Created file:', newFile.name);
      });
    });

    return Promise.all(uploads);
  })
  .then(function() {
    console.log('Uploaded all files.');
  })
  .catch(function(error) {
    // More than likely the release already exists.
    console.error('Error creating Sentry release', error);
  });
});
```

## Tests

To run the tests:

```bash
npm test
```

## License

```
Copyright (c) 2015(s), Aaron Forsander
Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
```
