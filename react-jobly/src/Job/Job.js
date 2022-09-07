/** Job Component
 *
 * state: companies
 *
 * {Jobs, CompanyPage } -> Job
 */

function Job({ job }) {
  const { title, companyName, salary, equity } = job;
  return (
    <div className="Job card m-3">
      <div className="card-body">
        <h5>{title}</h5>
        <p>{companyName}</p>
        <small>
          Salary: {salary} | Equity: {equity}
        </small>
      </div>
    </div>
  );
}

export default Job;
