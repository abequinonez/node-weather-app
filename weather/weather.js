const request = require('request');

// Get weather information for the geocode information passed in
const getWeather = (lat, lng, callback) => {
  // Use an environment variable to hide the API key
  const key = process.env.WEATHER_API_KEY;

  // Make the actual request to the Dark Sky Weather API
  request(
    {
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else if (error) {
        callback('Unable to connect to Dark Sky servers.');
      } else {
        callback('Unable to retrieve weather.');
      }
    }
  );
};

module.exports = { getWeather };
