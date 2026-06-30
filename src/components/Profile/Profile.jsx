/**
 * Profile.jsx
 *
 * The /profile route page. Composed of two child components:
 *   - SideBar: shows hardcoded user avatar and name
 *   - ClothesSection: shows ALL clothing items (unfiltered) with an add button
 *
 * Props:
 *   clothingItems  {Array}    — full items array from App state
 *   handleCardClick {function} — opens ItemModal for the clicked card
 *   onAddClick     {function}  — opens AddItemModal
 */

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, handleCardClick, onAddClick }) {
  return (
    <div className="profile">
      {/* Left panel: user info */}
      <SideBar />

      {/* Right panel: full wardrobe grid */}
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
}

export default Profile;
