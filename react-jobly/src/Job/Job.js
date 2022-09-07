/** Job Component
 * 
 * state: companies
 * 
 * {Jobs, CompanyPage } -> Job
 */

function Job({job}) {
  const {title, companyName, salary, equity} = job
  return (
    <div className="Job">
     <h4>{title}</h4>
     <h5>{companyName}</h5>
     <p>{salary}</p>
     <p>{equity}</p>
    </div>
  )
}

export default Job;