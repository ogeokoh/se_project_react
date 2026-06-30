/**
 * ToggleSwitch.jsx
 *
 * A styled checkbox that toggles the temperature unit between °F and °C.
 * Uses CurrentTemperatureUnitContext to both read the current unit
 * and call the toggle handler — no props needed from the parent.
 *
 * Visual behaviour:
 *   - The black circle slides left (F active) or right (C active)
 *   - The active letter appears white; the inactive letter is grey
 */

import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      {/*
       * The checkbox is invisible (opacity: 0) but drives the CSS
       * :checked selector that shifts the sliding circle.
       * checked = true when C is active (circle on the right).
       */}
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span className="toggle-switch__circle"></span>
      <span
        style={{ color: currentTemperatureUnit === "F" ? "white" : "" }}
        className="toggle-switch__text toggle-switch__text_F"
      >
        F
      </span>
      <span
        style={{ color: currentTemperatureUnit === "C" ? "white" : "" }}
        className="toggle-switch__text toggle-switch__text_C"
      >
        C
      </span>
    </label>
  );
}
