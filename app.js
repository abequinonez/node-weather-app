const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// Prepare the argv object to get user input
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

// Get location coordinates for a given address
geocode.geocodeAddress(argv.a, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results.address);

    // Get weather information for a given set of coordinates
    weather.getWeather(
      results.latitude,
      results.longitude,
      (error, weatherResults) => {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `It's currently ${weatherResults.temperature}. It fees like ${
              weatherResults.apparentTemperature
            }.`
          );
        }
      }
    );
  }
});
