import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Register Component
 *
 * props: auth function to call in App
 *
 * state: formData
 *
 * RoutesList -> Register
 */

function Register({ auth }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData((formData) => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    auth("auth/register", formData, "post");
    //FIXME: fix this navigate bug to match login behavior
    navigate("/");
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username || ""}
            aria-label="username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password || ""}
            aria-label="password"
          />
        </div>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName || ""}
            aria-label="first name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName || ""}
            aria-label="last name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email || ""}
            aria-label="email"
          />
        </div>
        <button className="btn-primary btn Register-btn form-text col">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
