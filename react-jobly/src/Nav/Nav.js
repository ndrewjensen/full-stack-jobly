import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../userContext";
import "./Nav.css";

/** Nav Component
 * Props: logOut function to call in App
 * State: none
 * App -> Nav
 */

function Nav({ logOut }) {
  const { username } = useContext(userContext);

  /** calls logout function in App */
  function handleLogOut() {
    logOut();
  }

  return (
    <nav className="Nav navbar navbar-expand-md">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" end>
          Jobly
        </NavLink>
        <ul className="navbar-nav ms-auto">
          {username ? (
            <>
              <li className="nav-item me-1">
                <NavLink className="nav-link active" to="/companies " end>
                  Companies
                </NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink className="nav-link active" to="/jobs" end>
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink className="nav-link active" to="/profile" end>
                  Profile
                </NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink
                  className="nav-link active"
                  to="/"
                  onClick={handleLogOut}
                  end
                >
                  Log out {username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-1">
                <NavLink className="nav-link active" to="/register" end>
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink className="nav-link active" to="/login" end>
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
