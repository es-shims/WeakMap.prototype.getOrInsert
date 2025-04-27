'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	if (typeof WeakMap === 'function') {
		define(
			WeakMap.prototype,
			{ getOrInsert: polyfill },
			{ getOrInsert: function () { return WeakMap.prototype.getOrInsert !== polyfill; } }
		);
	}

	return polyfill;
};
