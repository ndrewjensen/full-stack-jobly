import "./CompaniesList.css"
import CompanyCard from "../CompanyCard/CompanyCard";
import { NavLink } from "react-router-dom";

/** CompanyList Component
 * 
 * props: companies array of company objects
 * 
 * Companies -> CompaniesList -> CompanyCard
 */

function CompaniesList({companies}) {
  return (
      <div className="CompaniesList">
        {companies.map((company) => (
          <NavLink key={company.handle} to={`${company.handle}`}>
            <CompanyCard company={company} />
          </NavLink>
        ))}


      </div>
    )
  }
  
  export default CompaniesList