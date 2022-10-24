import "./CompanyCard.css"

/** CompanyCard Component
 * Props: company object with company details
 * State: none
 * Companies -> Company
 */

function CompanyCard({company}) {
  const {name, description, numEmployees, logoUrl, handle} = company
  return (
    <div className="Company card">
      <div className="card-body">
     {logoUrl && <img className="Company-logo"alt={handle} src={logoUrl}/>}
     <h4>{name}</h4>
     <p>{description}</p>
     {/* <p>{numEmployees}</p> */}
    </div>
    </div>
  )
}

export default CompanyCard;