const request = require('request');

// Get geocode information from an address passed in
const geocodeAddress = address => {
  // Encode the address before making the request
  const encodedAddress = encodeURIComponent(address);

  // Use an environment variable to hide the API key
  const key = process.env.API_KEY;

  // Make the actual request to the Google Maps Geocoding API
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find that address.');
    } else if (body.status === 'OK') {
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports = {geocodeAddress};
