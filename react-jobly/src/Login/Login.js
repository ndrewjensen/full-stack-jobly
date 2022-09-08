import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import userContext from "../userContext";

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
  const { username } = useContext(userContext);

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
    await auth("auth/token", formData,"post");
    setFormData({});

  }
  if (username) return <Navigate to={"/"} />

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
            autoComplete="on"
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
