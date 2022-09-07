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
     <h4>{name}</h4>
     <p>{description}</p>
     {/* <p>{numEmployees}</p> */}
     {logoUrl && <img alt={handle} src={logoUrl}/>}
    </div>
  )
}

export default CompanyCard;