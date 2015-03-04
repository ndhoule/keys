'use strict';

/**
 * hasOwnProperty reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * isObject
 *
 * @param {*} val
 * @return {boolean} Returns true if the value is an object
 */

// TODO: Move into library
var isObject = function isObject(val) {
  return val != null && typeof val === 'object';
};

/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
 *
 * @name keys
 * @api public
 * @category Object
 * @param {Object} source The value to retrieve keys from.
 * @return {Array} An array containing all the input `source`'s keys.
 * @example
 * keys({ likes: 'avocado', hates: 'pineapple' });
 * //=> ['likes', 'pineapple'];
 *
 * // Ignores non-enumerable properties
 * var hasHiddenKey = { name: 'Tim' };
 * Object.defineProperty(hasHiddenKey, 'hidden', {
 *   value: 'i am not enumerable!',
 *   enumerable: false
 * })
 * keys(hasHiddenKey);
 * //=> ['name'];
 *
 * // Works on arrays
 * keys(['a', 'b', 'c']);
 * //=> ['0', '1', '2']
 *
 * // Skips unpopulated indices in sparse arrays
 * var arr = [1];
 * arr[4] = 4;
 * keys(arr);
 * //=> ['0', '4']
 */

module.exports = function keys(source) {
  if (!isObject(source)) {
    return [];
  }

  var results = [];

  for (var key in source) {
    if (has.call(source, key)) {
      results.push(key);
    }
  }

  return results;
};
