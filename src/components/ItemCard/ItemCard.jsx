/**
 * ItemCard.jsx
 *
 * A single clothing card displayed in the cards grid on Main and ClothesSection.
 * Clicking the image opens ItemModal via the onCardClick handler from the parent.
 *
 * Note: items fetched from json-server use `imageUrl` for the image path.
 * The fallback to `item.link` maintains backward-compat with legacy constants data.
 */

import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
