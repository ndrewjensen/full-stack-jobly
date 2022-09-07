import React, {useState, useEffect } from 'react'

import Job from "../Job/Job";
import SearchForm from "../SearchForm/SearchForm";
import Loading from '../Loading/Loading';
import JoblyApi from '../api';

/** Jobs Page Component
 * 
 * state: jobs
 * 
 * RoutesList -> Jobs -> Job
 */

function Jobs() {
  const [jobs, setjobs] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getjobs() {
      const resp = await JoblyApi.request("jobs");
      setjobs({ data: resp.jobs, isLoading: false });
    }
    getjobs();
  }, []);

  if (jobs.isLoading) return <Loading />;

  return (
    <div className="jobs">
      <Loading />
      <SearchForm />
      {jobs.data.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
}
export default Jobs;