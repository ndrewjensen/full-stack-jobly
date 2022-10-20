import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import userContext from "../userContext";

/** Profile component
 *
 * Props: updateUser() to call in App
 * State: formData, updateStatus
 * RoutesList -> Profile
 */

function Profile({ updateUser }) {
  const { username, user } = useContext(userContext);
  const [formData, setFormData] = useState({
    data: user,
    isLoading: true,
  });
  const [updateStatus, setUpdateStatus] = useState({
    success: false,
    errors: [],
  });

  if (!username) return <Navigate to={"/"} />;

  /** Update form input. */

  function handleChange(evt) {
    const input = evt.target;
    setFormData((formData) => ({
      ...formData,
      data: {
        ...formData.data,
        [input.name]: input.value,
      },
    }));
  }

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const json = {
      firstName: formData.data.firstName,
      lastName: formData.data.lastName,
      email: formData.data.email,
    };
    try {
      await updateUser(json);
      setUpdateStatus({
        success: <p className="Profile-success">Updated Successfully</p>,
        errors: [],
      });
    } catch (err) {
      setUpdateStatus({
        success: false,
        errors: err,
      });
    }
  }

  return (
    <div className="Profile col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1>Profile</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                disabled={true}
                name="username"
                onChange={handleChange}
                value={formData.data.user.username || ""}
                aria-label="username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                className="form-control"
                name="firstName"
                onChange={handleChange}
                value={formData.data.user.firstName || ""}
                aria-label="first name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                className="form-control"
                name="lastName"
                onChange={handleChange}
                value={formData.data.user.lastName || ""}
                aria-label="last name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={formData.data.user.email || ""}
                aria-label="email"
              />
            </div>

            {updateStatus.success}
            {updateStatus.errors && (
              <div className="Profile-err">
                {updateStatus.errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}

            <button className="btn-primary btn Profile-btn form-text col">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
