
import "./App.css";
import RoutesList from "../RoutesList/RoutesList";
import Nav from "../Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import userContext from "../userContext";
import JoblyApi from "../api";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";

/** App Component
 *
 * App -> Companies -> { Nav, RoutesList}
 */

function App() {
  const [user, setUser] = useState({
    data: {},
    isLoading: true
  });

  async function registerUser(formData, path) {
    // const { username, password, firstName, lastName, email } = formData;
    const resp =
      await JoblyApi.request(`auth/${path}`, formData, "post");
    const token = jwt_decode(resp);
    localStorage.setItem("token", token); //localStorage.getItem("item")
    setUser({
      data: token.username,
      isLoading: false
    });
  }


  return (
    <div className="App">
      <userContext.Provider value={{ username: user.data }}>
        <BrowserRouter>
          <Nav />
          <RoutesList />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
