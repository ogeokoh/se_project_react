/**
 * Header.jsx
 *
 * Top navigation bar present on every page.
 *
 * Layout (matches Figma):
 *   [Logo]  [Date + City]          →  [Toggle] [+ Add clothes] [Avatar + Name]
 *    left    left                      right-side group (margin-left: auto)
 *
 * Uses React Router's <Link> for client-side navigation:
 *   - Logo          → "/"        (Main page)
 *   - User info     → "/profile" (Profile page)
 */

import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* Left side: logo links back to Main */}
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || ""}
      </p>

      {/*
       * Right-side controls group — pushed to the far right by margin-left: auto.
       * Keeps toggle, add button, and user info visually clustered together,
       * matching the Figma design where all three live on the right of the header.
       */}
      <div className="header__controls">
        {/* Temperature unit toggle — reads/writes context internally */}
        <ToggleSwitch />

        <button
          onClick={onAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>

        {/* User info navigates to /profile */}
        <Link to="/profile" className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
