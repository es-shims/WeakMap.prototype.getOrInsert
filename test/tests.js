'use strict';

var forEach = require('for-each');
var inspect = require('object-inspect');
var v = require('es-value-fixtures');

module.exports = function (getOrInsert, t) {
	t.equal(typeof getOrInsert, 'function', 'is a function');

	t.test('no WeakMaps', { skip: typeof WeakMap !== 'undefined' }, function (st) {
		st['throws'](
			function () { getOrInsert([], Boolean); },
			SyntaxError,
			'Maps are not supported'
		);

		st.end();
	});

	t.test('non-WeakMaps', function (st) {
		forEach(v.primitives.concat(v.objects), function (nonWeakMap) {
			st['throws'](
				function () { getOrInsert(nonWeakMap); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				inspect(nonWeakMap) + ' is not a WeakMap'
			);
		});

		st.end();
	});

	t.test('functionality', { skip: typeof WeakMap === 'undefined' }, function (st) {
		var m = new WeakMap();
		var key = { key: true };
		var sentinel = { sentinel: true };

		st.notOk(m.has(key), 'starts without key');

		st.equal(getOrInsert(m, key, sentinel), sentinel, 'adding, returns value');

		st.ok(m.has(key), 'ends with key');

		st.equal(getOrInsert(m, key, sentinel), sentinel, 'already has, still returns value');

		st.ok(m.has(key), 'still has key');

		forEach(v.nonSymbolPrimitives.concat(v.registeredSymbols), function (nonWeakable) {
			st['throws'](
				function () { getOrInsert(m, nonWeakable); },
				TypeError,
				inspect(nonWeakable) + ' is not a valid key'
			);
		});

		st.test('Maps', { skip: typeof Map !== 'function' }, function (s2t) {
			var s = new Map();

			s2t['throws'](
				function () { getOrInsert(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				'Map is not a WeakMap'
			);

			s2t.end();
		});

		st.test('Sets', { skip: typeof Set !== 'function' }, function (s2t) {
			var s = new Set();

			s2t['throws'](
				function () { getOrInsert(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				'Set is not a WeakMap'
			);

			s2t.end();
		});

		st.test('WeakSets', { skip: typeof WeakSet !== 'function' }, function (s2t) {
			var s = new WeakSet();

			s2t['throws'](
				function () { getOrInsert(s); },
				typeof WeakMap === 'undefined' ? SyntaxError : TypeError,
				'WeakSet is not a WeakMap'
			);

			s2t.end();
		});

		st.end();
	});
};
