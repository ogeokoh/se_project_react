/**
 * weatherAPI.js
 *
 * Utility module for fetching and parsing live weather data from OpenWeather.
 *
 * Two functions are exported:
 *   getWeather        — makes the API call and returns raw JSON
 *   filterWeatherData — extracts only the fields our app needs and derives
 *                       both F and C temperature values from the single
 *                       imperial value the API returns
 *
 * Temperature conversion:
 *   The API is called with units=imperial so all temp values arrive in °F.
 *   We derive Celsius here so every component only has to index into
 *   weatherData.temp with the active unit string ("F" or "C").
 */

/**
 * Fetch current weather for the given coordinates.
 * Resolves with raw API JSON; rejects with an error string on non-2xx status.
 *
 * @param {{ latitude: number, longitude: number }} coords
 * @param {string} APIkey — OpenWeather API key (from constants.js)
 * @returns {Promise<Object>} raw OpenWeather response
 */
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

/**
 * Extract only the fields we use from a raw OpenWeather response.
 *
 * Returned shape:
 *   {
 *     city:      string,           // "Houston"
 *     temp:      { F: number, C: number },
 *     type:      "hot"|"warm"|"cold",  // drives clothing filter in Main
 *     condition: string,           // "clear", "cloudy", etc. (for WeatherCard image)
 *     isDay:     boolean,          // true between sunrise and sunset
 *   }
 *
 * @param {Object} data — raw OpenWeather JSON
 * @returns {Object} filtered weather data
 */
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    // Convert the imperial value we received to Celsius
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(data.main.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

/**
 * Returns true if the current time is between sunrise and sunset.
 * OpenWeather timestamps are in seconds; Date.now() is in milliseconds.
 *
 * @param {{ sunrise: number, sunset: number }} sys — from OpenWeather response
 * @param {number} now — current timestamp in ms (Date.now())
 */
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

/**
 * Map a Fahrenheit temperature to one of three wardrobe categories.
 * These thresholds determine which clothing items are displayed on Main.
 *
 * @param {number} temperature — in °F
 * @returns {"hot"|"warm"|"cold"}
 */
const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
