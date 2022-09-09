import Job from "../Job/Job"

/** JobsList Component
 * 
 * Props: jobs array of job objects
 * State: none
 * { Jobs, CompanyPage } -> JobsList -> Job
 */

function JobsList ({jobs}) {
  return (
    <div className="JobsList">
    {jobs.map((job) => (
      <Job key={job.id} job={job} />
      ))}
      </div>
  )
}

export default JobsList