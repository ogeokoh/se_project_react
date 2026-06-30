/**
 * DeleteConfirmationModal.jsx
 *
 * A safety modal shown when the user clicks the delete button inside ItemModal.
 * Prevents accidental deletion by asking for explicit confirmation.
 *
 * Flow:
 *   1. User clicks "Delete item" in ItemModal
 *   2. App opens this modal (activeModal === "delete-confirmation")
 *   3. "Yes, delete item" calls handleCardDelete in App → API DELETE → state update
 *   4. "Cancel" or × just closes the modal, item is untouched
 *
 * Props:
 *   isOpen           {boolean}  — controls visibility
 *   onClose          {function} — closes modal without deleting
 *   onDeleteConfirm  {function} — confirmed delete handler from App.jsx
 */

import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/group-119.svg";

function DeleteConfirmationModal({ isOpen, onClose, onDeleteConfirm }) {
  // Close when clicking the dark overlay outside the card
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
      <div className="modal__content modal__content_type_confirm">
        {/* × close button */}
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <p className="modal__confirm-text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>

        <div className="modal__confirm-buttons">
          {/* Confirm — triggers API delete in App.jsx */}
          <button
            type="button"
            className="modal__confirm-delete"
            onClick={onDeleteConfirm}
          >
            Yes, delete item
          </button>

          {/* Cancel — closes modal, nothing is deleted */}
          <button
            type="button"
            className="modal__confirm-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
