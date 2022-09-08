import { NavLink } from "react-router-dom";

/** Nav Component
 *
 * App -> Nav
 */

function Nav({logOut}) {
  
  /** calls logout function in App */
  function handleLogOut(){
    logOut ()
  }

  return(
    <nav className="Nav">
      <NavLink to="/" end>Jobly</NavLink>
      <NavLink to="/companies" end>Companies</NavLink>
      <NavLink to="/jobs" end>Jobs</NavLink>
      <NavLink to="/register" end>Sign Up</NavLink>
      <NavLink to="/login" end>Login</NavLink>
      <NavLink to="/profile" end>Profile</NavLink>
      {/* //TODO: Add username to logout */}
      <NavLink to="/" onClick={handleLogOut} end>Log out </NavLink>
      
    </nav>
  )
}

export default Nav;