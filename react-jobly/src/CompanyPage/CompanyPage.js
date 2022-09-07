import { useParams } from "react-router-dom";
import Job from "../Job/Job";

/** Company Detail Page Component
 * 
 * state: 
 * 
 * RoutesList -> CompanyPage -> Job
 */

function CompanyPage() {
  return (
    <div className="CompanyPage">
      company page
      <Job />
    </div>
  )
}

export default CompanyPage;