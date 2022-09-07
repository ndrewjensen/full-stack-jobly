/** CompanyCard Component
 * 
 * Props: company object with company details
 * 
 * Companies -> Company
 */

function CompanyCard({company}) {
  const {name, description, numEmployees, logoUrl, handle} = company
  return (
    <div className="Job">
     {logoUrl && <img alt={handle} src={logoUrl}/>}
     <h4>{name}</h4>
     <p>{description}</p>
     {/* <p>{numEmployees}</p> */}
    </div>
  )
}

export default CompanyCard;