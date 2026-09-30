export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    // Note: the day-time asset is named "sunny.png" (unlike its night
    // counterpart, which is "clear.png") — pointing this at a nonexistent
    // "day/clear.png" caused the image request to 404, which removed the
    // gradient banner background and left the white temperature text
    // invisible against the page's white background.
    url: new URL("../assets/day/sunny.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

/**
 * NOTE: defaultClothingItems was removed in Sprint 11.
 * Items are now fetched from db.json via json-server (localhost:3001).
 * See utils/api.js — getItems().
 */

export const coordinates = {
  latitude: 29.7604,
  longitude: -95.3698,
};

export const apiKey = "908eb17d97a731490b591a56bd633470";
