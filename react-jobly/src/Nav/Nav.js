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
    <nav className="Nav">

      <NavLink to="/" end>Jobly</NavLink>

      {username
        ?
        <>
          <NavLink to="/companies" end>Companies</NavLink>
          <NavLink to="/jobs" end>Jobs</NavLink>
          <NavLink to="/profile" end>Profile</NavLink>
          <NavLink to="/" onClick={handleLogOut} end>Log out {username}</NavLink>
        </>
        :
        <>
          <NavLink to="/register" end>Sign Up</NavLink>
          <NavLink to="/login" end>Login</NavLink>
        </>
      }

    </nav>
  );
}

export default Nav;