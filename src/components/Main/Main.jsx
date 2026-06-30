/**
 * Main.jsx — the root route ("/") page content.
 *
 * Shows:
 *   1. WeatherCard — current conditions illustration + temperature
 *   2. Filtered clothing grid — only items matching the current weather type
 *
 * Temperature unit is read from CurrentTemperatureUnitContext so the label
 * in the section header stays in sync with the toggle switch.
 */

import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  // Active unit ("F" or "C") from context — keeps label in sync with toggle
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        {/* Display temperature in whichever unit the user has selected */}
        <p className="cards__text">
          Today is {weatherData.temp?.[currentTemperatureUnit]}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        {/* Only show items appropriate for the current weather type */}
        <ul className="cards__list">
          {clothingItems
            .filter(
              (item) =>
                item.weather.toLowerCase() === weatherData.type
            )
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
