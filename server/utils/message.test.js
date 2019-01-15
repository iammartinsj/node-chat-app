const expect = require('expect');
const { generateMessage, generateMessageLocation } = require('./message');

describe('generateMessage', () => {
  it('should generate message object', () => {
    const from = "user@email.com";
    const text = "Hi There";
    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate location message object', () => {
    const latitude = 1;
    const longitude = 2;
    const from = 'user'
    const res = generateMessageLocation(from, latitude, longitude);
    expect(typeof res.createdAt).toBe('number');
    expect(res).toInclude({
      from,
      url: `https://google.com/maps?q=${latitude},${longitude}`
    })
  });
});