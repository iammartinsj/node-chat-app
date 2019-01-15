const moment  = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateMessageLocation = (from, latitude, longitude) => {
  return {
    from,
    url: `https://google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = { generateMessage, generateMessageLocation }