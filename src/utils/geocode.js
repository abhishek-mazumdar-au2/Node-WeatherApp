const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2l1Z2VlIiwiYSI6ImNrMzNkcGVjaTBxMHMzaXF1bnRlM3N5YmgifQ.A52uo6OJBdcHA_UCTMYGxQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    const { features } = body;
    if (error) {
      callback("Weather connection not established.", undefined);
    } else if (features.length === 0) {
      callback("Location not found. Please try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
