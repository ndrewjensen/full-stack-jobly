import React, { useState, useEffect, useContext } from "react";

import JobsList from "../JobsList/JobsList";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import JoblyApi from "../api";

import { Navigate } from "react-router-dom";
import userContext from "../userContext";


/** Jobs Page Component
 * Props:none
 * State: jobs
 * RoutesList -> Jobs -> Job
 */

function Jobs() {
  const { username } = useContext(userContext);

  const [jobs, setjobs] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getjobs() {
      const resp = await JoblyApi.getAllJobs();
      setjobs({ data: resp.jobs, isLoading: false });
    }
    getjobs();
  }, []);

  if (!username) return <Navigate to={"/"} />;

  /** makes API call for jobs title from form search term */
  async function search(formData) {
    const { searchTerm } = formData;
    const resp = await JoblyApi.searchJobs(searchTerm);
    setjobs({ data: resp.jobs, isLoading: false });
  }

  if (jobs.isLoading) return <Loading />;

  return (
    <div className="jobs">
      {/* <Loading /> */}
      <SearchForm search={search} />
      <JobsList jobs={jobs.data} />
    </div>
  );
}
export default Jobs;
