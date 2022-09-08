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
    data: "",
    isLoading: true,
  });

  //TODO: We haven't needed this yet. remove if continues unused
  const [token, setToken] = useState({
    data: {},
    isLoading: true,
  });

  //
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("LOCAL STORAGE", localStorage.getItem("token"));
    }

  })
  console.log("LOCAL STORAGE", localStorage.getItem("token"));

  /** handle login and registration */
  async function authUser(endpoint, formData, params, method) {
    // const { username, password, firstName, lastName, email } = formData;
    const resp = await JoblyApi.postOrPatch(endpoint, formData, params, method);
    const decodedToken = jwt_decode(resp.token);

    localStorage.setItem("token", decodedToken); //localStorage.getItem("item")

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
    console.log("JOBLY api token, on login", JoblyApi.token)
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
    localStorage.setItem("token", ""); //localStorage.getItem("item")
    JoblyApi.token = "";
  }

  return (
    <div className="App">
      <userContext.Provider value={{ username: user.data }}>
        <BrowserRouter>
          <Nav logOut={logOut} />
          <RoutesList auth={authUser} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
