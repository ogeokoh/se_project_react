import "./ModalWithForm.css";
import closeIcon from "../../assets/group-119.svg";

/**
 * ModalWithForm — reusable modal shell for forms.
 *
 * Props:
 *   children   — form field content provided by the consuming component
 *   buttonText — label for the submit button
 *   title      — modal heading
 *   name       — HTML form name attribute
 *   isOpen     — controls visibility via CSS class
 *   onClose    — handler for the × button and overlay click
 *   onSubmit   — form submit handler (e.g. from AddItemModal)
 */
function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  // Close when clicking the dark overlay (not the modal box itself)
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
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        {/* onSubmit wired from the consuming form component */}
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
