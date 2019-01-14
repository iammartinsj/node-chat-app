const expect = require('expect');
const { generateMessage } = require('./message');

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