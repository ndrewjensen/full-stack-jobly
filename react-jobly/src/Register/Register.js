import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../userContext";

/** Register Component
 *
 * Props: register function to call in App
 * State: formData, errors
 * RoutesList -> Register
 */

function Register({ registerUser }) {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(false);

  const { username } = useContext(userContext);
  if (username) return <Navigate to={"/"} />;

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData((formData) => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await registerUser(formData);
    } catch (err) {
      setErrors(err);
    }
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
            autoComplete="on"
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

        {errors &&
          <div className="Register-err">
            {errors.map(error => <p key={error}>{error}</p>)}
          </div>}

        <button className="btn-primary btn Register-btn form-text col">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
