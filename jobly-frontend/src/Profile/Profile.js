import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import JoblyApi from "../api";
import userContext from "../userContext";
import Loading from "../Loading/Loading";

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
    errors: []
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
        errors: []
      });
    } catch (err) {
      setUpdateStatus({
        success: false,
        errors: err
      });
    }
  }

  return (
    <div className="Profile">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            disabled={true}
            name="username"
            onChange={handleChange}
            value={formData.data.user.username || ""}
            aria-label="username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.data.user.firstName || ""}
            aria-label="first name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.data.user.lastName || ""}
            aria-label="last name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.data.user.email || ""}
            aria-label="email"
          />
        </div>

        {updateStatus.success}
        {updateStatus.errors &&
          <div className="Profile-err">
            {updateStatus.errors.map(error => <p key={error}>{error}</p>)}
          </div>}

        <button className="btn-primary btn Profile-btn form-text col">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
