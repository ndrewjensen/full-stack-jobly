import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../userContext";

/** Login Component
 *
 * Props: login function to call in App
 * State: formData
 * RoutesList -> Login
 */

function Login({ loginUser }) {

  const [formData, setFormData] = useState({});
  const { username } = useContext(userContext);
  const [incorrectLogin, setIncorrectLogin] = useState(false);

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
      await loginUser(formData);
      setFormData({});
    } catch (err) {
      setIncorrectLogin(true);
    }
  }

  if (username) return <Navigate to={"/"} />;

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

        {incorrectLogin &&
          <p className="Login-incorrectLogin">incorrect username/password</p>}

        <button className="btn-primary btn Register-btn form-text col">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
