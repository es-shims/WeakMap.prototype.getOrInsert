# weakmap.prototype.getorinsert <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `WeakMap.prototype.getOrInsert` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) v3 interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.github.io/proposal-array-grouping/).

## Getting started

```sh
npm install --save weakmap.prototype.getorinsert
```

## Usage/Examples

```js
var getOrInsert = require('weakmap.prototype.getorinsert');
var assert = require('assert');

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(getOrInsert(map, key, value), value);
assert.equal(map.has(key), true);
```

```js
var getPolyfill = require('weakmap.prototype.getorinsert/polyfill');
var shim = require('weakmap.prototype.getorinsert/shim');
var assert = require('assert');
/* when WeakMap.prototype.getOrInsert is not present */
delete WeakMap.prototype.getOrInsert;
var shimmed = shim();

assert.equal(shimmed, getPolyfill());

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsert(key, value), value);
assert.equal(map.has(key), true);
```

```js
var shim = require('weakmap.prototype.getorinsert/shim');
var assert = require('assert');
/* when WeakMap.prototype.getOrInsert is present */
var shimmed = shim();

assert.equal(shimmed, WeakMap.prototype.getOrInsert);

var map = new WeakMap();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsert(key, value), value);
assert.equal(map.has(key), true);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/weakmap.prototype.getorinsert
[npm-version-svg]: https://versionbadg.es/es-shims/WeakMap.prototype.getOrInsert.svg
[deps-svg]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsert.svg
[deps-url]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsert
[dev-deps-svg]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsert/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/WeakMap.prototype.getOrInsert#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/weakmap.prototype.getorinsert.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/weakmap.prototype.getorinsert.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/weakmap.prototype.getorinsert.svg
[downloads-url]: https://npm-stat.com/charts.html?package=weakmap.prototype.getorinsert
[codecov-image]: https://codecov.io/gh/es-shims/WeakMap.prototype.getOrInsert/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/WeakMap.prototype.getOrInsert/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/WeakMap.prototype.getOrInsert
[actions-url]: https://github.com/es-shims/WeakMap.prototype.getOrInsert/actions
