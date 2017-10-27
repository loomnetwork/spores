var BN = require('bn.js');
var isHexPrefixed = require('is-hex-prefixed');
var stripHexPrefix = require('strip-hex-prefix');

/**
 * Returns a BN object, converts a number value to a BN
 * @param {String|Number|Object} `arg` input a string number, hex string number, number, BigNumber or BN object
 * @return {Object} `output` BN object of the number
 * @throws if the argument is not an array, object that isn't a bignumber, not a string number or number
 */
module.exports = function numberToBN(arg) {
  var errorMessage = new Error('[number-to-bn] while converting number to BN.js object, argument "' + String(arg) + '" type "' + String(typeof(arg)) + '" must be either a negative or positive (1) integer number, (2) string integer, (3) valid prefixed hex number string, (4) BN.js object instance or a (5) bignumber.js object.');
  if (typeof arg === 'string') {
    if (arg.match(/0[xX][0-9a-fA-F]+/) || arg.match(/^-?[0-9]+$/)) {
      if (isHexPrefixed(arg)) {
        return new BN(stripHexPrefix(arg), 16);
      } else if (arg.substr(0, 3) === '-0x') {
        return new BN('-' + String(arg.slice(3)), 16);
      } else { // eslint-disable-line
        return new BN(arg, 10);
      }
    } else {
      throw errorMessage;
    }
  } else if (typeof arg === 'number') {
    return new BN(String(arg));
  } else if (typeof arg === 'object'
    && arg.toString
    && (!arg.pop && !arg.push)) {
    if (arg.toString(10).match(/^-?[0-9]+$/)) {
      if (arg.toArray && arg.toTwos) {
        return arg;
      } else {
        return new BN(arg.toString(10));
      }
    } else {
      throw errorMessage;
    }
  } else {
    throw errorMessage;
  }
}
