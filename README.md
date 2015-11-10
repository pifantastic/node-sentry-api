# node-sentry-api

![Build Status](https://travis-ci.org/pifantastic/node-sentry-api.svg?branch=master)
![Dependency Status](https://david-dm.org/pifantastic/node-sentry-api.svg)

A node client for the [Sentry](https://getsentry.com/welcome/) web API.

More information about the Sentry web API can be found [here](https://docs.getsentry.com/hosted/api/).

## Documentation

[http://pifantastic.github.io/node-sentry-api/](http://pifantastic.github.io/node-sentry-api/)

## Example

```javascript
var Sentry = require('node-sentry-api').Client;

var sentry = new Sentry('https://abc123:@app.getsentry.com/1234');

// Callback API
sentry.projects.get('org-slug', 'project-slug', function(error, project) {
  console.log(project.name);
});

// Promise API
sentry.projects.get('org-slug', 'project-slug').then(function(project) {
  console.log(project.name);
})
```

## Tests

To run the tests:

```bash
make
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
