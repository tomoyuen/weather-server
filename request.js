const OAuth = require('oauth');
const { appId, clientId, clientSecret } = require('./config.json');

const header = { 'X-Yahoo-App-Id': appId };

const request = new OAuth.OAuth(
  null,
  null,
  clientId,
  clientSecret,
  '1.0',
  null,
  'HMAC-SHA1',
  null,
  header
);

module.exports = (location = 'hangzhou', callback) => new Promise((resolve, reject) => {
  request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json`,
    null,
    null,
    (err, data) => {
      if (err) reject(err);
      resolve(data);
    }
  )
});
