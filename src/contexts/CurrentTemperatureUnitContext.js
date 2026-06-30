/**
 * CurrentTemperatureUnitContext.js
 *
 * Creates and exports the React context used to share the active temperature
 * unit ("F" or "C") and its toggle handler across the component tree.
 *
 * Provider is set up in App.jsx; any component that needs the unit value
 * (WeatherCard, Main, ToggleSwitch) imports this context and calls useContext()
 * to subscribe to it — no prop-drilling required.
 */

import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext();

export default CurrentTemperatureUnitContext;
