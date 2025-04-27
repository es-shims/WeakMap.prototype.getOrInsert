'use strict';

var callBound = require('call-bound');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var CanBeHeldWeakly = require('es-abstract/2024/CanBeHeldWeakly');

var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);

module.exports = function getOrInsert(key, value) {
	if (!$weakMapHas) {
		throw new $SyntaxError('`getOrInsert` is not supported unless a native WeakMap exists');
	}

	var M = this; // step 1

	// 2. Perform ? RequireInternalSlot(M, [[WeakMapData]]).
	$weakMapHas(M, M); // step 2

	if (!CanBeHeldWeakly(key)) {
		throw new $TypeError('Key can not be held weakly: ' + key); // step 3
	}

	if ($weakMapHas(M, key)) { // step 4
		return $weakMapGet(M, key); // step 4.a
	}

	$weakMapSet(M, key, value); // step 5, 6

	return value; // step 7
};
