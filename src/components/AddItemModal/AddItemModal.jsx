/**
 * AddItemModal.jsx
 *
 * Modal form that lets the user add a new clothing item.
 * It wraps the shared ModalWithForm shell and uses the custom useForm hook
 * to keep every input field controlled (value + onChange always in sync).
 *
 * Props:
 *   isOpen       {boolean}  — controls modal visibility
 *   onAddItem    {function} — submission handler from App.jsx; receives
 *                             (values, handleReset) so the reset only fires
 *                             after the API call succeeds
 *   onCloseModal {function} — closes the modal (passed to ModalWithForm)
 */

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // useForm initialises all fields to empty strings so every input is
  // controlled from the very first render.
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  /**
   * Prevents the default browser form submission, then delegates to the
   * handler in App.jsx. handleReset is passed along so App can call it
   * only after the API POST succeeds (preventing premature resets).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, handleReset);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      {/* Name input — controlled via useForm */}
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      {/* Image URL input — controlled via useForm */}
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      {/*
       * Weather type radio group — controlled via the `checked` prop.
       * Using `checked` (not just `value`) is required so that calling
       * handleReset reliably unchecks all buttons when values.weather === "".
       */}
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
