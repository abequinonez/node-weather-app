const request = require('request');

// Get geocode information from an address passed in
const geocodeAddress = (address, callback) => {
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
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {geocodeAddress};
