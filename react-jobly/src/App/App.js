//TODO: reorganize imports
import "./App.css";
import RoutesList from "../RoutesList/RoutesList";
import Nav from "../Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import userContext from "../userContext";
import JoblyApi from "../api";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";

/** App Component
 *
 * App -> Companies -> { Nav, RoutesList}
 */

function App() {
  const [user, setUser] = useState({
    //combine with logic in the useEffect to update the initial value to
    //local if available
    data: "",
    isLoading: true,
  });

  //TODO: We haven't needed this yet. remove if continues unused
  const [token, setToken] = useState({
    //combine with logic in the useEffect to update the initial value to
    //local if available
    data: {},
    isLoading: true,
  });


  //check local storage: if a token is present update state with token data
  useEffect(() => {
    //TODO: change local to localToken
    //TODO: make a global variable for "token that is TOKEN_STORAGE_ID"
    //TODO: move all of user to state
    const local = localStorage.getItem("token")
    if (local) {
      // console.log("In if LOCAL STORAGE", local);
      const decodedToken = jwt_decode(local);
      // console.log("decoded token", decodedToken);

      setUser({
        data: decodedToken.username,
        isLoading: false,
      });

      setToken({
        data: decodedToken,
        isLoading: false,
      });
    }
    //TODO: add this     JoblyApi.token = resp.token;
//TODO: add dependency on local storage
  },[])

  localStorage.setItem("token", "");//untoggle to reset local storage
  // console.log("LOCAL STORAGE", localStorage.getItem("token"));

  /** handle login */
  async function loginUser(formData) {
    const resp = await JoblyApi.loginUser(formData);
    const decodedToken = jwt_decode(resp.token);
    localStorage.setItem("token", resp.token); //localStorage.getItem("item")

    //TODO:after updating dependency in useEffect, setUser and joblyapi update can go
    //update states
    setUser({
      data: decodedToken.username,
      isLoading: false,
    });
    setToken({
      data: decodedToken,
      isLoading: false,
    });

    //update static token in JoblyAPI with user token
    JoblyApi.token = resp.token;
    // console.log("JOBLY api token, on login", JoblyApi.token)
  }

  async function registerUser(formData) {
    const resp = await JoblyApi.registerUser(formData);
    const decodedToken = jwt_decode(resp.token);
    localStorage.setItem("token", resp.token);
  }

  async function updateUser(formData) {
    const resp = await JoblyApi.updateUser(user.data, formData);
    const decodedToken = jwt_decode(resp.token);
    localStorage.setItem("token", resp.token);
  }

  /** logout function resets state of user and token,
   * clears local storage and token property in JoblyApi */
  function logOut() {
    setUser({
      data: "",
      isLoading: false,
    });
    setToken({
      data: {},
      isLoading: false,
    });
    //TODO:use localStorage.removeItem
    // localStorage.setItem("token", ""); //localStorage.getItem("item")
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
          updateUser={updateUser}/>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
