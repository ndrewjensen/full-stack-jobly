import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../userContext";

/** Homepage Component
 * Props: none
 * State: none
 * RoutesList -> Homepage
 */

function Homepage() {
  const { username } = useContext(userContext);
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  return (
    <div className="Homepage">
      <h1>JOBLY</h1>
      <p>All the jobs in one, convenient place.</p>
      {username ? (
        <h3>Welcome Back, {username}!</h3>
      ) : (
        <div>
          <button onClick={handleLoginClick} className="btn-primary btn m-3">Login</button>
          <button onClick={handleRegisterClick} className="btn-primary btn m-3">Register</button>
        </div>
      )}
    </div>
  );
}

export default Homepage;
