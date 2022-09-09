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
 *
 * App -> Companies -> { Nav, RoutesList}
 */

function App() {
  const [user, setUser] = useState({
    data: "",
    isLoading: true,
  });

  const [token, setToken] = useState({
    data: "",
    isLoading: true,
  });

  useEffect(() => {
    //check for token in local storage on mount
    if (token.isLoading && localStorage.getItem(TOKEN)) {
      const localToken = localStorage.getItem(TOKEN);
      setToken({
        data: localToken,
        isLoading: false,
      });
    }

    //update user, local storage, and JoblyAPI.token from current token
    if (token.data) {
      const decodedToken = jwt_decode(token.data);
      setUser({
        data: decodedToken.username,
        isLoading: false,
      });
      localStorage.setItem(TOKEN, token.data);
      JoblyApi.token = token.data;
    }
  }, [token]);

  /** handle login */

  async function loginUser(formData) {
    const resp = await JoblyApi.loginUser(formData);
    setToken({
      data: resp.token,
      isLoading: false,
    });
  }

  /** handle register */

  async function registerUser(formData) {
    const resp = await JoblyApi.registerUser(formData);
    setToken({
      data: resp.token,
      isLoading: false,
    });
  }

  /** handle update */

  async function updateUser(formData) {
    await JoblyApi.updateUser(user.data, formData);
  }

  /** logout function resets state of user and token,
   * clears local storage and token property in JoblyApi */

  function logOut() {
    setToken({
      data: "",
      isLoading: false,
    });
    setUser({
      data: "",
      isLoading: false,
    });
    
    localStorage.removeItem(TOKEN);
    JoblyApi.token = "";
  }

  return (
    <div className="App">
      <userContext.Provider value={{ username: user.data }}>
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
