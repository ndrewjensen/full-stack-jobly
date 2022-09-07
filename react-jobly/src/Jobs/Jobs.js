import { useParams } from "react-router-dom";
import Job from "../Job/Job";
import SearchForm from "../SearchForm/SearchForm";

/** Jobs Page Component
 * 
 * state: jobs
 * 
 * RoutesList -> Jobs -> Job
 */

function Jobs() {
  return (
    <div className="Jobs">
      <SearchForm />
      <Job/>
    </div>
  )
}

export default Jobs;