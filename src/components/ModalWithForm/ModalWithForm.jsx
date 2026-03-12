import "./ModalWithForm.css";
import closeIcon from "../../assets/group-119.svg";

function ModalWithForm({ children, buttonText, title, name, isOpen, onClose }) {
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
        <form className="modal__form" name={name}>
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
