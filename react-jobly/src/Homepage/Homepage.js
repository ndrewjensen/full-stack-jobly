import { useParams } from "react-router-dom";
import { useContext } from 'react'
import userContext from "../userContext";

/** Homepage Component
 * 
 * RoutesList -> Homepage
 */

function Homepage() {  
  const { username } = useContext(userContext);
  return (
    <div className="Homepage">
        <h1>JOBLY</h1>
        <p>All the jobs in one, convenient place.</p>
        {username && <h3>Welcome Back, {username}!</h3>}
    </div>
  )
}

export default Homepage;





