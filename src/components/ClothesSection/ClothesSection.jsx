/**
 * ClothesSection.jsx
 *
 * Renders ALL clothing items (no weather filter) on the Profile page,
 * along with a "+ Add clothes" button to open AddItemModal.
 *
 * Props:
 *   clothingItems {Array}    — full list of items from App state
 *   handleCardClick {function} — opens ItemModal for the clicked card
 *   onAddClick {function}    — opens AddItemModal
 */

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, onAddClick }) {
  return (
    <div className="clothes-section">
      {/* Header row: label + add-item button */}
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      {/* All clothing items — not filtered by weather type */}
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
