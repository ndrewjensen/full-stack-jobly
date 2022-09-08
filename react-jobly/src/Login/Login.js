import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Login Component
 *
 * props: auth function to call in App
 *
 * state: formData
 *
 * RoutesList -> Login
 */

function Login({ auth }) {
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
    auth(formData, "token");
    navigate("/");
  }

  return (
    <div className="Login">
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
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password || ""}
            aria-label="password"
          />
        </div>

        <button className="btn-primary btn Register-btn form-text col">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
