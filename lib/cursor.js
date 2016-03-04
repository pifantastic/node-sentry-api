
var parse = require('parse-link-header');

var Cursor = function(client, header) {
  this.client = client;
  this.header = parse(header);
}

Cursor.prototype.next = function() {
  return this.client.get(this.header.next.url);
}

Cursor.prototype.previous = function() {
  return this.client.get(this.header.previous.url);
}

exports.Cursor = Cursor;
