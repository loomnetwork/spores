const numberToBN = require('../index.js');
const BigNumber = require('bignumber.js');
const BN = require('bn.js');
const assert = require('chai').assert;

describe("numberToBN", () => {
  describe("constructor", () => {
    it("should be function export", () => {
      assert.equal(typeof numberToBN, 'function');
    });
  });

  describe("should function normally", () => {
    it('should convert BigNumber number to BN', () => {
      assert.deepEqual(numberToBN(new BigNumber(1000)).toNumber(10), 1000);
    });

    it('should convert a negative BigNumber', () => {
      assert.deepEqual(numberToBN(new BigNumber(-1)).toNumber(10), -1);
    });

    it('should convert a negative BigNumber string', () => {
      assert.deepEqual(numberToBN(new BigNumber('-1')).toNumber(10), -1);
    });

    it('should throw with decimal negative BigNumber', () => {
      assert.throws(() => numberToBN(new BigNumber('-100.002')), Error);
    });

    it('should throw with decimal BigNumber', () => {
      assert.throws(() => numberToBN(new BigNumber('100.002')), Error);
    });

    it('should throw with with just decimal', () => {
      assert.throws(() => numberToBN('.'), Error);
    });

    it('should throw with with decimal letters BigNumber', () => {
      assert.throws(() => numberToBN('-100.0'), Error);
    });

    it('should throw with with decimal letters BigNumber', () => {
      assert.throws(() => numberToBN('100.002fsdfdss'), Error);
    });

    it('should throw with with letters', () => {
      assert.throws(() => numberToBN('fsdf11k'), Error);
    });

    it('should convert hexified number', () => {
      assert.deepEqual(numberToBN('-0x0a').toString(10), (new BN('-0a')).toString(10));
    });

    it('should convert hexified number', () => {
      assert.deepEqual(numberToBN('0xa').toString(10), (new BN('a')).toString(10));
    });

    it('should convert hexified number', () => {
      assert.deepEqual(numberToBN('0x0a').toString(10), (new BN('0a')).toString(10));
    });

    it('should convert a negaitve int number', () => {
      assert.deepEqual(numberToBN(-873248723498).toString(10), '-873248723498');
    });

    it('should convert a normal number', () => {
      assert.deepEqual(numberToBN(423982347897).toString(10), '423982347897');
    });

    it('should convert non hexified string', () => {
      assert.deepEqual(numberToBN('10').toString(10), (new BN('0a')).toString(10));
    });

    it('should convert zero number', () => {
      assert.deepEqual(numberToBN(0).toString(10), '0');
    });

    it('should convert negative zero string BigNuber', () => {
      assert.deepEqual(numberToBN(new BigNumber('-0')).toString(10), '0');
    });

    it('should convert zero string -1', () => {
      assert.deepEqual(numberToBN(new BigNumber('-1')).toString(10), '-1');
    });

    it('should convert zero string', () => {
      assert.deepEqual(numberToBN(new BigNumber('0')).toString(10), '0');
    });

    it('should convert normal long number BigNumber', () => {
      assert.deepEqual(numberToBN(new BigNumber('423879248942387943287923489724387987923')).toString(10), '423879248942387943287923489724387987923');
    });

    it('should convert normal long number', () => {
      assert.deepEqual(numberToBN('423879248942387943287923489724387987923').toString(10), '423879248942387943287923489724387987923');
    });

    it('should convert not a number new Array', () => {
      assert.throws(() => numberToBN(new Array()), Error);
    });

    it('should convert not a number array', () => {
      assert.throws(() => numberToBN([]), Error);
    });

    it('should convert not a number null', () => {
      assert.throws(() => numberToBN(null), Error);
    });

    it('should throw convert not a number', () => {
      assert.throws(() => numberToBN(undefined), Error);
    });
  });

  describe('web3 tests', () => {
    const tests = [
      { value: 1, expected: '1' },
      { value: '1', expected: '1' },
      { value: '0x1', expected: '1'},
      { value: '0x01', expected: '1'},
      { value: 15, expected: '15'},
      { value: '15', expected: '15'},
      { value: '0xf', expected: '15'},
      { value: '0x0f', expected: '15'},
      { value: new BN('f', 16), expected: '15'},
      { value: new BigNumber('f', 16), expected: '15'},
      { value: -1, expected: '-1'},
      { value: '-1', expected: '-1'},
      { value: '-0x1', expected: '-1'},
      { value: '-0x01', expected: '-1'},
      { value: -15, expected: '-15'},
      { value: '-15', expected: '-15'},
      { value: '-0xf', expected: '-15'},
      { value: '-0x0f', expected: '-15'},
      { value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', expected: '115792089237316195423570985008687907853269984665640564039457584007913129639935'},
      { value: '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd', expected: '115792089237316195423570985008687907853269984665640564039457584007913129639933'},
      { value: '-0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', expected: '-115792089237316195423570985008687907853269984665640564039457584007913129639935'},
      { value: '-0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffd', expected: '-115792089237316195423570985008687907853269984665640564039457584007913129639933'},
      { value: 0, expected: '0'},
      { value: '0', expected: '0'},
      { value: '0x0', expected: '0'},
      { value: -0, expected: '0'},
      { value: '-0', expected: '0'},
      { value: '-0x0', expected: '0'},
      { value: new BN(0), expected: '0'},
      { value: new BigNumber(0), expected: '0'}
    ];

    tests.forEach(function (test) {
        it('should turn ' + test.value + ' to ' + test.expected, function () {
            assert.equal(numberToBN(test.value).toString(10), test.expected);
        });
    });
  });
});
