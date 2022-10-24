import React, { useState } from "react";

/** SearchForm Component
 * Props: search()
 * State: formData
 * {Companies, Jobs} -> SearchForm
 */

function SearchForm({ search }) {
  const [formData, setFormData] = useState({});

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
  }

  return (
    <div className="SearchForm row">
      <form onSubmit={handleSubmit}>
        <input
          id="search-term"
          name="searchTerm"
          className="form-control col"
          placeholder="Enter search term.."
          onChange={handleChange}
          value={formData.searchTerm || ""}
          aria-label="enter search term"
        />
        <button className="btn-primary btn SearchForm-btn form-text col">
          Submit
        </button>
      </form>
    </div>
  );
}
//make button inline element
export default SearchForm;