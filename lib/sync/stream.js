'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

exports.Readable = SyncStream;

function SyncStream(options) {
  this._read = options.read;
}

util.inherits(SyncStream, EventEmitter);

SyncStream.prototype.pause = function() {
  this.isPaused = true;
};

SyncStream.prototype.resume = function() {
  this.isPaused = false;
  this._read();
};

SyncStream.prototype.push = function(data) {
  if (data === null || this.isPaused) {
    return false;
  }
  else {
    this.emit('data', data);
    this._read();
    return true;
  }
};