import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Job from "../Job/Job";
import JoblyApi from "../api";
import Loading from '../Loading/Loading';

/** Company Detail Page Component
 *
 * RoutesList -> CompanyPage -> Job
 */

function CompanyPage() {
  const params = useParams(); //returns an object
  const [jobs, setjobs] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getjobs() {
      const resp = await JoblyApi.request(`companies/${params.handle}`);
      setjobs({ data: resp.jobs, isLoading: false });
    }
    getjobs();
  }, [params.handle]);

  if (jobs.isLoading) return <Loading />;

  return (
    <div className="CompanyPage">
      {jobs.data.map(job => <Job key={job.id} job={job} />)}
    </div>
  );
}

export default CompanyPage;