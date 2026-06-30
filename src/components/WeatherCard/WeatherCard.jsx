/**
 * WeatherCard.jsx
 *
 * Displays the current temperature and a contextual weather illustration.
 * Subscribes to CurrentTemperatureUnitContext so the temperature switches
 * between °F and °C whenever the user toggles the switch in the header.
 *
 * The displayed image is chosen from `weatherOptions` by matching the
 * time-of-day flag (isDay) and the weather condition string. A default
 * fallback image is used when no specific match is found.
 */

import "./WeatherCard.css";
import { useContext } from "react";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // Pull the active unit ("F" or "C") from context — no prop needed
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Find a matching weather illustration for current conditions
  const filteredOptions = weatherOptions.filter(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
  );

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : weatherData.isDay
      ? defaultWeatherOptions.day
      : defaultWeatherOptions.night;

  return (
    <section className="weather-card">
      {/*
       * weatherData.temp is an object: { F: number, C: number }
       * currentTemperatureUnit is either "F" or "C", so indexing with
       * bracket notation gives the correct value automatically.
       */}
      <p className="weather-card__temp">
        {weatherData.temp?.[currentTemperatureUnit]}&deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherData.isDay ? "day" : "night"}time weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
