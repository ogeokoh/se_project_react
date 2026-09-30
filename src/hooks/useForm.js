/**
 * useForm.js — Custom hook for controlled form state management.
 *
 * Encapsulates the repetitive pattern of maintaining a `values` object,
 * a single `handleChange` listener, and a `handleReset` function so each
 * form component doesn't have to re-implement them.
 *
 * Usage inside a form component:
 *   const { values, handleChange, handleReset } = useForm({ name: "", imageUrl: "", weather: "" });
 *
 *   // Wire each input:
 *   <input name="name" value={values.name} onChange={handleChange} />
 *
 *   // Reset after successful submission:
 *   onAddItem(values, handleReset); // handleReset is called inside App after API success
 */

import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  /**
   * Generic change handler — works for text, url, and radio inputs.
   * Reads event.target.name and event.target.value to update the matching key.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Reset the form back to its initial (empty) values.
   * Called after a successful API submission so the modal is clean
   * the next time it's opened.
   */
  const handleReset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleReset };
}

export default useForm;
