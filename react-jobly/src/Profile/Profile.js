import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import userContext from "../userContext";
import Loading from "../Loading/Loading";

function Profile({ update }) {
  const [formData, setFormData] = useState({
    data: {},
    isLoading: true
  });


  const { username } = useContext(userContext);
  let success = false;

  useEffect(() => {
    async function getUserDetail() {
      // console.log("JOBLYAPIT token", JoblyApi.token);
      const resp = await JoblyApi.request(`users/${username}`);
      // console.log("RESP DATA", resp.user);

      setFormData({
        data: resp.user,
        isLoading: false
      });
    }
    getUserDetail();
  }, [username]);

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    
    console.log("Profile handleChange() input",input)
    setFormData((formData) => ({
      ...formData, 
      data: {
        ...formData.data,
        [input.name]: input.value},
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const json = {
      firstName: formData.data.firstName,
      lastName: formData.data.lastName,
      email: formData.data.email
    };
    await update(`users/${username}`, json, "patch");
    success = <p>Updated Successfully</p>;
  }

  if (formData.isLoading) return <Loading />;

  // let { firstName, lastName, email } = formData.data;

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
            value={username|| ""}
            aria-label="username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.data.firstName || ""}
            aria-label="first name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.data.lastName || ""}
            aria-label="last name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.data.email || ""}
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
