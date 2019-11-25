const request = require("request");
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/c4bbd32815389738ce8c7af5a0dd43ca/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "?units=si";
  request({ url, json: true }, (err, { body }) => {
    const { error, currently } = body;
    if (err) {
      callback("Unable to connect to the weather server.", undefined);
    } else if (error) {
      callback("Unable to find the location. Try another search.", undefined);
    } else {
      console.log(
        currently.temperature,
        currently.time.toLocaleString(),
        currently.summary,
        currently.precipProbability,
        currently.humidity
        )
      callback(undefined, {
        temperature: currently.temperature,
        time: currently.time / 86400000,
        summary: currently.summary,
        rain: currently.precipProbability,
        humidity: currently.humidity
      });
    }
  });
};
module.exports = forecast;
