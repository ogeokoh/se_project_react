/**
 * ItemModal.jsx
 *
 * Full-screen preview modal for a single clothing card.
 * Shows the item image, name, and weather type.
 * Includes a "Delete item" button that opens DeleteConfirmationModal
 * (handled in App.jsx via the onDeleteClick prop).
 *
 * Props:
 *   isOpen        {boolean}  — controls visibility
 *   onClose       {function} — closes this modal
 *   card          {Object}   — clothing item { name, imageUrl, weather }
 *   onDeleteClick {function} — opens delete confirmation modal in App
 */

import "./ItemModal.css";
import closeIcon from "../../assets/group-119.svg";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  // Close when clicking outside the modal card (on the dark overlay)
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="modal__content modal__content_type_image">
        {/* × button — white X rendered via CSS pseudo-elements */}
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
          aria-label="Close"
        >
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-icon modal__close-icon_type_image"
          />
        </button>

        {/* db.json stores image URL in imageUrl; fall back gracefully */}
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {/*
           * Delete button — clicking it does NOT delete immediately.
           * It calls onDeleteClick which opens DeleteConfirmationModal in App,
           * giving the user a chance to cancel the action.
           */}
          <button
            type="button"
            className="modal__delete-btn"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
