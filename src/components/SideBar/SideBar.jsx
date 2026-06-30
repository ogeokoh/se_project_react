/**
 * SideBar.jsx
 *
 * Displays the current user's avatar and username on the Profile page.
 * User data is hardcoded for now — real auth and user data will be
 * introduced in a later sprint.
 */

import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
