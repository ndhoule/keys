'use strict';

var assert = require('assert');
var eql = require('deep-eql');
var keys = require('../');

describe('keys', function() {
  it('should be a function', function() {
    assert(typeof keys === 'function');
  });

  it('should have an arity of 1', function() {
    assert(keys.length === 1);
  });

  it('it should return a list of the object\'s keys', function() {
    assert(eql(
      keys({ a: 1, b: 2, c: 3 }),
      ['a', 'b', 'c']
    ));
  });

  it('should ignore inherited properties', function() {
    var parent = { hidden: true };
    var child = Object.create(parent);
    child.visible = true;

    assert(eql(
      keys(child),
      ['visible']
    ));
  });

  it('should skip keys in sparse arrays', function() {
    var sparse = [1];
    sparse[3] = 2;

    assert(eql(
      keys(sparse),
      ['0', '3']
    ));
  });

  it('should ignore non-enumerable properties', function() {
    var object = { visible: true };
    Object.defineProperty(object, 'hidden', {
      value: true,
      enumerable: false
    });

    assert(eql(
      keys(object),
      ['visible']
    ));
  });

  it('should return an empty array when passed `null` or `undefined` values', function() {
    assert(eql(keys(null), []));
    assert(eql(keys(undefined), []));
  });

  it('should work on arrays', function() {
    assert(eql(keys([]), []));
    assert(eql(keys(['a', 'b', 'c']), ['0', '1', '2']));
  });

  it('should work on arguments objects', function() {
    (function() {
      assert(eql(keys(arguments), ['0', '1', '2']));
    }('a', 'b', 'c'));
  });

  it('should work on string objects', function() {
    assert(eql(keys(new String('abc')), ['0', '1', '2']));
  });

  it('should return an empty array for primitive values', function() {
    assert(eql(keys('abc'), []));
    assert(eql(keys(true), []));
    assert(eql(keys(/fdsa/), []));
    assert(eql(keys(123), []));
  });
});
