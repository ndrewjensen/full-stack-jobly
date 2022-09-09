import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";

import RoutesList from "../RoutesList/RoutesList";
import Nav from "../Nav/Nav";
import userContext from "../userContext";
import JoblyApi from "../api";
import "./App.css";

const TOKEN = "tokenStorageId";

/** App Component
 * Props: none
 * State: username,user,token,isLoading
 * App -> Companies -> { Nav, RoutesList}
 */

//TODO: login in infinite loop

function App() {
  const [username, setUsername] = useState("");

  const [user, setUser] = useState({
    data: {},
    isLoading: true,
  });

  const [token, setToken] = useState("");

  //TODO: user api call here; prevent rendering of routes before checking if user state

  useEffect(() => {
    //check for token in local storage on mount
    if (localStorage.getItem(TOKEN)) {
      const localToken = localStorage.getItem(TOKEN);
      setToken(localToken);
    }

    //update user, local storage, and JoblyAPI.token from current token
    if (token) {
      const decodedToken = jwt_decode(token);
      localStorage.setItem(TOKEN, token);
      JoblyApi.token = token;

      async function getUserDetail() {
        if (username) {
          const resp = await JoblyApi.getUser(username);
          setUser({
            data: resp,
            isLoading: false
          });
          setUsername(decodedToken.username);
        }
      }
      getUserDetail();
    }
  }, [token]);

  /** handle login */

  async function loginUser(formData) {
    const resp = await JoblyApi.loginUser(formData);
    setToken(resp.token);
  }

  /** handle register */

  async function registerUser(formData) {
    const resp = await JoblyApi.registerUser(formData);
    setToken(resp.token);
  }

  /** handle update */

  async function updateUser(formData) {
    await JoblyApi.updateUser(username.data, formData);
  }

  /** logout function resets state of user and token,
   * clears local storage and token property in JoblyApi */

  function logOut() {
    setToken("");
    setUsername("");
    setUser({
      data: {},
      isLoading: false
    })

    localStorage.removeItem(TOKEN);
    JoblyApi.token = "";
  }

  return (
    <div className="App">
      <userContext.Provider value={{ username: username, user: user.data }}>
        <BrowserRouter>
          <Nav logOut={logOut} />
          <RoutesList
            loginUser={loginUser}
            registerUser={registerUser}
            updateUser={updateUser}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
