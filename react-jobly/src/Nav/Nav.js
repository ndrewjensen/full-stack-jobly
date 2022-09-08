import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../userContext";

/** Nav Component
 *
 * App -> Nav
 */

function Nav({ logOut }) {
  const { username } = useContext(userContext);

  /** calls logout function in App */
  function handleLogOut() {
    logOut();
  }

  return (
    <nav className="Nav nav">
      <div className="Nav-home">
      <NavLink to="/" end>Jobly</NavLink>
      </div>
      {username
        ?
        <div className="Nav-right">
          <NavLink to="/companies " end>Companies</NavLink>
          <NavLink to="/jobs" end>Jobs</NavLink>
          <NavLink to="/profile" end>Profile</NavLink>
          <NavLink to="/" onClick={handleLogOut} end>Log out {username}</NavLink>
        </div>
        :
        <div className="Nav-right">
          <NavLink to="/register" end>Sign Up</NavLink>
          <NavLink to="/login" end>Login</NavLink>
        </div>
      }

    </nav>
  );
}

export default Nav;