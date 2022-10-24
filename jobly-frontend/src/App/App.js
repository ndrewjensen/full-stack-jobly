import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";

import RoutesList from "../RoutesList/RoutesList";
import Nav from "../Nav/Nav";
import Loading from "../Loading/Loading";
import userContext from "../userContext";
import JoblyApi from "../api";
import "./App.css";

const TOKEN = "tokenStorageId";

/** App Component
 * Props: none
 * State: username,user,token,isLoading
 * App -> Companies -> { Nav, RoutesList}
 */

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem(TOKEN));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function updateStates() {
    //update user, local storage, and JoblyAPI.token from current token
    if (token) {
      localStorage.setItem(TOKEN, token);
      JoblyApi.token = token;
      
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken.username);
        const resp = await JoblyApi.getUser(decodedToken.username);
        setUser(resp);
      }
      setIsLoading(false);
    }
    updateStates();
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
    await JoblyApi.updateUser(username, formData);
  }

  /** logout function resets state of user and token,
   * clears local storage and token property in JoblyApi */

  function logOut() {
    setToken(null);
    setUsername("");
    setUser({});
    localStorage.removeItem(TOKEN);
    JoblyApi.token = "";
  }

  if (isLoading) return <Loading />
  return (
    <div className="App">
      {}
      <userContext.Provider value={{ username: username, user: user }}>
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
