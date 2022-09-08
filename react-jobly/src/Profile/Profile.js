import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import userContext from "../userContext";
import Loading from "../Loading/Loading"

function Profile({ update }) {
  const [formData, setFormData] = useState({
    data : {},
    isLoading: true
  });

  const { username } = useContext(userContext);
  let success = false;

  //FIXME: go to Api Model? Send token?
  useEffect(() => {
    async function getUserDetail() {
      const resp = await JoblyApi.request(`users/${username}`);
      setFormData({
        data: resp.data,
        isLoading: false});
    }
    getUserDetail();
  });

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
    const json  ={ 
      firstname: formData.firstName, 
      lastName: formData.lastName,
      email: formData.email
    }
    update(`patch/${username}`,json);
    success = <p>Updated Successfully</p>;
  }

  if (formData.isLoading) return <Loading />
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
            placeholder="don't type password!"
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
        {success && success}
        <button className="btn-primary btn Profile-btn form-text col">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
