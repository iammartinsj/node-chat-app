const expect = require('expect');
const {isRealString} = require('./validation');

describe("isRealString", () => {
  it('should reject non-string values', () => {
    const res = isRealString(231232);
    expect(res).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    const res = isRealString('     ');
    expect(res).toBeFalsy();
  });

  it('should reject non-string values', () => {
    const res = isRealString('stringtest');
    expect(res).toBeTruthy();
  });
});