const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a);
